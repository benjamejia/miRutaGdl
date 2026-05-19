# ⚽ MiRutaGdl - Sistema de Movilidad Inteligente (Zapopan / Mundial 2026)

¡Bienvenido a **MiRutaGdl**! El hub y MVP multiplataforma oficial de transporte y orientación urbana desarrollado para la gestión de flujos masivos de visitantes, turistas y ciudadanos locales en el municipio de Zapopan y la Zona Metropolitana de Guadalajara durante la **Copa Mundial de la FIFA 2026**.

Esta aplicación está construida utilizando las tecnologías móviles y web más modernas del ecosistema de JavaScript para garantizar un rendimiento nativo de 60 FPS, capacidades sin conexión en mapas estructurados por capas y actualizaciones síncronas en tiempo real para alertar desvíos, saturación de estaciones de transporte y rutas alternativas de evacuación y acceso prioritario hacia el **Estadio Akron**.

---

## 🚀 Arquitectura Tecnológica (Tech Stack)

El proyecto utiliza la siguiente infraestructura:

* **Framework de UI:** [React Native](https://reactnative.dev/) + [Expo SDK 51+](https://expo.dev/) (Soporte nativo para iOS, Android y entornos Web).
* **Enrutado Dinámico:** Expo Router (Navegación basada en archivos de nivel de producción).
* **Sistema de Diseño:** [Tamagui](https://tamagui.dev/) (Compilador optimizado de estilos atómicos con Tokens semánticos y soporte completo para variantes responsivas móviles-web).
* **Base de Datos y Backend:** [Supabase](https://supabase.com/) (PostgreSQL con extensiones Geoespaciales **PostGIS** para mapeo de vectores y cálculo de proximidades de estaciones, junto con canales **Realtime** para estados de tráfico).
* **Motor de Mapas:** [@rnmapbox/maps](https://github.com/rnmapbox/maps) (Renderizado por hardware mediante la GPU utilizando fuentes GeoJSON dinámicas).

---

## 📋 Requisitos Previos (Prerequisites)

Antes de clonar e instalar el proyecto, asegúrate de tener instalado el siguiente entorno de desarrollo en tu máquina local:

1.  **Node.js:** Versión v20.x o v22.x (LTS recomendada).
2.  **Gestor de Paquetes:** `npm` (incluido con Node) o `bun` / `pnpm` / `yarn`.
3.  **Expo Go / Emuladores:**
    * Para pruebas rápidas en tu teléfono físico: Instala la app **Expo Go** desde la App Store (iOS) o Google Play Store (Android).
    * Para pruebas en la computadora: Xcode instalado (Mac OS para simulador de iOS) y/o Android Studio configurado con un Virtual Device (AVD) ejecutando Android 11 o superior.
4.  **Git:** Para la gestión de versiones del repositorio.

---

## 🛠️ Guía de Instalación Paso a Paso

Sigue detenidamente estos pasos en tu terminal para clonar, instalar las dependencias y levantar el servidor local de desarrollo:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/benjamejia/miRutaGdl.git](https://github.com/benjamejia/miRutaGdl.git)
cd miRutaGdl
