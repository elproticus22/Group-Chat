# Portal Oficial del Grupo "אוננות בפעולה"

Bienvenido al sitio web oficial del grupo de WhatsApp **"אוננות בפעולה"**, una sátira política y social organizada por y para sus miembros.  
Este proyecto busca centralizar todo el caos, la ideología, los memes de calidad, y la estructura gubernamental de nuestro grupo en una sola página web.

## ¿Qué incluye esta página?

La web se compone de varios módulos independientes que juntos forman el centro de operaciones del grupo:

### Miguel - El Chatbot Oficial
Un asistente IA sin filtros que responde con sarcasmo, humor negro y complicidad absoluta.  
Entrenado con nuestra gloriosa Constitución y siempre dispuesto a seguir el juego.

### Constitución del Grupo
Texto completo de nuestra Constitución, versión vigente, artículos detallados, y un resumen legalmente cuestionable.

### Sistema de Votación *(En proceso)*
Plataforma para votar por reformas constitucionales, candidatos, leyes absurdas o simplemente para insultar al presidente actual mediante democracia directa.

###  Presidente y Partido Político Actual *(En proceso)*
Sección que muestra el partido gobernante (actualmente **Centro Demoniaco**) y su presidente(actualmente **Jhan Zamora**) vitalicio o derrocable.  
Incluye lema, visión del régimen, y propaganda autoritaria.

###  Página de Miembros *(En proceso)*
Galería con perfiles personalizados de cada integrante del grupo. Biografías reales o inventadas, fotos humillantes, y niveles de actividad o pendejez.

###  Candidatos y Partidos Políticos *(En proceso)*
Donde los miembros pueden postularse a elecciones, fundar partidos y explicar por qué merecen el poder absoluto (aunque no lo obtendrán).

---

## Tecnologías Usadas

- **React** – Estructura principal del sitio.
- **Vite** – Compilación ultrarrápida.
- **TailwindCSS** – Estilizado con flow y memes.
- **Componentes modulares** – Cada página del sitio es un módulo dinámico e independiente.
- **Framer Motion** - Para animaciones fluidas y una pagina mas interactiva
- **Styled components** - Para algunos estilos
- **Open Router** – Para Miguel.

---
## Cómo usar el proyecto

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/elproticus22/Group-Chat
   cd Group-Chat
   ```

2. **Instala las dependencias**  
   ```bash
   npm install
   ```

3. **Agrega tu API key en un archivo `.env`**  
   Crea un archivo llamado `.env` en la raíz del proyecto y añade tu clave de OpenRouter así:

   ```env
   VITE_OPENROUTER=sk-xxxxxx...
   ```

   Si no tienes una clave, puedes generar una gratis en:  
   👉[https://openrouter.ai/](https://openrouter.ai/)

4. **Ejecuta el proyecto en modo desarrollo**  
   ```bash
   npm run dev
   ```

---

## 📄Archivo `.env.example`

Este archivo sirve como plantilla para que otros usuarios sepan qué variables de entorno deben definir. Ya contiene:

```env
VITE_OPENROUTER=your_api_key_here
```

Asegúrate de **no subir tu archivo `.env` real** al repositorio. Puedes evitarlo incluyendo esta línea en tu archivo `.gitignore`:

```gitignore
.env
```

---

##  Configuración rápida

1. Copia el archivo `.env.example` y renómbralo a `.env`.
2. Reemplaza `your_api_key_here` con tu clave real de OpenRouter.
3. Luego ejecuta el proyecto con:

   ```bash
   npm run dev
   ```
