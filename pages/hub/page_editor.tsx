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

    const { data, error }: any = useSWR(`/api/hub/page_editor?id=${selectedPageID}`, fetcher)

    useEffect(() => {
        if (data?.selected_page != undefined && data?.selected_page?.title != undefined) {
            console.log(data?.selected_page);
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
    }, [])

    const handleSave = useCallback(async ({ id, strId, title, pageIcon, pageContent }: any) => {
        // Remove Selected Page
        setIsEditing(false);
        setSelectedPage({});
        setSelectedPageID({});

        // Reset Status
        setSuccessStatus(null);

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
                page_content: pageContent
            })
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);
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
                    <h1 className="text-white text-2xl font-bold mb-4">Available Pages</h1>
                    {sendingData && <p className="flex items-center my-5 text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Saving Changes...</p>}
                    {successStatus == false &&
                        <p className="my-5 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> Something went wrong, try again later!</p>
                    }
                    {successStatus == true &&
                        <p className="my-5 text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i> Changes saved succesfully!</p>
                    }
                    <div className="flex flex-col space-y-3">
                        {data?.all_pages?.map((page_link: any) => (
                            <div key={page_link?._id} onClick={() => handleSelectPage(page_link?._id)} className="bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <i className={page_link?.page_icon + " m-1 my-auto text-xl text-gray-500"} />
                                <span className="ml-2 text-md font-bold">{page_link?.title}</span>
                            </div>
                        ))}
                    </div>
                </div>}

                {isEditing && <Editor page={selectedPage} handleBack={handleBack} handleSave={handleSave} />}

            </HubLayout>
        </>
    )
}

export default PageEditor