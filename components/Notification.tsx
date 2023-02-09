const Notification = ({ is_invite, request_data, invite_data }: any) => {

    const handleDelete = async (is_invite: boolean, steamid: string, tribeid: string) => {
        console.log("Delete")

        const res = await fetch(`/api/v2/tribe_manager/delete_notification?is_invite=${is_invite}&steamid=${steamid}&tribeid=${tribeid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await res.json()
        if (res.ok) {
            console.log("Deleted!");
        }
    }

    if (is_invite) {
        return (
            <div className="w-full bg-bgray-secondary rounded-xl px-5 py-3 mt-2 border-bgray-border border mb-2">
                <h1 className="text-white text-xl"><i className="fa-solid fa-envelope"></i> Tribe Invite from {invite_data.tribe.tribename}</h1>
                <p className="text-gray-400">You have been invited to the tribe of{" "}
                    <strong>
                        {invite_data.tribe.tribename}
                    </strong>{" "}
                    on the map of
                    {" "}<strong>
                        {invite_data.tribe.map}
                    </strong>{" "}
                    . Please type in-game
                    {" "}<strong>
                        /tribe acceptinvite &apos;{invite_data.tribe.tribename}&apos;
                    </strong>{" "}
                    to join.</p>
                    <h1 className="mt-3 text-white"><span className="cursor-pointer font-semibold rounded-full bg-red-600 hover:bg-red-700 transition-colors py-1 px-3" onClick={() => {handleDelete(true,"",invite_data.tribeid_requester)}}><i className="fa-solid fa-trash-can"></i> Delete</span></h1>
            </div>
        )
    } else {
        return (
            <div className="w-full bg-bgray-secondary rounded-xl px-5 py-3 mt-2 border-bgray-border border mb-2">
                <h1 className="text-white text-xl"><i className="fa-solid fa-envelope"></i> Join Request by {request_data?.survivor?.playername}</h1>
                <p className="text-gray-400">A player named{" "}
                    <strong>
                        {request_data?.survivor?.playername}
                    </strong>{" "}
                    has requested to join your tribe. Please type in-game{" "}
                    <strong>
                        /tribe acceptreq &apos;{request_data?.survivor?.playername}&apos;
                    </strong>{" "}
                    to invite them.</p>
                <h1 className="mt-3 text-white"><span className="cursor-pointer font-semibold rounded-full bg-red-600 hover:bg-red-700 transition-colors py-1 px-3" onClick={() => {handleDelete(false, request_data?.survivor?.steamid, "")}}><i className="fa-solid fa-trash-can"></i>  Delete</span></h1>
            </div>
        )
    }
}

export default Notification