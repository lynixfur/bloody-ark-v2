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
}
