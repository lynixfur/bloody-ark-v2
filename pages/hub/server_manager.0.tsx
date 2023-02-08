import HubLayout from "@/components/HubLayout"
import Editor from "@/components/PageEditor/Editor";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'

function PageEditor() {

    const [isEditing, setIsEditing] = useState(false);

    const { data, error }: any = useSWR(`/api/servers`, fetcher)

    const handleBack = useCallback(async () => {
        // Remove Selected Server
        setIsEditing(false);
    }, [])

    const handleSave = useCallback(async (id: any) => {
        // Remove Selected Page
        setIsEditing(false);
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
                                                    <span><i className="fa-solid fa-server mr-4" />Server Manager</span>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!isEditing && <div className="p-5">
                    <h1 className="text-white text-2xl font-bold mb-4">Server Manager</h1>
                    <div className="flex flex-col space-y-3">
                        {data?.map((server: any) => (
                            <div key={server?._id} onClick={() => console.log("")} className="bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <p><i className={"fa-solid fa-server m-1 my-auto text-xl text-gray-500"} />
                                    <span className="ml-2 text-md font-bold">{server.name} | {server?.connection_url.replace("steam://connect/", "")}</span>

                                    <span className="ml-2 text-xs font-medium mr-2 px-2.5 py-0.5 bg-green-900 text-green-300 rounded-full">
                                        Online
                                    </span>
                                </p>
                                <p className="m-1 text-gray-400"><i className="fa-solid fa-clock mr-1"></i> Playercount Update Interval : 15s</p>

                                <p className="m-1 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> You do not have permission to modify this server, PERMISSION.SYSTEM (3) is required.</p>
                                <p className="m-1 text-orange-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> Bloody Hub does not have RCON Credentials for this server.</p>
                            </div>
                        ))}
                    </div>
                </div>}

                {isEditing && <></>}

            </HubLayout>
        </>
    )
}

export default PageEditor