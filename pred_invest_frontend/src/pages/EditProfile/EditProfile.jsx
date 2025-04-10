import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import NameField from "../../components/form/NameField/NameField";
import EmailField from "../../components/form/EmailField/EmailField";
import {editUser} from "@/auth-api.js";
import {showErrorNotification, showSuccessNotification} from "@/utils/notifications.js";
import {Button, Form, notification, Typography} from "antd";
import UserContext from "@/context/auth-context.jsx";
import {validateMessages} from "@/utils/validation.js";


const {Title} = Typography;


export default function EditProfile() {
    const {userData, setUpdateUserData} = useContext(UserContext);
    console.log(userData)
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();


    async function onFinish(values) {
        try {
            const result = await editUser(values.name, values.email);
            if (result.status === "OK") {
                setUpdateUserData(true)
                // navigate("/account");
                showSuccessNotification(api,
                    values.name + "!",
                    "Your data successfully updated!");

                return
            }
            showErrorNotification(api, "User with this email already exists!");
        } catch (err) {
            showErrorNotification(api, "An unknown error occurred! Please try again later.");
        }
    }

    return (
        <>
            {contextHolder}
            <Form name="editUser" style={{maxWidth: 600}} layout="vertical" autoComplete="off"
                  className="custom-form text-center my-5 account-settings"
                  validateMessages={validateMessages}
                  onFinish={onFinish}
                  initialValues={{
                      email: userData.email,
                      name: userData.name
                  }}
            >

                <Title>Edit your account</Title>

                <div className="row">
                    <NameField isRequired={true} className="col-6"/>

                    <EmailField isRequired={true} className="col-6"/>
                </div>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" className="submit-form-btn" style={{
                        backgroundColor: "var(--color-yellow)",
                    }}>
                        Edit profile
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
