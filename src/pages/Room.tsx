import { useLocation } from 'react-router-dom';

const Room = () => {
    const { state } = useLocation();
    return (
        <div>
            <h1>{state?.name}</h1>
            <p>{state?.topic}</p>
            <span>{state?.status}</span>
        </div>
    );
}
export default Room;