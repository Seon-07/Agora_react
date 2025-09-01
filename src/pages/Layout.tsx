import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import RoomMenuBar from "../components/room/RoomMenuBar.tsx";
import { Outlet, useLocation } from 'react-router-dom';
import React from "react";


const Home: React.FC = () => {
    const location = useLocation();
    const isRoom = location.pathname.startsWith('/room/');
    return (
        <>
            <div className="flex flex-col h-screen overflow-hidden relative">
                <div className="h-16 fixed top-0 left-0 w-full z-20 bg-white ">
                    <Header />
                </div>
                <div className="h-20 md:h-16 fixed bottom-0 md:top-16 left-0 w-full z-10 bg-white">
                    {isRoom && <div className="block md:hidden"><RoomMenuBar /></div>}
                    {!isRoom && <MenuBar />}
                </div>
                <div className="pt-16 pb-20 md:pb-16 md:pt-32 h-full overflow-auto">
                    <Outlet />
                </div>
            </div>
        </>

    );
}
export default Home;