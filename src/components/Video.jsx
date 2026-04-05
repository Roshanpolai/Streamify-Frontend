import React from "react";

function Video({ src, poster }) {
    return (
        <div className="pt-6 pl-6">

            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-black">
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    controls
                    playsInline
                    className="w-full h-[220px] sm:h-[70vh] object-contain bg-black"
                ></video>
            </div>

        </div>
    );
}

export default Video;