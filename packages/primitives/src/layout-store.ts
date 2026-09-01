import { useSyncExternalStore } from "react";
import type { LayoutState } from "./types.js";

const emptyLayoutState: LayoutState = {
  pages: 1,
  sequences: {},
  targets: {},
  regions: {},
  explicitPages: {},
};

let layoutState = emptyLayoutState;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function apply(state: LayoutState) {
  layoutState = state;
  listeners.forEach((listener) => listener());
}

export function useLayoutState() {
  return useSyncExternalStore(
    subscribe,
    () => layoutState,
    () => emptyLayoutState,
  );
}

declare global {
  interface Window {
    __RR_APPLY_LAYOUT_STATE__?: (state: LayoutState) => void;
  }
}

if (typeof window !== "undefined") window.__RR_APPLY_LAYOUT_STATE__ = apply;
