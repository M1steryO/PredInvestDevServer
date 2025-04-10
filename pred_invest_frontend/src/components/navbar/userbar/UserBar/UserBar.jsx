import AccountBar from "./AccountBar/AccountBar";
import UnauthorizedBar from "./UnauthorizedBar/UnauthorizedBar";
import {useContext} from "react";
import UserContext from "@/context/auth-context.jsx";

export default function UserBar() {
    const {isAuth} = useContext(UserContext);
    return isAuth ? (
        <AccountBar/>
    ) : (
        <UnauthorizedBar/>
    );
}
