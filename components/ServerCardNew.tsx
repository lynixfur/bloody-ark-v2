const ServerCardNew = ({ server }: any) => {
    return (
        <>
            <div
                className="rounded-xl p-0"
                style={{
                    background:
                        `url(${server?.server_bg})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="w-full bg-bgray-secondary bg-opacity-70 rounded-xl px-5 py-3 border-bgray-border border">
                    <div className="flex">
                        <div>
                            <h1 className="text-white text-xl font-bold">{server?.name}</h1>
                            <p className="text-white">{server?.connection_url.replace("steam://connect/", "")}</p>
                        </div>
                    </div>
                    <br />
                    <p className="text-white"><i className="fa-solid fa-user"></i> <span>{server?.players} Survivors Online</span><i className="fa-solid fa-wifi text-green-600 ml-2"></i></p>
                </div>
            </div>
        </>
    )
}

export default ServerCardNew