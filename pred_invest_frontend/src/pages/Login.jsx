import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import "../components/form/CustomForm.css";
import {loginUser} from "../auth-api";
import UserContext from "@/context/auth-context.jsx";
import EmailField from "@/components/form/EmailField/EmailField.jsx";
import PasswordField from "@/components/form/PasswordField/PasswordField.jsx";
import {Button, Form, notification, Typography} from "antd";
import {showErrorNotification} from "@/utils/notifications.js";

const {Title} = Typography;


export default function Login() {
    const {SetAuth, setUpdateUserData} = useContext(UserContext);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();


    async function onFinish(values) {
        const {email, password} = values;
        try {
            const result = await loginUser(email, password);

            if (result.status === "OK") {
                SetAuth(true)
                setUpdateUserData(true)
                navigate("/");
                return
            }

            showErrorNotification(api, "User not exists or incorrect password");

        } catch (error) {
            showErrorNotification(api, "An unknown error occurred! Please try again later.");
        }
    }


    return (
        <>
            {contextHolder}
            <Form name="login" layout="vertical" autoComplete="on"
                  className="custom-form text-center my-5"
                  onFinish={onFinish}>
                <Title>Log into your account</Title>

                <EmailField isRequired={true} checkValidity={false} placeholder="Email"/>

                <PasswordField isRequired={true} checkValidity={false}/>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" className="submit-form-btn">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
