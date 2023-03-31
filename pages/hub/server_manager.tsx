import HubLayout from "@/components/HubLayout"
import ServerEditor from "@/components/Editors/ServerEditor";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'
import { useRouter } from 'next/router'

function PageEditor() {

    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedServer, setSelectedServer] = useState({});

    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const { data, error }: any = useSWR(`/api/servers`, fetcher)

    useEffect(() => {
        if (data?.selected_page != undefined && data?.selected_page?.title != undefined) {
            setIsEditing(true);
        }
    }, [data]);

    const handleSelectPage = useCallback(async (id: string) => {
        setIsEditing(true);
        // Find Server by ID
        const server = data?.find((server: any) => server._id == id);
        console.log(server)
        console.log(id)

        // Set Selected Server
        setSelectedServer(server);
    }, [])

    const handleBack = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');
    }, [])

    const handleSave = useCallback(async (id: any, strId: any, title: any, pageIcon: any, pageContent: any, pageCluster: string) => {
        // Remove Selected Page
        setIsEditing(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);
        const res = await fetch('/api/hub/page_editor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                str_id: strId,
                title: title,
                page_icon: pageIcon,
                content: pageContent,
                cluster_parent: pageCluster
            })
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);

            // Force reload page as the metadata has changed
            router.reload();

            if(json.message) {
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
                    <div className="flex">
                        <h1 className="text-white text-2xl font-bold mb-4 flex-1">Servers</h1> 
                        <button type="button" className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-solid fa-server"></i> Create Server</button>
                    </div>
                    {true && <p className="flex items-center my-5 text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Connecting to Cluster API...</p>}
                    {successStatus == false &&
                        <p className="my-5 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> {statusMsg ? statusMsg : 'Something went wrong, try again later!'}</p>
                    }
                    {successStatus == true &&
                        <p className="my-5 text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i> Changes saved succesfully!</p>
                    }
                    <div className="flex flex-col space-y-3">
                        {data?.map((server: any) => (
                            <div key={server?._id} onClick={() => handleSelectPage(server?._id)} className="w-full bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <div className="w-full grid grid-cols-4">
                                    <span className="ml-2 text-md font-bold flex-1"> <i className="fas fa-server m-1 my-auto text-xl text-gray-500"></i> {server?.name}
                                        {server?.visible == true && <i className="text-gray-500 ml-2 fa-solid fa-eye"></i>}
                                        {server?.visible == false && <i className="text-red-500 ml-2 fa-solid fa-eye-slash"></i>}
                                    </span>
                                    <span className="ml-2 text-md flex-1 text-gray-500">{server?.connection_url.replace("steam://connect/","")} 
                                    
                                        {server?.is_online == true && <i className="ml-2 text-green-500 fa-solid fa-circle animate-pulse"></i>}
                                        {server?.is_online == false && <i className="ml-2  text-red-500 fa-solid fa-circle animate-pulse"></i>}
                                    
                                    </span>
                                    {server?.cluster == null &&
                                        <div className="flex justify-center"><span className="ml-5 bg-red-900 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">No Cluster Assigned</span></div>
                                    }
                                    {server?.cluster != null &&
                                        <div className="flex justify-center"><p className="ml-5 bg-blue-900 text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{server?.cluster?.name}</p></div>
                                    }
                                    <div className="flex justify-center"><span className="text-red-500 ml-5"><i className="fa-regular fa-trash-can"></i></span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

                {isEditing && <ServerEditor server={selectedServer} handleBack={handleBack} handleSave={handleSave} />}

            </HubLayout>
        </>
    )
}

export default PageEditor