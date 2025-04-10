import {Button, Result} from "antd";
import notFoundIcon from "@/assets/img/not_found.png"
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Result
            subTitle="Sorry, the page does not exist."
            extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
            icon={<img className="img-fluid" src={notFoundIcon} alt="notFound icon" width={300} height={300} />}
        />
    );
}

export default NotFound;