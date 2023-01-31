import Link from "next/link"

const Error = (props: any) => {
    return (
        <>
            <div className="h-screen w-full flex justify-center items-center">

                <div className="w-full h-full md:mx-auto md:mx-0 px-6 lg:px-16 xl:px-12
      flex items-center justify-center">
                    <div className="text-gray-700 px-4 py-3 p-20" role="alert">
                        <div>
                            <div className="text-gray-700 px-4 py-3" role="alert">
                                <div className="">
                                    <div className="my-auto flex justify-center mb-5">
                                        <i className="fa-solid fa-exclamation-triangle text-red-600 text-5xl animate-pulse"></i>
                                    </div>
                                    <div>
                                        <p className="text-2xl text-center text-red-600 uppercase font-bold">
                                            AN ERROR OCCURED
                                        </p>
                                        <p className="font-fontstars text-gray-400 text-center mt-1">{props?.msg}<br/>{props?.status}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Error