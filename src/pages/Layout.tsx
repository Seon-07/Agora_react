import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import RoomMenuBar from "../components/room/RoomMenuBar.tsx";
import { Outlet, useLocation } from 'react-router-dom';
import React from "react";


const Home: React.FC = () => {
    const location = useLocation();
    const isRoom = location.pathname.startsWith('/room/');
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="md:h-1/10 h-1/12 bg-blue-50">
                <Header />
            </div>
            <div className="flex flex-col md:h-9/10 h-11/12 overscroll-contain">
                {!isRoom ? (
                    <>
                        <div className="hidden md:block h-1/12 bg-gray-200">
                            <MenuBar />
                        </div>
                        <div className="h-full overflow-auto bg-white">
                            <Outlet />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="md:h-full h-11/12 overflow-auto bg-white">
                            <Outlet />
                        </div>
                        <div className="block md:hidden h-1/12 bg-gray-200">
                            <RoomMenuBar />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default Home;