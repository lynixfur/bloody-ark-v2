import HubSidebar from "./HubSidebar";
import { useEffect, useState } from 'react'
  

export default function Layout({ children }: any) {

  return (
    <>
      <div className="bg-bgray-bg">
      <HubSidebar/>
      <div className="ml-0 lg:ml-64 flex flex-col mt-16 sm:mt-0">
          <div className="min-h-screen">{children}</div>

          <div className="">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p className="text-gray-800 dark:text-white text-sm text-center sm:text-left font-bold">
                Copyright © 2023 BloodyARK. All Rights Reserved.
              </p>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a className="text-gray-900 dark:text-gray-200">
                  <i className="fa-brands fa-discord"></i>
                </a>
                <a className="ml-3 text-gray-900 dark:text-gray-200">
                  <i className="fa-brands fa-steam"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
