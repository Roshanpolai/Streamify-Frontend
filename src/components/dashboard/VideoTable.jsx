import React from "react";
import { ImBin, GrEdit } from "../../components/icons";
import TogglePublish from "../TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
    return (
        <section className="w-full">

            {/* Table Container */}
            <div className="bg-[#111] rounded-2xl shadow-md overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-300">

                        {/* Header */}
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-5 py-3">Publish</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Title</th>
                                <th className="px-5 py-3">Likes</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {videos?.map((video) => (
                                <tr
                                    key={video?._id}
                                    className="border-t border-white/10 hover:bg-white/5 transition"
                                >
                                    {/* Toggle */}
                                    <td className="px-5 py-4">
                                        <TogglePublish
                                            isPublished={video?.isPublished}
                                            videoId={video?._id}
                                        />
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4">
                                        {video?.isPublished ? (
                                            <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs font-medium">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full text-xs font-medium">
                                                Unpublished
                                            </span>
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className="px-5 py-4 font-medium text-white">
                                        {video?.title}
                                    </td>

                                    {/* Likes */}
                                    <td className="px-5 py-4">
                                        <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs">
                                            {video?.likesCount} likes
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-5 py-4 text-gray-400">
                                        {video?.createdAt?.day}/
                                        {video?.createdAt?.month}/
                                        {video?.createdAt?.year}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4 flex justify-end gap-4">
                                        <ImBin
                                            size={18}
                                            className="cursor-pointer text-gray-400 hover:text-red-400 transition"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    deleteVideo: true,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                        <GrEdit
                                            size={18}
                                            className="cursor-pointer text-gray-400 hover:text-purple-400 transition"
                                            onClick={() => {
                                                setPopUp((prev) => ({
                                                    ...prev,
                                                    editVideo: true,
                                                }));
                                                setVideoDetails(video);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </section>
    );
}

export default VideoTable;