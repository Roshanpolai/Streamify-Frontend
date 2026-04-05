import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../store/Slices/tweetSlice";
import { createAComment } from "../store/Slices/commentSlice";

function TweetAndComment({ tweet, comment, videoId }) {
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();

    const sendContent = (data) => {
        if (data) {
            if (tweet) {
                dispatch(createTweet(data));
            } else if (comment) {
                dispatch(createAComment({ content: data.content, videoId }));
            }
            setValue("content", "");
        }
    };
    
    return (
        <form
            onSubmit={handleSubmit(sendContent)}
            className="sm:max-w-4xl w-full px-3 sm:px-5 py-4"
        >
            <div className="flex gap-3 items-start bg-[#1a1a1a] p-3 rounded-xl shadow-md">
                
                {/* Input Area */}
                <div className="flex-1 relative">

                    <textarea
                        placeholder={tweet ? "What's happening?" : "Add a comment..."}
                        className="w-full bg-transparent text-sm text-white
                        placeholder:text-slate-400 resize-none outline-none 
                        border-b border-slate-600 focus:border-purple-500 
                        pb-2 pr-16 transition-all duration-200"
                        {...register("content", { required: true })}
                        rows={2}
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-end items-center mt-2 gap-2">

                        <Button
                            type="button"
                            onClick={() => setValue("content", "")}
                            className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 transition font-semibold"
                        >
                            Send
                        </Button>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default TweetAndComment;
