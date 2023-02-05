import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const TopTribe = () => {
    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/leaderboards/tribes`, fetcher)

    return (
        <div className="p-5">
            <h1
                tabIndex={0}
                className="focus:outline-none text-2xl font-bold text-center leading-10 text-gray-300"
            >
                Top Season Tribes
            </h1>
            <div className="flex flex-col items-center justify-center space-y-7 mt-5">
                <div className="flex space-x-7">
                <div>
                    <p className="ml-1 text-3xl" style={{ color: '#ffd700' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center text-3xl">{data?.ranking_data[0]?.TribeName}</p>
                    <p className="text-center text-xl text-gray-400">{data?.ranking_data[0]?.DamageScore}</p>
                </div>
                <div>
                    <p className="ml-1 text-3xl" style={{ color: '#C0C0C0' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center text-3xl">{data?.ranking_data[1]?.TribeName}</p>
                    <p className="text-center text-xl text-gray-400">{data?.ranking_data[1]?.DamageScore}</p>
                </div>
                </div>
                <div>
                    <p className="ml-1 text-3xl" style={{ color: '#977b29' }}><i className="fa-solid fa-trophy"></i></p>
                    <p className="text-center text-3xl">{data?.ranking_data[2]?.TribeName}</p>
                    <p className="text-center text-xl text-gray-400">{data?.ranking_data[2]?.DamageScore}</p>
                </div>
            </div>
        </div>
    )
}

export default TopTribe