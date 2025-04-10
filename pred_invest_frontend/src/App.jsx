import './App.css';
import {UserContextProvider} from "@/context/auth-context.jsx";
import AppRoutes from "@/components/AppRoutes.jsx";
import {ConfigProvider} from "antd";

const theme = {
    components: {
        Select: {
            activeBorderColor: "var(--color-yellow)",
            hoverBorderColor: "var(--color-yellow)",
            activeOutlineColor: "rgba(255, 243, 0, 0.32)",
            optionSelectedBg: "var(--color-yellow)",
        },
    },
}

function App() {
    return (
        <ConfigProvider theme={theme}>
            <UserContextProvider>
                <AppRoutes/>
            </UserContextProvider>
        </ConfigProvider>
    );
}

export default App;
