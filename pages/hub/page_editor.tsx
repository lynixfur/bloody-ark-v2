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

                {isEditing && <div className="p-5">
                <div className="flex items-center mb-5"><button onClick={() => {setIsEditing(false);}}  className="block py-2 pr-4 pl-3 text-black bg-white rounded-full p-4 font-bold transition-colors my-auto mr-2"><i className="fas fa-arrow-left mr-1"></i> Back</button> <h1 className="text-white text-2xl font-bold my-auto">Currently Editing - {data?.selected_page?.title}</h1></div>
                    <div className="flex space-x-5">
                        <div className="w-1/2">
                            <p className="text-gray-400  font-semibold"><i className="fa-solid fa-pen-to-square mr-2"></i> Editor</p>
                            <textarea className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border mt-5" value={pageContent} onChange={handleOnChange} rows={50} cols={50}>

                            </textarea>
                        </div>
                        <div className="w-1/2">
                            <p className="text-gray-400 font-semibold"><i className="fa-solid fa-image mr-2"></i> Preview</p>
                            <div className="h-[1218px] overflow-scroll px-5 bg-bgray-secondary border border-bgray-border mt-5">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} className="mt-5 w-full prose prose-invert max-w-none break-words">{pageContent}</ReactMarkdown>
                            </div>
                        </div>

                    </div>
                    <h1 className="text-white text-2xl font-bold mb-4">Page Metadata</h1>
                    <p className="text-gray-400  font-semibold my-auto">Page ID : {data?.selected_page?._id} (Non Editable)</p>
                    <br/>
                    <div className="flex items-center">
                        <p className="text-gray-400  font-semibold my-auto">Page STR ID (String ID)</p>
                        <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={data?.selected_page?.str_id}/>
                    </div>
                    <div className="flex mt-3">
                        <p className="text-gray-400  font-semibold">Page Title</p>
                        <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={data?.selected_page?.title}/>
                    </div>
                    <div className="flex mt-3">
                        <p className="text-gray-400  font-semibold">Page Icon</p>
                        <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={data?.selected_page?.page_icon}/>
                    </div>
                    <div className="flex justify-center mb-3 mt-5">
                    <Link href="#" className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-folder mr-2"></i>Save Changes</Link>
                    </div>
                </div>}

            </HubLayout>
        </>
    )
}

export default PageEditor