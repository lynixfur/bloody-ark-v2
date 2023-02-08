import HubLayout from "@/components/HubLayout"
import Editor from "@/components/PageEditor/Editor";
import TribePlayer from "@/components/TribePlayer";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'

function Logs() {

    /* Search Box Players */
    const [search, setSearch] = useState('');
    const [debounceSearch, setdebounceSearch] = useState('');
    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setSearch(value);
    }, []);

    /* Search Box */
    const [searchTribe, setSearchTribe] = useState('');
    const [debounceSearchTribe, setdebounceSearchTribe] = useState('');
    const handleOnChangeTribe = useCallback(({ target: { value } }: any) => {
        setSearchTribe(value);
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setdebounceSearch(search);
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [search]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setdebounceSearchTribe(searchTribe)
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTribe]);

    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/player_search?search=${debounceSearch}`, fetcher)
    const tribe_data: any = useSWR(`/api/v2/tribe_search?search=${debounceSearchTribe}`, fetcher)

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
                                                    <span><i className="fa-solid fa-magnifying-glass mr-4" />Player Search</span>
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
                    <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-900 dark:text-gray-200">
                        Search for a Player
                    </h1>

                    <div className="my-2 flex space-x-4 items-center justify-center mt-5">
                        <input
                            value={search}
                            onChange={handleOnChange}
                            placeholder="Search for Players" name="tribe_search" id="tribe_search" className="px-3 py-2 text-gray-300 bg-bgray-overlay w-1/2 border-gray-700 border rounded-full" />

                    </div>
                    {data?.player_data &&
                        <div className="flex justify-center">
                            <div className="w-1/2">
                                <div className="bg-bgray-secondary border border-gray-700 rounded-2xl w-full">
                                    <div className="flex space-x-4 p-3">
                                        {data?.user_cache?.avatar_url?.large && <img className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover" src={data?.user_cache?.avatar_url?.large} alt="Lynix" />}
                                        <div className=" py-4">
                                            <h1 className="text-white text-4xl">{data?.player_data?.playername}</h1>
                                            <p className="text-gray-400 pt-2">SteamID : {data?.player_data?.steamid}</p>
                                            <p className="text-gray-400 pt-1">PlayerID : {data?.player_data?.playerid}</p>
                                        </div>
                                    </div>
                                </div>
                                {data?.tribe_data?.TribeID && <><h1 className="text-white text-3xl font-semibold mt-3">Tribe Information</h1>
                                    <div className="bg-bgray-secondary border border-gray-700 rounded-2xl w-full mt-3 p-3">
                                        <h1 className="text-white text-2xl">{data?.tribe_data?.TribeName}</h1>
                                        <p className="text-gray-400 text-xl">Tribe ID : {data?.tribe_data?.TribeID}</p>
                                        <p className="text-gray-400 text-xl">Tribe Owner SteamID : {data?.tribe_data?.OwnerSteamID} ({data?.tribe_data?.OwnerName})</p>
                                    </div>
                                    <table className="w-full whitespace-nowrap mt-3">
                                        <tbody>
                                            <tr
                                                tabIndex={0}
                                                className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-overlay"
                                            >
                                                <td>
                                                    <div className="flex items-center pl-5">
                                                        <p className="text-base leading-none text-gray-50 font-bold mr-2">
                                                            Player Name
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex items-center">
                                                        <p className="leading-none text-gray-50 ml-2  font-bold">
                                                            Group
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex items-center">
                                                        <p className="leading-none text-gray-50 ml-2  font-bold">
                                                            SteamID
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            {data?.tribe_data?.Members?.map((member: any) => {
                                                return (
                                                    <TribePlayer key={member} member={member} show_steam_id={true} no_quick_actions={true} />
                                                )
                                            })}
                                        </tbody>
                                    </table></>}
                            </div>
                        </div>
                    }

                    {!data?.player_data && search && <p className="text-center text-gray-400">No players Found<br />This player might have never joined the Server.</p>}


                    <h1 className="mt-5 text-xl sm:text-2xl font-semibold text-center text-gray-900 dark:text-gray-200">
                        Search for a Tribe
                    </h1>
                    <div className="my-2 flex space-x-4 items-center justify-center mt-5">
                        <input
                            value={searchTribe}
                            onChange={handleOnChangeTribe}
                            placeholder="Search for Tribes" name="tribe_search" id="tribe_search" className="px-3 py-2 text-gray-300 bg-bgray-overlay w-1/2 border-gray-700 border rounded-full" />

                    </div>
<div className="flex justify-center">
<div className="w-1/2">
                    {tribe_data?.data?.tribe_data?.TribeID && <><h1 className="text-white text-3xl font-semibold mt-3">Tribe Information</h1>
                        <div className="bg-bgray-secondary border border-gray-700 rounded-2xl w-full mt-3 p-3">
                            <h1 className="text-white text-2xl">{tribe_data?.data?.tribe_data?.TribeName}</h1>
                            <p className="text-gray-400 text-xl">Tribe ID : {tribe_data?.data?.tribe_data?.TribeID}</p>
                            <p className="text-gray-400 text-xl">Tribe Owner SteamID : {tribe_data?.data?.tribe_data?.OwnerSteamID} ({data?.tribe_data?.OwnerName})</p>
                        </div>
                        <table className="w-full whitespace-nowrap mt-3">
                            <tbody>
                                <tr
                                    tabIndex={0}
                                    className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-overlay"
                                >
                                    <td>
                                        <div className="flex items-center pl-5">
                                            <p className="text-base leading-none text-gray-50 font-bold mr-2">
                                                Player Name
                                            </p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">
                                            <p className="leading-none text-gray-50 ml-2  font-bold">
                                                Group
                                            </p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">
                                            <p className="leading-none text-gray-50 ml-2  font-bold">
                                                SteamID
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                {tribe_data?.data?.tribe_data?.Members?.map((member: any) => {
                                    return (
                                        <TribePlayer key={member} member={member} show_steam_id={true} no_quick_actions={true} />
                                    )
                                })}
                            </tbody>
                        </table></>}
                        </div></div>
                </div>
            </HubLayout>
        </>
    )
}

export default Logs