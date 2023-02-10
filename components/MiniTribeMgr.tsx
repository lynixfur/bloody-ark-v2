import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import TribePlayer from './TribePlayer';
import moment from 'moment';

const MiniTribeMgr = () => {
    const { data, error }: any = useSWR(`/api/v2/tribe_manager`, fetcher)


    return (
        <>
            <div className="flex justify-center">
                <img className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover" src={"https://ui-avatars.com/api/?name=" + data?.tribe_data?.TribeName + "&color=9ca3af&background=272a35&size=512"} alt="Lynix" />
            </div>
            <h2 className="text-gray-800 dark:text-gray-50 text-3xl mt-1 font-bold text-center">{data?.tribe_data?.TribeName}</h2>
            <p
                className="text-center font-semibold text-md dark:text-gray-400 leading-tight mt-1"
            >
                Owned by {data?.tribe_data?.OwnerName}
            </p>
            <div className="flex justify-center mt-2">
                <div className="flex flex-row space-x-2 items-center">
                    <p
                        className="font-semibold text-md dark:text-gray-400 leading-tight"
                        v-if="$page.props.player_data.isInTribe"
                    >
                        {data?.tribe_data?.IsListed == 0 && <><i className="fa-solid fa-lock" /> Private</>}
                        {data?.tribe_data?.IsListed == 1 && <><i className="fa-solid fa-unlock" /> Public</>}
                    </p>
                    <div className="bg-gray-700 dark:bg-blue-200 rounded-full h-1 w-1" />
                    <p
                        className="font-semibold text-md dark:text-gray-400 leading-tight"
                        v-if="$page.props.player_data.isInTribe"
                    >
                        <i className="fa-solid fa-users" />{" "}
                        {data?.tribe_data?.Members.length} Members
                    </p>
                </div>
            </div>
            <p
                className="mt-5 text-center font-semibold text-md dark:text-gray-400 leading-tight mt-1"
            >
                Map : {data?.tribe_data?.Map}
            </p>
            <p
                className="text-center font-semibold text-md dark:text-gray-400 leading-tight mt-1"
            >
                Creation Date : {moment(data?.tribe?.tribeCreationDate).format('MMMM Do YYYY, h:mm:ss a')}
            </p>

            <p className="text-center font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                Tribe Members
            </p>
            <div className="mb-10">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                            <tr
                                tabIndex={0}
                                className="focus:outline-none h-12 border-y-[4px] border-bgray-secondary bg-bgray-bg"
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
                            </tr>
                            {data?.tribe_data?.Members?.map((member: any) => {
                                return (
                                    <TribePlayer key={member} no_quick_actions={true} member={member} bg={true} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="mt-5 mb-3 text-center font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                Currently Listed Tribes
            </p>
            <p className="text-center font-bold text-3xl text-gray-800 dark:text-gray-200">
                {data?.listed_tribes?.length}
            </p>
        </>
    )
}

export default MiniTribeMgr