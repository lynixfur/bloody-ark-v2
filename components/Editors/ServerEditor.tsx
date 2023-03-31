import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'
import ServerCard from "../ServerCard";

const ServerEditor = ({ server, handleBack, handleSave, handleCreate, isCreating }: any) => {

    // Fetch Clusters
    const { data, error }: any = useSWR(`/api/clusters`, fetcher);

    const [serverInfo, setServerInfo] = useState({
        name: server?.name,
        connection_url: server?.connection_url,
        arkservers_api_key: server?.arkservers_api_key,
        server_icon: server?.server_icon,
        server_bg: server?.server_bg,
        server_cluster: server?.server_cluster,
        visible: server?.visible
    });

    const handleChangeServerInfo = (event: any) => {
        setServerInfo({ ...serverInfo, [event.target.name]: event.target.value });
    };


    return (
        <>
            <div className="p-5">
                <div className="flex items-center mb-5">
                    <button onClick={() => { handleBack() }} className="block py-2 pr-4 pl-3 text-black bg-white rounded-full p-4 font-bold transition-colors my-auto mr-2"><i className="fas fa-arrow-left mr-1"></i> Back</button> 
                    <h1 className="text-white text-2xl font-bold my-auto">Server Information - {serverInfo.name}</h1>
                </div>
                

                <br />
                <div className="space-y-3">
                    <div className="grid grid-cols-3 items-center">
                        <p className="text-gray-400  font-semibold my-auto">Server Name</p>
                        <input name="name" value={serverInfo.name} onChange={handleChangeServerInfo} className="col-span-2  w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" />
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <p className="text-gray-400  font-semibold my-auto">Server Connection URL (Ex: steam://connect/server.com:27015)</p>
                        <input name="connection_url" value={serverInfo.connection_url} onChange={handleChangeServerInfo} className="col-span-2  w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" />
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <p className="text-gray-400  font-semibold my-auto">ARK Server API Key</p>
                        <input name="arkservers_api_key" value={serverInfo.arkservers_api_key} onChange={handleChangeServerInfo} className="col-span-2  w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" />
                    </div>
                    <div className="grid grid-cols-3">
                        <p className="text-gray-400  font-semibold my-auto">Server Icon</p>
                        <div className="flex">
                            <img src={serverInfo.server_icon} className="h-10 my-auto" />
                            <select name="server_icon" value={serverInfo.server_icon} onChange={handleChangeServerInfo} className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                                <option value="/icons/ark.webp">ARK (Default)</option>
                                <option value="/icons/aberration.png">Aberration</option>
                                <option value="/icons/extinction.webp">Extinction</option>
                                <option value="/icons/crystal.png">Crystal Isles</option>
                                <option value="/icons/gen1.webp">Genesis 1</option>
                                <option value="/icons/gen2.png">Genesis 2</option>
                                <option value="/icons/lostisland.webp">Lost Island</option>
                                <option value="/icons/valguero.webp">Valguero</option>
                                <option value="/icons/thecenter.png">The Center</option>
                                <option value="/icons/ragnarok.webp">Ragnarok</option>
                                <option value="/icons/scorchedearth.png">Scorched Earth</option>
                                <option value="/icons/theisland.webp">The Island</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <p className="text-gray-400  font-semibold my-auto">Background URL</p>
                        <input name="server_bg" value={serverInfo.server_bg} className="col-span-2  w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" />
                    </div>
                    <div className="grid grid-cols-3">
                        <p className="text-gray-400  font-semibold my-auto">Server Visible</p>
                        <div className="flex">
                            <select name="server_joining" id="" className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <p className="text-gray-400  font-semibold my-auto">Parent Cluster</p>
                        <div className="flex">
                            <select name="server_joining" id="" className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                                {data?.map( (key: any) => 
                                        <option key={key.id} value={key.str_id}>{key.cluster_name}</option> )
                                }
                            </select>
                        </div>
                    </div><br/><br/>
                    <p className="text-gray-400 font-semibold"><i className="fa-solid fa-server mr-2"></i> Preview</p>
                    <div className="w-1/2 border border-gray-500 rounded-3xl"><ServerCard server={serverInfo} siteSettings={{wipe_banner:true}}/></div><br/>

                </div>
            </div>
        </>
    )
}

export default ServerEditor