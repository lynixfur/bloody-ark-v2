import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import HomeHeader from "../components/headers/homeHeader";
import ReactMarkdown from 'react-markdown'
import Footer from "../components/footer";
import { env } from "process";

function Home({ homepage_options, player_count, news }: any) {
  return (
    <div className="">
      <Head>
        <title>Bloody ARK - Evolve or Die</title>
        <meta name="description" content="Welcome to BloodyARK, The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities."/>
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,PVP,PVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die"/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />
        <HomeHeader text="The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." players={player_count.players} />
      </div>
      <main className="">
        <div>
          <div className="py-16">
            <h1
              tabIndex={0}
              className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-300 py-4 mb-10"
            >
              Announcements
            </h1>
            <div className="lg:flex items-center justify-center w-full mt-7 p-6 lg:px-[250px]">
              <div
                aria-label="card 6"
                tabIndex={0}
                className="focus:outline-none lg:w-full lg:mr-7 lg:mb-0 mb-7 bg-bgray-secondary p-6 shadow rounded-2xl"
              >
                <div className="flex items-center border-b border-gray-700 pb-6">
                  <img
                    src={news[0]?.avatar_url}
                    className="w-12 h-12 bg-gray-600 rounded-full flex flex-shrink-0 object-cover" />
                  <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-xl font-medium leading-5 text-gray-100"
                      >
                        {news[0]?.username}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="px-2 overflow-y-auto"
                  style={{ height: "200px" }}
                >
                  <div className="text-gray-100 px-4 py-3" role="alert">
                    <div className="mt-5 prose prose-invert">
                      <ReactMarkdown>
                      {news[0]?.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
              <div
                aria-label="card 6"
                tabIndex={0}
                className="focus:outline-none lg:w-full lg:mb-0 mb-7 bg-bgray-secondary p-6 shadow rounded-2xl"
              >
                <div className="flex items-center border-b border-gray-700 pb-6">
                  <img
                    src={news[1]?.avatar_url}
                    className="w-12 h-12 bg-gray-600 rounded-full flex flex-shrink-0 object-cover" />
                  <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                    <p
                        tabIndex={0}
                        className="focus:outline-none text-xl font-medium leading-5 text-gray-100"
                      >
                        {news[1]?.username}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="px-2 overflow-y-auto"
                  style={{ height: "200px" }}
                >
                  <div className="text-gray-100 px-4 py-3" role="alert">
                    <div className="mt-5 prose prose-invert">
                      <ReactMarkdown>{news[1]?.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-bgray-secondary">
            <div className="lg:grid lg:grid-cols-2">
              <div className="py-24 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto">
                <h2 className="text-2xl tracking-tight font-bold text-gray-100">
                  <span className="hidden">It has finally arrived!</span>
                  <span className="block">Experience the Bloody Hub.</span>
                </h2>
                <p className="text-gray-300 mt-5">
                  Experienece a whole new web platform to monitor your
                  survivors, tribe and stats! Find your tames, view base stats
                  and keep track of their food status. Get notified of pending
                  imprints, the amount of fertilizer and gasoline remaining in
                  your crops and generators. This and much more is available in
                  your profile.
                </p>
                <div className="inline-block shadow mt-5">
                  <a
                    href="https://hub.bloody-ark.com"
                    className="rounded-full px-4 py-2 bg-red-700 text-white font-bold"
                  >
                    Access Hub
                  </a>
                </div>
              </div>
              <div className="lg:relative lg:mt-16">
                <img
                  className="lg:absolute border-t border-l border-gray-700 lg:inset-0 h-60 w-full lg:h-full object-cover object-center lg:rounded-tl-md"
                  src="https://cdn.discordapp.com/attachments/698233082314096711/948559168862822440/unknown.png"
                  alt="Woman workcation on the beach" />
              </div>
            </div>
          </div>
        </div>
        <section className="mx-5 sm:mx-16">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3 gap-y-1 my-12">
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
                  <a
                    href="/info/rates"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                  >
                    <i className="fa-solid fa-chart-area m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Rates
                    </span>
                  </a>
                  <a
                    href="/info/pvp-system"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-shield m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      PVP System
                    </span>
                  </a>
                  <a
                    href="/info/settings"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-gear m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Settings
                    </span>
                  </a>
                </div>
              </div>
            </div>
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
                  <a
                    href="https://support.survivetheark.com/hc/en-us/articles/220278968-Code-of-Conduct"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                  >
                    <i className="fa-solid fa-exclamation-triangle m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      ARK Code of Conduct
                    </span>
                  </a>
                  <a
                    href="/info/rules"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-book m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Bloody ARK Rules
                    </span>
                  </a>
                  <a
                    href="https://discord.gg/bloody"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-comment-dots m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Discord Rules
                    </span>
                  </a>
                </div>
              </div>
            </div>
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
                  <a
                    href="/info/vote"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded text-forward hover:bg-bgray-overlay"
                  >
                    <i className="fa-solid fa-check-to-slot m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Vote Rewards
                    </span>
                  </a>
                  <a
                    href="https://shop.bloody.gg/category/1266875"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-clock m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Shop Daily Rewards
                    </span>
                  </a>
                  <a
                    href="https://bloody.gg/info/road-to-alpha"
                    className="transition-colors duration-300 flex items-center w-full py-2.5 px-3 mt-2 rounded hover:bg-bgray-overlay hover:text-gray-300"
                  >
                    <i className="fa-solid fa-compass m-1 my-auto text-xl text-gray-500" />
                    <span className="ml-2 text-md font-bold text-gray-400">
                      Quest System
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="w-full bg-cover bg-left-top my-20"
          style={{
            height: "55rem",
            backgroundImage: "url(https://bloody.gg/bloodybg.jpg)",
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
                <a
                  href="https://discord.gg/bloody"
                  className="h-[70px] w-72 relative"
                >
                  <img
                    className="object-cover shadow-xl rounded-full"
                    src="https://discordapp.com/api/guilds/356693332623228928/widget.png?style=banner2&w=1080&q=75" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export async function getServerSideProps() {
  const res_player_count = await fetch(
    `${env.DOMAIN}/api/player_count`
  );

  const player_count = await res_player_count.json();

  const res_news = await fetch(`${env.DOMAIN}/api/news`);
  const news_data = await res_news.json();

  return {
    props: {
      player_count,
      news: news_data
    },
  };
}

export default Home;
