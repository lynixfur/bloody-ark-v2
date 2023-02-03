import Head from "next/head";
import axios from "axios";
import Layout from "../../components/HubLayout";
import useUser from "../../lib/hooks/useUser";
import useSWR from 'swr'

let fetcher = async () => {
  const response = await fetch(`/api/hub/performance`);
  const data = await response.json()
  return data
}

export default function Performance() {
  /* User */
  const { user } = useUser();

  /* Fetch Data */
  const { data, error } = useSWR('find', fetcher)

  if (error) return <Layout><div className="p-5 text-xl text-white">An error occured while loading data!</div></Layout>
  if (!data) return <Layout><div className="p-5 text-xl text-white">Loading...</div></Layout>


  return (
    user && (
      <>
        <Head>
          <title>Bloody ARK Hub</title>
        </Head>
        <Layout>
          <div>
            <div className="p-4 bg-white dark:bg-bgray-secondary dark:border-gray-700 items-center justify-between border-b border-gray-200 flex">
              <div className="mb-1 w-full">
                <div className="mb-4">
                  <nav className="mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                      <li className="inline-flex items-center dark:text-gray-300">
                        <a
                          href="#"
                          className="dark:text-gray-100 text-gray-700 hover:text-gray-900 inline-flex items-center"
                        >
                          <svg
                            className="w-5 h-5 mr-2.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          Home
                        </a>
                      </li>
                      <li>
                        <div className="flex items-center dark:text-gray-300">
                          <svg
                            className="w-6 h-6 text-gray-40"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className="text-gray-400 dark:text-gray-400 ml-1 md:ml-2 font-medium"
                            aria-current="page"
                          >
                            Performance
                          </span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                    Your Performance
                  </h1>
                </div>
              </div>
            </div>
            <div className="pb-12 px-5 sm:px-16">
              {data ? (
                <>
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                  {data?.daily_performance ? (
                    <div>
                      <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                        Today&apos;s Performance
                      </p>
                      <div className="mb-10">
                        <div className="overflow-x-auto">
                          <table
                            className="w-full whitespace-nowrap"
                            v-if="$page.props.stats != null"
                          >
                            <tbody>

                            <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    PVP Damage
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_score_data?.value ? data?.daily_score_data?.value : 0}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Play Time
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                      {data?.daily_performance?.PlayTime ? (parseInt(data?.daily_performance?.PlayTime) / 60).toFixed(2) : 0} hrs
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Player Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.PlayerKills ? data?.daily_performance?.PlayerKills : 0}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                     Dino Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.DinoKills ? data?.daily_performance?.DinoKills : 0}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Wild Dino Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.WildDinoKills}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Dinos Tamed
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.DinosTamed}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Player
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.DeathByPlayer}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Dino
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.DeathByDino}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Wild Dino
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.daily_performance?.DeathByWildDino}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                  ) : (
                    <div>
                      <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                        Today&apos;s Performance
                      </p>
                      <div
                        className="text-gray-100 px-4 py-3  mt-10"
                        role="alert"
                      >
                        <div>
                          <div className="my-auto flex justify-center mb-5">
                            <i className="fa-solid fa-hard-drive text-5xl text-bred-2" />
                          </div>
                          <div>
                            <p className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100">
                              Daily Stats not available!
                            </p>
                            <p className="text-lg text-gray-400 mt-2 text-center">
                              You havent played on the server today. Let&apos;s hop
                              on before we get raided, survivor!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.performance ? (
                    <div>
                      <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                        Season Performance
                      </p>
                      <div>
                        <div className="overflow-x-auto">
                          <table
                            className="w-full whitespace-nowrap"
                            v-if="$page.props.stats != null"
                          >
                            <tbody>

                            <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    PVP Damage
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.score_data?.value ? data?.score_data?.value : 0}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Play Time
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                      {data?.performance?.PlayTime ? (parseInt(data?.performance?.PlayTime) / 60).toFixed(2) : 0} hrs
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Player Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.PlayerKills}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                     Dino Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.DinoKills}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Wild Dino Kills
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.WildDinoKills}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                      Dinos Tamed
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.DinosTamed}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Player
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.DeathByPlayer}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Dino
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.DeathByDino}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                              <tr className="focus:outline-none h-16 border-t border-b-[7px] border-gray-200 bg-white dark:border-bgray-bg dark:bg-bgray-secondary">
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base leading-none text-gray-700 dark:text-gray-400 mr-2 font-bold">
                                    Death By Wild Dino
                                    </p>
                                  </div>
                                </td>
                                <td className="pl-5">
                                  <div className="flex items-center">
                                    <p className="text-sm leading-none text-gray-700 dark:text-gray-400 ml-2">
                                    {data?.performance?.DeathByWildDino}
                                    </p>
                                  </div>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                  ) : (
                    <div>
                      <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                        Season Performance
                      </p>
                      <div
                        className="text-gray-100 px-4 py-3  mt-10"
                        role="alert"
                      >
                        <div>
                          <div className="my-auto flex justify-center mb-5">
                            <i className="fa-solid fa-hard-drive text-5xl text-bred-2" />
                          </div>
                          <div>
                            <p className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100">
                              Stats not available!
                            </p>
                            <p className="text-lg text-gray-400 mt-2 text-center">
                              You havent played on server yet. Let&apos;s hop on and
                              have some fun, survivor!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                </>
              ) : (
                <div className="text-gray-100 px-4 py-3  mt-10" role="alert">
                  <div>
                    <div className="my-auto flex justify-center mb-5">
                      <i className="fa-solid fa-triangle-exclamation text-5xl text-bred-2" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100">
                        Something went wrong!
                      </p>
                      <p className="text-lg text-gray-400 mt-2 text-center">
                        {"{"}!! $error_message !!{"}"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </>
    )
  );
}
