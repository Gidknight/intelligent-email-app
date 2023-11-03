"use client";

import React, { useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";
import Dictaphone from "./Dictaphone";
import { toast } from "react-hot-toast";
import Button2 from "./FormButton";
import { Add, ErrorOutline } from "@mui/icons-material";
import TextInput from "./TextInput";

const AddTask = ({ setTasks, tasks, setShowTasks, setShowAddTask }) => {
    const [transcript, setTranscript] = useState("");
    const [task, setTask] = useState("" || transcript);
    const [errorMsg, setErrorMsg] = useState("");
    const userRef = useRef();

    const addTask = async (event) => {
        event.preventDefault();
        // Generate a dynamic id for the task
        const newTaskId = uuid();
        // check for length of task
        if (tasks.length > 10) {
            setErrorMsg("way too much task");
            toast.error("task not added, you have too much tasks undone");
            setTask("");
        } else {
            // Add the task to the tasks array
            const newTasks = [
                ...tasks,
                { id: newTaskId, task: task || transcript },
            ];
            setTasks(newTasks);

            // Store the tasks in localStorage
            localStorage.setItem("tasks", JSON.stringify(newTasks));

            // alert(`task: ${newTasks} Added`);
            toast.success(`${task} added successfully`);
            setTask("");
        }

        setShowAddTask(false);
        setShowTasks(true);
    };

    return (
        <div
            className="w-full h-full border-2 border-gray1 p-2 md:p-4 rounded-xl"
            aria-label="add a task"
            role="form"
            tabIndex={0}
        >
            <h2 className="font-bold text-xl text-primary uppercase pb-2">
                Add Task
            </h2>
            <hr className="h-1 bg-primary mb-5" />
            <div
                className="hidden flex-col gap-2 pb-2"
                aria-label="audio controls"
                tabIndex={0}
            >
                <Dictaphone
                    task={task}
                    setTranscript={setTranscript}
                    title={"microphone"}
                />
                {transcript && (
                    <p
                        className="text-lg text-red-600 border-2 rounded-xl p-2 shadow-sm"
                        aria-label={`transcript: ${transcript}`}
                        tabIndex={0}
                    >
                        <span className="font-semibold text-primary">
                            Transcript:{" "}
                        </span>{" "}
                        {transcript}
                    </p>
                )}
            </div>
            {/* <Line /> */}
            {errorMsg && (
                <p className="text-lg text-red-600 font-semibold text-center capitalize">
                    {" "}
                    <ErrorOutline /> {errorMsg}
                </p>
            )}
            <form
                onSubmit={addTask}
                className="flex flex-col gap-5"
            >
                <fieldset className="flex flex-col border-2 p-2 rounded-lg">
                    <label
                        htmlFor="task"
                        className="text-lg font-bold text-primary"
                    >
                        Task:
                    </label>

                    <TextInput
                        type={"text"}
                        id={"task"}
                        placeholder={"Input your task"}
                        value={task || transcript}
                        customFunc={(e) => setTask(e.target.value)}
                        aria={"task input"}
                    />
                </fieldset>
                <Button2
                    type={"submit"}
                    icon={<Add />}
                    title={"submit"}
                    aria={"click to submit the task"}
                />
            </form>
        </div>
    );
};

export default AddTask;
