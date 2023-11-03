"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
    ArrowBackIos,
    ArrowForwardIos,
    CancelOutlined,
    ContactMail,
    EmailOutlined,
    Login,
    Logout,
    MenuRounded,
    TodayOutlined,
} from "@mui/icons-material";
import { TasksNotification } from "./";
import VoiceNavigation from "./VoiceNavigation";
import { toast } from "react-hot-toast";

const MobileNav = () => {
    const { data: session } = useSession();
    const route = useRouter();
    const { pathname } = route;
    const [activeMenu, setActiveMenu] = useState("");
    const [command, setCommand] = useState("");
    const [transcript, setTranscript] = useState("");
    const [numberOfTasks, setNumberOfTasks] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    const [sidebar, setSidebar] = useState(false);
    const menuClass = `flex flex-row gap-2 items-center justify-center uppercase text-xl font-bold p-3 text-primary hover:text-white hover:bg-secondary focus:bg-secondary focus:text-white rounded-full border-secondary transition-all border-2 bg-lightWhite`;
    const activeClass = `flex flex-row gap-2 uppercase items-center justify-center text-xl font-bold p-3 text-primary hover:text-white hover:bg-secondary rounded-full border-secondary transition-all border-2 bg-lightWhite`;
    const mobileBTN = `w-full flex items-center justify-center gap-2 text-2xl font-bold p-2 focus:bg-primary focus:text-lightWhite bg-lightWhite uppercase transition-all duration-300`;
    const icon = `w-5 h-5`;
    const toggleActive = (menu) => {
        setActiveMenu(menu);
    };

    const homePress = () => {
        toggleActive("Home");
        route.push("/");
        toast.success("navigating to home page");
        setCommand("");
    };

    const timelinePress = () => {
        toggleActive("Home");
        route.push("/timeline");
        setCommand("");
    };

    const contactPress = () => {
        toggleActive("Contacts");
        route.push("/contacts");
        toast.success("navigating to contacts page");
        setCommand("");
    };
    const emailPress = () => {
        toggleActive("Email");
        route.push("/email");
        toast.success("navigating to emails");
        setCommand("");
    };

    const calenderPress = () => {
        toggleActive("Calender");
        route.push("/calender");
        toast.success("navigating to calender page");
        setCommand("");
    };

    const docsPress = () => {
        toggleActive("Calender");
        route.push("/documentation");
        toast.success("navigating to documentation");
        setCommand("");
    };

    const logoutPress = async () => {
        homePress();
        signOut();
        toast.success("logging out");
        setCommand("");
    };
    const handleLogin = () => {
        signIn("google");
        toast.success("logging in");
        setCommand("");
    };

    const voiceNavigate = async () => {
        if (command.includes("timeline")) {
            timelinePress();
        } else if (command.includes("contacts")) {
            contactPress();
        } else if (command.includes("calender")) {
            calenderPress();
        } else if (command.includes("timeline")) {
            timelinePress();
        } else if (command.includes("emails")) {
            emailPress();
        } else if (command.includes("documentation")) {
            docsPress();
        } else if (command.includes("home")) {
            homePress();
        } else if (command === "login") {
            handleLogin();
        } else if (command === "log out") {
            logoutPress();
        } else {
            setErrorMsg("Page not recognized, please specify the page.");
            // toast.error(errorMsg);
        }
    };

    const tabForwardPress = () => {};

    const tabBackwardPress = () => {};

    useEffect(() => {
        voiceNavigate();
        const tasks = JSON.parse(localStorage.getItem("tasks" || "[]"));
        setNumberOfTasks(tasks?.length);
    }, [command, numberOfTasks]);

    return (
        <nav className="md:hidden bg-lightWhite h-16 flex fixed w-screen bottom-0 shadow-lg z-30">
            <div className="flex flex-row items-center justify-evenly p-2  text-primary w-full">
                <button
                    type="button"
                    className={mobileBTN}
                    onClick={tabBackwardPress}
                    aria-label="Tab Previous"
                >
                    <ArrowBackIos className={icon} /> Tab
                </button>
                <div className="bg-dimWhite w-full shadow-lg border-2 border-gray2 p-2 rounded-[15px]">
                    <VoiceNavigation
                        setCommand={setCommand}
                        command={command}
                        setTranscript={setTranscript}
                        suppressHydrationWarning
                    />
                </div>

                <button
                    type="button"
                    className={mobileBTN}
                    onClick={tabForwardPress}
                    aria-label="Tab Next"
                >
                    tab <ArrowForwardIos className={icon} />
                </button>
            </div>
        </nav>
    );
};

export default MobileNav;
