import { useEffect } from "react";

interface WebSocketDataType {
  type: number;
  change: boolean;
  chanel?: string;
}
interface UseWebSocketProps {
  onOpen?: () => void;
  onMessage?: (data: WebSocketDataType, event: MessageEvent<any>) => void;
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
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage && onMessage({change: data?.change, type: data?.type ?? -1}, event);
    };
    ws.onclose = () => {
      onClose && onClose();
    };

    () => {
      ws.close();
    }
  }, [])
}

export default useWebsocket;