import React, { useEffect, useState } from "react";
import {
    Container,
    DeleteConfirmation,
    HeaderSection,
    Navbar,
    Spinner,
    StatsSection,
    VideoTable,
    EditVideo,
    UploadVideo,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "../store/Slices/dashboard";
import { deleteAVideo } from "../store/Slices/videoSlice";

function AdminDashboard() {
    const username = useSelector((state) => state.auth.userData?.username);
    const dashboard = useSelector((state) => state.dashboard.channelStats);
    const videos = useSelector((state) => state.dashboard.channelVideos);
    const uploaded = useSelector((state) => state.video.uploaded);
    const publishToggled = useSelector((state) => state.video.publishToggled);
    const deleting = useSelector((state) => state.video.loading);

    const dispatch = useDispatch();
    const [videoDetails, setVideoDetails] = useState(null);
    const [popUp, setPopUp] = useState({
        uploadVideo: false,
        editVideo: false,
        deleteVideo: false,
    });

    const handleDeleteVideo = async () => {
        dispatch(deleteAVideo(videoDetails?._id));
        setPopUp((prev) => ({
            ...prev,
            deleteVideo: false,
        }));
    };

    useEffect(() => {
        dispatch(getChannelStats());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getChannelVideos());
    }, [dispatch, uploaded, publishToggled, deleting]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <div className="w-full min-h-screen text-white space-y-6 md:space-y-8 py-6 px-4 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]">

                {/* Upload Video Popup */}
                {popUp.uploadVideo && (
                    <div className="fixed inset-0 flex justify-center items-center z-30 bg-black/50 backdrop-blur-sm">
                        <UploadVideo setUploadVideoPopup={setPopUp} />
                    </div>
                )}

                {/* Edit Video Popup */}
                {popUp.editVideo && (
                    <div className="fixed inset-0 flex justify-center items-center z-30 bg-black/50 backdrop-blur-sm">
                        <EditVideo
                            setEditVideoPopup={setPopUp}
                            title={videoDetails?.title}
                            description={videoDetails?.description}
                            videoId={videoDetails?._id}
                        />
                    </div>
                )}

                {/* Delete Confirmation Popup */}
                {popUp.deleteVideo && (
                    <div className="fixed inset-0 flex justify-center items-center z-30 bg-black/50 backdrop-blur-sm">
                        <DeleteConfirmation
                            video={true}
                            onCancel={() =>
                                setPopUp((prev) => ({
                                    ...prev,
                                    deleteVideo: false,
                                }))
                            }
                            onDelete={handleDeleteVideo}
                        />
                    </div>
                )}

                {/* Deleting Loader */}
                {deleting && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
                        <div className="bg-[#111] rounded-xl shadow-lg flex items-center gap-3 px-4 py-2">
                            <Spinner />
                            <span className="text-sm font-semibold">
                                Deleting video...
                            </span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <HeaderSection
                    username={username}
                    setPopUp={setPopUp}
                />

                {/* Stats */}
                <StatsSection dashboard={dashboard} />

                {/* Divider (subtle) */}
                <div className="border-t border-white/10"></div>

                {/* Video Table */}
                <VideoTable
                    videos={videos}
                    setPopUp={setPopUp}
                    setVideoDetails={setVideoDetails}
                />
            </div>
        </Container>
    );
}

export default AdminDashboard;