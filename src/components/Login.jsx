import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton.jsx";

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        const isEmail = data.username.includes("@");
        const loginData = isEmail
            ? { email: data.username, password: data.password }
            : data;

        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        if (user && response?.payload) {
            navigate("/");
        }
    };

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] text-white px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-[#111]/80 backdrop-blur-lg rounded-2xl shadow-xl px-6 py-5 space-y-4">

                {/* Logo (Reduced space) */}
                <div className="flex justify-center items-center -mb-1">
                    <Logo />
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(submit)}
                    className="space-y-3"
                >

                    {/* Username */}
                    <div>
                        <Input
                            label="Username / Email"
                            type="text"
                            placeholder="example@gmail.com"
                            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 focus:border-purple-500"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-xs">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 focus:border-purple-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Button */}
                    <Button
                        type="submit"
                        className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-black hover:scale-105 transition duration-300 shadow-md"
                    >
                        Login
                    </Button>

                    {/* Signup */}
                    <p className="text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            to={"/signup"}
                            className="text-purple-400 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
