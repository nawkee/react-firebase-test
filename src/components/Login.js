import React, { useRef, useState } from 'react';
import { useAuth } from "../context/authContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to sign in');
        }

        setLoading(false);
    }

    return (
        <div className={"card d-flex-center"}>
            <div className={"card-body d-flex-center"}>
                <h2 className={"header"}>Login</h2>
                {error && <h2 className={'error'}>{error}</h2>}
                <form className={"d-flex-center"} onSubmit={handleSubmit}>
                    <input type="email" placeholder={"Email"} ref={emailRef} />
                    <input type="password" placeholder={"Password"} ref={passwordRef} />
                    <button type="submit" disabled={loading}>
                        Login
                    </button>
                </form>
            </div>
            <div className="reg-log">
                Don`t have an account yet? <Link to={"/signup"}>Register</Link>
            </div>
        </div>
    );
};

export default Login;
