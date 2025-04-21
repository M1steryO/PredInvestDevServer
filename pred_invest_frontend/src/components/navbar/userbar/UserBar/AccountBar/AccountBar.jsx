import AccountMenu from "./AccountMenu/AccountMenu";
import "./AccountBar.css";

export default function AccountBar({userName}) {

    return (
        <div className="account-bar navbar-nav ms-auto">
            <button
                className="account-name"
                type="button"
                data-bs-toggle="dropdown">
                {userName}
            </button>

            <AccountMenu/>
        </div>
    );
}
