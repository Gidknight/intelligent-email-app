import Head from "next/head";

import Image from "next/image";

import { Dot, LoginBtn } from "../components";

const Home = () => {
    return (
        <>
            <Head>
                <title>Email Reader App</title>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <main
                className="flex h-full md:h-screen w-screen bg-lightWhite py-16 md:p-10"
                aria-label="landing page"
                tabIndex={0}
            >
                <div className="z-10 w-100 h-100 m-auto flex flex-col md:flex-row justify-evenly items-center gap-10 p-3 md:p-20 ">
                    <div className=" h-100 w-100  md:w-1/2 flex">
                        <div className="rounded-xl m-auto p-2">
                            <Image
                                src={"/imr landing image.png"}
                                alt="landing image"
                                className="w-100 h-full"
                                width={450}
                                height={450}
                                role="img"
                                aria-label="Landing Image"
                            />
                        </div>
                    </div>

                    <div
                        className="flex flex-1 flex-col h-100 w-100 md:w-1/2 items-center justify-start gap-4"
                        tabIndex={0}
                    >
                        <h1
                            className="font-extrabold font-poppins text-5xl uppercase text-primary text-center"
                            role="heading"
                            aria-level="1"
                            aria-label="app description."
                        >
                            Intelligent E-Mail Reader
                            <Dot color={"white"} />
                        </h1>

                        <h2
                            className="text-primary font-bold text-lg"
                            aria-level="2"
                        >
                            Finally, a mail reading app that is truly accessible
                            to blind people.
                        </h2>

                        <div className="text-lg/8 text-primary flex flex-col gap-2">
                            <p>
                                Intelligent E-Mail Reader is a revolutionary new
                                app that allows blind people to read their mail
                                independently. With Intelligent Mail Reader, you
                                can:
                            </p>

                            <ul
                                className="list-disc ml-10 text-base"
                                role="list"
                            >
                                <li role="listitem">
                                    Listen to your mail aloud so you can always
                                    stay up-to-date on your correspondence.
                                </li>
                                <li role="listitem">
                                    Navigate your inbox easily using simple
                                    voice & tab commands.
                                </li>
                                <li role="listitem">
                                    Create, Send, & Reply to emails even if you
                                    can't see them.
                                </li>
                            </ul>
                            <p>Additional functionality includes:</p>
                            <ul
                                className="list-disc ml-10 text-base"
                                role="list"
                            >
                                <li role="listitem">Scheduling your tasks.</li>
                            </ul>
                            <p>
                                Intelligent Mail Reader is easy to use and free.
                                Just sign in today and start enjoying the
                                freedom of being able to read your mail
                                independently.
                            </p>
                        </div>
                        <div>
                            <LoginBtn />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
