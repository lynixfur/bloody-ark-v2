import { useState } from "react";
import useSWR, { Key, Fetcher } from "swr";

import { useAuth } from '../context/AuthContext';
import auth_service from '../services/auth_service';

function Navbar(props) {
  /* Auth */
  const { user, setUser } = useAuth();

  console.log(user);

  const handleLogout = async() => {
    try {
      const data = await auth_service.logout();
      if(data.success) setUser(data.user);
      else throw new Error("Something went wrong...");
    } catch (err) {
      console.error(err);
    }
  }


  /* Load Navigaion Links */
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/navigation", fetcher);

  /* Mobile Menu */
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobile = () => setMobileMenu(!mobileMenu);

  /* Hub Dropdown */
  const [hubDropdown, setHubDropdown] = useState(false);
  const handleHubDropdown = () => setHubDropdown(!hubDropdown);

  const [navBg, setNavBg] = useState(props.darken);

  const changeBackground = () => {
    if(props.darken) {
      setNavBg(true)
    } else {
      if(window.scrollY > 80) {
        setNavBg(true)
      } else {
          setNavBg(false)
      }
    }
  }
  

    if (typeof window !== "undefined") {
        window.addEventListener('scroll', changeBackground)
      }
    

  return (
    <>
      <div className={navBg ? 'fixed w-full text-gray-700 text-gray-200 bg-bgray-bg border-b border-gray-700 z-50' : 'fixed w-full text-gray-700 text-gray-200 z-50 bg-bgray-bg bg-opacity-0 '}>
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between p-4">
            <a
              href="#"
              className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline"
            >
              <img
                alt="Bloody ARK Logo"
                className="h-10 mr-2"
                src="/logo.png"
              />
              <p className="my-auto">BloodyARK {props?.darken}</p>
            </a>
            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={handleMobile}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                {mobileMenu ? (
                  <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
                ) : (
                  <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
                )}
              </svg>
            </button>
          </div>
          <nav className={mobileMenu ? 'flex flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row' : 'flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row'}>
            {error && (
              <a
                className="px-4 py-2 mt-2 text-sm font-semibold rounded-full bg-red-600 focus:text-white hover:text-white text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                <i className="fa-solid fa-circle-exclamation"></i> Failed to
                load Navigation Links
              </a>
            )}
            {data &&
              data.links.map((data) => {
                return (
                  <a
                    className="px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-100 focus:text-white-900 hover:bg-bgray-secondary focus:bg-bgray-secondary focus:outline-none focus:shadow-outline"
                    href={data.path}
                  >
                    <p><i class={data.icon}></i> {data.name}</p>
                  </a>
                );
              })}
            <div className="relative hidden">
              <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg bg-transparent focus:text-white hover:text-white focus:bg-gray-600 hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <span>Dropdown List</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 z-30">
                <div className="px-2 py-2 bg-white rounded-md shadow bg-gray-700">
                  <a
                    className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Link #1
                  </a>
                  <a
                    className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Link #2
                  </a>
                  <a
                    className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Link #3
                  </a>
                </div> {/* Wtf? */}
              </div>
            </div>
            {user ? 
            
<div className="relative my-auto mt-5 md:mt-0">
              <button  onClick={handleHubDropdown} className="flex flex-row items-center w-full px-4 text-md font-semibold text-left">
                <img class="h-8 w-8 rounded-full mr-3 border-2 border-gray-500" src={user.avatar} alt={user.username}/>
                <span className="font-semibold">
                  {user.username}
                </span>
              </button>
              <div className={hubDropdown ? 'absolute right-0 w-full md:w-80 mt-2 origin-top-right z-30' : 'absolute right-0  w-full md:w-80 mt-2 origin-top-right z-30 hidden'}>
                <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg bg-bgray-dropdown">
                
                  <button className="flex flex-row items-center w-full px-2 pb-2 mt-3 text-md font-semibold text-left">
                    <img class="h-12 w-12 rounded-full mr-3 border-2 border-gray-500" src={user.avatar} alt={user.username}/>
                    <span className="font-semibold text-lg flex flex-col">
                      <p>{user.username}</p>
                      <p className="text-sm font-normal text-gray-400"><i class="fa-solid fa-gear"></i> Manage your account</p>
                    </span>
                  </button>
<hr class="py-2 mt-2 mx-2 border-gray-600"/>
                    <a
                      className="flex flex row items-start rounded-lg bg-transparent p-2 hover:bg-bgray-secondary focus:bg-bgray-secondary focus:text-white hover:text-white text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="/hub"
                    >
                      <div className="bg-red-600 text-white rounded-lg p-3 h-12 w-12 flex justify-center items-center">
                        <i className="fa-solid fa-cubes text-xl mx-auto my-auto"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">Bloody Hub</p>
                        <p className="text-sm">
                          Manage your tribe and see your performance.
                        </p>
                      </div>
                    </a>
                    <a
                      className="flex flex row items-start rounded-lg bg-transparent p-2 hover:bg-bgray-secondary focus:bg-bgray-secondary focus:text-white hover:text-white text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="https://portal.bloody-ark.com/"
                    >
                      <div className="bg-red-600 text-white rounded-lg p-3 h-12 w-12 flex justify-center items-center">
                        <i className="fa-solid fa-cube text-xl mx-auto my-auto"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">Bloody Portal</p>
                        <p className="text-sm">View your tames, generators and more.</p>
                      </div>
                    </a>
                  </div>
                </div>         
              </div>

            :
            <div className="relative my-auto">
              <a href="/login" className="bg-bred-2 flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left rounded-full md:w-auto md:inline md:mt-0 md:ml-4">
                <span>
                  <i className="fas fa-cubes mr-2"></i>Hub
                </span>
              </a>
              </div>              
              }
            
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
