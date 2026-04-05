import React, { useState } from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton.jsx";
import GetImagePreview from "./GetImagePreview.jsx";

function SignUp() {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);
    const [errorMsg, setErrorMsg] = useState("");
    const submit = async (data) => {
        try {
            setErrorMsg("");

            const response = await dispatch(createAccount(data));

            if (response.type === "register/rejected") {
                setErrorMsg(
                    response.payload?.message ||
                    response.payload?.error ||
                    "User already exists"
                );
                return;
            }

            const username = data?.username;
            const password = data?.password;

            const loginResult = await dispatch(
                userLogin({ username, password })
            );

            if (loginResult?.type === "login/fulfilled") {
                navigate("/terms&conditions");
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
            setErrorMsg("Something went wrong");
        }
    };


    if (loading) {
        return <LoginSkeleton />;
    }

    return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black text-white relative">

        {/* Subtle Glow */}
        <div className="absolute w-[300px] h-[300px] bg-purple-600 opacity-10 blur-3xl rounded-full"></div>

        <div className="flex flex-col items-center w-full z-10">

            {/* Logo */}
            <div className="mb-4 flex justify-center">
                <Logo />
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit(submit)}
                className="space-y-5 p-6 w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-xl"
            >

                {/* Cover + Avatar (UNCHANGED) */}
                <div className="w-full relative h-28 bg-[#222222] rounded-xl border border-gray-800">

                    <div className="w-full h-full">
                        <GetImagePreview
                            name="coverImage"
                            control={control}
                            className="w-full h-28 object-cover"
                            cameraIcon
                        />
                        <div className="text-xs absolute right-2 bottom-2 text-gray-400">
                            Cover Image
                        </div>
                    </div>

                    <div className="absolute left-2 bottom-2 rounded-full border-2 border-black">
                        <GetImagePreview
                            name="avatar"
                            control={control}
                            className="object-cover rounded-full h-20 w-20"
                            cameraIcon
                            cameraSize={20}
                        />
                    </div>
                </div>

                {/* Inputs */}
                <div className="mt-10 space-y-4">

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        {...register("username", { required: true })}
                        className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 py-2 outline-none"
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: true })}
                        className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 py-2 outline-none"
                    />

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter full name"
                        {...register("fullName", { required: true })}
                        className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 py-2 outline-none"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: true })}
                        className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 py-2 outline-none"
                    />

                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">
                            {errorMsg}
                        </p>
                    )}

                    {/* Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 text-lg font-semibold"
                    >
                        {loading ? "Registering..." : "Signup"}
                    </Button>

                    {/* Login */}
                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:text-purple-300 transition"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
    );
}

export default SignUp;