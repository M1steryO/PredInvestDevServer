import {Form, Input} from "antd";


export default function NameField(props) {
    const {isRequired = false, placeholder = "Name", className = "", value = ""} = props;
    return (
        <Form.Item
            hasFeedback
            label="Name"
            name="name"
            validateTrigger="onBlur"
            rules={[{required: isRequired}]}
            className={className}
        >
            <Input placeholder={placeholder} defaultValue={value}/>
        </Form.Item>
    )
}

