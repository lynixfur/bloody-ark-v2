import { useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";
import Link from "next/link";

const TribeMgrPlayerFinder = () => {
    /* Search Box Players */
    const [search, setSearch] = useState('');
    const [debounceSearch, setdebounceSearch] = useState('');
    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setSearch(value);
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setdebounceSearch(search);
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [search]);

    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/player_search?search=${debounceSearch}`, fetcher)

    return (
        <>
            <div className="my-2 flex space-x-4 items-centermt-5">
                <input
                    value={search}
                    onChange={handleOnChange}
                    placeholder="Search for Players" name="tribe_search" id="tribe_search" className="px-3 py-2 text-gray-300 bg-bgray-overlay w-1/2 border-gray-700 border rounded" />

            </div>
            {data?.player_data &&
                <div className="">
                    <div className="w-1/2">
                        <div className="bg-bgray-secondary border border-gray-700 rounded w-full">
                            <div className="flex space-x-4 p-3">
                                {data?.user_cache?.avatar_url?.large && <img className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover" src={data?.user_cache?.avatar_url?.large} alt="Lynix" />}
                                <div className=" py-4">
                                    <h1 className="text-white text-4xl">{data?.player_data?.playername}</h1>
                                    {/*<p className="text-gray-400 pt-2">SteamID : {data?.player_data?.steamid}</p>
                                    <p className="text-gray-400 pt-1">PlayerID : {data?.player_data?.playerid}</p>*/}
                                    <div onClick={() => {console.log(data?.player_data?.steamid)}} className="block py-2 pr-4 pl-3 text-white bg-bred-2 rounded p-4 font-bold transition-colors mt-4 cursor-pointer"><i className="fas fa-plus mr-2"></i>Invite to Tribe </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {!data?.player_data && search && <p className="text-gray-400">No players Found<br />This player might have never joined the Server.</p>}

        </>
    )
}

export default TribeMgrPlayerFinder