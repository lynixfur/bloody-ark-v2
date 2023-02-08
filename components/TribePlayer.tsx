

import useSWR from 'swr'
import fetcher from "@/lib/fetcher";

const TribePlayer = ({ member, no_quick_actions, show_steam_id }: any) => {
    const { data, error }: any = useSWR(`/api/v2/usercache?steam_id=${member.SteamID}`, fetcher)

    return (
        <tr
            className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-secondary"
        >
            <td>
                <div className="flex items-center pl-5">
                    <div className="flex items-center">
                        {data?.user_cache?.avatar_url?.large && <img
                            className="h-6 w-6 rounded-full mr-3 shadow-lg bg-bgray-secondary  border-0"
                            src={data.user_cache.avatar_url.large}
                            alt=""
                        />}

                        <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2">
                            {member.playername}
                        </p>
                    </div>
                </div>
            </td>
            <td className="pl-5">
                <div className="flex items-center">
                    <p className="leading-none text-gray-700 dark:text-gray-400 ml-2">
                        {member.IsAdminInTribe ? "Admin" : ""}{" "}
                        {member.IsOwnerInTribe ? "Owner" : ""}
                    </p>
                </div>
            </td>
            {show_steam_id && 
            <td className="pl-5">
                <div className="flex items-center">
                            <p className="leading-none text-gray-400 ml-2">
                                {member.SteamID}
                            </p>
                </div>
            </td>
            }
            {!no_quick_actions && <td className="pl-5">
                <div className="flex items-center">
                    {data?.profile_url &&
                        <a href={data?.profile_url}>
                            <p className="leading-none text-cyan-600 ml-2">
                                <i className="fa-solid fa-plus mr-2"></i> Add as Friend
                            </p>
                        </a>}
                    {!data?.profile_url && <p className="leading-none text-red-600 ml-2"><i className="fa-solid fa-triangle-exclamation"></i> No Quick Actions Available for Player</p>}
                </div>
            </td>}
        </tr>
    )
}

export default TribePlayer