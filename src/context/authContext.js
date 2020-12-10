import React, { useContext, useState, useEffect } from 'react';
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const addData = (firstName, lastName) => {
        const usersDatabase = database.ref().child('users');
        const userID = auth.currentUser.uid;
        const userRef = usersDatabase.child(userID);

        const userData = {
            "firstName": firstName,
            "lastName": lastName,
            "desktopTimer": 0,
            "mobileTimer": 0
        };

        return userRef.set(userData, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    function updTimer(device) {
        const usersDatabase = database.ref().child('users');
        const userID = auth.currentUser.uid;
        const userRef = usersDatabase.child(userID);

        return userRef.once('value')
            .then(snapshot => {
                const data = snapshot.val();

                let updated = {};
                device === 'desktop' ?
                 updated = {...data, desktopTimer: data.desktopTimer + 1}
                :
                 updated = {...data, mobileTimer: data.mobileTimer + 1};

                userRef.set(updated, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                return [updated.mobileTimer, updated.desktopTimer];
            });
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        addData,
        logout,
        updTimer
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
