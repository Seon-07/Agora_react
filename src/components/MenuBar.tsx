import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import CommonIcon from '../components/CommonIcon';
import { useNavigate } from 'react-router-dom';

interface Menu {
    icon: string;
    menuName: string;
    uri: string;
}

const MenuBar = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const navigate = useNavigate();
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
        <div className="flex justify-around items-center bg-gray-100 h-20 md:h-16 px-4 md:px-2">
            {menus.map((menu) => (
                <button
                    key={menu.uri}
                    onClick={() => navigate(menu.uri)}
                    className="flex flex-col items-center text-gray-700 hover:text-black"
                >
                    <CommonIcon name={menu.icon} className="text-lg" />
                    <span className="text-xs mt-1">{menu.menuName}</span>
                </button>
            ))}
        </div>
    );

}
export default MenuBar;