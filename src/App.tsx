import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App
