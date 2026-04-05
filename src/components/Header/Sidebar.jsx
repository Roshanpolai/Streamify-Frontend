import React from "react";
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth?.userData?.username);
    const sidebarTopItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const bottomBarItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    return (
        <>
            <div className="sm:block hidden">
                <div className="text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 bg-black border-r border-zinc-800 h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 justify-center sm:justify-start px-3 py-2 rounded-lg cursor-pointer transition
                                ${isActive
                                        ? "bg-purple-500 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`
                                }
                            >
                                {item.icon}
                                <span className="text-sm font-medium hidden md:block">
                                    {item.title}
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="space-y-4 mb-10">
                        {username && (
                            <div
                                className="flex items-center gap-4 justify-center sm:justify-start px-3 py-2 rounded-lg cursor-pointer transition hover:bg-zinc-800"
                                onClick={() => logout()}
                            >
                                <IoMdLogOut size={25} />
                                <span className="text-sm font-medium hidden md:block">
                                    Logout
                                </span>
                            </div>
                        )}
    
                         <div className="flex items-center gap-4 justify-center sm:justify-start px-3 py-2 rounded-lg cursor-pointer transition hover:bg-zinc-800">
                            <CiSettings size={25} />
                            <span className="text-sm font-medium hidden md:block">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile sidebar is bottom bar*/}
            <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-black border-zinc-800">
                {bottomBarItems.map((item) => (
                    <NavLink
                        to={item.url}
                        key={item.title}
                        className={({ isActive }) =>
                            isActive ? "bg-zinc-800 rounded-lg" : ""
                        }
                    >
                        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
                            {item.icon}
                            <span className="text-sm">{item.title}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default Sidebar;
