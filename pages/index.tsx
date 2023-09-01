import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import HomeHeader from "../components/headers/homeHeader";
import ReactMarkdown from 'react-markdown'
import Footer from "../components/footer";
import { env } from "process";
import Link from "next/link";
import TopTribe from "@/components/TopTribe";
import SeasonCountdown from "@/components/SeasonCountdown";

/* Animations */
import VisibilitySensor from "react-visibility-sensor";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

const FadeInDirection = ({ delay, isVisible, children }: any) => {
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

function Home({ homepage_options, player_count, news, site_settings }: any) {
  return (
    <div className="">
      <Head>
        <title>Bloody ARK - Evolve or Die</title>
        <meta name="description" content="Welcome to BloodyARK, The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." />
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,PVP,PVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die" />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />
        <HomeHeader background={site_settings?.header_bg} seasonNumber={site_settings?.season_number} seasonWipe={site_settings?.wipe_banner} globalNotice={site_settings?.global_notice} text="The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." players={player_count.players} />
      </div>
      <main className="">
        <div>
          <div className="py-16">
            <h1
              tabIndex={0}
              className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-300 py-4 mb-10"
            >
              Seasonal Information
            </h1>
            <div className="flex justify-center text-white">
              <div className="flex w-full px-10">

                <div className="w-1/2 text-center bg-bgray-secondary">
                  <TopTribe clusterId={"6man"}/>
                </div>
                <div className="w-1/2 text-center bg-bgray-secondary">
                  <TopTribe clusterId={"3man"}/>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden bg-bgray-secondary">
            <div className="absolute z-20 flex w-full h-full">
              <div className="relative z-20 w-5/6 px-14 py-8 text-white md:py-10 md:w-1/2">
                <h2 className="text-4xl font-bold ">Meet The New Bloody Hub</h2>
                <h1 className="my-5 font-bold text-green-500 hidden"><i className="fa fa-solid fa-star text-green-500"></i> 2023 UI Update Now Available!</h1>
                <p className="text-gray-400 mt-5 w-[500px]">
                  Experienece a whole new web platform to monitor your
                  survivors, tribe and stats! Find your tames, view base stats
                  and keep track of their food status. Get notified of pending
                  imprints, the amount of fertilizer and gasoline remaining in
                  your crops and generators. This and much more is available in
                  your profile.
                </p>
                <div className="justify-center">
                  <Link
                    href="https://bloody.gg/api/auth/login">
                    <div className="w-[200px] rounded-md mt-5 px-4 py-2 bg-red-700 text-white font-bold">
                      Access Hub <i className="fa fa-solid fa-arrow-right"></i>
                    </div>
                  </Link>
                </div>

              </div>
              <div className="absolute top-0 right-0 flex w-full h-full">
                <div className="w-1/3 h-full bg-bgray-secondary"></div>
                <div className="relative w-1/3"><svg fill="currentColor" viewBox="0 0 100 100" className="absolute inset-y-0 z-20 h-full text-bgray-secondary">
                  <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
                </svg>
                  <svg fill="currentColor" viewBox="0 0 100 100" className="absolute inset-y-0 z-10 h-full ml-6 text-bgray-forward opacity-50">
                    <polygon points="0,0 100,0 50,100 0,100"></polygon>
                  </svg></div>
              </div>
            </div>
            <div className="absolute top-0 right-0 block w-9/12 h-full">
              <FadeInContainer delay={500}>
                <img alt="Bloody Hub" className="object-cover object-top min-w-full h-full" src="https://cdn.discordapp.com/attachments/885607142051184700/1070148603470938213/image.png" />
              </FadeInContainer>
            </div>

          </div>
          <div className="bg-bgray-secondary hidden">
            <FadeInContainer delay={1}><div className="lg:grid lg:grid-cols-2">
              <div className="py-24 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto">
                <h2 className="text-2xl tracking-tight font-bold text-gray-100">
                  <span className="hidden">It has finally arrived!</span>
                  <span className="block">Experience the Bloody Hub.</span>
                </h2>
                <h1 className="my-5 font-bold text-green-500"><i className="fa fa-solid fa-star text-green-500"></i> 2023 UI Update Now Available!</h1>
                <p className="text-gray-300 mt-5">
                  Experienece a whole new web platform to monitor your
                  survivors, tribe and stats! Find your tames, view base stats
                  and keep track of their food status. Get notified of pending
                  imprints, the amount of fertilizer and gasoline remaining in
                  your crops and generators. This and much more is available in
                  your profile.
                </p>
                <div className="inline-block shadow mt-5">
                  <Link
                    href="https://hub.bloody-ark.com"
                    className="rounded-full px-4 py-2 bg-red-700 text-white font-bold"
                  >
                    Access Hub
                  </Link>
                </div>
              </div>
              <div className="lg:relative lg:mt-16">
                <img
                  className="lg:absolute border-t border-l border-gray-700 lg:inset-0 h-60 w-full lg:h-full object-cover object-center lg:rounded-tl-md"
                  src="https://cdn.discordapp.com/attachments/885607142051184700/1057834163463520436/image.png"
                  alt="Bloody Hub" />
              </div>
            </div>
            </FadeInContainer>
          </div>
        </div>
        <section className="mx-5 sm:mx-16">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3 gap-y-1 my-12">
            <FadeInContainer delay={1}>
              <div className="relative bg-bgray-secondary shadow-md rounded-2xl mx-1 my-3">
                <div className="overflow-x-hidden rounded-t-2xl relative">
                  <div
                    className="h-32 rounded-t-2xl w-full object-cover bg-gray-700"
                    style={{
                      backgroundImage: "url(https://cdn.discordapp.com/attachments/885607142051184700/912515337965174804/Settings.jpg)",
                      backgroundPosition: "center",
                      backgroundSize: "Cover",
                    }} />
                </div>
                <div className="mt-2 mb-2 flex justify-between w-full">
                  <div className="p-5 w-full">
                    <Link
                      href="/info/6man/rates"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                    >
                      <i className="fa-solid fa-chart-area m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Rates
                      </span>
                    </Link>
                    <Link
                      href="/info/6man/pvp-system"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-shield m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        PVP System
                      </span>
                    </Link>
                    <Link
                      href="/info/6man/settings"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-gear m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Settings
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInContainer>
            <FadeInContainer delay={300}>
              <div className="relative bg-bgray-secondary shadow-md rounded-2xl mx-1 my-3">
                <div className="overflow-x-hidden rounded-t-2xl relative">
                  <div
                    className="h-32 rounded-t-2xl w-full object-cover bg-gray-700"
                    style={{
                      backgroundImage: "url(https://media.discordapp.net/attachments/885607142051184700/912516098962907176/rules.jpg)",
                      backgroundPosition: "center",
                      backgroundSize: "Cover",
                    }} />
                </div>
                <div className="mt-2 mb-2 flex justify-between w-full">
                  <div className="p-5 w-full">
                    <Link
                      href="https://support.survivetheark.com/hc/en-us/articles/220278968-Code-of-Conduct"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                    >
                      <i className="fa-solid fa-exclamation-triangle m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        ARK Code of Conduct
                      </span>
                    </Link>
                    <Link
                      href="/info/rules"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-book m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Bloody ARK Rules
                      </span>
                    </Link>
                    <Link
                      href="https://discord.gg/bloody"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-comment-dots m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Discord Rules
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInContainer>
            <FadeInContainer delay={600}>
              <div className="relative bg-bgray-secondary shadow-md rounded-2xl mx-1 my-3">
                <div className="overflow-x-hidden rounded-t-2xl relative">
                  <div
                    className="h-32 rounded-t-2xl w-full object-cover bg-gray-700"
                    style={{
                      backgroundImage: "url(https://media.discordapp.net/attachments/885607142051184700/912517867608629279/rewards.jpg)",
                      backgroundPosition: "center",
                      backgroundSize: "Cover",
                    }} />
                </div>
                <div className="mt-2 mb-2 flex justify-between w-full">
                  <div className="p-5 w-full">
                    <Link
                      href="/info/vote"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                    >
                      <i className="fa-solid fa-check-to-slot m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Vote Rewards
                      </span>
                    </Link>
                    <Link
                      href="https://shop.bloody.gg/category/1266875"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-clock m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Shop Daily Rewards
                      </span>
                    </Link>
                    <Link
                      href="https://bloody.gg/info/road-to-alpha"
                      className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                    >
                      <i className="fa-solid fa-compass m-1 my-auto text-xl text-gray-500" />
                      <span className="ml-2 text-md font-bold text-gray-400">
                        Quest System
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInContainer>
          </div>
        </section>
        <div
          className="w-full bg-cover bg-left-top my-20"
          style={{
            height: "55rem",
            backgroundImage: "url(" + site_settings.section_bg + ")",
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-50">
            <div className="w-full">
              <h2
                className="text-5xl font-semibold leading-tight text-gray-100 text-center"
                data-aos="zoom-in"
              >
                Join our Community
              </h2>
              <div className="flex justify-center w-full mt-5">
                <Link
                  href="https://discord.gg/bloody"
                  className="h-[70px] w-72 relative"
                >
                  <img
                    className="object-cover shadow-xl rounded-full"
                    src="https://discordapp.com/api/guilds/356693332623228928/widget.png?style=banner2&w=1080&q=75" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res_player_count = await fetch(
    `${env.DOMAIN}/api/player_count`
  );

  const site_settings = await fetch(
    `${env.DOMAIN}/api/site_settings`
  );

  const player_count = await res_player_count.json();

  const res_news = await fetch(`${env.DOMAIN}/api/news`);
  const news_data = await res_news.json();
  const data = await site_settings.json();


  return {
    props: {
      player_count,
      news: news_data,
      site_settings: data,
    },
  };
}

export default Home;
