<!-- Copyright (c) 2023 Ralf Grawunder -->

# Simple Local Web Project

A lightweight web project that runs locally without requiring a web server. Built with HTML5, CSS3, and vanilla JavaScript.

## Features

- Responsive design that works across devices
- Light/dark theme toggle with localStorage persistence
- Clean and organized file structure
- No server or build process required

## Project Rules

Project rules are defined in the `.cursor/rules` file. All development follows the AI-assisted workflow defined there.

## Project Structure

```
project/
├── index.html         # Main HTML file
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
└── assets/            # For images, fonts, etc.
```

## How to Use

1. Simply open the `index.html` file in any modern web browser
2. No installation or server setup required
3. Click the theme button to toggle between light and dark mode
4. Your theme preference will be saved between sessions

## Browser Compatibility

This project uses modern web standards and should work in all recent browsers:
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Uses CSS variables for theming
- Uses localStorage for persistent settings 