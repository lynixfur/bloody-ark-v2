export default function HomeHeader({text, players, background, seasonWipe, seasonNumber, globalNotice}: any) {

  return (<>
    <div
      className="h-full"
      style={{
        background: "url(" + background + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full bg-bgray-bg bg-opacity-60">
        <div className="flex h-full px-3 py-4 sm:p-10 md:p-0">
          <div className="my-auto flex justify-center w-full">
            <div>
              <div className="container flex flex-col items-center py-12 sm:py-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                  <div className="flex justify-center">
                    <img alt="Bloody ARK Logo" className="h-64" src="https://cdn.discordapp.com/attachments/885607142051184700/987537510345359380/unknown.png" />
                  </div>
                  <p className="mt-5 sm:mt-5 lg:w-10/12 text-gray-300 font-semibold text-center text-md sm:text-lg">
                    {text}
                  </p>
                </div>
                <div className="flex justify-center items-center space-x-3">
                  <span className="relative inline-flex hidden">
                    <a
                      href="https://hub.bloody-ark.com"
                      className="inline-flex items-center  px-4 py-2 font-bold leading-6 text-md shadow rounded-full text-gray-100 bg-bred-2 transition ease-in-out duration-150"
                    >
                      {" "}
                      <i className="fa-solid fa-cube m-1 mr-2 my-auto text-xl text-gray-100" />{" "}
                      Access Hub
                    </a>
                  </span>
                  <button className="mb-2 md:mb-0 bg-bgray-secondary ring-1 ring-bgray-forward px-4 py-2 shadow-sm tracking-wider text-gray-300 rounded-full inline-flex items-center space-x-2 font-bold">
                    <div className="flex">
                      <span className="ml-1">
                        {players} Survivors
                      </span>
                      <i className="fa-solid fa-circle text-green-500 animate-pulse my-auto ml-2" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {globalNotice &&
    <div className="py-4 bg-red-600"><p className="text-base text-white font-bold text-center"><i className="fa-solid fa-triangle-exclamation"></i> {globalNotice}</p></div>}
    }
    {seasonWipe &&
    <div className="py-4 bg-red-600"><p className="text-base text-white font-bold text-center"><i className="fa-solid fa-compass fa-spin"></i> Wipe Time! We&apos;re currently preparing for the next season of Bloody ARK, Season {seasonNumber}!</p></div>}
</>
  );
}