import { useEffect, useRef, useState } from "react"
import { Transition } from '@headlessui/react'

const FilterDropdown = ({ dropdownTitle, dropdownItems, callback, isClusterDropdown }: any) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);

    // Allow for outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (container.current && !container.current.contains(event.target as Node)) {
                if (!isOpen) return;
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [isOpen, container]);

    // Allow to use the `esc` key
    useEffect(() => {
        function handleEscape(event: any) {
            if (!isOpen) return;

            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [isOpen]);

    const selectItem = (item: string, name: string) => {
        callback(item, name);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button onClick={() => setIsOpen((v) => !v)} className="px-3 py-2 text-white bg-bgray-overlay font-bold rounded-full">
                {dropdownTitle} <i className={isOpen ? `ml-1 fa-solid fa-angle-up` : `ml-1 fa-solid fa-angle-down`} />
            </button>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-75"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="absolute left-0 w-56 mt-2 origin-top-left rounded-md shadow-lg z-10"
            >
                <div className="ring-1 ring-black ring-opacity-5 bg-bgray-forward shadow">
                    {dropdownItems?.map((item: any) => (
                        <>
                            {!isClusterDropdown &&
                                <button key={item} onClick={() => { selectItem(item, item) }} className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-secondary focus:outline-none focus:bg-bgray-secondary transition duration-150 ease-in-out">{item}</button>
                            }
                            {isClusterDropdown &&
                                <button key={item.str_id} onClick={() => { selectItem(item.str_id, item.cluster_name) }} className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-bgray-secondary focus:outline-none focus:bg-bgray-secondary transition duration-150 ease-in-out">{item.cluster_name}</button>
                            }
                        </>
                    ))}
                </div>
            </Transition>
        </div>
    )
}

export default FilterDropdown