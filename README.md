# macOS-Style Portfolio

A beautiful, interactive portfolio website designed to look and feel like macOS, built with React. This project showcases various applications including a weather app, music player, calculator, terminal, and more, all styled to match the macOS aesthetic.

## Features

### 🎨 macOS Design

- Authentic macOS window styling with title bars, close/minimize/maximize buttons
- Dock with app icons and hover effects
- Menu bar with system information
- Dark/light mode support
- Smooth animations and transitions

### 📱 Applications

#### Weather App

- **Real-time weather data** via Google Maps API
- **Geolocation support** - automatically detects user's location
- **City search** functionality - search by city, address, or landmark
- **Detailed weather information** including temperature, humidity, wind, pressure, visibility
- **Sunrise/sunset times**
- **Responsive weather icons**
- **Smart weather generation** based on location and time

#### Music Player

- **Demo playlist** with 8 classic tracks
- **Full player controls** - play, pause, skip, volume control
- **Playlist management** - click any track to play
- **Visual feedback** - album art and track information
- **macOS styling** - consistent with overall design

#### Calculator

- Full-featured calculator with scientific functions
- macOS-style button design
- Keyboard support

#### Terminal

- Interactive terminal interface
- Command history
- Basic command support

#### Notes App

- Rich text editor
- Note management
- Local storage

#### Flappy Bird Game

- Classic Flappy Bird gameplay
- Canvas-based graphics
- Score tracking

## API Integrations

### Weather API (Google Maps)

- Real-time weather data for any location
- Free tier: $200 credit per month
- Automatic geolocation detection
- Search functionality
- Reverse geocoding

For detailed setup instructions, see [API_SETUP.md](./API_SETUP.md).

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rajeshport
```

2. Install dependencies:

```bash
npm install
```

3. Set up API keys (optional):

   - Follow the instructions in [API_SETUP.md](./API_SETUP.md)
   - Create a `.env` file with your Google Maps API key

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Project Structure

```
src/
├── Components/          # React components
│   ├── Desktop.js      # Main desktop interface
│   ├── Dock.js         # macOS-style dock
│   ├── MenuBar.js      # Top menu bar
│   ├── Window.js       # Window component
│   ├── Weather.js      # Weather app with Google Maps integration
│   ├── MusicPlayer.js  # Music player (demo mode)
│   ├── Calculator.js   # Calculator app
│   ├── Terminal.js     # Terminal app
│   ├── Notes.js        # Notes app
│   └── FlappyBirdClassic.js # Game component
├── assets/             # Images and static assets
└── utils/              # Utility functions
```

## Technologies Used

- **React** - Frontend framework
- **CSS3** - Styling with custom properties and animations
- **Lucide React** - Icon library
- **Google Maps API** - Weather and geolocation services
- **HTML5 Canvas** - Game graphics

## Customization

### Adding New Apps

1. Create a new component in `src/Components/`
2. Add the app icon to `src/assets/`
3. Register the app in `src/Components/Desktop.js`
4. Style the component to match macOS design

### Styling

- All styles follow macOS design principles
- Use CSS custom properties for consistent theming
- Support both light and dark modes
- Responsive design for different screen sizes

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy: `npm run deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by macOS
- Icons from [Lucide React](https://lucide.dev/)
- Weather data via [Google Maps API](https://developers.google.com/maps)
# PortfolioRajesh
