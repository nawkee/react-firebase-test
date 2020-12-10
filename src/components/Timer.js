import React from 'react';
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";

const Timer = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        } catch {
            console.log('Failed to log out');
        }
    }

    return (
        <>
            <button className={"logout"} onClick={handleLogout}>Log Out</button>
            <div className={"d-flex-center"}>
                <div className="timer d-flex-center">
                    <h2>Desktop</h2>
                    <h2 className={"time"}>00:00:00</h2>
                </div>
                <div className="timer d-flex-center">
                    <h2>Mobile</h2>
                    <h2 className={"time"}>00:00:00</h2>
                </div>
            </div>
        </>
    );
};

export default Timer;
