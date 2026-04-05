import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";

function SearchVideos() {
    const loading = useSelector((state) => state.video?.loading);
    const videos = useSelector((state) => state.video?.videos);
    const dispatch = useDispatch();
    const { query } = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchParams, setSearchParms] = useSearchParams();

    useEffect(() => {
        const sortType = searchParams.get("sortType");
        const sortBy = searchParams.get("sortBy");

        dispatch(
            getAllVideos({
                query,
                sortBy,
                sortType,
            })
        );

        setFilterOpen(false);
    }, [dispatch, query, searchParams.toString()]);

    const handleSortParams = (newSortBy, newSortType = "asc") => {
        setSearchParms({ sortBy: newSortBy, sortType: newSortType });
    };

    if (loading) return <HomeSkeleton />;

    if (videos?.totalDocs === 0) {
        return <NoVideosFound text={"Try searching something else"} />;
    }

    return (
        <>
            {/* FILTER BUTTON */}
            <div
                className="w-full flex items-center justify-end px-6 py-3 text-white cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}
            >
                <span className="mr-2 hover:text-purple-500">Filters</span>
                <FaFilter className="text-purple-500" />
            </div>

            {/* FILTER MODAL */}
            {filterOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="w-full max-w-sm bg-[#1a1a1a] rounded-xl p-5 relative shadow-lg">

                        <h1 className="font-semibold text-lg mb-4 text-white">
                            Search Filters
                        </h1>

                        <IoCloseCircleOutline
                            size={26}
                            className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => setFilterOpen(false)}
                        />

                        <div className="space-y-3 text-sm text-slate-300">

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("createdAt", "desc")
                                }
                            >
                                Upload date (Latest)
                            </p>

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("createdAt", "asc")
                                }
                            >
                                Upload date (Oldest)
                            </p>

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("views", "asc")
                                }
                            >
                                Views (Low → High)
                            </p>

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("views", "desc")
                                }
                            >
                                Views (High → Low)
                            </p>

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("duration", "asc")
                                }
                            >
                                Duration (Short → Long)
                            </p>

                            <p
                                className="cursor-pointer hover:text-purple-400"
                                onClick={() =>
                                    handleSortParams("duration", "desc")
                                }
                            >
                                Duration (Long → Short)
                            </p>

                        </div>
                    </div>
                </div>
            )}

            {/* VIDEOS GRID */}
            <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-10">
                <div className="max-w-[1400px] mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos?.docs?.map((video) => (
                            <VideoList
                                key={video?._id}
                                thumbnail={video?.thumbnail?.url}
                                duration={video?.duration}
                                title={video?.title}
                                views={video?.views}
                                avatar={video?.ownerDetails?.avatar}
                                channelName={video?.ownerDetails?.username}
                                createdAt={video?.createdAt}
                                videoId={video?._id}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export default SearchVideos;
