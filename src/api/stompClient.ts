import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

export const getStompClient = (): Client => {
    if (!stompClient) {
        stompClient = new Client({
            brokerURL: import.meta.env.VITE_API_URL.replace(/^http/, 'ws') + '/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }
    return stompClient;
};

//웹소켓 활성화
export const activateStompClient = () => {
    const client = getStompClient();
    if (!client.active) {
        client.activate();
    }
};

export const disconnectStompClient = () => {
    if (stompClient && stompClient.active) {
        stompClient.deactivate();
        stompClient = null;
    }
};