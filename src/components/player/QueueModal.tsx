'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Clock } from 'lucide-react';
import { Track, QueueItem } from '@/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack?: Track;
  queue: QueueItem[];
  onTrackSelect: (track: Track) => void;
  onRemoveFromQueue: (index: number) => void;
  onClearQueue: () => void;
}

const QueueModal: React.FC<QueueModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  queue,
  onTrackSelect,
  onRemoveFromQueue,
  onClearQueue,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Queue
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {queue.length} tracks in queue
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {queue.length > 0 && (
                  <motion.button
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                    onClick={onClearQueue}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All
                  </motion.button>
                )}
                
                <motion.button
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
            
            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {/* Current Track */}
              {currentTrack && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={currentTrack.coverUrl}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {currentTrack.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {currentTrack.artist}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Music size={14} className="text-primary-500" />
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                        Now Playing
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Queue */}
              {queue.length === 0 ? (
                <div className="p-8 text-center">
                  <Music size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Queue is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {queue.map((item, index) => (
                    <motion.div
                      key={`${item.track.id}-${item.index}`}
                      className="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => onTrackSelect(item.track)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex-shrink-0 w-6 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.track.coverUrl}
                          alt={item.track.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {item.track.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {item.track.artist}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDuration(item.track.duration)}
                          </span>
                        </div>
                        
                        <motion.button
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFromQueue(index);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QueueModal;
