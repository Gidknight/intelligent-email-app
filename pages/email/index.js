"use client";

import { useEffect, useState } from "react";
import {
    Header,
    Line,
    BackButton,
    WriteEmail,
    Drafts,
    Thread,
    Inbox,
    VoiceControl,
    PageButton,
} from "../../components";

import Head from "next/head";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
    DraftsOutlined,
    EmailOutlined,
    Outbox,
    Send,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { createArray } from "../../utils";

const Email = () => {
    const [command, setCommand] = useState("");
    const [transcript, setTranscript] = useState("");
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [inbox, setInbox] = useState(false);
    const [compose, setCompose] = useState(true);
    const [showDrafts, setShowDrafts] = useState(false);
    const [thread, setThread] = useState(false);

    //arrays
    const [personalEmails, setPersonalEmails] = useState([]);
    const [threads, setThreads] = useState([]);
    const [drafts, setDrafts] = useState([]);

    // pagination states
    const [draftPage, setDraftPage] = useState(0);
    const [draftPageSize, setDraftPageSize] = useState(10);

    const [threadPage, setThreadPage] = useState(0);
    const [threadPageSize, setThreadPageSize] = useState(10);

    const [inboxPage, setInboxPage] = useState(0);
    const [inboxPageSize, setInboxPageSize] = useState(10);

    // functions
    const fetchPersonalEmails = async () => {
        try {
            const response = await axios.get(
                `/api/gmail/inbox?page=${inboxPage}`
            );
            const { totalEmails, personalEmails: newPersonalEmails } =
                response.data;
            setPersonalEmails((prevPersonalEmails) => [
                ...prevPersonalEmails,
                ...newPersonalEmails,
            ]);
            setInboxPageSize(Math.ceil(totalEmails / 10)); // Calculate total pages based on totalEmails and 10 emails per page
        } catch (error) {
            console.error("Error fetching personal emails:", error);
        }
    };

    const getAllThread = async () => {
        try {
            const response = await axios.get(
                `/api/gmail/threads?page=${threadPage}&pageSize=${threadPageSize}`,
                {
                    withCredentials: true,
                }
            );
            setThreads(response.data);
        } catch (error) {
            console.error("Error fetching Threads:", error);
        }
    };

    const getAllThreads = async () => {
        try {
            const response = await axios.get(
                `/api/gmail/threads?page=${threadPage}&pageSize=${threadPageSize}`,
                {
                    withCredentials: true,
                }
            );

            setThreads(response.data);
        } catch (error) {
            console.error("Error fetching Threads:", error);
        }
    };

    const getAllDrafts = async () => {
        try {
            const response = await axios.get(
                `/api/gmail/drafts?page=${draftPage}&pageSize=${draftPageSize}`,
                {
                    withCredentials: true,
                }
            );

            setDrafts(response.data);
        } catch (error) {
            console.error("Error fetching Drafts:", error);
        }
    };

    const handleInboxPress = () => {
        setInbox(true);
        setCompose(false);
        setShowDrafts(false);
        setThread(false);
    };
    const handleDraftPress = () => {
        setInbox(false);
        setCompose(false);
        setShowDrafts(true);
        setThread(false);
    };

    const handleComposePress = () => {
        createArray("emailInfo");
        setInbox(false);
        setCompose(true);
        setShowDrafts(false);
        setThread(false);
    };

    const handleThreadsPress = () => {
        setInbox(false);
        setCompose(false);
        setShowDrafts(false);
        setThread(true);
    };

    const handleCommands = () => {
        if (command === "inbox") {
            handleInboxPress();
        } else if (command === "compose") {
            handleComposePress();
        } else if (command === "drafts") {
            handleDraftPress();
        } else if (command === "threads") {
            handleThreadsPress();
        } else {
            setCommand("please speak a valid command");
        }
    };

    useEffect(() => {
        fetchPersonalEmails();
    }, [inboxPage, inboxPageSize]);

    useEffect(() => {
        getAllDrafts();
    }, [draftPage, draftPageSize]);

    useEffect(() => {
        handleCommands();
    }, [command]);

    return (
        <>
            <Head>
                <title>Intelligent Email Reader/Emails</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <section className="flex flex-col justify-center items-center w-full">
                <div
                    className={`mx-auto md:m-auto mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
                >
                    <Header
                        title={"Emails page"}
                        subtext={null}
                        aria={"you are in the emails page"}
                    />
                    <Line />

                    <div className="flex flex-row items-center justify-center gap-1 md:gap-5">
                        <PageButton
                            ariaLabel={
                                "click to compose new email, voice command: COMPOSE EMAIL"
                            }
                            customFunction={handleComposePress}
                            icon={<Send />}
                            isActive={compose}
                            text={"Compose"}
                        />
                        <PageButton
                            ariaLabel={
                                "click to show all drafts, voice command: MY DRAFTS"
                            }
                            customFunction={handleDraftPress}
                            icon={<DraftsOutlined />}
                            isActive={showDrafts}
                            text={"Drafts"}
                        />
                        <PageButton
                            ariaLabel={
                                "click to show all personal emails, voice command: MY INBOX"
                            }
                            customFunction={handleInboxPress}
                            icon={<EmailOutlined />}
                            isActive={inbox}
                            text={"Inbox"}
                        />

                        {/* <button
                            className={thread ? activeClass : menuClass}
                            onClick={handleThreadsPress}
                            aria-pressed={thread}
                            aria-label="click to show all threads, voice command: MY THREADS"
                        >
                            <Outbox />
                            Thread
                        </button> */}
                    </div>
                    <Line />
                    <div className="flex flex-col items-center">
                        <VoiceControl
                            setCommand={setCommand}
                            setTranscript={setTranscript}
                        />
                        {transcript && (
                            <p className="text-center text-transcript">
                                Transcript: {transcript}
                            </p>
                        )}
                    </div>
                    <Line />
                    {compose && (
                        <WriteEmail
                            sender={session?.user.email}
                            setTranscript={setTranscript}
                            transcript={transcript}
                            setCommand={setCommand}
                            command={command}
                        />
                    )}
                    {showDrafts && (
                        <Drafts
                            drafts={drafts}
                            setPage={setDraftPage}
                            page={draftPage}
                            pageSize={draftPageSize}
                        />
                    )}
                    {thread && (
                        <Thread
                            threads={threads}
                            page={threadPage}
                            pageSize={threadPageSize}
                            setPage={setThreadPage}
                        />
                    )}
                    {inbox && (
                        <Inbox
                            emails={personalEmails}
                            page={inboxPage}
                            setPage={setInboxPage}
                            totalPages={inboxPageSize}
                        />
                    )}
                </div>
                <div className="mx-auto pb-10">
                    <BackButton />
                </div>
            </section>
        </>
    );
};

export default Email;
