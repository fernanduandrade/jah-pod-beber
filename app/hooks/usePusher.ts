import { useEffect, useState, useRef } from 'react';
import { getPusherClient, PUSHER_CHANNEL, PUSHER_EVENT } from '../lib/pusher';
import type { Channel } from 'pusher-js';

interface VisitorCountUpdate {
  count: number;
}

export function usePusher() {
  const [count, setCount] = useState<number | null>(null);
  const pusherRef = useRef<ReturnType<typeof getPusherClient> | null>(null);
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    pusherRef.current = getPusherClient();
    channelRef.current = pusherRef.current.subscribe(PUSHER_CHANNEL);

    channelRef.current.bind(PUSHER_EVENT, (data: VisitorCountUpdate) => {
      if (typeof data.count === 'number') {
        setCount(data.count);
      }
    });

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        channelRef.current.unsubscribe();
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  return { count };
}

