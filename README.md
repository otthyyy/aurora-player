# Aurora Player 🎵

A premium music player built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Experience music like never before with beautiful animations, personalized recommendations, and a modern interface.

## ✨ Features

### 🎯 MVP Features
- **Animated Home Page**: Hero section with quick actions and personalized recommendations
- **Playlist Management**: Create, edit, delete, and share playlists
- **Liked Songs**: Save and manage your favorite tracks
- **Onboarding Wizard**: Personalized setup for genres, artists, and preferences
- **Smart Recommendations**: AI-powered music suggestions based on your taste
- **Fixed Player Bar**: Always-visible player with play/pause, seek, volume, and queue controls
- **Theme System**: Dark/light mode with smooth transitions
- **Accessibility**: Keyboard shortcuts and focus management

### 🎨 Design Features
- **Premium Animations**: Smooth Framer Motion animations throughout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist interface with gradient accents
- **Micro-interactions**: Hover effects, button animations, and loading states
- **Glass Morphism**: Beautiful translucent elements and backdrop blur

### 🔧 Technical Features
- **TypeScript**: Full type safety and excellent developer experience
- **Next.js 14**: Latest App Router with server components
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Advanced animations and gestures
- **Local Storage**: Persistent user preferences and data
- **Mock API**: Complete fake API for development and testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aurora-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── playlists/          # Playlists page
│   ├── liked/              # Liked songs page
│   └── playlist/[id]/      # Playlist detail page
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── player/             # Music player components
│   ├── playlist/           # Playlist components
│   ├── onboarding/         # Onboarding wizard
│   ├── ThemeProvider.tsx   # Theme context
│   └── ThemeToggle.tsx     # Theme switcher
├── lib/                    # Utility libraries
│   ├── fakeApi.ts          # Mock API functions
│   ├── recommend.ts        # Recommendation algorithm
│   ├── storage.ts          # Local storage utilities
│   └── utils.ts            # Helper functions
└── types/                  # TypeScript type definitions
    ├── track.ts            # Track interfaces
    ├── playlist.ts         # Playlist interfaces
    └── user.ts             # User interfaces
```

## 🎵 Usage

### First Time Setup
1. **Onboarding**: Complete the setup wizard to personalize your experience
2. **Explore**: Browse recommended tracks and featured playlists
3. **Create Playlists**: Build your own music collections
4. **Like Songs**: Save tracks to your liked songs collection

### Keyboard Shortcuts
- **Space**: Play/Pause current track
- **J**: Previous track
- **K**: Next track
- **L**: Like/Unlike current track
- **M**: Mute/Unmute
- **↑/↓**: Volume up/down
- **←/→**: Seek backward/forward

### Player Controls
- **Play/Pause**: Click the main play button or press Space
- **Seek**: Drag the progress bar or use arrow keys
- **Volume**: Hover over volume icon to reveal slider
- **Queue**: Click queue icon to view and manage track queue
- **Shuffle/Repeat**: Toggle shuffle and repeat modes

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Automatic code formatting
- **Tailwind**: Utility-first CSS approach

### Component Guidelines
- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Add loading states for async operations
- Include accessibility attributes
- Use Framer Motion for animations

## 🔮 Future Integrations

### TODO List for Real API Integration

#### 🎵 Music Services
- [ ] **YouTube Music API**: Stream music from YouTube
- [ ] **Spotify Web API**: Access Spotify's music catalog
- [ ] **SoundCloud API**: Stream from SoundCloud
- [ ] **Apple Music API**: Integration with Apple Music
- [ ] **Audio Streaming**: Real audio playback implementation

#### 👤 User Management
- [ ] **Authentication**: User login/signup system
- [ ] **User Profiles**: Personal profiles and preferences
- [ ] **Social Features**: Follow users, share playlists
- [ ] **Cloud Sync**: Sync data across devices
- [ ] **Premium Features**: Subscription management

#### 🗄️ Data Persistence
- [ ] **Database**: PostgreSQL/MongoDB for data storage
- [ ] **File Storage**: AWS S3 for audio files and covers
- [ ] **CDN**: Global content delivery network
- [ ] **Caching**: Redis for performance optimization
- [ ] **Backup**: Automated data backup system

#### 🤖 AI & Recommendations
- [ ] **Machine Learning**: Advanced recommendation algorithms
- [ ] **Audio Analysis**: BPM, key, mood detection
- [ ] **Collaborative Filtering**: User-based recommendations
- [ ] **Content-Based Filtering**: Track similarity analysis
- [ ] **Hybrid Systems**: Combined recommendation approaches

#### 📱 Mobile & Desktop
- [ ] **PWA**: Progressive Web App features
- [ ] **Mobile App**: React Native or Flutter
- [ ] **Desktop App**: Electron wrapper
- [ ] **Offline Mode**: Download tracks for offline listening
- [ ] **Background Play**: Continue playing when app is closed

#### 🔧 Advanced Features
- [ ] **Real-time Sync**: Live collaboration on playlists
- [ ] **Voice Commands**: "Hey Aurora, play jazz music"
- [ ] **Smart Playlists**: Auto-generated based on criteria
- [ ] **Crossfade**: Smooth transitions between tracks
- [ ] **Audio Effects**: Equalizer, reverb, etc.

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple gradient (#a855f7 to #ec4899)
- **Accent**: Orange gradient (#f97316 to #f59e0b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500
- **Code**: Monospace font

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

### Animations
- **Duration**: 200ms for micro-interactions, 500ms for page transitions
- **Easing**: Spring animations for natural feel
- **Stagger**: 50ms delay between sequential animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS approach
- **Framer Motion**: For the smooth animations
- **Lucide React**: For the beautiful icons
- **Vercel**: For the deployment platform

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Join our Discord community

---

**Made with ❤️ by the Aurora Player Team**

*Experience music like never before* 🎵✨
