import { useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";
import Link from "next/link";

const TribeMgrPlayerFinder = () => {
    /* Search Box Players */
    const [search, setSearch] = useState('');
    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const [debounceSearch, setdebounceSearch] = useState('');
    const handleOnChange = useCallback(({ target: { value } }: any) => {
        setSearch(value);
        setSendingData(false);
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setdebounceSearch(search);
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [search]);

    const handleInvite = async (steamid: string) => {
        console.log('Invited Player');
        setSendingData(true);

        const res = await fetch(`/api/v2/tribe_manager/invite?steamid=${steamid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);
            if (json.message) {
                setStatusMsg(json.message);
            }
        }
    }

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
                                {!sendingData && <>
                                    {data?.user_cache?.avatar_url?.large && <img className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover" src={data?.user_cache?.avatar_url?.large} alt="Lynix" />}
                                    <div className=" py-4">
                                        <h1 className="text-white text-4xl">{data?.player_data?.playername}</h1>
                                        {/*<p className="text-gray-400 pt-2">SteamID : {data?.player_data?.steamid}</p>
                                    <p className="text-gray-400 pt-1">PlayerID : {data?.player_data?.playerid}</p>*/}
                                        <div onClick={() => { handleInvite(data?.player_data?.steamid) }} className="block py-2 pr-4 pl-3 text-white bg-bred-2 rounded p-4 font-bold transition-colors mt-4 cursor-pointer"><i className="fas fa-plus mr-2"></i>Invite to Tribe </div>

                                    </div></>}
                                {sendingData &&

                                    <>
                                        {data?.user_cache?.avatar_url?.large && <img className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover" src={data?.user_cache?.avatar_url?.large} alt="Lynix" />}
                                        <div className=" py-4">
                                            <h1 className="text-white text-4xl">{data?.player_data?.playername}</h1>
                                            <p className="flex items-center my-5 text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> Inviting Player...</p>
                                        </div>
                                    </>

                                }
                            </div>
                            {successStatus == false &&
                                <p className="p-3 px-6 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> {statusMsg ? statusMsg : 'Something went wrong, try again later!'}</p>
                            }
                            {successStatus == true &&
                                <p className="p-3 px-6 text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i> Player Invited!</p>
                            }
                        </div>
                    </div>
                </div>
            }

            {!data?.player_data && search && <p className="text-gray-400">No players Found<br />This player might have never joined the Server.</p>}

        </>
    )
}

export default TribeMgrPlayerFinder