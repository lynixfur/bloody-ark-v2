import HubLayout from "@/components/HubLayout"
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'

function PageEditor() {
    const [pageContent, setPageContent] = useState('');

    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setPageContent(value);
    }, []);


    /* Select Page */
    const [isEditing, setIsEditing] = useState(true);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [filterPage, setFilterPage] = useState('');

    const { data, error }: any = useSWR(`/api/hub/page_editor?id=${filterPage}`, fetcher)

    // Sending Data
    const [isSending, setIsSending] = useState(false)

    /*useEffect(() => {
        setPageContent(data?.selected_page?.content);
    }, [data?.selected_page]);*/

    const handleSelectPage = useCallback(async (page_id: string) => {
        // Set to Editor Mode
        setIsEditing(true);

        // Fetch The Data and Set it to Selected Page Data
        setFilterPage(page_id);
        setPageContent(data?.selected_page?.content);

        if (data?.selected_page) {

        } else {
            console.error("An error occured! Failed to Load Page Data.")
            setIsEditing(false);
            setErrorStatus(true);
            setErrorMsg("Page ID : " + page_id);
        }
    }, [isSending]) // update the callback if the state changes


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
                    {errorStatus && <div className="py-2 mb-4"><p className="text-base text-red-600 font-bold text-center"><i className="fa-solid fa-exclamation-triangle"></i> An error occured while loading the page content!<br/>{errorMsg}</p></div>}

                    <div className="flex flex-col space-y-3">
                        {data?.all_pages?.map((page_link: any) => (
                            <div key={page_link?._id} onClick={() => handleSelectPage(page_link?._id)} className="bg-bgray-secondary border border-bgray-border px-3 py-3 text-white hover:cursor-pointer">
                                <i className={page_link?.page_icon + " m-1 my-auto text-xl text-gray-500"} />
                                <span className="ml-2 text-md font-bold">{page_link?.title}</span>
                            </div>
                        ))}
                    </div>
                </div>}

            </HubLayout>
        </>
    )
}

export default PageEditor