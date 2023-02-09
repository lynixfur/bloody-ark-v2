import { count } from "console";
import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

import useUser from "../lib/hooks/useUser";

function SeasonCountdown() {
    /* User */
    const { user } = useUser();

    const countDownDate = new Date("Apr 2, 2023 19:00:00 GMT+1:00").getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    const [countDownData, setCountDownData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());

            const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

            setCountDownData({
                days,
                hours,
                minutes,
                seconds,
            });

        }, 1000);

        return () => clearInterval(interval);
    }, [countDown]);

    return (
        <div className="p-5">
            <h1
                tabIndex={0}
                className="focus:outline-none text-4xl font-bold text-center hidden leading-10 text-white"
            >
                Introducing the new Tribe Manager!
            </h1>
            <p className="mt-3 text-center text-gray-400 text-xl font-bold">
                You can now manage your tribe from the comfort of your browser! Invite players, accept requests, and more!
            </p>
            <div className="flex justify-center">

                {user ? <Link
                    href="/hub/tribe_manager">
                    <div className="w-[300px] rounded-md mt-5 px-4 py-2 bg-red-700 text-white font-bold">
                        Access Tribe Manager <i className="fa fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
                    :

                    <Link
                        href="https://bloody.gg/api/auth/login">
                        <div className="w-[300px] rounded-md mt-5 px-4 py-2 bg-red-700 text-white font-bold">
                            Access Tribe Manager <i className="fa fa-solid fa-arrow-right"></i>
                        </div>
                    </Link>
                }
            </div>
            {/*<p className="text-center text-gray-400 text-xl mt-2">{moment(countDownDate).format('MMMM Do YYYY, h:mm:ss a')}</p>*/}
        </div>
    );
}

export default SeasonCountdown