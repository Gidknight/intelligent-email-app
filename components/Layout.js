"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScreenReaderToggle from "./ScreenReaderToggle";
import OfflineDetector from "./OfflineDetector";
import MobileNav from "./MobileNav";

const Layout = ({ children }) => {
    return (
        <main className="bg-lightWhite w-screen overflow-auto h-full">
            {/* <div className="flex relative "> */}
            <div className="flex-1 flex-col">
                <Toaster />
                {/* <ScreenReaderToggle /> */}
                <Navbar />
                {children}

                {/* <Footer /> */}
                <MobileNav />
                {/* <OfflineDetector /> */}
            </div>
            {/* </div> */}
        </main>
    );
};

export default Layout;
