import { Transition } from '@headlessui/react'
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { Dropdown } from "../Dropdown"
import FilterDropdown from '../dropdowns/FilterDropdown';

const TribeLeaderboard = () => {


    /* Search Box */
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

    /* Pagination */
    const [filterPage, setFilterPage] = useState(0);
    const prevPage = () => { setFilterPage(filterPage - 1) };
    const nextPage = () => { setFilterPage(filterPage + 1) };

    /* Filter */
    const [filter, setFilter] = useState('Tribe Damage');

    const handleFilter = (filter: string) => {
        console.log(filter);
        setFilter(filter);
    }

    /* Cluster Filter */
    const [clusterUrl, setClusterUrl] = useState(`/api/ark/6man/tribe_rankings`);
    const [clusterFilter, setClusterFilter] = useState({ name: "6 Man", filter: "6man" });

    const handleClusterFilter = (filter: string, name: string) => {
        setClusterFilter({ name: name, filter: filter });
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setClusterUrl(`/api/ark/${clusterFilter.filter}/tribe_rankings`)
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [clusterFilter]);


    /* Get Data */
    const { data, error }: any = useSWR(`${clusterUrl}?search=${debounceSearch}&page=${filterPage}&filter=${filter}`, fetcher)
    const { data: clusters, error: clusterError }: any = useSWR(`/api/clusters`, fetcher)

    return (<>
        <h2 className="font-extrabold text-gray-300 uppercase text-xl mt-5">
            Tribe Leaderboards
        </h2>
        {/* Filters */}
        <div className="my-2 flex space-x-4 items-center">
            <input
                value={search}
                onChange={handleOnChange}
                placeholder="Search for Tribes" name="tribe_search" id="tribe_search" className="px-3 py-2 text-gray-300 bg-bgray-overlay w-1/2 border-gray-700 border rounded-full" />
            <FilterDropdown isClusterDropdown={true} dropdownTitle={clusterFilter.name} dropdownItems={clusters?.filter((cluster: any) => cluster.cluster_type !== "pve")} callback={handleClusterFilter}/>
            <FilterDropdown dropdownTitle={`Filter by : ${filter}`} dropdownItems={["Tribe Damage", "Kills", "Deaths", "Tame Kills", "Time Played"]} callback={handleFilter}/>
        </div>

        <div className="pb-12">
            {data?.ranking_data?.length > 0 ? (
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-4">
                    <div>
                        <div className="mb-10">
                            <div className="overflow-x-auto">
                                <table
                                    className="w-full whitespace-nowrap"
                                    v-if="$page.props.stats != null"
                                >
                                    <tbody>
                                        <tr className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-overlay">
                                            <td className={search ? "hidden pl-5" : "pl-5"}>
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Rank
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Tribe Name
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Tribe Damage
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Kills
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Deaths
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        KD
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Tame Kills
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5">
                                                <div className="flex items-center">
                                                    <p className="text-base leading-none text-white font-bold uppercase">
                                                        Time Played
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        {data?.ranking_data?.map((tribe: any, rank: any) => {
                                            return (
                                                <tr key={tribe?.TribeName} className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-secondary">
                                                    <td className={search ? "hidden" : "pl-5"}>
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {((data?.pagination?.current_page) * 20) + rank + 1}
                                                            </p>

                                                            {/* Tribe Ranking Trophy */}
                                                            {data?.pagination?.current_page == 0 &&
                                                                <>
                                                                    {(() => {
                                                                        switch (rank) {
                                                                            case 0:
                                                                                return <p className="ml-1" style={{ color: '#ffd700' }}><i className="fa-solid fa-trophy"></i></p>;
                                                                            case 1:
                                                                                return <p className="ml-1" style={{ color: '#C0C0C0' }}><i className="fa-solid fa-trophy"></i></p>;
                                                                            case 2:
                                                                                return <p className="ml-1" style={{ color: '#977b29' }}><i className="fa-solid fa-trophy"></i></p>;
                                                                            default:
                                                                                return null;
                                                                        }
                                                                    })()}
                                                                </>}
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.TribeName.replace(/\b\w+(\.\w+)+/gi, '[HIDDEN]')}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.DamageScore}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.Kills}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.Deaths}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {(tribe?.Kills / tribe?.Deaths).toFixed(1)}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.DinoKills}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <div className="flex items-center">
                                                            <p className="text-base leading-none text-white font-bold">
                                                                {tribe?.PlayTime
                                                                    ? (
                                                                        parseInt(tribe?.PlayTime) / 60
                                                                    ).toFixed(2)
                                                                    : 0}{" "}
                                                                hrs
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {data?.msg ?
                        <div className="text-gray-700 px-4 py-3 mt-10" role="alert">
                            <div>
                                <div className="text-gray-700 px-4 py-3 mt-10" role="alert">
                                    <div className="">
                                        <div className="my-auto flex justify-center mb-5">
                                            <i className="fa-solid fa-exclamation-triangle text-red-600 text-5xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-2xl text-center text-red-600 uppercase font-bold">
                                                AN ERROR OCCURED
                                            </p>
                                            <p className="font-fontstars text-gray-500 text-center mt-1">We had encountered an error while loading.<br/>
                                            {data?.msg}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        : <div className="text-red-600 px-4 py-3 mt-10" role="alert">
                            <div className="my-auto flex justify-center mb-5">
                                <i className="fa-solid fa-circle-notch ext-mesa-orange text-5xl animate-spin"></i>
                            </div>
                        </div>}
                </>
            )}
            {data?.ranking_data?.length > 0 &&
                <>
                    <p className="text-gray-300">Page <strong>{data?.pagination?.current_page + 1}</strong> of <strong>{data?.pagination?.total_pages}</strong></p>
                    <div className="flex space-x-2 mt-3">
                        {data?.pagination?.current_page > 0  ?
                            <button onClick={prevPage} className="inline-flex items-center px-3 py-1 font-bold leading-6 text-md shadow rounded-full text-gray-100  bg-bgray-overlay transition ease-in-out duration-150">  <i className="fa-solid fa-arrow-left m-1 mr-2 my-auto"></i> Previous</button>
                            : <></>
                        }
                        {data?.pagination?.current_page < data?.pagination?.total_pages && data?.pagination?.current_page != data?.pagination?.total_pages ?
                            <button onClick={nextPage} className="inline-flex items-center px-3 py-1 font-bold leading-6 text-md shadow rounded-full text-gray-100 bg-bgray-overlay transition ease-in-out duration-150">  Next <i className="fa-solid fa-arrow-right m-1 ml-1 my-auto"></i></button>
                            : <></>
                        }
                    </div>
                </>}
        </div>
    </>)
}

export default TribeLeaderboard