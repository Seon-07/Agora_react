import { useUserStore } from '../stores/userStore';
import logo from '../assets/images/Fair-In_logo.png';

const Header = () => {
    const username = useUserStore((state) => state.username);
    const clearUsername = useUserStore((state) => state.clearUsername);

    const handleLogout = () => {
        clearUsername();
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gray-100">
            <img src={logo} alt="logo" className="h-10" />
            <div className="flex items-center gap-4">
                <span className="font-bold">{username} 님</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default Header;