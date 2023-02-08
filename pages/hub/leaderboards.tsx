import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "../../components/HubLayout";

import useSWR from 'swr'
import axios from 'axios'
import fetcher from "../../lib/fetcher"
import TribeLeaderboard from "@/components/leaderboards/TribeLeaderboard";
import PlayerLeaderboard from "@/components/leaderboards/PlayerLeaderboard";

/* Animations */
import VisibilitySensor from "react-visibility-sensor";
import { useSpring, animated } from "react-spring";
const FadeInDirection = ({ delay, isVisible, children }: any) => {
  console.log(delay);
  const props_test = useSpring({
    delay: delay,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
  });
  return <animated.div style={props_test}>{children}</animated.div>;
};

export const FadeInContainer = ({ children, delay }: any) => {
  const [isVisible, setVisibility]: any = useState(false);

  const onChange = (visiblity: any) => {
    visiblity && setVisibility(visiblity);
  };

  return (
    <VisibilitySensor partialVisibility onChange={onChange}>
      <FadeInDirection isVisible={isVisible} delay={delay}>{children}</FadeInDirection>
    </VisibilitySensor>
  );
};

export default function HubDashboard() {
    /* Tabs */
    const [activeTab, setActiveTab] = useState(0);

    const changeToTribe = () => setActiveTab(0);
    const changeToPlayer = () => setActiveTab(1);

    return (
        <>
            <Head>
                <title>Bloody ARK Hub</title>
            </Head>
            <Layout>
                <div className="w-full hidden">
                    <div className="h-full w-full" style={{ background: 'url(https://preview.redd.it/q82kow7rz7m91.jpg?auto=webp&s=552cb5a950dea21c862928a193765862fe32ae84)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="w-full h-full bg-bgray-bg bg-opacity-70">
                            <div className="flex h-full px-3 py-4 sm:p-10 md:p-0">
                                <div className="my-auto flex justify-center w-full">
                                    <div>
                                        <div className="container flex flex-col items-center py-12 sm:py-24">
                                            <div className="w-full mt-5 justify-center items-center flex-col mb-5 sm:mb-10">
                                                <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center text-gray-50 font-black leading-7 md:leading-10">
                                                    <span><i className="fa-solid fa-trophy " /> <br />Leaderboards</span>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen">

                    <div className="flex space-x-1">
                        <button onClick={changeToTribe} className="bg-bgray-overlay hover:bg-bgray-secondary transition-colors w-full text-white font-bold py-2 px-5">Tribe Leaderboard</button>
                        <button onClick={changeToPlayer} className="bg-bgray-overlay hover:bg-bgray-secondary transition-colors w-full text-white font-bold py-2 px-5">Player Leaderboard</button>
                    </div>

                    <div className="p-5 sm:p-10">
                        {activeTab == 0 &&
                        <FadeInContainer delay={250}><TribeLeaderboard /></FadeInContainer> 
                        }
                        {activeTab == 1 &&
                            <FadeInContainer delay={250}><PlayerLeaderboard /></FadeInContainer>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
