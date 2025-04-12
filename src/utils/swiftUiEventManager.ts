type SwiftUiEventPayload = Record<string, any>;

type EventHandler = (payload: any) => void;

const eventHandlers = new Map<string, EventHandler>();

export const registerSwiftUiEvent = (key: string, handler: EventHandler) => {
  eventHandlers.set(key, handler);
};

export const unregisterSwiftUiEvent = (key: string) => {
  eventHandlers.delete(key);
};

export const handleSwiftUiEvent = (event: SwiftUiEventPayload) => {
  for (const key in event) {
    if (key.startsWith(".$")) {
      const actionKey = key.substring(2);
      const handler = eventHandlers.get(actionKey);
      if (handler) {
        handler(event[key]);
      } else {
        console.warn(`No handler registered for actionKey: ${actionKey}`);
      }
    }
  }
};
