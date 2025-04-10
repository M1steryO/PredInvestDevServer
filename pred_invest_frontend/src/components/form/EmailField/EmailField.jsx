import {Form, Input} from "antd";


export default function EmailField(props) {
    const {
        isRequired = false,
        placeholder = "mail@example.com",
        checkValidity = true,
        className = "",
        value = ""
    } = props;

    let rules = [
        {required: {isRequired}}
    ]
    if (checkValidity) {
        rules.push({type: 'email'})
    }


    return (
        <Form.Item
            hasFeedback={checkValidity}
            label="Email"
            name="email"
            validateDebounce={1000}
            rules={rules}
            className={className}
        ><Input placeholder={placeholder} defaultValue={value}/>
        </Form.Item>

    )
}

