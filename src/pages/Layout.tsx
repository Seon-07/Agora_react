import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import RoomMenuBar from "../components/room/RoomMenuBar.tsx";
import { Outlet, useLocation } from 'react-router-dom';
import React from "react";


const Home: React.FC = () => {
    const location = useLocation();
    const isRoom = location.pathname.startsWith('/room/');
    return (
        <div className="flex flex-col h-screen">
            <div className="h-1/10 bg-gray-100">
                <Header />
            </div>
            <div className="flex-1 flex flex-col md:flex-col">
                {!isRoom && (
                    <div className="hidden md:block h-1/10 bg-gray-200">
                        <MenuBar />
                    </div>
                )}
                <div className="flex-1 overflow-auto bg-white">
                    <Outlet />
                </div>
                <div className="block md:hidden h-1/10 bg-gray-200">
                    {isRoom ? <RoomMenuBar /> : <MenuBar />}
                </div>
            </div>
        </div>
    );
}
export default Home;