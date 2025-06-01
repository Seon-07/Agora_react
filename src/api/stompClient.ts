import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

export const getStompClient = (): Client => {
    if (!stompClient) {
        stompClient = new Client({
            brokerURL: import.meta.env.VITE_API_URL.replace(/^http/, 'ws') + '/ws',
            reconnectDelay: 5000
        });
        stompClient.activate();
    }
    return stompClient;
};