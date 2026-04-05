import React from "react";
import {
    MdOutlineSlowMotionVideo,
    RxAvatar,
    FaRegEye,
    FaRegHeart,
} from "../../components/icons";

function StatsSection({ dashboard }) {
    return (
        <section className="grid sm:grid-cols-4 grid-cols-2 gap-4">

            {/* Card 1 */}
            <div className="bg-[#111] rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
                    <MdOutlineSlowMotionVideo size={22} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Total Videos</p>
                    <h2 className="font-bold text-2xl">
                        {dashboard?.totalVideos || 0}
                    </h2>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#111] rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
                    <FaRegEye size={22} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Total Views</p>
                    <h2 className="font-bold text-2xl">
                        {dashboard?.totalViews || 0}
                    </h2>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111] rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
                    <RxAvatar size={22} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Subscribers</p>
                    <h2 className="font-bold text-2xl">
                        {dashboard?.totalSubscribers || 0}
                    </h2>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#111] rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
                    <FaRegHeart size={22} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Total Likes</p>
                    <h2 className="font-bold text-2xl">
                        {dashboard?.totalLikes || 0}
                    </h2>
                </div>
            </div>

        </section>
    );
}

export default StatsSection;