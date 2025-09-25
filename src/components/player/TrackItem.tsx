'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Heart, 
  MoreHorizontal, 
  Clock,
  Music
} from 'lucide-react';
import { Track } from '@/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface TrackItemProps {
  track: Track;
  isPlaying?: boolean;
  isCurrentTrack?: boolean;
  index: number;
  onPlay: (track: Track) => void;
  onPause: () => void;
  onLike: (trackId: string) => void;
  onShowOptions: (track: Track) => void;
  showIndex?: boolean;
  showAlbum?: boolean;
  showDuration?: boolean;
  compact?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  isPlaying = false,
  isCurrentTrack = false,
  index,
  onPlay,
  onPause,
  onLike,
  onShowOptions,
  showIndex = true,
  showAlbum = true,
  showDuration = true,
  compact = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      onPause();
    } else {
      onPlay(track);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(track.id);
  };

  const handleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowOptions(track);
  };

  return (
    <motion.div
      className={cn(
        'group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer',
        isCurrentTrack && 'bg-primary-50 dark:bg-primary-900/20',
        !compact && 'hover:bg-gray-50 dark:hover:bg-gray-800'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Index/Play Button */}
      <div className="flex-shrink-0 w-6 flex items-center justify-center">
        {showIndex && !isHovered && !isCurrentTrack && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {index + 1}
          </span>
        )}
        
        {(isHovered || isCurrentTrack) && (
          <motion.button
            className="w-6 h-6 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause size={12} />
            ) : (
              <Play size={12} />
            )}
          </motion.button>
        )}
      </div>

      {/* Track Cover */}
      <div className="flex-shrink-0">
        <motion.div
          className={cn(
            'rounded-lg overflow-hidden',
            compact ? 'w-10 h-10' : 'w-12 h-12'
          )}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={track.coverUrl}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className={cn(
            'font-medium truncate',
            compact ? 'text-sm' : 'text-base',
            isCurrentTrack && 'text-primary-600 dark:text-primary-400'
          )}>
            {track.title}
          </h4>
          
          {track.isLiked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-red-500"
            >
              <Heart size={14} className="fill-current" />
            </motion.div>
          )}
        </div>
        
        <p className={cn(
          'text-gray-600 dark:text-gray-400 truncate',
          compact ? 'text-xs' : 'text-sm'
        )}>
          {track.artist}
          {showAlbum && track.album && ` • ${track.album}`}
        </p>
      </div>

      {/* Album (if not compact) */}
      {!compact && showAlbum && (
        <div className="hidden md:block flex-1 min-w-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {track.album}
          </p>
        </div>
      )}

      {/* Duration */}
      {showDuration && (
        <div className="flex-shrink-0 flex items-center space-x-1">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDuration(track.duration)}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center space-x-1">
        <motion.button
          className={cn(
            'p-2 text-gray-400 hover:text-red-500 transition-colors',
            track.isLiked && 'text-red-500'
          )}
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={16} 
            className={cn(
              track.isLiked && 'fill-current'
            )}
          />
        </motion.button>
        
        <motion.button
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
          onClick={handleOptions}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrackItem;
