import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from 'sonner';
import Login from './pages/Login.tsx';
import Home from "./pages/Home.tsx";
import CreateRoom from "./pages/CreateRoom.tsx";
import Layout from "./pages/Layout.tsx";
import Setting from "./pages/Setting.tsx";
import JoinedRoom from "./pages/JoinedRoom.tsx";
import AdminSetting from "./pages/AdminSetting.tsx";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<Layout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="createRoom" element={<CreateRoom />} />
                        <Route path="setting" element={<Setting />} />
                        <Route path="joinedRoom" element={<JoinedRoom />} />
                        <Route path="adminSetting" element={<AdminSetting />} />
                    </Route>
                </Routes>
            </Router>
            <Toaster position="top-right" richColors visibleToasts={5}
            toastOptions={{
                 duration: 2000,
            }}
            />
        </>
    );
}

export default App
