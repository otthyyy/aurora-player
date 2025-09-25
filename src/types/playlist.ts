import { Track } from './track';

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  tracks: Track[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  ownerId: string;
  totalDuration: number;
  trackCount: number;
  isLiked?: boolean;
  shareToken?: string;
}

export interface PlaylistCreateData {
  name: string;
  description?: string;
  isPublic?: boolean;
  coverUrl?: string;
}

export interface PlaylistUpdateData {
  name?: string;
  description?: string;
  isPublic?: boolean;
  coverUrl?: string;
}

export interface PlaylistShareData {
  playlistId: string;
  shareToken: string;
  shareUrl: string;
  expiresAt?: Date;
  isActive: boolean;
}
