import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";

const Timer = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const device = window.innerWidth > 1024 ? 'desktop' : 'mobile';
    const { updTimer } = useAuth();

    const [desktopTimer, setDesktopTimer] = useState(0);
    const [mobileTimer, setMobileTimer] = useState(0);

    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        } catch {
            console.log('Failed to log out');
        }
    }

    useEffect(() => {
        const interval = setInterval(async() => {
            await updTimer(device)
                .then(res => {
                    setDesktopTimer(res[1]);
                    setMobileTimer(res[0]);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <button className={"logout"} onClick={handleLogout}>Log Out</button>
            <div className={"d-flex-center"}>
                <div className="timer d-flex-center">
                    <h2>Desktop</h2>
                    <h2 className={"time"}>
                        {Math.floor(desktopTimer/3600)}:
                        {Math.floor(desktopTimer%3600/60)}:
                        {desktopTimer%3600%60}
                    </h2>
                </div>
                <div className="timer d-flex-center">
                    <h2>Mobile</h2>
                    <h2 className={"time"}>
                        {Math.floor(mobileTimer/3600)}:
                        {Math.floor(mobileTimer%3600/60)}:
                        {mobileTimer%3600%60}
                    </h2>
                </div>
            </div>
        </>
    );
};

export default Timer;
