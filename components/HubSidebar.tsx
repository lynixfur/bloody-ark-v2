import { useAuth } from '../context/AuthContext';
import auth_service from '../services/auth_service';

export default function HubSidebar(props) {
    const { user, setUser } = useAuth();

    return (
        <div className="flex overflow-hidden bg-white dark:bg-bgray-secondary pt-16">
        <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-bgray-secondary pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white dark:bg-bgray-secondary divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <li>
                    <form action="#" method="GET" className="lg:hidden">
                      <label htmlFor="mobile-search" className="sr-only">Search</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                      </div>
                    </form>
                  </li>
                  <li>
                    <a href="/hub" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 dark:hover:bg-bgray-overlay transition-colors hover:bg-gray-100 group">
                      <i className="fa-solid fa-house my-auto text-xl" />
                      <span className="ml-3">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="/hub/tribe_manager" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors group">
                      <i className="fa-solid fa-users my-auto text-xl" />
                      <span className="ml-3">Tribe Manager</span>
                    </a>
                  </li>
                  <li>
                    <a href="/legacy" className="text-base text-gray-900 dark:text-gray-400 font-normal rounded-lg hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors items-center p-2 group hidden">
                      <i className="fa-solid fa-clock-rotate-left my-auto text-xl" />
                      <span className="ml-3 flex-1 whitespace-nowrap">Your Legacy</span>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-50 dark:hover:bg-bgray-overlay transition-colors ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">VIP</span>
                    </a>
                  </li>
                  <li>
                    <a href="/hub/performance" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors group">
                      <i className="fa-solid fa-chart-area my-auto text-xl" />
                      <span className="ml-3">Performance</span>
                    </a>
                  </li>
                  <li>
                    <a href="/hub/tribe_rankings" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors group">
                      <i className="fa-solid fa-trophy my-auto text-xl" />
                      <span className="ml-3">Tribe Rankings</span>
                    </a>
                  </li>
                  <li>
                    <a href="/hub/rankings" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors group">
                      <i className="fa-solid fa-trophy my-auto text-xl" />
                      <span className="ml-3">Player Rankings</span>
                    </a>
                  </li>
                  <li>
                    <a href="/hub/portal" className="text-base text-gray-800 dark:text-gray-400 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-bgray-overlay transition-colors group">
                      <i className="fa-solid fa-cube my-auto text-xl" />
                      <span className="ml-3">Portal</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      
    )
}
