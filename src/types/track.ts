export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre: string;
  year: number;
  isLiked?: boolean;
  playCount?: number;
  addedAt?: Date;
}

export interface TrackWithMetadata extends Track {
  bpm?: number;
  key?: string;
  mood?: string;
  energy?: number; // 0-1
  danceability?: number; // 0-1
  valence?: number; // 0-1
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTrack?: Track;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

export interface QueueItem {
  track: Track;
  index: number;
  addedAt: Date;
}
