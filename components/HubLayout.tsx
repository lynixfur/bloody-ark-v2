import HubSidebar from "./HubSidebar";
import HubNavbar from "./HubNavbar";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="bg-bgray-bg">
      <HubNavbar/>
      <HubSidebar/>
      <div className="ml-0 lg:ml-64 flex flex-col" style={{minHeight: 'calc(100vh - 4rem)'}}>
          <div className="flex-1">{children}</div>

          <div className="bg-white dark:bg-bgray-overlay">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p className="text-gray-800 dark:text-white text-sm text-center sm:text-left">
                Copyright © 2022 BloodyARK. All Rights Reserved.
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
