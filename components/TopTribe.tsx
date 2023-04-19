import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const TopTribe = ({clusterId}: any) => {
    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/${clusterId}/leaderboards/tribes`, fetcher)

    /* Fetch Cluster Info */
    const { data: clusterData, error: clusterError }: any = useSWR(`/api/clusters`, fetcher)
    const cluster = clusterData?.find((cluster: any) => cluster.str_id === clusterId)

    if (error) {
        return (
            <div className="p-5">
            <h1
                tabIndex={0}
                className="focus:outline-none text-2xl font-bold text-center leading-10 text-gray-300"
            >
                <span className="text-red-600">{cluster?.cluster_name}</span><br/>
                Top Season Tribes<br/><br/>
            </h1>

            <div className="text-gray-700 px-4 py-3 mt-5" role="alert">
                    <div className="my-auto flex justify-center mb-5"><i className="fa-solid fa-triangle-exclamation text-5xl text-bred-2" /></div>
                    <div>
                        <p className="font-bold text-2xl text-center dark:text-gray-100">No Data Available</p>
                        <p className="text-lg text-gray-400 mt-2 text-center">
                            Either the cluster does not exist or has been wiped.<br />
                            Please check back later.
                        </p>
                    </div>
                </div>
        </div>
        )
    }
    return (
        <div className="p-5">
            <h1
                tabIndex={0}
                className="focus:outline-none text-2xl font-bold text-center leading-10 text-gray-300"
            >
                <span className="text-red-600">{cluster?.cluster_name}</span><br/>
                Top Season Tribes<br/><br/>
            </h1>
            <div className="flex flex-col items-center justify-center space-y-7 mt-5">
                <div className={data?.ranking_data?.length > 1 ? "grid grid-cols-2" : "grid grid-cols-1"}>
                
                {data?.ranking_data?.length > 0 && <div>
                    <p className="ml-1 text-3xl" style={{ color: '#ffd700' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center font-semibold text-3xl">{data?.ranking_data[0]?.TribeName.replace(/\b\w+(\.\w+)+/gi, '[HIDDEN]')}</p>
                    <p className="text-center text-xl text-gray-400">Score : {data?.ranking_data[0]?.DamageScore}</p>
                </div>}
                {data?.ranking_data?.length > 1 && <div>
                    <p className="ml-1 text-3xl" style={{ color: '#C0C0C0' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center font-semibold text-3xl">{data?.ranking_data[1]?.TribeName.replace(/\b\w+(\.\w+)+/gi, '[HIDDEN]')}</p>
                    <p className="text-center text-xl text-gray-400">Score : {data?.ranking_data[1]?.DamageScore}</p>
                </div>}
                </div>
                {data?.ranking_data?.length > 2 && <div>
                    <p className="ml-1 text-3xl" style={{ color: '#977b29' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center font-semibold text-3xl">{data?.ranking_data[2]?.TribeName.replace(/\b\w+(\.\w+)+/gi, '[HIDDEN]')}</p>
                    <p className="text-center text-xl text-gray-400">Score : {data?.ranking_data[2]?.DamageScore}</p>
                </div>}
            </div>
        </div>
    )
}

export default TopTribe