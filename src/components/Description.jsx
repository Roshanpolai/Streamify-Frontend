import React, { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { Like, Button } from "./index";
import { Link } from "react-router-dom";
import { toggleSubscription } from "../store/Slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";

function Description({
    title,
    views,
    createdAt,
    channelName,
    avatar,
    subscribersCount,
    likesCount,
    isSubscribed,
    description,
    isLiked,
    videoId,
    channelId,
}) {
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount);
    const currentUserId = useSelector((state) => state.auth.userData?._id);
    const dispatch = useDispatch();

    //Toggle subscription state
    const handleSubscribe = () => {
        dispatch(toggleSubscription(channelId));

        setLocalIsSubscribed((prev) => {
            if (prev) {
                setLocalSubscribersCount((count) => count - 1);
            } else {
                setLocalSubscribersCount((count) => count + 1);
            }
            return !prev;
        });
    };

    return (
        <section className="max-w-4xl w-full text-white sm:p-6 p-3 space-y-4">

            {/* Title + Meta */}
            <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
                    {title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-slate-400">
                    <div>
                        {views} views • {timeAgo(createdAt)}
                    </div>

                    <div className="flex items-center gap-3 bg-[#1e1e1e] px-3 py-1 rounded-full shadow">
                        <Like
                            isLiked={isLiked}
                            videoId={videoId}
                            likesCount={likesCount}
                            size={22}
                        />
                    </div>
                </div>
            </div>

            {/* Channel + Subscribe */}
            <div className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-xl shadow-md">

                <Link to={`/channel/${channelName}/videos`} className="flex items-center gap-3" >
                    <img
                        src={avatar}
                        className="w-11 h-11 rounded-full object-cover border border-slate-700"
                    />

                    <div>
                        <h2 className="font-semibold text-sm sm:text-base">
                            {channelName}
                        </h2>
                        <p className="text-xs text-slate-400">
                            {localSubscribersCount} subscribers
                        </p>
                    </div>
                </Link>

                {currentUserId !== channelId && (
                    <Button
                        onClick={handleSubscribe}
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 
                                ${localIsSubscribed
                                ? "bg-gray-600 hover:bg-gray-500"
                                : "bg-gradient-to-r from-purple-600 to-purple-400 hover:scale-105"
                            }`}
                    >
                        {localIsSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                )}

            </div>

            {/* Description */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 text-sm text-slate-300 leading-relaxed shadow">
                {description}
            </div>

        </section>
    );
}

export default Description;
