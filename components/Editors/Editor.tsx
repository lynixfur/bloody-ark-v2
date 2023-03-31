import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'

const Editor = ({ page, handleBack, handleSave, handleCreate, isCreating }: any) => {

    const [pageContent, setPageContent] = useState(page?.content);

    const [pageMetadata, setPageMetadata] = useState({
        title: page?.title,
        str_id: page?.str_id,
        icon: page?.page_icon,
        cluster_parent: page?.cluster_parent,
        bg: page?.bg_image,
    });

    let dataPageId = page?._id;
    let dataPageContent = pageContent;

    console.log(page.cluster_parent)

    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setPageContent(value);
    }, []);

    const handleChangeMetadata = (event: any) => {
        setPageMetadata({ ...pageMetadata, [event.target.name]: event.target.value });
    };

    // Fetch Clusters
    const { data, error }: any = useSWR(`/api/clusters`, fetcher);


    return (
        <>
            <div className="p-5">
                <div className="flex items-center mb-5"><button onClick={() => { handleBack() }} className="block py-2 pr-4 pl-3 text-black bg-white rounded-full p-4 font-bold transition-colors my-auto mr-2"><i className="fas fa-arrow-left mr-1"></i> Back</button> <h1 className="text-white text-2xl font-bold my-auto">{isCreating == false ? 'Currently Editing' : 'Creating Page'} - {isCreating == false ? page?.title : pageMetadata.title}</h1></div>
                <div className="flex space-x-5">
                    <div className="w-1/2">
                        <p className="text-gray-400  font-semibold"><i className="fa-solid fa-pen-to-square mr-2"></i> Editor</p>
                        <textarea className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border mt-5" value={pageContent} onChange={handleOnChange} rows={50} cols={50}/>
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
                    <input name="str_id" className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={pageMetadata.str_id} onChange={handleChangeMetadata} required/>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-400  font-semibold my-auto my-5">Page Cluster (Which ark cluster is this apart Of)</p>
                    <select name="cluster_parent" id="cluster_parent" value={pageMetadata.cluster_parent} onChange={handleChangeMetadata} className="bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 py-1 w-1/2 my-auto focus:outline-none">
                        {data?.map( (key: any) => 
                                <option key={key.id} value={key.str_id}>{key.cluster_name}</option> )
                        }
                    </select>
                </div>
                <div className="flex mt-3">
                    <p className="text-gray-400  font-semibold">Page Title</p>
                    <input name="title" className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={pageMetadata.title} onChange={handleChangeMetadata} required/>
                </div>
                <div className="flex mt-3">
                    <p className="text-gray-400  font-semibold">Page Icon</p>
                    <input name="icon" className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={pageMetadata.icon} onChange={handleChangeMetadata} required/>
                </div>
                <div className="flex mt-3">
                    <p className="text-gray-400  font-semibold">Background URL (Header)</p>
                    <input name="bg" className="w-full bg-bgray-secondary text-gray-400 border border-bgray-border ml-3 w-1/2 my-auto focus:outline-none" value={pageMetadata.bg} onChange={handleChangeMetadata} required/>
                </div>
                <div className="flex justify-center mb-3 mt-5">
                    {isCreating == false ? (
                    <button onClick={() => { 
                        handleSave(
                            dataPageId, 
                            pageMetadata.str_id, 
                            pageMetadata.title, 
                            pageMetadata.icon, 
                            pageContent, 
                            pageMetadata.cluster_parent,
                            pageMetadata.bg
                        ) }} className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-floppy-disk mr-2"></i>Save Changes</button>
                    ) : (
                    <button onClick={() => {
                        handleCreate(
                            pageMetadata.str_id,
                            pageMetadata.title,
                            pageMetadata.icon,
                            pageContent,
                            pageMetadata.cluster_parent,
                            pageMetadata.bg
                        ) }} className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-plus mr-2"></i>Create Page</button>
                    )}
                    </div>
            </div>
        </>
    )
}

export default Editor