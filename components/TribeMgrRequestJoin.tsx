import { useState } from "react";

const TribeMgrRequestJoin = ({tribeid}: any) => {
    const [sendingData, setSendingData] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    
    const handleRequest = async (tribeid: string) => {
        // Reset Message
        setSuccessStatus(null);
        setStatusMsg('');

        console.log('Requested Invite');
        setSendingData(true);

        const res = await fetch(`/api/v2/tribe_manager/request_invite?tribeid=${tribeid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await res.json()
        if (res.ok) {
            setSendingData(false);
            setSuccessStatus(json.success);
            if (json.message) {
                setStatusMsg(json.message);
            }
        }
    }

    return (
        <>
            {sendingData &&
            <p className="flex items-center my-5 text-gray-400 font-semibold ml-1"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> Requesting Invite...</p>
            }
            {successStatus == false &&
                <p className="py-3 text-red-600 font-semibold"><i className="fa-solid fa-triangle-exclamation mr-1"></i> {statusMsg ? statusMsg : 'Something went wrong, try again later!'}</p>
            }
            {successStatus == true &&
                <p className="py-3 text-green-600 font-semibold"><i className="fa-solid fa-check mr-1"></i> Tribe Request Sent!</p>
            }

            <div onClick={() => {handleRequest(tribeid)}} className="cursor-pointer inline-flex bg-bred-2 rounded-full py-1 px-4 items-center text-base font-bold text-gray-100 dark:text-white">
                Request to Join
            </div>
        </>
    )
}

export default TribeMgrRequestJoin