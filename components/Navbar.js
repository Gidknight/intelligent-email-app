"use client";

import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
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

const Navbar = () => {
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
    const sideMenu = `flex items-center justify-center  gap-4 text-2xl font-bold p-4 shadow-lg bg-slate-100 border-secondary uppercase`;
    const icon = `w-10 h-10`;
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

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    useEffect(() => {
        voiceNavigate();
        const tasks = JSON.parse(localStorage.getItem("tasks" || "[]"));
        setNumberOfTasks(tasks?.length);
    }, [command, numberOfTasks]);

    return (
        <div
            className="bg-lightWhite z-40 shadow-lg fixed w-full"
            aria-label="navigation bar"
        >
            <nav className="flex flex-row items-center justify-between p-2 md:ml-6 md:mr-6 relative text-primary">
                <button
                    type="button"
                    className="relative text-xl font-bold rounded-full p-3 text-primary hover:text-white focus:text-white hover:bg-primary focus:bg-primary transition-all border-2"
                    onClick={homePress}
                    aria-label="Logo"
                >
                    IMR
                </button>

                <div className="flex-row gap-2 justify-center items-center hidden md:flex ">
                    <VoiceNavigation
                        setCommand={setCommand}
                        command={command}
                        setTranscript={setTranscript}
                        suppressHydrationWarning
                    />
                    {transcript && (
                        <p className="text-transcript">
                            Transcript: {transcript}
                        </p>
                    )}
                </div>

                <div className="flex-row items-center justify-center gap-5 hidden md:flex">
                    <Tooltip
                        title={"CONTACTS"}
                        placement="bottom"
                    >
                        <button
                            type="button"
                            className={
                                activeMenu === "Contacts"
                                    ? activeClass
                                    : menuClass
                            }
                            onClick={contactPress}
                            aria-label="Go to contacts Page"
                        >
                            contacts
                        </button>
                    </Tooltip>

                    <Tooltip
                        title={"EMAIL"}
                        placement="bottom"
                    >
                        <button
                            type="button"
                            className={
                                activeMenu === "Email" ? activeClass : menuClass
                            }
                            onClick={emailPress}
                            aria-label="Go to Emails Page"
                        >
                            EMAILS
                        </button>
                    </Tooltip>

                    <Tooltip
                        title={"CALENDER"}
                        placement="bottom"
                    >
                        <button
                            type="button"
                            className={
                                activeMenu === "Calender"
                                    ? activeClass
                                    : menuClass
                            }
                            onClick={calenderPress}
                            aria-label="Go To Calendar Page"
                        >
                            CALENDAR
                            <TasksNotification
                                numberOfTasks={numberOfTasks}
                                setNumberOfTasks={setNumberOfTasks}
                            />
                        </button>
                    </Tooltip>
                    <div className="flex flex-row gap-2 items-center justify-center focus:bg-secondary text-gray1 focus:text-white text-xl font-bold rounded-full p-3 hover:bg-light-gray pl-10">
                        {session ? (
                            <>
                                <span className="text-base">Hi,</span>{" "}
                                <span className=" font-bold ml-1 text-14 capitalize">
                                    {session?.user?.name}
                                </span>
                                <Image
                                    src={session?.user?.image}
                                    alt="profile picture"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <Tooltip
                                    title={"LOGOUT"}
                                    placement="bottom"
                                >
                                    <button
                                        className={`shadow-lg p-2 rounded-full hover:text-white hover:bg-primary bottom-10`}
                                        onClick={logoutPress}
                                        aria-label="Click to Logout"
                                    >
                                        <Logout />
                                    </button>
                                </Tooltip>
                            </>
                        ) : (
                            <Tooltip
                                title={"LOGIN"}
                                placement="bottom"
                            >
                                <button
                                    className={`shadow-lg p-2 rounded-full hover:text-white hover:bg-primary bottom-10`}
                                    onClick={handleLogin}
                                    aria-label="Click to Login"
                                >
                                    <Login />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    className="w-10 h-10 p-2 mx-4 block md:hidden"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <MenuRounded className={icon} />
                </button>

                {sidebar && (
                    <div>
                        <div className="flex flex-col gap-5 py-2">
                            <button
                                type="button"
                                className={sideMenu}
                                onClick={() => {
                                    toggleActive("Contacts");
                                    route.push("/contacts");
                                    setSidebar(false);
                                }}
                                aria-label="Go to Timeline"
                            >
                                <ContactMail className={icon} /> Contacts
                            </button>
                            <button
                                type="button"
                                className={sideMenu}
                                onClick={() => {
                                    toggleActive("Email");
                                    route.push("/email");
                                    setSidebar(false);
                                }}
                                aria-label="Go to Email"
                            >
                                <EmailOutlined className={icon} /> Email
                            </button>
                            <button
                                type="button"
                                className={sideMenu}
                                onClick={() => {
                                    toggleActive("Calender");
                                    setSidebar(false);
                                    route.push("/calender");
                                }}
                                aria-label="Go To Calendar Page"
                            >
                                <TodayOutlined className={icon} /> CALENDAR
                            </button>
                        </div>

                        <button
                            className={`${sideMenu} bottom-10`}
                            onClick={logoutPress}
                            aria-label="Click to Logout"
                        >
                            <Logout className={icon} /> signOut
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
