import { useState } from "react";
import useSWR, { Key, Fetcher } from "swr";

function Navbar(props: any) {
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

  return <>Test</>;
}

export default Navbar;
