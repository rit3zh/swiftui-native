import { useEffect } from "react";
import {
  registerSwiftUiEvent,
  unregisterSwiftUiEvent,
} from "../utils/swiftUiEventManager";

/**
 * Hook for registering a SwiftUI event based on a key and its typed payload.
 *
 * @template T - The event key (string literal)
 * @template M - The full key-payload map (defined by the user)
 * @param key - The event key (must exist in M)
 * @param handler - A function that receives the typed payload for the given key
 *
 * @example
 * type MyEvents = {
 *   share: { url: string };
 *   submit: { action: "press" };
 * };
 *
 * useSwiftUiEvent<"share", MyEvents>("share", (payload) => {
 *   console.log(payload.url); // fully typed!
 * });
 */
export function useSwiftUiEvent<T extends string, M extends Record<T, object>>(
  key: T,
  handler: (payload: M[T]) => void
): void {
  useEffect(() => {
    const wrappedHandler = (payload: object) => {
      handler(payload as M[T]);
    };

    registerSwiftUiEvent(key, wrappedHandler);
    return () => unregisterSwiftUiEvent(key);
  }, [key, handler]);
}
