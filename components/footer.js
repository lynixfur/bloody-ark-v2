import useSWR, { Key, Fetcher } from "swr";

export default function Footer() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/highpop_servers", fetcher);

  return (
    <footer className="text-gray-600 body-font bg-bgray-secondary">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <a href="https://nitra.do/BloodyARK">
              <nav className="list-none mb-5 flex justify-center sm:justify-left sm:block">
              <img
                    alt="Bloody ARK Logo"
                    src="https://bloody-ark.com/images/favicon.png"
                    className="h-32 w-32"
                  />
              </nav>
            </a>
          </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">
              POPULAR SERVERS
            </h2>
            {data &&<nav className="list-none mb-10">
              <li>
                <a className="text-white hover:text-red-300" href="/servers">
                  <i className="fa-solid fa-hard-drive mr-2" />
                  {data[0].name}
                </a>
              </li>
              <li>
                <a className="text-white hover:text-red-300" href="/servers">
                  <i className="fa-solid fa-hard-drive mr-2" />
                  {data[1].name}
                </a>
              </li>
            </nav>}
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">
              INFORMATION
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://shop.bloody-ark.com/terms/privacy"
                >
                  <i className="fa-solid fa-key mr-2" /> Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://shop.bloody-ark.com/terms/checkout"
                >
                  <i className="fa-solid fa-book mr-2" /> Terms of Service
                </a>
              </li>
              <li>
                <a className="text-white hover:text-red-300" href="/info/vote">
                  <i className="fa-solid fa-check-to-slot mr-2" /> Vote Rewards
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://shop.bloody-ark.com/category/1266875"
                >
                  <i className="fa-solid fa-gifts mr-2" /> Shop Daily Rewards
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">
              USEFUL LINKS
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://steamcommunity.com/groups/bloodyark"
                >
                  <i className="fa-brands fa-steam mr-2" /> Steam Community
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://ark.wiki.gg/wiki/ARK_Survival_Evolved_Wiki"
                >
                  <i className="fa-solid fa-book mr-2" /> ARK Wiki
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://survivetheark.com/index.php?/code-of-conduct/"
                >
                  <i className="fa-solid fa-crosshairs mr-2" /> ARK Terms of
                  Service
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-red-300"
                  href="https://hub.bloody-ark.com/"
                >
                  <i className="fa-solid fa-layer-group mr-2" /> Bloody Hub
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <a href="https://www.nitrado-aff.com/KBLKT9/D42TT/">
              <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">
                HOSTED BY
              </h2>
              <nav className="list-none mb-10 flex justify-center sm:justify-left sm:block">
                <img
                  alt="Nitrado Logo"
                  className="w-32"
                  src="/Nitrado_Logo_yellow_TextToTheSide_white_border.png"
                />
              </nav>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-bgray-overlay">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white text-sm text-center sm:text-left">
            Copyright © 2022 BloodyARK. All Rights Reserved.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-200">
              <i className="fa-brands fa-discord" />
            </a>
            <a className="ml-3 text-gray-200">
              <i className="fa-brands fa-steam" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
