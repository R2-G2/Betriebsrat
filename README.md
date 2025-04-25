<!-- Copyright (c) 2023 Ralf Grawunder -->

# Simple Local Web Project

A lightweight web project that runs locally without requiring a web server. Built with HTML5, CSS3, and vanilla JavaScript.

## Features

- Responsive design that works across devices
- Light/dark theme toggle with localStorage persistence
- Clean and organized file structure
- No server or build process required

## Project Rules

Project rules are defined in the [documentation](docs/index.md). All development follows the AI-assisted workflow defined there.

## Project Structure

```
project/
├── index.html         # Main HTML file
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── main.js        # JavaScript functionality
│   ├── meeting-animation.js  # Animation logic
│   ├── meeting-topics.json   # Configurable meeting topics
│   └── meeting-phrases.json  # Configurable participant phrases
├── assets/            # For images, fonts, etc.
└── docs/              # Project documentation
    ├── index.md       # Documentation home
    ├── development-rules.md
    ├── workflow.md
    ├── interaction-rules.md
    └── best-practices.md
```

## How to Use

1. Simply open the `index.html` file in any modern web browser
2. No installation or server setup required
3. Click the theme button to toggle between light and dark mode
4. Your theme preference will be saved between sessions

## Customization

You can customize the meeting animation by editing the JSON files:

- `js/meeting-topics.json` - Contains the topics discussed in the meeting
- `js/meeting-phrases.json` - Contains the phrases spoken by participants

These files can be modified manually to add, remove, or change the content displayed in the animation.

## Browser Compatibility

This project uses modern web standards and should work in all recent browsers:
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Uses CSS variables for theming
- Uses localStorage for persistent settings 