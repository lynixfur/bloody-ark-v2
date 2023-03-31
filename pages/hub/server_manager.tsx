import HubLayout from "@/components/HubLayout"
import ServerEditor from "@/components/Editors/ServerEditor";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'
import { useRouter } from 'next/router'
import cluster from "cluster";

function PageEditor() {

    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedServer, setSelectedServer] = useState({});
    const [servers, setServers] = useState([]);
    const [creatingServer, setCreatingServer] = useState(false);

    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus]: any = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const [deleteServer, setDeleteServer]: any = useState({});

    const { data, error }: any = useSWR(`/api/servers`, fetcher)

    useEffect(() => {
        console.log(data);
        setServers(data);
    }, [data]);

    const handleSelectPage = useCallback(async (id: string) => {
        setIsEditing(true);
        setCreatingServer(false);
        // Find Server by ID
        const server = servers?.find((server: any) => server._id == id);
        console.log(server)
        console.log(id)

        // Set Selected Server
        setSelectedServer(server ? server : {});
    }, [servers])

    const handleBack = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(false);
        setCreatingServer(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');
    }, [])

    const handleSave = useCallback(async (id: any,
        name: string,
        connection_url: string,
        arkservers_api_key: string,
        server_icon: string,
        server_bg: string,
        cluster_id: string,
        cluster_name: string,
        visible: boolean,
        ) => {
        // Remove Selected Page
        setIsEditing(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);
        console.log("Sending Data" + cluster_id)
        const res = await fetch('/api/hub/update_server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                connection_url: connection_url,
                arkservers_api_key: arkservers_api_key,
                server_icon: server_icon,
                server_bg: server_bg,
                cluster_name: cluster_name,
                cluster_id: cluster_id,
                visible: visible,
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

    const handleCreate = useCallback(async (
        name: string,
        connection_url: string,
        arkservers_api_key: string,
        server_icon: string,
        server_bg: string,
        cluster_id: string,
        cluster_name: string,
        visible: boolean,
        ) => {
        // Remove Selected Page
        setIsEditing(false);
        setCreatingServer(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        if(name == ""
            || connection_url == ""
            || arkservers_api_key == ""
            || server_icon == "" 
            || server_bg == ""
            || cluster_id == ""
            || visible == null
        ) {
            setSuccessStatus(false);
            setStatusMsg('You are missing some required fields to create the server!');
            return;
        }

        // Send Data to Server
        setSendingData(true);
        console.log("Sending Data" + cluster_id)
        const res = await fetch('/api/hub/create_server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                connection_url: connection_url,
                arkservers_api_key: arkservers_api_key,
                server_icon: server_icon,
                server_bg: server_bg,
                cluster_name: cluster_name,
                cluster_id: cluster_id,
                visible: visible,
            })
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);

            if(json.success) {
                // Force reload page as the metadata has changed
                router.reload();
            }

            if(json.message) {
                setStatusMsg(json.message);
            }
        }


    }, [])

    const handleDelete = useCallback(async (id: string) => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedServer({});
        setDeleteServer({});

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);
        const res = await fetch('/api/hub/delete_server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);

            if(json.success) {
                // Force reload page as the metadata has changed
                router.reload();
            }

            if (json.message) {
                setStatusMsg(json.message);
            }
        }
    }, [])

    const handleCreateServer = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(true);
        setSelectedServer({});
        setCreatingServer(true);
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
                        <button type="button" onClick={() => { handleCreateServer() }} className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-solid fa-server"></i> Create Server</button>
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
                    <div className="flex flex-col space-y-3">
                        {data?.map((server: any) => (
                            <div key={server?._id} className="w-full bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <div className="w-full grid grid-cols-4">
                                    <span onClick={() => handleSelectPage(server?._id)}  className="ml-2 text-md font-bold flex-1"> <i className="fas fa-server m-1 my-auto text-xl text-gray-500"></i> {server?.name}
                                        {server?.visible == true && <i className="text-gray-500 ml-2 fa-solid fa-eye"></i>}
                                        {server?.visible == false && <i className="text-red-500 ml-2 fa-solid fa-eye-slash"></i>}
                                    </span>
                                    <span className="ml-2 text-md flex-1 text-gray-500">{server?.connection_url?.replace("steam://connect/","")} 
                                    
                                        {server?.is_online == true && <i className="ml-2 text-green-500 fa-solid fa-circle animate-pulse"></i>}
                                        {server?.is_online == false && <i className="ml-2  text-red-500 fa-solid fa-circle animate-pulse"></i>}
                                    
                                    </span>
                                    {server?.cluster?.id == null &&
                                        <div className="flex justify-center"><span className="ml-5 bg-red-900 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">No Cluster Assigned</span></div>
                                    }
                                    {server?.cluster?.id != null &&
                                        <div className="flex justify-center"><p className="ml-5 bg-blue-900 text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{server?.cluster?.id}</p></div>
                                    }
                                    <div onClick={() => setDeleteServer(server)}  className="flex justify-center"><span className="text-red-500 ml-5"><i className="fa-regular fa-trash-can"></i></span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

                {deleteServer?._id && sendingData == false &&
                    <div id="popup-modal" tabIndex={-1} className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-gray-800 bg-opacity-70">
                        <div className="relative w-full h-full max-w-md md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <button type="button" onClick={() => setDeleteServer({})} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="animate-pulse mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this server?<br/> <strong>{deleteServer?.name}</strong></h3>
                                    <button onClick={() => {handleDelete(deleteServer._id)}} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I&apos;m sure
                                    </button>
                                    <button onClick={() => setDeleteServer({})} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div> 
                            </div>
                        </div>
                    </div>
                }

                {isEditing && <ServerEditor server={selectedServer} isCreating={creatingServer} handleCreate={handleCreate} handleBack={handleBack} handleSave={handleSave} />}

            </HubLayout>
        </>
    )
}

export default PageEditor