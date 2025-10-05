# Laptop 3D animada (React + Three.js)

Este proyecto usa [Vite](https://vitejs.dev/), [React](https://react.dev/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) y [@react-three/drei](https://github.com/pmndrs/drei) para cargar y animar un modelo `.glb` de una laptop. Al presionar la tecla **T** se reproduce la animación de apertura del modelo y aparece un texto con una transición suave.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- Archivo `model.glb` ubicado en la carpeta `public/` (el repositorio incluye un marcador de posición `.gitkeep`; reemplázalo por tu modelo).

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

El comando anterior iniciará Vite y podrás acceder a la aplicación en [http://localhost:5173](http://localhost:5173).

## Construcción para producción

```bash
npm run build
```

Para previsualizar la build generada utiliza:

```bash
npm run preview
```

## Uso

1. Inicia el servidor de desarrollo.
2. Abre la aplicación en el navegador.
3. Presiona la tecla **T** para abrir/cerrar la laptop y mostrar el texto animado.

## Estructura relevante

- `src/App.jsx`: Configuración de la escena, luces, cámara y controles.
- `src/ModelAnimated.jsx`: Carga del modelo GLB, manejo de animación y texto emergente.
- `src/main.jsx`: Punto de entrada de React.
- `public/model.glb`: Modelo 3D de la laptop (debes proporcionar este archivo).

## Notas

- El proyecto usa controles orbitales para que puedas ajustar la cámara con el mouse.
- Asegúrate de que el modelo GLB incluya una animación en su primer clip (por ejemplo, abrir/cerrar la laptop) para aprovechar el disparo con la tecla **T**.
