import React, { useRef, useState } from 'react';
import { useAuth } from "../context/authContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { signup } = useAuth();
    const { addData } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            await addData(firstNameRef.current.value, lastNameRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <div className={"card d-flex-center"}>
            <div className={"card-body d-flex-center"}>
                <h2 className={"header"}>Register</h2>
                {error && <h2 className={'error'}>{error}</h2>}
                <form className={"d-flex-center"} onSubmit={handleSubmit}>
                    <input type="text" placeholder={"First name"} ref={firstNameRef} />
                    <input type="text" placeholder={"Last name"} ref={lastNameRef} />
                    <input type="email" placeholder={"Email"} ref={emailRef} />
                    <input type="password" placeholder={"Password"} ref={passwordRef} />
                    <button type="submit" disabled={loading}>
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="reg-log">
                Already registered? <Link to={"/login"}>Login</Link>
            </div>
        </div>
    );
};

export default Signup;
