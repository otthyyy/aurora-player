/**
 * Recommendation algorithm for Aurora Player
 * TODO: Integrate with real music analysis APIs (Spotify Web API, Last.fm, etc.)
 */

import { Track, TrackWithMetadata, UserActivity } from '@/types';

export interface RecommendationWeights {
  genre: number;
  artist: number;
  year: number;
  mood: number;
  energy: number;
  danceability: number;
  valence: number;
  playCount: number;
  recency: number;
}

export interface RecommendationContext {
  userActivity: UserActivity;
  currentTrack?: Track;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  mood?: 'chill' | 'energetic' | 'focused' | 'party';
}

const DEFAULT_WEIGHTS: RecommendationWeights = {
  genre: 0.3,
  artist: 0.25,
  year: 0.1,
  mood: 0.15,
  energy: 0.1,
  danceability: 0.05,
  valence: 0.05,
  playCount: 0.0,
  recency: 0.0,
};

export class RecommendationEngine {
  private weights: RecommendationWeights;

  constructor(weights: RecommendationWeights = DEFAULT_WEIGHTS) {
    this.weights = weights;
  }

  /**
   * Generate personalized recommendations based on user activity and preferences
   */
  async getRecommendations(
    allTracks: Track[],
    context: RecommendationContext,
    limit: number = 20
  ): Promise<Track[]> {
    const { userActivity } = context;
    
    // Filter out tracks user has already interacted with
    const availableTracks = allTracks.filter(track => 
      !userActivity.likedTracks.includes(track.id) &&
      !userActivity.skippedTracks.includes(track.id) &&
      !userActivity.completedTracks.includes(track.id)
    );

    // Calculate scores for each track
    const scoredTracks = availableTracks.map(track => ({
      track,
      score: this.calculateScore(track, context)
    }));

    // Sort by score and return top recommendations
    return scoredTracks
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.track);
  }

  /**
   * Calculate recommendation score for a track
   */
  private calculateScore(track: Track, context: RecommendationContext): number {
    const { userActivity, currentTrack, timeOfDay, mood } = context;
    let score = 0;

    // Genre preference (based on liked tracks)
    if (userActivity.likedTracks.length > 0) {
      const likedGenres = this.getGenresFromTrackIds(userActivity.likedTracks, context);
      const genreScore = this.calculateGenreScore(track.genre, likedGenres);
      score += genreScore * this.weights.genre;
    }

    // Artist preference (based on liked tracks)
    if (userActivity.likedTracks.length > 0) {
      const likedArtists = this.getArtistsFromTrackIds(userActivity.likedTracks, context);
      const artistScore = this.calculateArtistScore(track.artist, likedArtists);
      score += artistScore * this.weights.artist;
    }

    // Year preference (prefer recent tracks)
    const yearScore = this.calculateYearScore(track.year);
    score += yearScore * this.weights.year;

    // Mood-based recommendations
    if (mood) {
      const moodScore = this.calculateMoodScore(track, mood);
      score += moodScore * this.weights.mood;
    }

    // Time-based recommendations
    if (timeOfDay) {
      const timeScore = this.calculateTimeScore(track, timeOfDay);
      score += timeScore * this.weights.energy;
    }

    // Current track context (similar tracks)
    if (currentTrack) {
      const contextScore = this.calculateContextScore(track, currentTrack);
      score += contextScore * 0.2;
    }

    // Recency boost (prefer recently added tracks)
    if (track.addedAt) {
      const daysSinceAdded = (Date.now() - track.addedAt.getTime()) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 1 - daysSinceAdded / 30); // Boost for tracks added within 30 days
      score += recencyScore * this.weights.recency;
    }

    return Math.max(0, Math.min(1, score)); // Clamp between 0 and 1
  }

  /**
   * Calculate genre similarity score
   */
  private calculateGenreScore(trackGenre: string, likedGenres: string[]): number {
    if (likedGenres.length === 0) return 0.5;
    
    const genreCount = likedGenres.filter(genre => genre === trackGenre).length;
    return genreCount / likedGenres.length;
  }

  /**
   * Calculate artist similarity score
   */
  private calculateArtistScore(trackArtist: string, likedArtists: string[]): number {
    if (likedArtists.length === 0) return 0.5;
    
    const artistCount = likedArtists.filter(artist => artist === trackArtist).length;
    return artistCount / likedArtists.length;
  }

  /**
   * Calculate year preference score (prefer recent tracks)
   */
  private calculateYearScore(trackYear: number): number {
    const currentYear = new Date().getFullYear();
    const yearsDiff = currentYear - trackYear;
    
    if (yearsDiff <= 2) return 1.0;
    if (yearsDiff <= 5) return 0.8;
    if (yearsDiff <= 10) return 0.6;
    return 0.4;
  }

  /**
   * Calculate mood-based score
   */
  private calculateMoodScore(track: Track, mood: string): number {
    // This is a simplified mood calculation
    // In a real app, you'd use audio analysis data
    const moodMap: Record<string, Record<string, number>> = {
      chill: {
        'Indie Pop': 0.9,
        'Ambient': 0.9,
        'Jazz': 0.8,
        'Folk': 0.8,
        'Pop': 0.6,
        'Hip Hop': 0.3,
        'Rock': 0.4,
      },
      energetic: {
        'Hip Hop': 0.9,
        'Rock': 0.9,
        'Pop': 0.8,
        'Electronic': 0.9,
        'Indie Pop': 0.5,
        'Jazz': 0.3,
        'Ambient': 0.2,
      },
      focused: {
        'Classical': 0.9,
        'Ambient': 0.8,
        'Jazz': 0.7,
        'Indie Pop': 0.6,
        'Pop': 0.5,
        'Hip Hop': 0.3,
        'Rock': 0.4,
      },
      party: {
        'Hip Hop': 0.9,
        'Electronic': 0.9,
        'Pop': 0.8,
        'Rock': 0.7,
        'Indie Pop': 0.4,
        'Jazz': 0.2,
        'Ambient': 0.1,
      },
    };

    return moodMap[mood]?.[track.genre] || 0.5;
  }

  /**
   * Calculate time-based score
   */
  private calculateTimeScore(track: Track, timeOfDay: string): number {
    const timeMap: Record<string, Record<string, number>> = {
      morning: {
        'Pop': 0.8,
        'Indie Pop': 0.7,
        'Jazz': 0.6,
        'Hip Hop': 0.4,
        'Rock': 0.5,
      },
      afternoon: {
        'Pop': 0.9,
        'Hip Hop': 0.8,
        'Rock': 0.7,
        'Indie Pop': 0.6,
        'Jazz': 0.5,
      },
      evening: {
        'Jazz': 0.8,
        'Indie Pop': 0.7,
        'Pop': 0.6,
        'Ambient': 0.7,
        'Hip Hop': 0.5,
      },
      night: {
        'Ambient': 0.9,
        'Jazz': 0.8,
        'Indie Pop': 0.7,
        'Electronic': 0.8,
        'Pop': 0.5,
      },
    };

    return timeMap[timeOfDay]?.[track.genre] || 0.5;
  }

  /**
   * Calculate context score based on current track
   */
  private calculateContextScore(track: Track, currentTrack: Track): number {
    let score = 0;

    // Same artist
    if (track.artist === currentTrack.artist) {
      score += 0.8;
    }

    // Same genre
    if (track.genre === currentTrack.genre) {
      score += 0.6;
    }

    // Similar year (within 3 years)
    const yearDiff = Math.abs(track.year - currentTrack.year);
    if (yearDiff <= 3) {
      score += 0.4;
    }

    return Math.min(1, score);
  }

  /**
   * Get genres from track IDs (mock implementation)
   */
  private getGenresFromTrackIds(trackIds: string[], context: RecommendationContext): string[] {
    // In a real app, you'd fetch track data from the database
    // For now, return mock genres based on common patterns
    return ['Pop', 'Hip Hop', 'Indie Pop', 'Rock'];
  }

  /**
   * Get artists from track IDs (mock implementation)
   */
  private getArtistsFromTrackIds(trackIds: string[], context: RecommendationContext): string[] {
    // In a real app, you'd fetch track data from the database
    // For now, return mock artists based on common patterns
    return ['The Weeknd', 'Dua Lipa', 'Olivia Rodrigo', 'Lil Nas X'];
  }

  /**
   * Update recommendation weights based on user feedback
   */
  updateWeights(feedback: { trackId: string; liked: boolean; skipped: boolean }): void {
    // In a real app, you'd use machine learning to adjust weights
    // based on user feedback patterns
    console.log('Updating recommendation weights based on feedback:', feedback);
  }

  /**
   * Get similar tracks to a given track
   */
  async getSimilarTracks(track: Track, allTracks: Track[], limit: number = 10): Promise<Track[]> {
    const context: RecommendationContext = {
      userActivity: {
        likedTracks: [],
        skippedTracks: [],
        completedTracks: [],
        playlists: [],
        recentlyPlayed: [],
        listeningHistory: [],
      },
      currentTrack: track,
    };

    return this.getRecommendations(allTracks, context, limit);
  }
}

// Export default instance
export const recommendationEngine = new RecommendationEngine();

// Helper functions
export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
};

export const getMoodFromContext = (userActivity: UserActivity): 'chill' | 'energetic' | 'focused' | 'party' => {
  // Simple mood detection based on recent activity
  const recentLikes = userActivity.likedTracks.length;
  const recentSkips = userActivity.skippedTracks.length;
  
  if (recentLikes > recentSkips * 2) return 'energetic';
  if (recentSkips > recentLikes * 2) return 'chill';
  return 'focused';
};
