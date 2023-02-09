import HubLayout from "@/components/HubLayout"
import Editor from "@/components/PageEditor/Editor";
import TribePlayer from "@/components/TribePlayer";
import fetcher from "@/lib/fetcher";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from 'swr'

function Logs() {

    /* Get Data */
    const { data, error }: any = useSWR(`/api/v2/dino_auction`, fetcher)

    return (
        <>
            <HubLayout>
                <div className="p-5">

                    <h1 className="text-4xl text-white font-semibold mt-5">
                        Dino Auction Commands
                    </h1>
                    <br/>
                    <p className="text-gray-400">
                    {'/selldino - <hours duration> <starting bid price> <buyoutprice> bid or buyout can be 0 to disable bidding or buyout, but one must be set.'}<br/>
                    {'/dinoshop <pagenumber> - shows the available dino auctions'}<br/>
                    {'/dino <dino_id> - shows detailed information about dino with supplied id'}<br/>
                    {'/buydino <dino_id> <bid>        - places bid, will buyout if price = buyout price'}<br/>
                    {'/dino <dino_id>   and this commadn to each bid'}
                    </p>
                    <h1 className="text-4xl text-white font-semibold mt-5">
                        Current Dino Auctions
                    </h1>
                    {data?.dino_auctions.map((dino: any) => (
                        <div key={dino?.dino_name} className="mt-3 bg-bgray-secondary border border-gray-700 rounded w-full">
                            <div className="flex space-x-4 p-3">
                                <div className=" py-4">
                                    <h1 className="text-white text-2xl">{dino?.dino_name}</h1>
                                    <p className="text-white">{dino?.dino_description}</p>
                                    <p className="text-white">Sold By : {dino?.owner}</p>
                                    <br/>
                                    <p className="text-gray-400">Buy Now Price : {dino?.buy_now_price}</p>
                                    <p className="text-gray-400">Starting Price : {dino?.starting_price}</p>
                                    <p className="text-gray-400">Auction Ends : {moment(dino?.auction_end_time).format('MMMM Do YYYY, h:mm a')}</p><br/>
                                    <h1 className="text-gray-400 text-2xl">Dino ID: {dino?.id}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </HubLayout>
        </>
    )
}

export default Logs