import React, { useState } from "react";
import { Button, Input2, UploadingVideo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../store/Slices/videoSlice";
import { IoCloseCircleOutline } from "./icons";
import GetImagePreview from "./GetImagePreview";

function UploadVideo({ setUploadVideoPopup }) {
    const [videoName, setVideoName] = useState("");
    const [videoSize, setVideoSize] = useState(0);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.video.uploading);
    const uploaded = useSelector((state) => state.video.uploaded);

    const publishVideo = async (data) => {
        setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
        await dispatch(publishAvideo(data));
    };

    // Uploading state
    if (uploading) {
        return (
            <UploadingVideo
                setUploadVideoPopup={setUploadVideoPopup}
                videoFileName={videoName}
                fileSize={videoSize}
            />
        );
    }

    // Uploaded state
    if (uploaded) {
        return (
            <UploadingVideo
                setUploadVideoPopup={setUploadVideoPopup}
                videoFileName={videoName}
                fileSize={videoSize}
                uploaded={true}
            />
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-30">

            {/* Modal */}
            <div className="w-[95vw] sm:w-3/4 max-h-[85vh] bg-[#111] rounded-2xl shadow-xl overflow-hidden text-white">

                <form onSubmit={handleSubmit(publishVideo)} className="flex flex-col h-full">

                    {/* Header */}
                    <div className="flex justify-between items-center px-5 py-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <IoCloseCircleOutline
                                size={22}
                                className="cursor-pointer text-gray-400 hover:text-white transition"
                                onClick={() =>
                                    setUploadVideoPopup((prev) => !prev)
                                }
                            />
                            <h3 className="font-semibold text-lg">Upload Video</h3>
                        </div>

                        <Button
                            className="bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-1.5 rounded-lg font-semibold text-black hover:scale-105 transition"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto space-y-6">

                        {/* Upload Area */}
                        <div className="w-full border-2 border-dashed border-white/20 rounded-xl h-44 flex flex-col justify-center items-center text-center gap-3 hover:border-purple-400 transition">

                            <div>
                                <h1 className="text-sm font-medium">
                                    Drag & drop your video here
                                </h1>
                                <p className="text-xs text-gray-400">
                                    Your video will be private until published
                                </p>
                            </div>

                            <label
                                htmlFor="video-upload"
                                className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
                            >
                                Select File
                            </label>

                            <input
                                id="video-upload"
                                type="file"
                                accept="video/*"
                                className="hidden"
                                {...register("videoFile", {
                                    required: "Video file is required",
                                    onChange: (e) =>
                                        setVideoName(e.target.files[0]?.name),
                                })}
                            />

                            {videoName && (
                                <p className="text-xs text-gray-400">{videoName}</p>
                            )}

                            <span className="text-red-500 text-xs">
                                {errors.videoFile?.message}
                            </span>
                        </div>

                        {/* Form Grid */}
                        <div className="grid lg:grid-cols-2 gap-6">

                            {/* Thumbnail */}
                            <div>
                                <GetImagePreview
                                    name="thumbnail"
                                    control={control}
                                    label="Thumbnail *"
                                    className="w-full h-56 rounded-xl border border-white/10 bg-[#0f0f0f]"
                                    cameraIcon={true}
                                    cameraSize={40}
                                />
                                <span className="text-red-500 text-xs">
                                    {errors.thumbnail?.message}
                                </span>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">

                                {/* Title */}
                                <div>
                                    <label className="text-sm text-gray-400">
                                        Title *
                                    </label>
                                    <Input2
                                        type="text"
                                        className="mt-1 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 focus:border-purple-500"
                                        {...register("title", {
                                            required: "Title is required",
                                        })}
                                    />
                                    <span className="text-red-500 text-xs">
                                        {errors.title?.message}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-sm text-gray-400">
                                        Description *
                                    </label>
                                    <textarea
                                        rows="5"
                                        className="mt-1 w-full p-3 rounded-lg bg-[#0f0f0f] border border-white/10 focus:border-purple-500 outline-none transition"
                                        {...register("description", {
                                            required: "Description is required",
                                        })}
                                    ></textarea>
                                    <span className="text-red-500 text-xs">
                                        {errors.description?.message}
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadVideo;