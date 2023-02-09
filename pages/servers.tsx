import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import HomeHeader from "../components/headers/homeHeader";
import ServerCard from "../components/ServerCard";
import Footer from "../components/footer";
import { env } from "process";
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

function ServerList({ servers, highpop_servers }: any) {
  return (
    <>
      <Head>
        <title>Bloody ARK - Servers</title>
        <meta name="description" content="Find all of our ARK: Survival Evolved Servers here!"/>
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die"/>
      </Head>
      
      <Navbar darken={true}/>

      <div className="pt-[72px] w-full">
  <div className="h-full w-full" style={{background: 'url(https://cdn.discordapp.com/attachments/885607142051184700/987533632107327538/unknown.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
    <div className="w-full h-full bg-bgray-bg bg-opacity-80">
      <div className="flex h-full px-3 py-4 sm:p-10 md:p-0">
        <div className="my-auto flex justify-center w-full">
          <div>
            <div className="container flex flex-col items-center py-12 sm:py-24">
              <div className="w-full mt-5 justify-center items-center flex-col mb-5 sm:mb-10">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center text-gray-50 font-black leading-7 md:leading-10">
                  <span><i className="fa-solid fa-hard-drive" /> <br />Server List</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="w-full space-x-6 p-10">
          <div className="px-4 py-2">
          <div className="p-4 sm:p-8">
        <h3 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white text-left "><i className="fa-solid fa-circle-question"></i> Having trouble joining?</h3>
        <p className="mb-5 text-base text-gray-600 dark:text-gray-100 sm:text-lg text-left ">We can help you! Follow this simple step-by-step guide to get started.
        </p>
        <p className="mb-5 text-base dark:text-gray-300 sm:text-lg text-left">
          <br />
          Step 1: Open Steam and click on view and then servers<br />
          Step 2: Click on favorites tab and then add a server<br />
          Step 3: Enter the following Server IP below then click add this address to favorites<br />
          Step 4: Start Ark Survival and click Join ARK<br />
          Step 5: Filter for favorites and ensure all other filters are reset<br />
          Step 6: The server should now visible for you!!<br />
        </p>
      </div>
      </div>
      <div className="mt-5">
            <h1 className="text-4xl px-4 py-2 text-left text-gray-50 font-black leading-7 md:leading-10 hidden">
                  <span><i className="fa-solid fa-star"/> Favorites </span>
                </h1>
                <p className="text-gray-300 px-4 py-2 mb-16 text-left hidden">You currently have no favorites</p> 
                <h1 className="text-4xl px-4 py-2 text-left text-gray-50 font-black leading-7 md:leading-10">
                  <span><i className="fa-solid fa-chart-area"></i> Most Popular </span>
                </h1>
                <div className="grid mt-8  gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mb-5">
                        <ServerCard server={highpop_servers[0]}/>
                        <ServerCard server={highpop_servers[1]}/>
                </div>
            <h1 className="text-4xl px-4 py-2 text-left text-gray-50 font-black leading-7 md:leading-10">
                  <span><i className="fa-solid fa-hard-drive" /> Servers </span>
                </h1>
          <div className="grid mt-8  gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {servers.map((server: any) => (
                  <ServerCard key={server.id} server={server}/>
            ))}
          </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export async function getServerSideProps() {
  const servers_res = await fetch(
    `${env.DOMAIN}/api/servers`
  );

  const highpop_res = await fetch(
    `${env.DOMAIN}/api/highpop_servers`
  );

 var servers = await servers_res.json();
 var highpop_servers = await highpop_res.json();

  return {
    props: {
      servers,
      highpop_servers
    },
  };
}

export default ServerList;
