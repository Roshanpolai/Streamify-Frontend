import React from "react";
import { formatDuration, timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";

function VideoList({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    videoId,
}) {
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };

    return (
        <div
            className="w-full p-2 cursor-pointer space-y-3"
            onClick={() => navigate(`/watch/${videoId}`)}
        >

            {/* Thumbnail */}
            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition duration-300">
                <img
                    src={thumbnail}
                    className="object-cover w-full h-full group-hover:scale-105 group-hover:brightness-90 transition duration-300"
                />

                {/* Duration */}
                <span className="absolute bottom-2 right-2 rounded-md text-xs bg-black/80 px-2 py-1">
                    {formatDuration(duration)}
                </span>
            </div>

            {/* Info */}
            <div className="flex gap-3">

                {/* Avatar */}
                {avatar && (
                    <div onClick={handleAvatarClick} className="flex-shrink-0">
                        <img
                            src={avatar}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    </div>
                )}

                {/* Text */}
                <div className="flex flex-col space-y-1">

                    {/* Title */}
                    <h2 className="text-sm font-medium text-white leading-5 line-clamp-2">
                        {title}
                    </h2>

                    {/* Channel */}
                    {channelName && (
                        <span className="text-xs text-zinc-400">
                            {channelName}
                        </span>
                    )}

                    {/* Views + Time */}
                    <div className="text-xs text-zinc-400">
                        {views} views • {timeAgo(createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;
