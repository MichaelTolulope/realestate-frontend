import React from "react";
import { FaDashcube, FaSearch } from "react-icons/fa";
import { FaGear, FaRegMessage } from "react-icons/fa6";

export const adminNavData = [
    {
        icon: FaDashcube,
        text:"Overview",
        page:"dashboard"
    },
    {
        icon: FaRegMessage,
        text:"User Requests",
        page:"requests"
    },
    {
        icon:FaGear,
        text:"Settings",
        page:"settings"
    }
]