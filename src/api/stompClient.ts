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

        stompClient.onConnect = (frame) => {
            console.log('웹소켓 연결 성공', frame);
        };

        stompClient.onDisconnect = (frame) => {
            console.log('웹소켓 연결 끊김', frame);
        };

        stompClient.onStompError = (frame) => {
            console.error('STOMP 에러:', frame);
        };
    }
    return stompClient;
};

export const activateStompClient = () => {
    const client = getStompClient();
    if (!client.active) {
        console.log('웹소켓 연결 시작');
        client.activate();
    } else {
        console.log('웹소켓 이미 연결됨');
    }
};

export const disconnectStompClient = () => {
    if (stompClient && stompClient.active) {
        console.log('웹소켓 연결 종료');
        stompClient.deactivate();
        stompClient = null;
    }
};