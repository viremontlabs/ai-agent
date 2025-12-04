import React from "react";

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", {key, newValue}));
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback: (event: StorageEvent) => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getLocalStorageServerSnapshot = <T>(initialValue: T) => {
  return JSON.stringify(initialValue);
};

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const getSnapshot = () => getLocalStorageItem(key);

  const initialValueRef = React.useRef(initialValue);

  const store = React.useSyncExternalStore(useLocalStorageSubscribe, getSnapshot, () =>
    getLocalStorageServerSnapshot(initialValueRef.current),
  );

  const setState = React.useCallback(
    (v: unknown) => {
      try {
        const nextState = typeof v === "function" ? v(JSON.parse(store!)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store],
  );

  React.useEffect(() => {
    if (getLocalStorageItem(key) === null && initialValue !== "undefined") {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
