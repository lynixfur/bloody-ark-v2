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

    const [isEditing, setIsEditing] = useState(false);
    const [selectedPage, setSelectedPage] = useState({});
    const [selectedPageID, setSelectedPageID] = useState({});
    const [creatingPage, setCreatingPage] = useState(false);

    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const [deletePage, setDeletePage]: any = useState({}); // Set Delete Page ID

    const { data, error }: any = useSWR(`/api/hub/page_editor?id=${selectedPageID}`, fetcher)

    useEffect(() => {
        if (data?.selected_page != undefined && data?.selected_page?.title != undefined) {
            setSelectedPage(data?.selected_page);
            setIsEditing(true);
        }
    }, [data]);

    const handleSelectPage = useCallback(async (page_id: string) => {
        setSelectedPageID(page_id);

        // Reset Create
        setCreatingPage(false);
    }, [])

    const handleBack = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Reset Create
        setCreatingPage(false);
    }, [])

    const handleCreatePage = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(true);
        setSelectedPage({});
        setSelectedPageID({});
        setCreatingPage(true);
    }, [])

    const handleCreate = useCallback(async (strId: any, title: any, pageIcon: any, pageContent: any, pageCluster: string, pageBg: string) => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});
        setCreatingPage(false);

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);

        const res = await fetch('/api/hub/page_editor/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                str_id: strId,
                title: title,
                page_icon: pageIcon,
                content: pageContent,
                cluster_parent: pageCluster,
                bg_image: pageBg
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

    const handleDelete = useCallback(async (id: string) => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});
        setDeletePage({});

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');

        // Send Data to Server
        setSendingData(true);
        const res = await fetch('/api/hub/page_editor/delete', {
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

    const handleSave = useCallback(async (id: any, strId: any, title: any, pageIcon: any, pageContent: any, pageCluster: string, pageBg: string) => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});

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
                cluster_parent: pageCluster,
                bg_image: pageBg
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
                                                    <span><i className="fa-solid fa-file mr-4" />Page Editor</span>
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
                        <h1 className="text-white text-2xl font-bold mb-4 flex-1">Available Pages</h1>
                        <button type="button" className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { handleCreatePage() }}><i className="fa-solid fa-file-circle-plus"></i> Create Page</button>
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
                        {data?.all_pages?.map((page_link: any) => (
                            <div key={page_link?._id} className="w-full bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <div className="grid grid-cols-5">
                                    <span onClick={() => handleSelectPage(page_link?._id?.toString())} className="ml-2 text-md font-bold col-span-3"><i className={page_link?.page_icon + " m-1 my-auto text-xl text-gray-500"} /> {page_link?.title}</span>
                                    <span className="ml-5 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full text-gray-500">Cluster ID : {page_link?.cluster_parent}</span>
                                    <button className="" onClick={() => { setDeletePage({id: page_link?._id?.toString(), title: page_link?.title}) }}><span className="text-red-500 ml-5"><i className="fa-regular fa-trash-can"></i></span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

                {deletePage?.id && sendingData == false &&
                    <div id="popup-modal" tabIndex={-1} className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-gray-800 bg-opacity-70">
                        <div className="relative w-full h-full max-w-md md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <button type="button" onClick={() => setDeletePage({})} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="animate-pulse mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this page?<br/> <strong>{deletePage?.title}</strong></h3>
                                    <button onClick={() => {handleDelete(deletePage?.id)}} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I&apos;m sure
                                    </button>
                                    <button onClick={() => setDeletePage({})} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div> 
                            </div>
                        </div>
                    </div>
                }

                {isEditing && <Editor page={selectedPage} isCreating={creatingPage} handleBack={handleBack} handleSave={handleSave} handleCreate={handleCreate} />}

            </HubLayout>
        </>
    )
}

export default PageEditor