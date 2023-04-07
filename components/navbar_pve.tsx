import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import useSWR, { Key, Fetcher } from "swr";
import useUser from "../lib/hooks/useUser";


function NavbarPVE(props: any) {
  /* User */
  const { user } = useUser();

  /* Mobile Menu */
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobile = () => setMobileMenu(!mobileMenu);

  /* Hub Dropdown */
  const [hubDropdown, setHubDropdown] = useState(false);
  const handleHubDropdown = () => setHubDropdown(!hubDropdown);

  /* Server Dropdown */
  const [serverDropdown, setServerDropdown] = useState(false);
  const handleServerDropdown = () => setServerDropdown(!serverDropdown);

  /* Server Dropdown */
  const [infoDropdown, setInfoDropdown] = useState(false);
  const handleInfoDropdown = () => setInfoDropdown(!infoDropdown);

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

  const { data, error }: any = useSWR(`/api/clusters`, fetcher);

  return (
    <>
      {mobileMenu ?
        <nav id="nav" className="bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-50">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/pve" className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">
              <img alt="Bloody ARK Logo" className="h-10 mr-2" src="/logo.png" />
              <p className="my-auto">BloodyARK PvE</p>
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
                  <Link href="/pve" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-home" /> Home</Link>
                </li>
                <li>
                    <Link href="/pve/info/rules" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-book" /> Info</Link>
                </li>
                <li>
                  <Link href="/pve/servers" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-server" /> Servers</Link>
                </li>
                <li>
                  <Link href="https://shop.arkclassic.com" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-shop" /> Shop</Link>
                </li>
                <li>
                  <Link href="/pve" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-comment" /> Support</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        : <>
          <nav className={navBg ? 'bg-bgray-bg border-b-2 border-gray-700 px-2 sm:px-4 py-2.5 fixed top-0 w-full z-50' : 'bg-transparent px-2 sm:px-4 py-2.5 fixed top-0 w-full z-20'}>

            <div className="container flex flex-wrap justify-between items-center mx-auto">
              <Link href="/pve" className="flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">
                <img alt="Bloody ARK Logo" className="h-10 mr-2" src="/logo.png" />
                <p className="my-auto">BloodyARK PvE</p>
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
                    <Link href="/pve" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-home" /> Home</Link>
                  </li>
                  <li>
                    <Link href="/pve/info/rules" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-book" /> Info</Link>
                  </li>
                  <li>
                    <Link href="/pve/servers" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-server" /> Servers</Link>
                  </li>
                  <li>
                    <Link href="https://shop.arkclassic.com" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-shop" /> Shop</Link>
                  </li>
                  <li>
                    <Link href="/pve" className="block py-2 pr-4 pl-3 text-white rounded hover:text-mesa-orange md:p-0 font-bold transition-colors"><i className="fa fa-solid fa-comment" /> Support</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      }
    </>
  )
}

export default NavbarPVE;
