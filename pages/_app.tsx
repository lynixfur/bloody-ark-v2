import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "%cStop Immediately!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
      console.log(
        "%cDO NOT PASTE ANYTHING HERE",
        "color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
      console.log("If someone told you to copy/paste something here you have an 11/10 chance you're being scammed or targetted. Pasting anything in here could give attackers access to your Steam Account & Bloody ARK Account.");
    }
  }, [])

  return <Component {...pageProps} />
  /*return <>
    <div className="flex w-full h-screen flex items-center justify-center p-5 text-white"><div><div className="flex justify-center animate-pulse mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg></div><h1 className="text-4xl font-bold text-center">Website Disabled for Security Reasons</h1><p className="text-center mt-3">Please check back later. This action was enfored by @lynixlynx (Lynix)<br />This is to protect the privacy of our players and prevent critical information being stolen.<br /><br /><br /><a href="https://discord.gg/bloody" className="text-red-600">→ Visit Bloody Discord Server (https://discord.gg/bloody) ←</a></p></div></div>

  </>*/
}
