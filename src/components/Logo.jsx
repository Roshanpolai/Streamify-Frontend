import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Logo() {
    return (
        <Link to="/" className="flex gap-3 items-center px-3 py-2">
            
            <img
                src={logo}
                alt="Streamify logo"
                className="w-40 h-40 object-contain flex-shrink-0"
            />

        </Link>
    );
}

export default Logo;
