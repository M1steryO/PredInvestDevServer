import {useContext} from "react";
import UserContext from "@/context/auth-context.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home/Home.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Account from "@/pages/Account/Account.jsx";
import EditProfile from "@/pages/EditProfile/EditProfile.jsx";
import Dashboards from "@/pages/Dashboards/Dashboards.jsx";
import Nav from "@/components/navbar/Nav.jsx";
import Footer from "@/components/footer/Footer.jsx";
import NotFound from "@/pages/NotFound.jsx";

export default function AppRoutes() {
    const {isAuth, userData} = useContext(UserContext);

    const routes = (
        <Routes>
            <Route path="/" element={<Home/>}/>
            {!isAuth ? (
                <>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </>
            ) : (
                <>
                    <Route path="/account" element={<Outlet/>}>
                        <Route index element={<Account userData={userData}/>}/>
                        <Route path="edit" element={<EditProfile userData={userData}/>}/>
                    </Route>
                    <Route path="/dashboards" element={<Dashboards/>}/>
                </>
            )}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );

    return (
        <BrowserRouter>
            <Nav/>
            <main>
                <div className="content">
                    {routes}
                </div>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}