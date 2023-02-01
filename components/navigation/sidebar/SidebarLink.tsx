import { Transition } from "@headlessui/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'

import { Portal } from "@/components/Portal"

type linkType = {
    link: string,
    name: string,
    iconName: string
}

const SidebarLink = ({ link, name, iconName }: linkType) => {
    const [tooltip, setTooltip] = useState(false);
    const [active, setActive] = useState(false);
    const [mousePos, setMousePos]: any = useState({});

    const linkRef: any = useRef();
    const router = useRouter();

    /*if (router.pathname == link) {
        useEffect(() => {
            setActive(true);
        }, [])
    }*/

    return (
        <div className="relative">
            <Link href={link} className={active ? 'flex justify-center text-gray-500 bg-bgray-bg py-3' : 'flex justify-center text-gray-500 py-3 hover:bg-bgray-bg transition-colors'} onMouseEnter={() => { setTooltip(true) }} onMouseLeave={() => { setTooltip(false) }}>
                <i className={`fa ${iconName} text-xl`} />
            </Link>
            <Portal>
                <Transition
                    show={tooltip}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={`absolute left-[70px] top-[${mousePos?.y}px] whitespace-nowrap px-3 py-2 rigin-center rounded-md shadow-lg z-30 bg-bgray-secondary border border-bgray-border text-gray-500`}>
                        <p className="font-semibold"><i className={`fa ${iconName}`} /> {name}</p>
                    </div>
                </Transition></Portal>
        </div>
    )
}

export default SidebarLink