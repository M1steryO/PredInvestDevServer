import {Button, Form, notification, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import "../components/form/CustomForm.css";
import {registerUser} from "@/auth-api.js";
import NameField from "@/components/form/NameField/NameField.jsx";
import EmailField from "@/components/form/EmailField/EmailField.jsx";
import PasswordField from "@/components/form/PasswordField/PasswordField.jsx";
import {showErrorNotification} from "@/utils/notifications.js";
import {validateMessages} from "@/utils/validation.js";

const {Title, Paragraph, Link} = Typography;

export default function Register() {

    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    async function onFinish(values) {
        const {name, email, password} = values;
        try {
            const result = await registerUser(name, email, password);
            if (result.status === "OK") {
                navigate("/login");
                return;
            }
            showErrorNotification(api, "User with this email already exists.");
        } catch (err) {
            showErrorNotification(api, "An unknown error occurred! Please try again later.");
        }
    }


    return (
        <>
            {contextHolder}
            <Form name="register" style={{maxWidth: 600}} layout="vertical" autoComplete="off"
                  className="custom-form text-center my-5"
                  validateMessages={validateMessages}
                  onFinish={onFinish}>
                <Title>Create your account</Title>

                <div className="row">
                    <NameField isRequired={true}
                               className="col-6"/>

                    <EmailField className="col-6"/>
                </div>

                <PasswordField/>
                <PasswordField isRequired={true} name="confirm_password" label="Confirm password"
                               placeholder="Confirm password"/>
                <Paragraph className="text-start">
                    By clicking “Sign up”, you agree to our <Link to="/">terms of service</Link> and acknowledge you
                    have
                    read our{" "}
                    <Link to="/">privacy policy</Link>
                </Paragraph>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" className="submit-form-btn">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </>

    );


}
