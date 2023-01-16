import { useEffect } from "react";


interface UseWebSocketProps {
  onOpen?: () => void;
  onMessage?: (event: MessageEvent<any>) => void;
  onClose?: () => void;
}

const useWebsocket = ({
  onOpen,
  onMessage,
  onClose,
}: UseWebSocketProps) => {
  const token: any = localStorage.getItem('token');
  
  useEffect(() => {
    const ws = new WebSocket(`${process.env.SOCKET_URL}/user?token=${JSON.stringify(token).replaceAll(/[",\\]/g, '')}`);
    ws.onopen = () => {
      onOpen && onOpen();
      console.log('Connected to WebSocket');
    };
    ws.onmessage = (event) => {
      onMessage && onMessage(event);
      console.log(event.data);
    };
    ws.onclose = () => {
      onClose && onClose();
      console.log('Disconnected from WebSocket');
    };

    () => {
      ws.close();
    }
  }, [])
}

export default useWebsocket;