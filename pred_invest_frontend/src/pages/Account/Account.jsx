import {useNavigate} from "react-router-dom";
import "./Account.css";
import {useContext} from "react";
import UserContext from "@/context/auth-context.jsx";
import {Card} from "antd";

export default function Account() {
    const navigate = useNavigate();
    const {userData} = useContext(UserContext);

    return (
        <section className="container py-5 h-100">
            <div className="account-card">
                <div className="account-header">
                    <h1 className="page-title">My account</h1>
                    <div className="d-flex">
                        <div className="d-flex gap-4 account-data">
                            <div className="account-details">
                                <h5>{userData.name}</h5>
                                <p className="block-value">{userData.email}</p>
                            </div>

                        </div>
                        <div className="edit-profile-btn-container">
                            <button
                                type="button"
                                className="btn edit-profile-btn"
                                onClick={() => navigate("/account/edit")}>
                                Edit profile
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
