import useUser from "@/lib/hooks/useUser";
import Link from "next/dist/client/link";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
    /* User */
    const { user, userSettings } = useUser();

    return (
        <>
        <div id="portal">
        <div className="w-[64px] bg-bgray-secondary border-r border-bgray-border h-full fixed top-0 overflow-y-auto pb-[64px]">
                <div className="flex flex-col justify-center py-5">
                    <Link
                        href="/"
                        className="ml-2 flex text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">
                        <img
                            alt="Bloody ARK Logo"
                            className="h-10 mr-2"
                            src="/logo.png"
                        />
                    </Link>
                    <hr className="mx-2 border-bgray-border my-6" />
                    <SidebarLink name={"Home"} link={"/hub"} iconName={"fa-solid fa-home"}/>
                    <SidebarLink name={"Shop"} link={"/hub/web_shop"} iconName={"fa-solid fa-shopping-cart"}/>
                    <SidebarLink name={"Roulette"} link={"/hub/roulette"} iconName={"fa-solid fa-coins"}/>
                    <SidebarLink name={"Servers"} link={"/hub/servers"} iconName={"fa-solid fa-server"}/>
                    <SidebarLink name={"Tribe Manager"} link={"/hub/tribe_manager"} iconName={"fa-solid fa-users"}/>
                    <SidebarLink name={"Performance"} link={"#"} iconName={"fa-solid fa-chart-simple"}/>
                    <SidebarLink name={"Leaderboards"} link={"/hub/leaderboards"} iconName={"fa-solid fa-trophy"}/>
                    <SidebarLink name={"Bloody Portal"} link={"/hub/portal"} iconName={"fa-solid fa-cube"}/>
                    <hr className="mx-2 border-bgray-border my-6" />
                    <SidebarLink name={"Server Manager"} link={"/hub/server_manager"} iconName={"fa-solid fa-server"}/>
                    <SidebarLink name={"Page Editor"} link={"/hub/page_editor"} iconName={"fa-solid fa-file"}/>
                    <SidebarLink name={"Broadcaster"} link={"/hub/page_editor"} iconName={"fa-solid fa-newspaper"}/>
                    <SidebarLink name={"Site Settings"} link={"/hub/site_settings"} iconName={"fa-solid fa-gear"}/>
                </div>

                {/* User Section */}
                <div className="w-[64px] h-[64px] bg-bgray-secondary border-r border-bgray-border fixed bottom-0 left-0">
                    <div className="flex justify-center my-4">
                        <img
                            className="h-8 w-8 rounded-full border-2 border-bgray-border"
                            src={user?.avatarUrl}
                            alt={user?.username}
                        />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Sidebar