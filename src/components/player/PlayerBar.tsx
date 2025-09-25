'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Heart,
  MoreHorizontal,
  ListMusic
} from 'lucide-react';
import { Track, PlaybackState } from '@/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface PlayerBarProps {
  currentTrack?: Track;
  playbackState: PlaybackState;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onShuffleToggle: () => void;
  onRepeatToggle: () => void;
  onLikeToggle: () => void;
  onShowQueue: () => void;
  onShowTrackOptions: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTrack,
  playbackState,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onShuffleToggle,
  onRepeatToggle,
  onLikeToggle,
  onShowQueue,
  onShowTrackOptions,
}) => {
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  // Update seek value when current time changes (but not while user is seeking)
  useEffect(() => {
    if (!isSeeking) {
      setSeekValue(playbackState.currentTime);
    }
  }, [playbackState.currentTime, isSeeking]);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (value: number) => {
    setSeekValue(value);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    onSeek(seekValue);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    onVolumeChange(volume);
  };

  const getRepeatIcon = () => {
    switch (playbackState.repeatMode) {
      case 'one':
        return <Repeat1 size={20} />;
      case 'all':
        return <Repeat size={20} />;
      default:
        return <Repeat size={20} />;
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No track selected</p>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 backdrop-blur-sm"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <motion.div
            className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
          
          <motion.button
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            onClick={onLikeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              size={20} 
              className={cn(
                currentTrack.isLiked && 'fill-red-500 text-red-500'
              )}
            />
          </motion.button>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          {/* Control Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              className={cn(
                'p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors',
                playbackState.isShuffled && 'text-primary-500'
              )}
              onClick={onShuffleToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Shuffle size={18} />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              onClick={onPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack size={20} />
            </motion.button>
            
            <motion.button
              className="w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
              onClick={onPlayPause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {playbackState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward size={20} />
            </motion.button>
            
            <motion.button
              className={cn(
                'p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors',
                playbackState.repeatMode !== 'none' && 'text-primary-500'
              )}
              onClick={onRepeatToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {getRepeatIcon()}
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
              {formatDuration(playbackState.currentTime)}
            </span>
            
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={playbackState.duration}
                value={seekValue}
                onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(seekValue / playbackState.duration) * 100}%, #e5e7eb ${(seekValue / playbackState.duration) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
            
            <span className="text-xs text-gray-500 dark:text-gray-400 w-10">
              {formatDuration(playbackState.duration)}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <motion.button
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            onClick={onShowQueue}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ListMusic size={18} />
          </motion.button>
          
          <motion.button
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            onClick={onShowTrackOptions}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreHorizontal size={18} />
          </motion.button>
          
          {/* Volume Control */}
          <div
            className="flex items-center space-x-2"
            onMouseEnter={() => setIsVolumeHovered(true)}
            onMouseLeave={() => setIsVolumeHovered(false)}
          >
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              onClick={() => onVolumeChange(playbackState.volume > 0 ? 0 : 0.7)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {playbackState.volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </motion.button>
            
            <AnimatePresence>
              {isVolumeHovered && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={playbackState.volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerBar;
