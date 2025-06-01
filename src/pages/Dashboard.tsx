import React, { useState } from 'react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
    //const apiUrl = import.meta.env.VITE_API_URL;


    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                안녕하세요!
            </div>
        </>

    );
}
export default Dashboard;