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
    <div className="p-5 text-white">
      <h1 className="text-4xl mb-2">Upgrade in Progress...</h1>
      <p>Sorry for the inconvenience, we're currently upgrading our backend to support more features.<br/>
      Old API Version: 2.1.X {'->'} New API Version: 3.0.1</p>
    </div>
  </>*/
}
