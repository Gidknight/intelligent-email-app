"use client";

import { useState } from "react";
import {
    Add,
    ArrowBack,
    Keyboard,
    Refresh,
    Save,
    Send,
    SendRounded,
} from "@mui/icons-material";
import Button1 from "./Button1";
import Button2 from "./FormButton";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import ComboBox from "./ComboBox";
import TextInput from "./TextInput";
import Line from "./Line";
import { useRouter } from "next/router";

const fieldsetStyle = "flex flex-col text-lg";
const inputStyle = "border-b-2 border-secondary p-2 bg-gray-200 text-secondary";

const getEmailInfo = () => {
    const storedEmailInfo = sessionStorage.getItem("emailInfo");
    const parsedEmailInfo = JSON.parse(storedEmailInfo);
    if (Array.isArray(parsedEmailInfo)) {
        return parsedEmailInfo;
    } else {
        return [];
    }
};

const Subject = ({
    transcript,
    setTranscript,
    setShowSubject,
    setShowBody,
    setEmailInfo,
}) => {
    const addSubject = () => {
        // Get existing emailInfo from sessionStorage
        const existingEmailInfo = getEmailInfo();

        // Add subject to the contactInfo array
        const updatedEmailInfo = [
            ...existingEmailInfo,
            { subject: transcript },
        ];

        // Update the state with the new emailInfo array
        setEmailInfo(updatedEmailInfo);

        // Store the updated contactInfo in sessionStorage
        sessionStorage.setItem("emailInfo", JSON.stringify(updatedEmailInfo));
        setTranscript("");
        // Show success message
        toast.success(`subject added successfully`);
    };

    const handleAddSubject = (event) => {
        event.preventDefault();
        addSubject();
        setShowSubject(false);
        setShowBody(true);

        setTranscript("");
    };

    return (
        <div>
            <fieldset className={fieldsetStyle}>
                <label
                    className="font-semibold text-lg capitalize"
                    htmlFor="subject"
                >
                    Subject: <i className="text-base font-light">(Required)</i>
                </label>

                <TextInput
                    id={"subject"}
                    type={"text"}
                    placeholder={"Subject Of The E-mail"}
                    value={transcript}
                    customFunc={(e) => setTranscript(e.target.value)}
                />
            </fieldset>
            <div className="flex flex-row flex-wrap gap-5">
                <Button2
                    title={"add subject"}
                    customFunc={handleAddSubject}
                    icon={<Add />}
                />
            </div>
        </div>
    );
};

const Body = ({
    transcript,
    setTranscript,
    setShowSubject,
    setShowBody,
    setShowRecipient,
    setEmailInfo,
    setPreview,
    setEmailInfoValues,
}) => {
    const addBody = () => {
        // event.preventDefault();

        // Get existing contactInfo from sessionStorage
        const existingEmailInfo = getEmailInfo();

        // Find the last object in the existingContactInfo array
        const lastDraft = existingEmailInfo[existingEmailInfo.length - 1];

        // Add lastName to the lastContact object
        lastDraft.body = transcript;

        // Update the state with the modified contactInfo array
        setEmailInfo(existingEmailInfo);

        // Store the updated contactInfo in sessionStorage
        sessionStorage.setItem("emailInfo", JSON.stringify(existingEmailInfo));

        // Show success message
        toast.success(`body added successfully`);
    };

    const handleNext = async (event) => {
        event.preventDefault();
        await addBody();
        setShowBody(false);
        setShowSubject(false);
        setPreview(true);
        setEmailInfoValues();
    };

    const handlePrev = (event) => {
        event.preventDefault();
        setShowBody(false);
        setShowRecipient(false);
        setShowSubject(true);
    };
    return (
        <div>
            <fieldset className={fieldsetStyle}>
                <label
                    className="font-semibold text-lg capitalize"
                    htmlFor="body"
                >
                    Body: <i className="text-base font-light">(Required)</i>
                </label>
                <textarea
                    id="body"
                    value={transcript}
                    required
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Body of Email"
                    className="p-2 w-100 h-80 bg-gray-200  border-b-2 border-secondary"
                ></textarea>
            </fieldset>
            <div className="flex flex-row gap-5">
                <Button2
                    title={"add body"}
                    icon={<Add />}
                    customFunc={handleNext}
                />
                <Button2
                    title={"change subject"}
                    icon={<ArrowBack />}
                    customFunc={handlePrev}
                />
            </div>
        </div>
    );
};

const ContactSend = ({
    sender,
    recipient,
    setTranscript,
    transcript,
    command,
    setCommand,
}) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [emailInfo, setEmailInfo] = useState([]);

    const [showSubject, setShowSubject] = useState(true);
    const [showBody, setShowBody] = useState(false);
    const [preview, setPreview] = useState(false);
    const [editEmailWithKeyboard, setEditEmailWithKeyboard] = useState(false);

    //functions
    const handleRefresh = () => {
        setBody("");
        setSubject("");
        setPreview(false);
    };

    const handleSend = async () => {
        try {
            const response = await axios.post(
                "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
                {
                    raw: createEmailMessage(sender, recipient, subject, body),
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Email Sent Successfully");
            handleRefresh();
            router.push("/contacts");
        } catch (error) {
            console.error(error);
        }
    };

    const createDraftEmail = async () => {
        try {
            const response = await axios.post(
                "https://gmail.googleapis.com/gmail/v1/users/me/drafts",
                {
                    message: {
                        raw: createEmailMessage(
                            sender,
                            recipient,
                            subject,
                            body
                        ),
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );

            handleRefresh();
            toast.success("Email Saved in draft");
            router.push("/contacts");
        } catch (error) {
            console.error(error);
        }
    };

    // Helper function to create the email message
    const createEmailMessage = (sender, recipient, subject, body) => {
        const email = [
            `From: ${sender}`,
            `To: ${recipient}`,
            `Subject: ${subject}`,
            "",
            body,
        ].join("\n");

        const encodedEmail = Buffer.from(email).toString("base64");
        return encodedEmail;
    };

    const setEmailInfoValues = async () => {
        const emailInfo = await getEmailInfo();
        // Check if contactInfo is a valid array and has at least one element
        if (Array.isArray(emailInfo) && emailInfo.length > 0) {
            // Get the last element of the contactInfo array (assuming it contains the latest values)
            const latestDraft = emailInfo[emailInfo.length - 1];

            // Destructure the latestContact object to get the firstName, lastName, and email fields
            const { subject, body } = latestDraft;

            // Set the values using the provided set functions

            setSubject(subject);
            setBody(body);
        }
    };

    const editWithKeyboard = () => {
        setEditEmailWithKeyboard(true);
    };
    const handleCommands = () => {};
    return (
        <div
            className="mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full h-100"
            aria-label="email form"
            role="form"
            tabIndex={0}
        >
            <h1 className="font-bold text-xl uppercase text-center text-primary pb-4 ">
                Email sending Form
            </h1>
            <div
            // className=' flex flex-col items-center justify-center gap-2 my-4 p-2 border-2 border-gray1 rounded-2xl w-100'
            // aria-label='audio controls'
            // tabIndex={0}
            >
                {/* <h2 className='text-lg font-bold text-tertiary'>
					Audio Controls
				</h2> */}
                <div className="flex-wrap md:flex-nowrap flex-row items-center justify-center gap-5 bg-gray2 p-2 rounded-xl hidden">
                    {/* <EmailDictaphone
						setTranscript={setTranscript}
						setRecipient={setRecipient}
						setSubject={setSubject}
						setBody={setBody}
						setCommand={setCommand}
					/> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 w-100 items-center justify-evenly">
                <form
                    onSubmit={handleSend}
                    className="flex flex-col gap-2 md:gap-5 border-2 border-gray-500 p-2 md:p-5 rounded-xl w-1/2"
                >
                    <div className="flex flex-row flex-wrap gap-2 md:gap-5">
                        {/* Sender */}
                        <fieldset className={fieldsetStyle}>
                            <label className="font-semibold text-lg capitalize">
                                From:{" "}
                                <i className="text-base font-light">
                                    (Auto-filled)
                                </i>
                            </label>
                            {/* <input
								type='text'
								value={sender}
								required
								className='border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96'
							/> */}
                            <p className="border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96">
                                {sender}
                            </p>
                        </fieldset>

                        <fieldset className={fieldsetStyle}>
                            <label className="font-semibold text-lg capitalize">
                                Recipient:{" "}
                                <i className="text-base font-light">
                                    (Auto-filled)
                                </i>
                            </label>
                            {/* <input
								type='text'
								value={sender}
								required
								className='border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96'
							/> */}
                            <p className="border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96">
                                {recipient}
                            </p>
                        </fieldset>
                    </div>
                    <Line />

                    {showSubject && (
                        <Subject
                            transcript={transcript}
                            setTranscript={setTranscript}
                            setShowSubject={setShowSubject}
                            setShowBody={setShowBody}
                            setEmailInfo={setEmailInfo}
                        />
                    )}

                    {showBody && (
                        <Body
                            setShowBody={setShowBody}
                            setShowSubject={setShowSubject}
                            setTranscript={setTranscript}
                            transcript={transcript}
                            setEmailInfo={setEmailInfo}
                            setPreview={setPreview}
                            setEmailInfoValues={setEmailInfoValues}
                        />
                    )}
                    {preview && (
                        <div
                            className="flex flex-col p-1 gap-5"
                            tabIndex={0}
                        >
                            <h2 className="font-bold text-xl text-primary capitalize">
                                transcript preview:
                            </h2>
                            <p className="text-primary font-semibold text-lg">
                                Recipient:{" "}
                                <span className="text-transcript">
                                    {recipient}
                                </span>
                                .
                            </p>
                            <p className="text-primary font-semibold text-lg">
                                Subject:{" "}
                                <span className="text-transcript">
                                    {subject}
                                </span>
                                .
                            </p>
                            <p className="text-primary font-semibold text-lg">
                                Body:{" "}
                                <span className="text-transcript">{body}</span>.
                            </p>
                            <div className="flex flex-row gap-5">
                                <Button2
                                    title={"Refresh"}
                                    icon={<Refresh />}
                                    type={"button"}
                                    customFunc={handleRefresh}
                                    aria={"wrong transcript, input again"}
                                />
                                <Button2
                                    title={"Edit with Keyboard"}
                                    icon={<Keyboard />}
                                    type={"button"}
                                    aria={"edit inputs with keyboard"}
                                    customFunc={editWithKeyboard}
                                />
                                <Button1
                                    title={"submit"}
                                    aria={"send mail"}
                                    type={"button"}
                                    customFunc={handleSend}
                                    icon={<Send />}
                                />
                            </div>
                        </div>
                    )}
                </form>
                {editEmailWithKeyboard && (
                    <div
                        className="flex flex-col gap-2 md:gap-5 w-1/2 border-2 border-gray-500 p-2 md:p-5 rounded-xl text-primary "
                        tabIndex={0}
                    >
                        <h2 className="font-bold text-xl capitalize border-b-4">
                            Edit with keyboard
                        </h2>

                        <div className="flex flex-col gap-4">
                            <fieldset>
                                <label
                                    className="font-semibold text-lg"
                                    htmlFor="recipientPrev"
                                >
                                    Recipient:{" "}
                                    <i className="text-base font-light">
                                        (Required)
                                    </i>
                                </label>
                                <TextInput
                                    id={"recipientPrev"}
                                    type={"text"}
                                    value={recipient}
                                    customFunc={(e) =>
                                        setRecipient(e.target.value)
                                    }
                                />{" "}
                            </fieldset>
                            <fieldset>
                                <label
                                    className="font-semibold text-lg"
                                    htmlFor="subjectPrev"
                                >
                                    Subject:{" "}
                                    <i className="text-base font-light">
                                        (Required)
                                    </i>
                                </label>
                                <TextInput
                                    id={"subjectPrev"}
                                    type={"text"}
                                    value={subject}
                                    customFunc={(e) =>
                                        setSubject(e.target.value)
                                    }
                                />{" "}
                            </fieldset>
                            <fieldset className="flex flex-col">
                                <label
                                    className="font-semibold text-lg capitalize"
                                    htmlFor="bodyPrev"
                                >
                                    Body:{" "}
                                    <i className="text-base font-light">
                                        (Required)
                                    </i>
                                </label>
                                <textarea
                                    id="bodyPrev"
                                    value={body}
                                    required
                                    onChange={(e) => setBody(e.target.value)}
                                    className="p-2 w-100 h-72 bg-gray-200  border-b-2 border-secondary"
                                ></textarea>
                            </fieldset>
                        </div>
                        <div className="flex flex-row gap-1 md:gap-5">
                            <Button2
                                type={"button"}
                                title={"Refresh"}
                                icon={<Refresh />}
                                customFunc={handleRefresh}
                                aria={"refresh"}
                            />
                            <Button1
                                type={"button"}
                                title={"Save Draft"}
                                icon={<Save />}
                                customFunc={createDraftEmail}
                                aria={"save as draft"}
                            />
                            <Button1
                                type={"submit"}
                                title={"Send Email"}
                                icon={<SendRounded />}
                                aria={"send email"}
                                customFunc={handleSend}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactSend;
