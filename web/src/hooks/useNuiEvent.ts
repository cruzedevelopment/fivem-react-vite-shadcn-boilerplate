import { useEffect } from 'react';
import type { NuiHandlers, NuiMessage } from '@/types/fivem';

/**
 * Hook that listens for NUI messages from the client
 * @param handlers - Object containing handler functions for different actions
 */
export function useNuiEvent(handlers: Partial<NuiHandlers>) {
  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessage>) => {
      const { action, data } = event.data;
      
      if (handlers[action]) {
        handlers[action]!(data);
      }
    };

    window.addEventListener('message', eventListener);

    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, [handlers]);
}

/**
 * Hook for managing NUI visibility state
 */
export function useNuiVisibility() {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        // Send hide frame message to client
        fetch('https://haz-functionality/hideFrame', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({}),
        });
      }
    };

    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);
}