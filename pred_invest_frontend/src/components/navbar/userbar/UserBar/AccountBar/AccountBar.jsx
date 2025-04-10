import AccountMenu from "./AccountMenu/AccountMenu";
import "./AccountBar.css";
import {useContext} from "react";
import UserContext from "@/context/auth-context.jsx";

export default function AccountBar() {
    const {userData} = useContext(UserContext);
    
    return (
        <div className="account-bar navbar-nav ms-auto">
            <button
                className="account-name"
                type="button"
                data-bs-toggle="dropdown">
                {userData.name}
            </button>

            <AccountMenu/>
        </div>
    );
}
