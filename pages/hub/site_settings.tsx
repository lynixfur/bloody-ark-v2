import HubLayout from "@/components/HubLayout"
import Editor from "@/components/Editors/Editor";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'
import { useRouter } from 'next/router'

function PageEditor() {

    const router = useRouter();

    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const { data, error }: any = useSWR(`/api/site_settings`, fetcher)

    useEffect(() => {
        setSettings({
            id: data?._id?.toString(),
            header_bg: data?.header_bg,
            section_bg: data?.section_bg,
            server_joining: data?.server_joining,
            wipe_banner: data?.wipe_banner,
            season_number: data?.season_number,
        });
    }, [data]);

    const [settings, setSettings] = useState({
        id: "",
        header_bg: "",
        section_bg: "",
        server_joining: false,
        wipe_banner: false,
        season_number: 0,
    });

    const parseBoolean = (value: any) => {
        if(value === 'true') {
            return true;
        } else {
            return false;
        }
    }

    const handleChangeSettings = (event: any) => {
        if(event.target.name === 'server_joining' || event.target.name === 'wipe_banner') {
            setSettings({ ...settings, [event.target.name]: parseBoolean(event.target.value) });
        } else {
            setSettings({ ...settings, [event.target.name]: event.target.value });
        }
    };
    
    const handleSave = useCallback(async (id_set: any, header_bg: string, section_bg: string, server_joining: boolean, wipe_banner: boolean, season_number: number) => {

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);
        const res = await fetch('/api/hub/site_settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id_set,
                header_bg: header_bg,
                section_bg: section_bg,
                server_joining: server_joining,
                wipe_banner: wipe_banner,
                season_number: season_number,
            })
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);

            if(json.success) {
                // Force reload page as the metadata has changed
                //router.reload();
            }

            if (json.message) {
                setStatusMsg(json.message);
            }
        }


    }, [])

    return (
        <>
            <HubLayout>
                <div className="w-full">
                    <div className="h-full w-full" style={{ background: 'url(https://preview.redd.it/q82kow7rz7m91.jpg?auto=webp&s=552cb5a950dea21c862928a193765862fe32ae84)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="w-full h-full bg-bgray-bg bg-opacity-70">
                            <div className="flex h-full px-3 py-4 sm:p-10 md:p-0">
                                <div className="my-auto flex justify-center w-full">
                                    <div>
                                        <div className="container flex flex-col items-center py-12 sm:py-24">
                                            <div className="w-full mt-5 justify-center items-center flex-col mb-5 sm:mb-10">
                                                <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center text-gray-50 font-black leading-7 md:leading-10">
                                                    <span><i className="fa-solid fa-gear mr-4" />Site Settings</span>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex">
                        <h1 className="text-white text-2xl font-bold mb-4 flex-1">Site Settings (Global)</h1>
                    </div>
                    {sendingData && <p className="flex items-center my-5 text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Saving Changes...</p>}
                    {successStatus == false &&
                        <p className="my-5 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> {statusMsg ? statusMsg : 'Something went wrong, try again later!'}</p>
                    }
                    {successStatus == true &&
                        <p className="my-5 text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i> Changes saved succesfully!</p>
                    }
                    <div className="space-y-5">
                        <div className="grid grid-cols-3">
                        <p className="text-gray-400  font-semibold">Header Background URL</p>
                            <input name="header_bg" className="col-span-2 w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" value={settings.header_bg} onChange={handleChangeSettings}/>
                        </div>
                        <div className="grid grid-cols-3">
                        <p className="text-gray-400  font-semibold">(PvE) Header Background URL</p>
                            <input name="header_bg" className="col-span-2 w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" value={settings.header_bg} onChange={handleChangeSettings}/>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="text-gray-400  font-semibold">Season Background URL</p>
                            <input name="section_bg" className="col-span-2  w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1 px-2" value={settings.section_bg} onChange={handleChangeSettings} />
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="text-gray-400  font-semibold my-auto">Server Joining (Used for Downtime)</p>
                            <select name="server_joining" id="server_joining" value={settings.server_joining?.toString()} onChange={handleChangeSettings} className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                                <option value="true">Enabled</option>
                                <option value="false">Disabled</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                            <p className="text-gray-400  font-semibold my-auto">Season Wipe</p>
                            <select name="wipe_banner" id="wipe_banner" value={settings.wipe_banner?.toString()} onChange={handleChangeSettings} className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                                <option value="false">Disabled</option>
                                <option value="true">Enabled</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 mt-3">
                            <p className="text-gray-400  font-semibold my-auto">Current Season Number</p>
                            <input name="season_number" type="number" onChange={handleChangeSettings} className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none py-1" value={settings.season_number}/>
                        </div>
                        <button onClick={() => { 
                        handleSave(
                            settings.id,
                            settings.header_bg,
                            settings.section_bg,
                            settings.server_joining,
                            settings.wipe_banner,
                            settings.season_number
                        ) }} className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-floppy-disk mr-2"></i>Save Changes</button>
                    </div>
                </div>
            </HubLayout>
        </>
    )
}

export default PageEditor