import Link from "next/link";
import { useState } from "react";
import useSWR, { Key, Fetcher } from "swr";
import useUser from "../lib/hooks/useUser";


function Navbar(props: any) {
  /* User */
  const { user } = useUser();

  /* Mobile Menu */
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobile = () => setMobileMenu(!mobileMenu);

  /* Hub Dropdown */
  const [hubDropdown, setHubDropdown] = useState(false);
  const handleHubDropdown = () => setHubDropdown(!hubDropdown);

  const [navBg, setNavBg] = useState(props.darken);

  const changeBackground = () => {
    if (props.darken) {
      setNavBg(true);
    } else {
      if (window.scrollY > 80) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBackground);
  }

  return (
    <>
    {mobileMenu ? 
    <nav id="nav" className="bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-50">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link href="/" className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">
        <img alt="Bloody ARK Logo" className="h-10 mr-2" src="/logo.png" />
        <p className="my-auto">BloodyARK</p>
      </Link>
      <button onClick={handleMobile} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-white md:hidden hover:bg-mesa-orange focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="w-full md:block md:w-auto" id="navbar-default">
        <ul className="flex justify-center items-center flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-mesa-gray bg-mesa-gray">
          <li>
            <Link href="/" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-home" /> Home</Link>
          </li>
          <li>
            <Link href="/info/pvp-system" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-book" /> Information</Link>
          </li>
          <li>
            <Link href="/servers" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-database" /> Servers</Link>
          </li>
          <li>
            <Link href="/leaderboards" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-trophy" /> Leaderboards</Link>
          </li>
          <li>
            <Link href="https://shop.bloody.gg" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-shop" /> Shop</Link>
          </li>
          <li>
            <Link href="/support" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-comment" /> Support</Link>
          </li>
          <li>
            <Link href="https://discord.gg/bloody" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa-brands fa-discord" /></Link>
          </li>
          {user ?
          <li>
            <div className="relative">
              {/* Dropdown Trigger */}
              <button onClick={handleHubDropdown} className="flex flex-row items-center w-full px-4 text-md font-semibold text-left">
                <img className="h-8 w-8 rounded-full mr-3 border-2 border-gray-500" src={user.avatarUrl} alt={user.username} />
                  <span className="font-bold text-white">
                    {user.username}
                  </span>
              </button>
              {/* Dropdown */}
              <div className={hubDropdown ? 'absolute z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0' : 'hidden z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0'}>
                <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-bgray-secondary">
                    <Link className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out" href="/hub">Bloody Hub</Link>
                    <Link className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out" href="/api/auth/logout">Logout</Link>
                </div>
              </div>
            </div>
          </li>
          : 
          <li>
            <Link href="/api/auth/login" className="block py-2 pr-4 pl-3 text-white bg-bred-2 rounded-full p-4 font-bold transition-colors"><i className="fas fa-cubes mr-2"></i>Hub</Link>
          </li>
          }
        </ul>
      </div>
    </div>
  </nav>
    :<>
    <nav className={navBg ? 'bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-50' : 'bg-transparent px-2 sm:px-4 py-2.5 fixed top-0 w-full z-20'}>
 
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link href="/" className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">
        <img alt="Bloody ARK Logo" className="h-10 mr-2" src="/logo.png" />
        <p className="my-auto">BloodyARK</p>
      </Link>
      <button onClick={handleMobile} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-white md:hidden hover:bg-mesa-orange focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="flex justify-center items-center flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-mesa-gray bg-mesa-gray">
          <li>
            <Link href="/" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-home" /> Home</Link>
          </li>
          <li>
            <Link href="/info/pvp-system" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-book" /> Information</Link>
          </li>
          <li>
            <Link href="/servers" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-database" /> Servers</Link>
          </li>
          <li>
            <Link href="/leaderboards" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-trophy" /> Leaderboards</Link>
          </li>
          <li>
            <Link href="https://shop.bloody.gg" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-shop" /> Shop</Link>
          </li>
          <li>
            <Link href="/support" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-comment" /> Support</Link>
          </li>
          <li>
            <Link href="https://discord.gg/bloody" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa-brands fa-discord" /></Link>
          </li>
          {user ?
          <li>
            <div className="relative">
              {/* Dropdown Trigger */}
              <button onClick={handleHubDropdown} className="flex flex-row items-center w-full px-4 text-md font-semibold text-left">
                <img className="h-8 w-8 rounded-full mr-3 border-2 border-gray-500" src={user.avatarUrl} alt={user.username} />
                  <span className="font-bold text-white">
                    {user.username}
                  </span>
              </button>
              {/* Dropdown */}
              <div className={hubDropdown ? 'absolute z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0' : 'hidden z-50 mt-3 w-48 rounded-md shadow-lg origin-top-right right-0'}>
                <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-bgray-secondary">
                    <Link className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out" href="/hub">Bloody Hub</Link>
                    <Link className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out" href="https://portal.bloody-ark.com">Bloody Portal</Link>
                    <Link className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-forward focus:outline-none focus:bg-bgray-forward transition duration-150 ease-in-out" href="/api/auth/logout">Logout</Link>
                </div>
              </div>
            </div>
          </li>
          : 
          <li>
            <Link href="/api/auth/login" className="block py-2 pr-4 pl-3 text-white bg-bred-2 rounded-full p-4 font-bold transition-colors"><i className="fas fa-cubes mr-2"></i>Hub</Link>
          </li>
          }
        </ul>
      </div>
    </div>
  </nav>
                      </>
      }
    </>
  )
}

export default Navbar;
