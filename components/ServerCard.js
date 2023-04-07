export default function ServerCard(props) {
    return (

      <div className="bg-gray-600 shadow-md  rounded-3xl" style={{background: 'url(' + props?.server?.server_bg + ')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-bgray-bg  bg-opacity-80 shadow-md  rounded-3xl p-4">
        <div className="flex-none lg:flex">
          <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
            <img src={props?.server?.server_icon} alt={props?.server?.name} className=" w-full  object-scale-down lg:object-fit  lg:h-48 rounded-2xl" />
          </div>
          <div className="flex-auto ml-3 justify-evenly py-2">
            <div className="flex flex-wrap ">
              <h2 className="flex-auto text-lg font-medium text-gray-50">{props?.server?.name}</h2>
              <div className="w-full flex text-sm text-gray-400 font-bold mt-2">
              <span className="bg-blue-900 text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">ARK 1</span> {props?.server?.geolocation == "NA" ? "United States" : "Europe" }
              </div>
            </div>
            <p className="mt-3" />
            <div className="flex py-4  text-sm text-gray-200">
              <div className="flex-1 inline-flex items-center">
                <p className><i className="fa-solid fa-compass mr-1" />{props?.server?.connection_url?.replace("steam://connect/","")}</p>
              </div>
            </div>
            <div className="flex p-4 pb-2 border-t border-gray-700 " />
            <div className="flex space-x-2 text-sm font-medium">
              {!props?.isHubQuickCard && <div className="flex-auto flex space-x-3">
                <button className="mb-2 md:mb-0 bg-bgray-secondary ring-1 ring-bgray-forward px-4 py-2 shadow-sm tracking-wider text-gray-100 rounded-full inline-flex items-center space-x-2 ">
                  <div className="flex">
                    <span>{props?.siteSettings?.wipe_banner ? '0' : props?.server?.players} Survivors</span>
                    {props?.server?.is_online == true && props?.siteSettings?.wipe_banner == false && <i className="fa-solid fa-circle text-green-500 animate-pulse my-auto ml-2" />}
                    {props?.server?.is_online == false || props?.siteSettings?.wipe_banner && <i className="fa-solid fa-circle text-red-500 animate-pulse my-auto ml-2" />}
                    {props?.server?.is_online == false&& <i className="fa-solid fa-circle text-red-500 animate-pulse my-auto ml-2" />}
                  </div>
                </button>
              </div>}
              <a href={props?.siteSettings?.server_joining ? props?.server?.connection_url : '#DisabledJoin'} className="mb-2 md:mb-0 bg-bred-2 font-bold px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-red-700" type="button" aria-label="like">{props?.siteSettings?.server_joining ? 'Join' : 'Joining Disabled'}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    )
  }