'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Shuffle, 
  Heart, 
  MoreHorizontal,
  Share,
  Download,
  Edit,
  Trash2,
  Plus,
  Clock,
  Music
} from 'lucide-react';
import { Playlist, Track } from '@/types';
import { fakeApi } from '@/lib/fakeApi';
import { PlaylistDetail } from '@/components/playlist';
import { TrackItem } from '@/components/player';
import { Button, Modal } from '@/components/ui';
import { formatDuration } from '@/lib/utils';

export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.id as string;
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (playlistId) {
      loadPlaylist();
    }
  }, [playlistId]);

  const loadPlaylist = async () => {
    try {
      setIsLoading(true);
      const data = await fakeApi.getPlaylist(playlistId);
      setPlaylist(data);
    } catch (error) {
      console.error('Error loading playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTrackPlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTrackLike = async (trackId: string) => {
    try {
      const isLiked = await fakeApi.toggleLikeTrack(trackId);
      if (playlist) {
        setPlaylist(prev => ({
          ...prev!,
          tracks: prev!.tracks.map(track => 
            track.id === trackId ? { ...track, isLiked } : track
          )
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleTrackOptions = (track: Track) => {
    // TODO: Implement track options
    console.log('Track options:', track);
  };

  const handlePlaylistLike = async (playlistId: string) => {
    try {
      // TODO: Implement playlist like toggle
      console.log('Like playlist:', playlistId);
    } catch (error) {
      console.error('Error liking playlist:', error);
    }
  };

  const handlePlaylistEdit = (playlist: Playlist) => {
    setShowEditModal(true);
  };

  const handlePlaylistDelete = async (playlistId: string) => {
    try {
      await fakeApi.deletePlaylist(playlistId);
      // TODO: Navigate back to playlists page
      window.history.back();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const handlePlaylistShare = (playlist: Playlist) => {
    // TODO: Implement playlist sharing
    console.log('Share playlist:', playlist);
  };

  const handleAddTracks = () => {
    // TODO: Implement add tracks functionality
    console.log('Add tracks to playlist');
  };

  const handleShufflePlay = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      const randomTrack = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)];
      setCurrentTrack(randomTrack);
      setIsPlaying(true);
    }
  };

  const handleEditPlaylist = async (data: { name: string; description?: string; isPublic?: boolean }) => {
    try {
      if (playlist) {
        const updatedPlaylist = await fakeApi.updatePlaylist(playlist.id, data);
        if (updatedPlaylist) {
          setPlaylist(updatedPlaylist);
        }
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Playlist not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The playlist you're looking for doesn't exist or has been deleted.
          </p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PlaylistDetail
          playlist={playlist}
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          onPlay={handlePlay}
          onPause={handlePause}
          onTrackPlay={handleTrackPlay}
          onTrackLike={handleTrackLike}
          onTrackOptions={handleTrackOptions}
          onPlaylistLike={handlePlaylistLike}
          onPlaylistEdit={handlePlaylistEdit}
          onPlaylistDelete={handlePlaylistDelete}
          onPlaylistShare={handlePlaylistShare}
          onAddTracks={handleAddTracks}
          onShufflePlay={handleShufflePlay}
        />
      </div>

      {/* Edit Playlist Modal */}
      <EditPlaylistModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        playlist={playlist}
        onSave={handleEditPlaylist}
      />

      {/* Delete Playlist Modal */}
      <DeletePlaylistModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        playlist={playlist}
        onDelete={handlePlaylistDelete}
      />
    </div>
  );
}

// Edit Playlist Modal Component
interface EditPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Playlist;
  onSave: (data: { name: string; description?: string; isPublic?: boolean }) => void;
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
  isOpen,
  onClose,
  playlist,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: playlist.name,
    description: playlist.description || '',
    isPublic: playlist.isPublic,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      name: playlist.name,
      description: playlist.description || '',
      isPublic: playlist.isPublic,
    });
  }, [playlist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error updating playlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Playlist"
      description="Update your playlist details"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Playlist Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublic"
            checked={formData.isPublic}
            onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="isPublic" className="text-sm text-gray-700 dark:text-gray-300">
            Make this playlist public
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={!formData.name.trim()}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Delete Playlist Modal Component
interface DeletePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Playlist;
  onDelete: (playlistId: string) => void;
}

const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
  isOpen,
  onClose,
  playlist,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(playlist.id);
    } catch (error) {
      console.error('Error deleting playlist:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Playlist"
      description="This action cannot be undone"
    >
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete "{playlist.name}"? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete Playlist
          </Button>
        </div>
      </div>
    </Modal>
  );
};
