/**
 * Mock API for Aurora Player
 * TODO: Replace with real API calls to YouTube Music, Spotify, or SoundCloud
 */

import { Track, Playlist, UserPreferences, OnboardingData } from '@/types';

// Mock data
const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: '/audio/blinding-lights.mp3',
    genre: 'Pop',
    year: 2020,
    isLiked: false,
    playCount: 0,
    addedAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    audioUrl: '/audio/levitating.mp3',
    genre: 'Pop',
    year: 2020,
    isLiked: true,
    playCount: 15,
    addedAt: new Date('2023-01-10'),
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    audioUrl: '/audio/good-4-u.mp3',
    genre: 'Pop Rock',
    year: 2021,
    isLiked: false,
    playCount: 8,
    addedAt: new Date('2023-01-20'),
  },
  {
    id: '4',
    title: 'Industry Baby',
    artist: 'Lil Nas X',
    album: 'MONTERO',
    duration: 212,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: '/audio/industry-baby.mp3',
    genre: 'Hip Hop',
    year: 2021,
    isLiked: true,
    playCount: 22,
    addedAt: new Date('2023-01-05'),
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3',
    duration: 141,
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    audioUrl: '/audio/stay.mp3',
    genre: 'Pop',
    year: 2021,
    isLiked: false,
    playCount: 12,
    addedAt: new Date('2023-01-12'),
  },
  {
    id: '6',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    audioUrl: '/audio/heat-waves.mp3',
    genre: 'Indie Pop',
    year: 2020,
    isLiked: true,
    playCount: 18,
    addedAt: new Date('2023-01-08'),
  },
];

const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'My Favorites',
    description: 'Songs I love the most',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: [MOCK_TRACKS[1], MOCK_TRACKS[3], MOCK_TRACKS[5]],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-15'),
    isPublic: false,
    ownerId: 'user-1',
    totalDuration: 556,
    trackCount: 3,
    isLiked: false,
  },
  {
    id: 'playlist-2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    tracks: [MOCK_TRACKS[2], MOCK_TRACKS[5]],
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-20'),
    isPublic: true,
    ownerId: 'user-1',
    totalDuration: 416,
    trackCount: 2,
    isLiked: true,
  },
  {
    id: 'playlist-3',
    name: 'Workout Mix',
    description: 'High energy tracks',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    tracks: [MOCK_TRACKS[0], MOCK_TRACKS[3]],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-18'),
    isPublic: true,
    ownerId: 'user-1',
    totalDuration: 412,
    trackCount: 2,
    isLiked: false,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeApi = {
  // Track operations
  async getTracks(): Promise<Track[]> {
    await delay(300);
    return [...MOCK_TRACKS];
  },

  async getTrack(id: string): Promise<Track | null> {
    await delay(200);
    return MOCK_TRACKS.find(track => track.id === id) || null;
  },

  async searchTracks(query: string): Promise<Track[]> {
    await delay(400);
    const lowercaseQuery = query.toLowerCase();
    return MOCK_TRACKS.filter(track => 
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.artist.toLowerCase().includes(lowercaseQuery) ||
      track.album.toLowerCase().includes(lowercaseQuery)
    );
  },

  async getLikedTracks(): Promise<Track[]> {
    await delay(200);
    return MOCK_TRACKS.filter(track => track.isLiked);
  },

  async toggleLikeTrack(trackId: string): Promise<boolean> {
    await delay(150);
    const track = MOCK_TRACKS.find(t => t.id === trackId);
    if (track) {
      track.isLiked = !track.isLiked;
      return track.isLiked;
    }
    return false;
  },

  // Playlist operations
  async getPlaylists(): Promise<Playlist[]> {
    await delay(300);
    return [...MOCK_PLAYLISTS];
  },

  async getPlaylist(id: string): Promise<Playlist | null> {
    await delay(200);
    return MOCK_PLAYLISTS.find(playlist => playlist.id === id) || null;
  },

  async createPlaylist(data: { name: string; description?: string; isPublic?: boolean }): Promise<Playlist> {
    await delay(400);
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: data.name,
      description: data.description,
      tracks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: data.isPublic || false,
      ownerId: 'user-1',
      totalDuration: 0,
      trackCount: 0,
      isLiked: false,
    };
    MOCK_PLAYLISTS.push(newPlaylist);
    return newPlaylist;
  },

  async updatePlaylist(id: string, data: { name?: string; description?: string; isPublic?: boolean }): Promise<Playlist | null> {
    await delay(300);
    const playlist = MOCK_PLAYLISTS.find(p => p.id === id);
    if (playlist) {
      if (data.name) playlist.name = data.name;
      if (data.description !== undefined) playlist.description = data.description;
      if (data.isPublic !== undefined) playlist.isPublic = data.isPublic;
      playlist.updatedAt = new Date();
    }
    return playlist || null;
  },

  async deletePlaylist(id: string): Promise<boolean> {
    await delay(200);
    const index = MOCK_PLAYLISTS.findIndex(p => p.id === id);
    if (index > -1) {
      MOCK_PLAYLISTS.splice(index, 1);
      return true;
    }
    return false;
  },

  async addTrackToPlaylist(playlistId: string, trackId: string): Promise<boolean> {
    await delay(300);
    const playlist = MOCK_PLAYLISTS.find(p => p.id === playlistId);
    const track = MOCK_TRACKS.find(t => t.id === trackId);
    
    if (playlist && track && !playlist.tracks.find(t => t.id === trackId)) {
      playlist.tracks.push(track);
      playlist.trackCount = playlist.tracks.length;
      playlist.totalDuration = playlist.tracks.reduce((sum, t) => sum + t.duration, 0);
      playlist.updatedAt = new Date();
      return true;
    }
    return false;
  },

  async removeTrackFromPlaylist(playlistId: string, trackId: string): Promise<boolean> {
    await delay(200);
    const playlist = MOCK_PLAYLISTS.find(p => p.id === playlistId);
    if (playlist) {
      const index = playlist.tracks.findIndex(t => t.id === trackId);
      if (index > -1) {
        playlist.tracks.splice(index, 1);
        playlist.trackCount = playlist.tracks.length;
        playlist.totalDuration = playlist.tracks.reduce((sum, t) => sum + t.duration, 0);
        playlist.updatedAt = new Date();
        return true;
      }
    }
    return false;
  },

  // Recommendations
  async getRecommendations(userId?: string): Promise<Track[]> {
    await delay(500);
    // Simple recommendation algorithm based on liked tracks
    const likedTracks = MOCK_TRACKS.filter(track => track.isLiked);
    const recommendedTracks = MOCK_TRACKS.filter(track => 
      !track.isLiked && 
      likedTracks.some(liked => 
        liked.genre === track.genre || 
        liked.artist === track.artist
      )
    );
    return recommendedTracks.slice(0, 6);
  },

  async getFeaturedPlaylists(): Promise<Playlist[]> {
    await delay(300);
    return MOCK_PLAYLISTS.filter(playlist => playlist.isPublic);
  },

  async getRecentlyPlayed(): Promise<Track[]> {
    await delay(200);
    // Return tracks sorted by play count and recent addition
    return [...MOCK_TRACKS]
      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
      .slice(0, 8);
  },

  // User operations
  async getUserPreferences(): Promise<UserPreferences> {
    await delay(100);
    return {
      theme: 'dark',
      volume: 0.7,
      audioQuality: 'high',
      crossfade: false,
      crossfadeDuration: 5,
      autoplay: true,
      explicitContent: false,
      language: 'en',
      timezone: 'UTC',
    };
  },

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    await delay(200);
    // In a real app, this would update the user's preferences in the database
    return { ...await this.getUserPreferences(), ...preferences };
  },

  // Onboarding
  async getOnboardingData(): Promise<OnboardingData | null> {
    await delay(100);
    return null; // No onboarding data initially
  },

  async saveOnboardingData(data: OnboardingData): Promise<void> {
    await delay(300);
    // In a real app, this would save to the database
    console.log('Onboarding data saved:', data);
  },

  // Share operations
  async generateShareLink(playlistId: string): Promise<string> {
    await delay(200);
    const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return `${window.location.origin}/shared/${shareToken}`;
  },

  async getSharedPlaylist(shareToken: string): Promise<Playlist | null> {
    await delay(300);
    // In a real app, this would look up the playlist by share token
    return MOCK_PLAYLISTS[0]; // Mock return
  },
};
