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

    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/player_search?search=${debounceSearch}`, fetcher)


    return (
        <>
            <HubLayout>
                <div className="p-5">
                    <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-900 dark:text-gray-200">
                        Current Dino Auctions
                    </h1>
                </div>
            </HubLayout>
        </>
    )
}

export default Logs