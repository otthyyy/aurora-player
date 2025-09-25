'use client';

import React, { useState } from 'react';
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
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';
import TrackItem from '../player/TrackItem';

export interface PlaylistDetailProps {
  playlist: Playlist;
  isPlaying?: boolean;
  currentTrack?: Track;
  onPlay: (playlist: Playlist) => void;
  onPause: () => void;
  onTrackPlay: (track: Track) => void;
  onTrackLike: (trackId: string) => void;
  onTrackOptions: (track: Track) => void;
  onPlaylistLike: (playlistId: string) => void;
  onPlaylistEdit: (playlist: Playlist) => void;
  onPlaylistDelete: (playlistId: string) => void;
  onPlaylistShare: (playlist: Playlist) => void;
  onAddTracks: () => void;
  onShufflePlay: (playlist: Playlist) => void;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({
  playlist,
  isPlaying = false,
  currentTrack,
  onPlay,
  onPause,
  onTrackPlay,
  onTrackLike,
  onTrackOptions,
  onPlaylistLike,
  onPlaylistEdit,
  onPlaylistDelete,
  onPlaylistShare,
  onAddTracks,
  onShufflePlay,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(playlist);
    }
  };

  const handleShufflePlay = () => {
    onShufflePlay(playlist);
  };

  const handlePlaylistLike = () => {
    onPlaylistLike(playlist.id);
  };

  const handlePlaylistEdit = () => {
    onPlaylistEdit(playlist);
  };

  const handlePlaylistDelete = () => {
    onPlaylistDelete(playlist.id);
  };

  const handlePlaylistShare = () => {
    onPlaylistShare(playlist);
  };

  return (
    <div className="space-y-6">
      {/* Playlist Header */}
      <div className="flex items-end space-x-6">
        {/* Cover */}
        <motion.div
          className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl flex-shrink-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {playlist.coverUrl ? (
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
              <Music size={64} className="text-white" />
            </div>
          )}
        </motion.div>

        {/* Playlist Info */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 truncate">
                {playlist.name}
              </h1>
              {playlist.isLiked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-500"
                >
                  <Heart size={32} className="fill-current" />
                </motion.div>
              )}
            </div>
            
            {playlist.description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {playlist.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center space-x-1">
                <Music size={16} />
                <span>{playlist.trackCount} tracks</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{formatDuration(playlist.totalDuration)}</span>
              </div>
              <span>•</span>
              <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              className="w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg"
              onClick={handlePlayPause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            
            <motion.button
              className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700"
              onClick={handleShufflePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shuffle size={20} />
            </motion.button>
            
            <motion.button
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center shadow-md border transition-colors',
                playlist.isLiked
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 border-gray-200 dark:border-gray-700'
              )}
              onClick={handlePlaylistLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className={cn(playlist.isLiked && 'fill-current')} />
            </motion.button>
            
            <motion.button
              className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700"
              onClick={handlePlaylistShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share size={20} />
            </motion.button>
            
            <div className="relative">
              <motion.button
                className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700"
                onClick={() => setShowOptions(!showOptions)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={20} />
              </motion.button>
              
              {/* Options Menu */}
              {showOptions && (
                <motion.div
                  className="absolute right-0 top-14 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                    onClick={handlePlaylistEdit}
                  >
                    <Edit size={16} />
                    <span>Edit Playlist</span>
                  </button>
                  
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                    onClick={handlePlaylistShare}
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                  
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                    onClick={handlePlaylistDelete}
                  >
                    <Trash2 size={16} />
                    <span>Delete Playlist</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Tracks Button */}
      <motion.div
        className="flex justify-end"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          onClick={onAddTracks}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>Add Tracks</span>
        </motion.button>
      </motion.div>

      {/* Tracks List */}
      <motion.div
        className="space-y-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {playlist.tracks.length === 0 ? (
          <div className="text-center py-12">
            <Music size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No tracks in this playlist</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add some tracks to get started
            </p>
          </div>
        ) : (
          playlist.tracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              isCurrentTrack={currentTrack?.id === track.id}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              onPlay={onTrackPlay}
              onPause={onPause}
              onLike={onTrackLike}
              onShowOptions={onTrackOptions}
              showIndex={true}
              showAlbum={true}
              showDuration={true}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default PlaylistDetail;
