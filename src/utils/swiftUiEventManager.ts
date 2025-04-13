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
    const normalizedKey = key.startsWith(".$") ? key.substring(2) : key;
    const handler = eventHandlers.get(normalizedKey);

    if (handler) {
      handler(event[key]);
    }
  }
};
