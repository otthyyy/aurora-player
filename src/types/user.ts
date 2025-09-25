export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  volume: number;
  audioQuality: 'low' | 'medium' | 'high';
  crossfade: boolean;
  crossfadeDuration: number;
  autoplay: boolean;
  explicitContent: boolean;
  language: string;
  timezone: string;
}

export interface OnboardingData {
  selectedGenres: string[];
  selectedArtists: string[];
  musicMood: 'chill' | 'energetic' | 'mixed';
  listeningTime: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';
  isCompleted: boolean;
}

export interface UserActivity {
  likedTracks: string[];
  skippedTracks: string[];
  completedTracks: string[];
  playlists: string[];
  recentlyPlayed: string[];
  listeningHistory: ListeningSession[];
}

export interface ListeningSession {
  trackId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  completed: boolean;
  skipped: boolean;
}
