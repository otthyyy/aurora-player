/**
 * Local storage utilities for Aurora Player
 * Handles user preferences, onboarding data, and cached data
 */

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'aurora_user_preferences',
  ONBOARDING_DATA: 'aurora_onboarding_data',
  USER_ACTIVITY: 'aurora_user_activity',
  THEME: 'aurora_theme',
  RECENT_PLAYLISTS: 'aurora_recent_playlists',
} as const;

export interface StorageData {
  [STORAGE_KEYS.USER_PREFERENCES]: any;
  [STORAGE_KEYS.ONBOARDING_DATA]: any;
  [STORAGE_KEYS.USER_ACTIVITY]: any;
  [STORAGE_KEYS.THEME]: 'light' | 'dark' | 'auto';
  [STORAGE_KEYS.RECENT_PLAYLISTS]: any[];
}

export class StorageManager {
  private static instance: StorageManager;

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private constructor() {
    // Initialize with default values if not present
    this.initializeDefaults();
  }

  private initializeDefaults() {
    if (typeof window === 'undefined') return;

    // Set default theme if not present
    if (!this.getItem(STORAGE_KEYS.THEME)) {
      this.setItem(STORAGE_KEYS.THEME, 'dark');
    }

    // Set default user preferences if not present
    if (!this.getItem(STORAGE_KEYS.USER_PREFERENCES)) {
      this.setItem(STORAGE_KEYS.USER_PREFERENCES, {
        theme: 'dark',
        volume: 0.7,
        audioQuality: 'high',
        crossfade: false,
        crossfadeDuration: 5,
        autoplay: true,
        explicitContent: false,
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }

    // Set default user activity if not present
    if (!this.getItem(STORAGE_KEYS.USER_ACTIVITY)) {
      this.setItem(STORAGE_KEYS.USER_ACTIVITY, {
        likedTracks: [],
        skippedTracks: [],
        completedTracks: [],
        playlists: [],
        recentlyPlayed: [],
        listeningHistory: [],
      });
    }
  }

  getItem<K extends keyof StorageData>(key: K): StorageData[K] | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return null;
    }
  }

  setItem<K extends keyof StorageData>(key: K, value: StorageData[K]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
    }
  }

  removeItem(key: keyof StorageData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Specific methods for common operations
  getTheme(): 'light' | 'dark' | 'auto' {
    return this.getItem(STORAGE_KEYS.THEME) || 'dark';
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.setItem(STORAGE_KEYS.THEME, theme);
  }

  getUserPreferences() {
    return this.getItem(STORAGE_KEYS.USER_PREFERENCES);
  }

  setUserPreferences(preferences: any): void {
    this.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  getOnboardingData() {
    return this.getItem(STORAGE_KEYS.ONBOARDING_DATA);
  }

  setOnboardingData(data: any): void {
    this.setItem(STORAGE_KEYS.ONBOARDING_DATA, data);
  }

  getUserActivity() {
    return this.getItem(STORAGE_KEYS.USER_ACTIVITY);
  }

  setUserActivity(activity: any): void {
    this.setItem(STORAGE_KEYS.USER_ACTIVITY, activity);
  }

  // Helper methods for user activity
  addLikedTrack(trackId: string): void {
    const activity = this.getUserActivity();
    if (activity && !activity.likedTracks.includes(trackId)) {
      activity.likedTracks.push(trackId);
      this.setUserActivity(activity);
    }
  }

  removeLikedTrack(trackId: string): void {
    const activity = this.getUserActivity();
    if (activity) {
      activity.likedTracks = activity.likedTracks.filter(id => id !== trackId);
      this.setUserActivity(activity);
    }
  }

  addRecentlyPlayed(trackId: string): void {
    const activity = this.getUserActivity();
    if (activity) {
      // Remove if already exists and add to beginning
      activity.recentlyPlayed = activity.recentlyPlayed.filter(id => id !== trackId);
      activity.recentlyPlayed.unshift(trackId);
      // Keep only last 50 tracks
      activity.recentlyPlayed = activity.recentlyPlayed.slice(0, 50);
      this.setUserActivity(activity);
    }
  }
}

export const storage = StorageManager.getInstance();
