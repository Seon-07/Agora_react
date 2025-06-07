import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login.tsx';
import Dashboard from "./pages/Dashboard.tsx";
import Content from "./components/Content.tsx";
import React from "react";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Content />} />
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
