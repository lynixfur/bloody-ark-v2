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
    const [selectedPage, setSelectedPage] = useState({});
    const [selectedPageID, setSelectedPageID] = useState({});

    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const { data, error }: any = useSWR(`/api/hub/page_editor?id=${selectedPageID}`, fetcher)

    useEffect(() => {
        if (data?.selected_page != undefined && data?.selected_page?.title != undefined) {
            setSelectedPage(data?.selected_page);
            setIsEditing(true);
        }
    }, [data]);

    const handleSelectPage = useCallback(async (page_id: string) => {
        setSelectedPageID(page_id);
    }, [])

    const handleBack = useCallback(async () => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});

        // Reset Status
        setSuccessStatus(null);
        setStatusMsg('');
    }, [])

    const handleSave = useCallback(async (id: any, strId: any, title: any, pageIcon: any, pageContent: any) => {
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
                content: pageContent
            })
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);
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
                                                    <span><i className="fa-solid fa-shield mr-4" />Logs & Security</span>
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
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                        <i className="fa-solid fa-shield"></i> Security Vurnerabilities
                    </h1>
                    <div className="my-5 mx-3">
                        <p className="text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i>You're all set, no Security Vurnerabilities were found in the Bloody Hub!</p>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                        <i className="fa-solid fa-file-lines"></i> Logs
                    </h1>
                    <div className="mx-3 my-5">
                        <p className="flex items-center text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> Loading Application Logs...</p>
                    </div>
                </div>
            </HubLayout>
        </>
    )
}

export default PageEditor