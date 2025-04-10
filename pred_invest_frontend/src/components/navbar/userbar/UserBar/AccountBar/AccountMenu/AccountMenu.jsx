import {useNavigate} from "react-router-dom";
import "./AccountMenu.css";
import {useContext} from "react";
import UserContext from "@/context/auth-context.jsx";
import {logoutUser} from "@/auth-api.js";
import {showErrorNotification} from "@/utils/notifications.js";
import {notification} from "antd";

export default function AccountMenu() {
    const navigate = useNavigate();
    const {SetAuth} = useContext(UserContext);
    const [api, contextHolder] = notification.useNotification();

    const logout = async () => {
        try {
            await logoutUser();
            SetAuth(false);
            navigate("/");
        } catch (err) {
            showErrorNotification(api, "An unknown error occurred! Please try again later.");
        }
    };

    return (
        <>
            {contextHolder}
            <ul className="account-menu dropdown-menu">
                <li>
                    <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => navigate("/account")}
                    >
                        My account
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item text-danger"
                        type="button"
                        onClick={logout}
                    >
                        Log out
                    </button>
                </li>
            </ul>
        </>
    );
}
