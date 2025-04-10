import React, {useEffect, useRef, useState} from "react";
import {getUser} from "../auth-api"

const UserContext = React.createContext({
    isAuth: false,
    userData: null,
    setAuth: null,
});

export function UserContextProvider({children}) {
    const [isAuth, SetAuth] = useState(false)
    const [userData, SetUserData] = useState(null)
    const [updateUserData, setUpdateUserData] = useState(false)
    const hasFetchedUser = useRef(false);

    useEffect(() => {
        if (hasFetchedUser.current && !updateUserData) return;

        hasFetchedUser.current = true;
        (async () => {
            try {
                const data = await getUser()
                if (data.status === "OK") {
                    SetAuth(true);
                    SetUserData(data.user);
                } else {
                    SetAuth(false);
                }
            } catch (err) {
                SetAuth(false);
            } finally {
                setUpdateUserData(false);
            }
        })();
    }, [isAuth, updateUserData]);
    return (
        <UserContext.Provider value={{isAuth, SetAuth, userData, setUpdateUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;