import { count } from "console";
import { useEffect, useState } from "react";
import moment from "moment";

function SeasonCountdown() {
    const countDownDate = new Date("Mar 2, 2023 19:00:00 GMT+1:00").getTime();

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
                className="focus:outline-none text-2xl font-bold text-center leading-10 text-gray-300"
            >
                Season 5 Wipe Countdown
            </h1>
            <p className="text-center text-white text-3xl font-bold">{countDownData.days} Days {countDownData.hours} Hours {countDownData.minutes} Minutes {countDownData.seconds} Seconds</p>
            <p className="text-center text-gray-400 text-xl mt-2">{moment(countDownDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    );
}

export default SeasonCountdown