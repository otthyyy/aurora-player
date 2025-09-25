'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Heart, 
  MoreHorizontal, 
  Music,
  Clock,
  Users
} from 'lucide-react';
import { Playlist } from '@/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface PlaylistCardProps {
  playlist: Playlist;
  isPlaying?: boolean;
  isCurrentPlaylist?: boolean;
  onPlay: (playlist: Playlist) => void;
  onPause: () => void;
  onLike: (playlistId: string) => void;
  onShowOptions: (playlist: Playlist) => void;
  onNavigate: (playlistId: string) => void;
  compact?: boolean;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  isPlaying = false,
  isCurrentPlaylist = false,
  onPlay,
  onPause,
  onLike,
  onShowOptions,
  onNavigate,
  compact = false,
}) => {
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentPlaylist && isPlaying) {
      onPause();
    } else {
      onPlay(playlist);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(playlist.id);
  };

  const handleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowOptions(playlist);
  };

  const handleCardClick = () => {
    onNavigate(playlist.id);
  };

  return (
    <motion.div
      className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer',
        compact ? 'p-3' : 'p-4',
        isCurrentPlaylist && 'ring-2 ring-primary-500'
      )}
      onClick={handleCardClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Cover Image */}
      <div className="relative mb-3">
        <motion.div
          className={cn(
            'relative overflow-hidden rounded-lg',
            compact ? 'w-full h-24' : 'w-full h-32'
          )}
          whileHover={{ scale: 1.02 }}
        >
          {playlist.coverUrl ? (
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
              <Music size={compact ? 24 : 32} className="text-white" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.button
              className="w-12 h-12 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg"
              onClick={handlePlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isCurrentPlaylist && isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Playlist Info */}
      <div className="space-y-1">
        <h3 className={cn(
          'font-semibold text-gray-900 dark:text-gray-100 truncate',
          compact ? 'text-sm' : 'text-base'
        )}>
          {playlist.name}
        </h3>
        
        {playlist.description && !compact && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {playlist.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Music size={12} />
              <span>{playlist.trackCount} tracks</span>
            </div>
            
            {!compact && (
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{formatDuration(playlist.totalDuration)}</span>
              </div>
            )}
          </div>
          
          {playlist.isPublic && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Users size={12} />
              <span>Public</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          className={cn(
            'p-2 rounded-full transition-colors',
            playlist.isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:text-red-500'
          )}
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={14} 
            className={cn(
              playlist.isLiked && 'fill-current'
            )}
          />
        </motion.button>
        
        <motion.button
          className="p-2 bg-white/80 text-gray-600 hover:text-gray-900 rounded-full transition-colors"
          onClick={handleOptions}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal size={14} />
        </motion.button>
      </div>

      {/* Playing Indicator */}
      {isCurrentPlaylist && isPlaying && (
        <motion.div
          className="absolute top-3 left-3 w-2 h-2 bg-primary-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default PlaylistCard;
