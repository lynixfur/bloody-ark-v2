import Link from "next/link";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Editor = ({ page, handleBack, handleSave }: any) => {

    const [pageContent, setPageContent] = useState(page?.content);

    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setPageContent(value);
    }, []);


    return (
        <>
            <div className="p-5">
                <div className="flex items-center mb-5"><button onClick={() => { handleBack() }} className="block py-2 pr-4 pl-3 text-black bg-white rounded-full p-4 font-bold transition-colors my-auto mr-2"><i className="fas fa-arrow-left mr-1"></i> Back</button> <h1 className="text-white text-2xl font-bold my-auto">Currently Editing - {page?.title}</h1></div>
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
                <p className="text-gray-400  font-semibold my-auto">Page ID : {page?._id} (Non Editable)</p>
                <br />
                <div className="flex items-center">
                    <p className="text-gray-400  font-semibold my-auto">Page STR ID (String ID)</p>
                    <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={page?.str_id} />
                </div>
                <div className="flex mt-3">
                    <p className="text-gray-400  font-semibold">Page Title</p>
                    <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={page?.title} />
                </div>
                <div className="flex mt-3">
                    <p className="text-gray-400  font-semibold">Page Icon</p>
                    <input className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={page?.page_icon} />
                </div>
                <div className="flex justify-center mb-3 mt-5">
                    <button onClick={() => { handleSave(page?._id, page?.str_id, page?.title, page?.page_icon, page?.page_content) }} className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-folder mr-2"></i>Save Changes</button>
                </div>
            </div>
        </>
    )
}

export default Editor