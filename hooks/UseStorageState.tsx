import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
	return useReducer((state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action], initialValue) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
	if (Platform.OS === "web") {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (e) {
			console.error("Local storage is unavailable:", e);
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
}

export function useStorageState(key: string): UseStateHook<string> {
	// Public
	const [state, setState] = useAsyncState<string>();

	// Get
	useEffect(() => {
		(async () => {
			if (Platform.OS === "web") {
				try {
					if (typeof localStorage !== "undefined") {
						setState(localStorage.getItem(key));
					}
				} catch (e) {
					console.error("Local storage is unavailable:", e);
				}
			} else {
				try {
					const sessionid = await SecureStore.getItemAsync(key);
					setState(sessionid);
				} catch (e) {
					console.error("Secure store is unavailable:", e);
				}
			}
		})();
	}, [key]);

	// Set
	const setValue = useCallback(
		async (value: string | null) => {
			try {
				setState(value);
				await setStorageItemAsync(key, value);
			} catch (error) {
				console.error("Error setting storage item:", error);
			}
		},
		[key]
	);

	return [state, setValue];
}
