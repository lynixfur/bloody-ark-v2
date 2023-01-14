import Navbar from "./navbar";
import HomeHeader from "./headers/homeHeader";
import useSWR from "swr";
import HubSidebar from "./HubSidebar";
import HubNavbar from "./HubNavbar";
import { useAuth } from '../context/AuthContext';
import auth_service from '../services/auth_service';

export default function Layout({ children }) {
  const { user, setUser } = useAuth();

  return (
    <>
      <div className="bg-bgray-bg">
      <HubNavbar/>
      <HubSidebar/>
      <div className="ml-0 lg:ml-64 flex flex-col" style={{minHeight: 'calc(100vh - 4rem)'}}>
          <div class="flex-1">{children}</div>

          <div class="bg-white dark:bg-bgray-overlay">
            <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p class="text-gray-800 dark:text-white text-sm text-center sm:text-left">
                Copyright © 2022 BloodyARK. All Rights Reserved.
              </p>
              <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a class="text-gray-900 dark:text-gray-200">
                  <i class="fa-brands fa-discord"></i>
                </a>
                <a class="ml-3 text-gray-900 dark:text-gray-200">
                  <i class="fa-brands fa-steam"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
