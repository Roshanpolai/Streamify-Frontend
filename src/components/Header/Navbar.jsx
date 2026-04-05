import React, { useState } from "react";
import { Button, Logo, SearchForSmallScreen } from "../index.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    IoCloseCircleOutline,
    BiLike,
    CiSearch,
    HiOutlineVideoCamera,
    SlMenu,
} from "../icons.js";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice.js";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [query, setQuery] = useState(""); // 🔥 NEW

    const authStatus = useSelector((state) => state.auth.status);
    const username = useSelector((state) => state.auth?.userData?.username);
    const profileImg = useSelector((state) => state.auth.userData?.avatar);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    // 🔥 SEARCH FUNCTION
    const handleSearch = (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        navigate(`/search/${query}`);
        setQuery(""); // optional clear
    };

    const sidePanelItems = [
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
    ];

    return (
        <>
            <nav className="w-full h-14 bg-black flex justify-between items-center px-4 border-b border-zinc-800 sticky top-0 z-50">

                {/* LOGO */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <Logo />
                </div>

                {/* 🔥 SEARCH BAR (FIXED) */}
                <div className="hidden sm:flex items-center w-[50%] max-w-xl">
                    <form onSubmit={handleSearch} className="flex w-full">

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full bg-zinc-900 text-white px-4 py-2 rounded-l-full border border-zinc-700 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="bg-zinc-800 px-4 rounded-r-full border border-zinc-700 hover:bg-zinc-700"
                        >
                            <CiSearch size={20} />
                        </button>

                    </form>
                </div>

                {/* SMALL SCREEN SEARCH */}
                <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                    <CiSearch
                        size={30}
                        onClick={() => setOpenSearch((prev) => !prev)}
                    />
                    {openSearch && (
                        <SearchForSmallScreen
                            open={openSearch}
                            setOpenSearch={setOpenSearch}
                        />
                    )}
                </div>

                {/* AUTH SECTION */}
                {authStatus ? (
                    <div className="hidden sm:flex items-center gap-4">
                        <img
                            src={profileImg}
                            alt="profile"
                            className="w-9 h-9 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-zinc-500"
                        />
                    </div>
                ) : (
                    <div className="space-x-3 sm:flex hidden items-center">
                        <Link to={"/login"}>
                            <Button className="bg-transparent text-white border border-gray-500 hover:bg-gray-800 rounded-full px-5 py-2">
                                Login
                            </Button>
                        </Link>

                        <Link to={"/signup"}>
                            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full px-5 py-2 shadow-lg">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}

                {/* HAMBURGER */}
                <div className="sm:hidden block">
                    <SlMenu
                        size={24}
                        className="text-white"
                        onClick={() => setToggleMenu((prev) => !prev)}
                    />
                </div>

                {/* MOBILE SIDEBAR */}
                {toggleMenu && (
                    <div className="fixed right-0 top-0 text-white flex flex-col h-screen w-[75%] bg-black sm:hidden shadow-2xl">

                        {/* HEADER */}
                        <div className="w-full border-b h-20 flex items-center justify-between px-3">
                            <Logo />
                            <IoCloseCircleOutline
                                size={35}
                                onClick={() => setToggleMenu(false)}
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-col justify-between h-full py-5 px-3">

                            <div className="flex flex-col gap-5">
                                {sidePanelItems.map((item) => (
                                    <NavLink
                                        to={item.url}
                                        key={item.title}
                                        onClick={() => setToggleMenu(false)}
                                        className={({ isActive }) =>
                                            isActive ? "bg-zinc-800 rounded-lg" : ""
                                        }
                                    >
                                        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-zinc-800 transition">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>

                            {!authStatus ? (
                                <div className="flex flex-col space-y-5 mb-3">
                                    <Link to={"/login"}>
                                        <Button className="w-full bg-[#222] border py-1 px-3">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <Button className="w-full border py-1 px-3">
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-zinc-800"
                                    onClick={logout}
                                >
                                    <IoMdLogOut size={25} />
                                    <span>Logout</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;