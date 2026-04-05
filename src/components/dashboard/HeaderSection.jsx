import React from "react";
import Button from "../Button";

function HeaderSection({ username, setPopUp }) {
    return (
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-4 py-4 bg-[#111] rounded-2xl shadow-md">

            {/* Left */}
            <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold">
                    Welcome back, {username}
                </h1>
                <p className="text-sm text-slate-400">
                    Seamless Video Management, Elevated Results.
                </p>
            </div>

            {/* Right */}
            <div>
                <Button
                    className="bg-gradient-to-r from-purple-600 to-purple-400 px-5 py-2.5 rounded-xl font-semibold text-black shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
                    onClick={() =>
                        setPopUp((prev) => ({
                            ...prev,
                            uploadVideo: !prev.uploadVideo,
                        }))
                    }
                >
                    + Upload Video
                </Button>
            </div>
        </section>
    );
}

export default HeaderSection;