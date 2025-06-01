import { useEffect } from 'react';
import { getStompClient } from '../api/stompClient';
import type { IMessage, StompSubscription } from '@stomp/stompjs';

const WebSocketClient = () => {
    useEffect(() => {
        const client = getStompClient();
        if (!client.connected) {
            console.log('STOMP 연결 시도 중...');
        } else {
            console.log('이미 연결됨');
        }
        const subscription: StompSubscription = client.subscribe('/topic/greetings', (message: IMessage) => {
            console.log('📩 받은 메시지:', message.body);
        });
        return () => {
            subscription.unsubscribe();
            console.log('구독 해제');
        };
    }, []);
    return null;
};
export default WebSocketClient;