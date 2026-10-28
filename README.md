# Capacitación en Tecnovigilancia · Biosteel de Colombia

Sitio estático (GitHub Pages) con el programa institucional de capacitación en Tecnovigilancia, según la Resolución 4816 de 2008. Material elaborado por Karina Rueda, Directora Técnica de Biosteel de Colombia S.A.S.

## Contenido

| Módulo | Dirigido a | Duración |
|---|---|---|
| 1. Fundamentos Legales | Asistencial y Almacén | 2 horas |
| 2. Identificación y Reporte Clínico | Solo Asistencial | 3 horas |
| 3. Trazabilidad, Alertas y Retiros | Solo Almacén | 3 horas |

Cada módulo incluye encuesta previa, material paso a paso, visor de las diapositivas originales, descarga del PDF y encuesta final (Microsoft Forms).

## Estructura

```
index.html          Página única (navegación por #/ rutas)
css/styles.css      Identidad visual Biosteel (tokens, componentes)
js/app.js           Contenido de los módulos, progreso y visor
assets/img          Logos e ilustraciones
assets/slides       Diapositivas originales en JPG
assets/pdf          Presentaciones originales en PDF
```

El avance de cada persona se guarda únicamente en su navegador (`localStorage`); no se envía a ningún servidor.

## Publicar en GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `/ (root)`.

## Contacto

Dudas: karina.rueda@biosteeldecolombia.com
