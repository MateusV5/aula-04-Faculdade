# Project Guidelines

## Architecture
Client-side machine learning demo using TensorFlow.js and Google's Teachable Machine for real-time image classification. Single-page HTML application with embedded CSS and JavaScript.

Key components:
- Webcam integration for live video feed
- Pre-trained model loaded from Teachable Machine URL
- Real-time prediction display with confidence visualization

## Build and Test
No build process required. Serve the HTML file directly using any static web server:
- VS Code Live Server extension
- `python -m http.server 8000`
- Any local web server

## Conventions
- **Language**: Portuguese (pt-BR) interface
- **Styling**: Dark theme with cyan/purple accents, responsive design
- **Code structure**: All code in single `index.html` file (HTML, CSS, JS)
- **Dependencies**: CDN-hosted libraries (TensorFlow.js, Bootstrap, Google Fonts)

## Development Notes
- Requires HTTPS or localhost for webcam access
- External model URL may change; check Teachable Machine project
- Test in modern browsers with webcam support
- No offline capability due to remote model loading