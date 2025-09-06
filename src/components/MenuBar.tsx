import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import CommonIcon from './common/CommonIcon.tsx';
import { useNavigate, useLocation } from 'react-router-dom';

interface Menu {
    icon: string;
    menuName: string;
    uri: string;
}

const MenuBar = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get(apiUrl + '/api/menu');
                setMenus(res.data.data);
            } catch (err) {
                console.error('메뉴 요청 실패:', err);
            }
        })();
    }, []);

    return (
        <div className="flex justify-around items-center bg-gray-100 h-full px-4 md:px-2">
            {menus.map((menu) => {
                const isActive = location.pathname === menu.uri;
                return (
                    <button
                        key={menu.uri}
                        onClick={() => navigate(menu.uri)}
                        className="flex flex-col items-center hover:text-black"
                    >
                        <CommonIcon
                            name={menu.icon}
                            className={`text-lg ${isActive ? 'text-[#4296FF]' : 'text-black'}`}
                        />
                        <span
                            className={`text-xs mt-1 ${isActive ? 'text-[#4296FF]' : 'text-black'}`}
                        >
                            {menu.menuName}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default MenuBar;