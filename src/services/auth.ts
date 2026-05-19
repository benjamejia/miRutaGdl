import { supabase } from "../lib/supabase";

/**
 * Registra un nuevo usuario con correo y contraseña en Supabase.
 */
export const registrarUsuario = async (correo: string, contrasena: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: correo,
    password: contrasena,
  });

  // En lugar de hacer console.log aquí, retornamos el error o la data
  // para que la pantalla de la app pueda mostrar un mensaje visual al usuario.
  if (error) throw new Error(error.message);

  return data.user;
};

/**
 * Inicia sesión de un usuario existente.
 */
export const iniciarSesion = async (correo: string, contrasena: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });

  if (error) throw new Error(error.message);

  return data.user;
};

/**
 * Cierra la sesión actual del dispositivo.
 */
export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
