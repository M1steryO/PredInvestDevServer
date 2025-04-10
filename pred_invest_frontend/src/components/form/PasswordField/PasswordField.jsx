import {Form, Input} from "antd";


export default function PasswordField(props) {
    const {
        isRequired = false,
        name = "password",
        label = "Password",
        placeholder = "Password",
        checkValidity = true
    } = props

    function validatePassword(_, password) {
        const lengthCheck = password.length >= 8;
        if (!lengthCheck) {
            return Promise.reject(new Error('Password must contains at least 8 characters.'));
        }

        const upperCaseCheck = /[A-Z]/.test(password);
        if (!upperCaseCheck) {
            return Promise.reject(new Error('Password must contain at least one uppercase letter.'));
        }

        const lowerCaseCheck = /[a-z]/.test(password);
        if (!lowerCaseCheck) {
            return Promise.reject(new Error('Password must contain at least one lowercase letter.'));
        }

        const digitCheck = /[0-9]/.test(password);
        if (!digitCheck) {
            return Promise.reject(new Error('Password must contain at least one number.'));
        }

        const specialCharCheck = /[^A-Za-z0-9]/.test(password);
        if (!specialCharCheck) {
            return Promise.reject(new Error('Password must contain at least one special character.'));
        }

        return Promise.resolve();
    }

    let rules = [{
        required: isRequired,
    }]
    if (name === "password" && checkValidity) {
        rules.push({
            validator: validatePassword
        })
    } else if (name === "confirm_password") {
        rules.push(({getFieldValue}) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
            },
        }))
    }

    return (
        <Form.Item
            hasFeedback={checkValidity}
            label={label}
            name={name}

            validateDebounce={1000}
            rules={rules}>
            <Input.Password
                placeholder={placeholder}
            />
        </Form.Item>
    )
}





