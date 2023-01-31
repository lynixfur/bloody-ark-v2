const ServerCardNew = () => {
    return (
        <>
            <div
                className="rounded-xl p-0"
                style={{
                    background:
                        "url(https://cdn.discordapp.com/attachments/885607142051184700/1056018778221183066/bloodybg.jpg)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="w-full bg-bgray-secondary bg-opacity-60 rounded-xl px-5 py-3 border-bgray-border border">
                <h1 className="text-white text-xl font-bold"><i className="fa-solid fa-signal text-green-600 mr-2"></i>%ServerName%</h1>
                <p className="text-white">127.0.0.1</p>
                <br/>
                <p className="text-white"><i className="fa-solid fa-user"></i> 0 Survivors Online</p>
                </div>
            </div>
        </>
    )
}

export default ServerCardNew