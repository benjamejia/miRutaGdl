import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Este adaptador decide dónde guardar la sesión (encriptado en celular, normal en web)
const isSSR = typeof window === 'undefined';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (isSSR) return null;
    if (Platform.OS === "web") return localStorage.getItem(key);
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (isSSR) return;
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: (key: string) => {
    if (isSSR) return;
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      SecureStore.deleteItemAsync(key);
    }
  },
};

// Jalamos las variables del archivo .env automáticamente
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Inicializamos el cliente oficial de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
