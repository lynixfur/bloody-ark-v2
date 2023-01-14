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

  /* Mobile Menu */
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobile = () => setMobileMenu(!mobileMenu);

  return (
    <>
    {/* This example requires Tailwind CSS v2.0+ */}
<nav x-data="{ open: false }" className="bg-bgray-secondary border-b border-gray-200 dark:border-gray-700 fixed w-full z-20 top-0">
  <div className="md:mx-4 px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-whit" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          {/*
        Icon when menu is closed.
  
        Heroicon name: outline/menu
  
        Menu open: "hidden", Menu closed: "block"
      */}
          <svg className="h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {/*
        Icon when menu is open.
  
        Heroicon name: outline/x
  
        Menu open: "block", Menu closed: "hidden"
      */}
          <svg className="h-6 w-6 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center place-content-center">
          <img className="block lg:hidden h-8 w-auto" src="/images/favicon.png" alt="Bloody ARK Logo" />
          <div className="hidden lg:flex w-auto my-auto">
            <img alt="Bloody ARK Logo" className="h-8 mr-2" src="/images/favicon.png" />
            <h1 className="text-xl text-gray-200 my-auto font-bold uppercase">Bloody<span className="">HUB</span></h1>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <a href="https://bloody-ark.com" class="inline-flex items-center px-3 py-1 font-bold leading-6 text-md shadow rounded-full text-gray-100 bg-bred-2 transition ease-in-out duration-150">  <i class="fa-solid fa-earth-americas m-1 mr-2 my-auto text-gray-100"></i> Website</a>
            
        {/* Profile dropdown */}
        <div className="ml-3 relative">
        <button type="button" className="bg-gray-800 flex text-sm rounded-full" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user?.avatar} alt={user?.username} />
                </button>
        </div>
      </div>
    </div>
  </div>
  {/* Mobile menu, show/hide based on menu state. */}
  <div id="mobile-menu" className="hidden">
    <a href="/" className="text-gray-300 hover:text-gray-500 transition-colors block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><i className="fa-solid fa-house mr-1" /> Home</a>
    <a href="/tribe-manager" className="text-gray-300 hover:text-gray-500 transition-colors block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><i className="fa-solid fa-users mr-1" /> Tribe Manager</a>
    <a href="/performance" className="text-gray-300 hover:text-gray-500 transition-colors block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><i className="fa-solid fa-chart-area mr-1" /> Performance</a>
    <a href="/rankings" className="text-gray-300 hover:text-gray-500 transition-colors block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><i className="fa-solid fa-trophy mr-1" /> Rankings</a>
    <a href="/portal" className="text-gray-300 hover:text-gray-500 transition-colors block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><i className="fa-solid fa-cube mr-1" /> Portal</a>
  </div>
</nav>

    </>
  );
}

export default Navbar;
