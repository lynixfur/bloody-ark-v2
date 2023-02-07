import HubSidebar from "./HubSidebar";
import { useEffect, useState } from 'react'


export default function Layout({ children }: any) {

    return (
        <>
            <div className="bg-bgray-bg">
                <HubSidebar />
                <div className="w-full h-screen">{children}</div>
            </div>
        </>
    );
}
