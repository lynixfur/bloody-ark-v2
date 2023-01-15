import Link from "next/link";
import { useState } from "react";
import useUser from "../lib/hooks/useUser";

export default function HubSidebar() {
  /* User */
  const { user } = useUser();

  /* Mobile Menu */
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobile = () => setMobileMenu(!mobileMenu);

  /* Hub Dropdown */
  const [hubDropdown, setHubDropdown] = useState(false);
  const handleHubDropdown = () => setHubDropdown(!hubDropdown);

  return (
    <>
      {mobileMenu ? (
        <nav
          id="nav"
          className="bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-20 block sm:hidden"
        >
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link
              href="/"
              className="ml-2 flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline"
            >
              <img
                alt="Bloody ARK Logo"
                className="h-10 mr-2"
                src="/logo.png"
              />
              <p className="my-auto">BloodyHUB</p>
            </Link>
            <button
              onClick={handleMobile}
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white md:hidden hover:bg-mesa-orange focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="w-full md:block md:w-auto" id="navbar-default">
              <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-mesa-gray bg-mesa-gray">
                <li>
                  <Link
                    href="/hub"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"
                  >
                    <i className="fa fa-solid fa-home" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub/tribe_manager"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"
                  >
                    <i className="fa fa-users fa-home" /> Tribe Manager
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub/performance"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"
                  >
                    <i className="fa fa-solid fa-chart-area" /> Performance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub/rankings"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"
                  >
                    <i className="fa fa-solid fa-solid fa-trophy" /> Player
                    Rankings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub/tribe_rankings"
                    className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"
                  >
                    <i className="fa fa-solid fa-solid fa-trophy" /> Tribe
                    Rankings
                  </Link>
                </li>
                <li className="w-full justify-center p-4 px-1 space-x-4 w-full lg:flex">
          <Link
            href="/"
            className="inline-flex justify-center p-2 rounded cursor-pointer text-gray-400 hover:bg-bgray-bg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </Link>
          <Link
            href="/api/auth/logout"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 rounded cursor-pointer text-gray-400 hover:bg-bgray-bg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="#"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400"
          >
            <img
              className="h-6 w-6 rounded-full mr-3 border-2 border-gray-500"
              src={user?.avatarUrl}
              alt={user?.username}
            />
          </Link>
        </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className={
            "bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-20 block sm:hidden"
          }
        >
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link
              href="/"
              className="ml-2 flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline"
            >
              <img
                alt="Bloody ARK Logo"
                className="h-10 mr-2"
                src="/logo.png"
              />
              <p className="my-auto">BloodyHUB</p>
            </Link>
            <button
              onClick={handleMobile}
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white md:hidden hover:bg-mesa-orange focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="flex justify-center items-center flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-mesa-gray bg-mesa-gray">
                {user ? (
                  <li>
                    <div className="relative">
                      {/* Dropdown Trigger */}
                      <button
                        onClick={handleHubDropdown}
                        className="flex flex-row items-center w-full px-4 text-md font-semibold text-left"
                      >
                        <img
                          className="h-8 w-8 rounded-full mr-3 border-2 border-gray-500"
                          src={user.avatarUrl}
                          alt={user.username}
                        />
                        <span className="font-bold text-white">
                          {user.username}
                        </span>
                      </button>
                      {/* Dropdown */}
                      <div
                        className={
                          hubDropdown
                            ? "absolute z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0"
                            : "hidden z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0"
                        }
                      >
                        <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-bgray-secondary">
                          <Link
                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out"
                            href="/hub"
                          >
                            Bloody Hub
                          </Link>
                          <Link
                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out"
                            href="/api/auth/logout"
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/api/auth/login"
                      className="block py-2 pr-4 pl-3 text-white bg-bred-2 rounded-full p-4 font-bold transition-colors"
                    >
                      <i className="fas fa-cubes mr-2"></i>Hub
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Navigation */}
      <aside
        className="fixed top-0 left-0 w-64 h-screen sm:h-full z-30 hidden sm:block"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-bgray-secondary border-r border-gray-700">
          <ul className="space-y-2">
            <li className="mb-5">
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline"
                >
                  <img
                    alt="Bloody ARK Logo"
                    className="h-10 mr-2"
                    src="/logo.png"
                  />
                  <p className="my-auto">BloodyHub</p>
                </Link>
              </div>
            </li>
            <li>
              <Link
                href="/hub"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-house my-auto mr-2" /> Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hub/tribe_manager"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-users my-auto mr-2" /> Tribe Manager
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hub/performance"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-chart-area my-auto mr-2" />{" "}
                  Performance
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hub/rankings"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-trophy my-auto mr-2" /> Player
                  Rankings
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hub/tribe_rankings"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-trophy my-auto mr-2" /> Tribe
                  Rankings
                </span>
              </Link>
            </li>
            <li className="hidden">
              <Link
                href="/hub/portal"
                className="flex items-center p-2 text-base font-normal rounded-lg text-gray-400 hover:bg-bgray-bg transition-colors group"
              >
                <span className="ml-3">
                  <i className="fa-solid fa-cube my-auto mr-2" /> Bloody Portal
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-bgray-secondary z-20 border-r border-gray-700">
          <Link
            href="/"
            className="inline-flex justify-center p-2 rounded cursor-pointer text-gray-400 hover:bg-bgray-bg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </Link>
          <Link
            href="/api/auth/logout"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 rounded cursor-pointer text-gray-400 hover:bg-bgray-bg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="#"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400"
          >
            <img
              className="h-6 w-6 rounded-full mr-3 border-2 border-gray-500"
              src={user?.avatarUrl}
              alt={user?.username}
            />
          </Link>
        </div>
      </aside>
    </>
  );
}
