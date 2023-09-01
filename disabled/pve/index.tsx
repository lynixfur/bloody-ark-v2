import Head from "next/head";
import Image from "next/image";
import NavbarPVE from "@/components/navbar_pve";
import HomeHeader from "@/components/headers/homeHeader";
import ReactMarkdown from 'react-markdown'
import Footer from "@/components/footer";
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
        <title>Bloody ARK (PvE) - Evolve or Die</title>
        <meta name="description" content="Welcome to BloodyARK, The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." />
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,PVP,PVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die" />
      </Head>

      <div className="flex flex-col h-screen">
        <NavbarPVE />
        <HomeHeader background={site_settings?.pve_header_bg} 
                    seasonNumber={site_settings?.season_number} 
                    seasonWipe={site_settings?.wipe_banner} 
                    globalNotice={site_settings?.global_notice} 
                    text="Join the Bloody ARK PvE Cluster for ARK: Survival Evolved and explore a friendly, community-driven environment with active admins, frequent events, and a welcoming player base." 
                    players={player_count.players} 
                    pve={true}/>
      </div>
      <main className="">
        <div>
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
        <div
          className="w-full bg-cover bg-left-top my-20"
          style={{
            height: "55rem",
            backgroundImage: "url(" + site_settings.pve_section_bg + ")",
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
                  href="https://discord.gg/mQKtJJK6ya"
                  className="h-[70px] w-72 relative"
                >
                  <img
                    className="object-cover shadow-xl rounded-full"
                    src="https://discordapp.com/api/guilds/972455200889667625/widget.png?style=banner2&w=1080&q=75" />
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
