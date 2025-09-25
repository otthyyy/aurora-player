'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Shuffle, MoreHorizontal, Clock, Music } from 'lucide-react';
import { Track } from '@/types';
import { fakeApi } from '@/lib/fakeApi';
import { TrackItem } from '@/components/player';
import { Button } from '@/components/ui';
import { formatDuration } from '@/lib/utils';

export default function LikedSongsPage() {
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    loadLikedTracks();
  }, []);

  const loadLikedTracks = async () => {
    try {
      setIsLoading(true);
      const tracks = await fakeApi.getLikedTracks();
      setLikedTracks(tracks);
    } catch (error) {
      console.error('Error loading liked tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleShufflePlay = () => {
    if (likedTracks.length > 0) {
      const randomTrack = likedTracks[Math.floor(Math.random() * likedTracks.length)];
      handlePlayTrack(randomTrack);
    }
  };

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      handlePlayTrack(likedTracks[0]);
    }
  };

  const handleLikeTrack = async (trackId: string) => {
    try {
      const isLiked = await fakeApi.toggleLikeTrack(trackId);
      if (!isLiked) {
        setLikedTracks(prev => prev.filter(track => track.id !== trackId));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShowOptions = (track: Track) => {
    // TODO: Implement track options
    console.log('Track options:', track);
  };

  const totalDuration = likedTracks.reduce((sum, track) => sum + track.duration, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading liked songs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-end space-x-6 mb-8">
          {/* Cover */}
          <motion.div
            className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl flex-shrink-0 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Heart size={64} className="text-white" />
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Heart size={32} className="text-red-500 fill-current" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Liked Songs
                </h1>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Songs you've liked will appear here
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Music size={16} />
                  <span>{likedTracks.length} songs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{formatDuration(totalDuration)}</span>
                </div>
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
                onClick={handlePlayAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} />
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
                className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Tracks List */}
        {likedTracks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No liked songs yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start liking songs to see them here
            </p>
            <Button variant="primary" onClick={() => window.history.back()}>
              Discover Music
            </Button>
          </div>
        ) : (
          <motion.div
            className="space-y-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {likedTracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                isCurrentTrack={currentTrack?.id === track.id}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                onPlay={handlePlayTrack}
                onPause={handlePause}
                onLike={handleLikeTrack}
                onShowOptions={handleShowOptions}
                showIndex={true}
                showAlbum={true}
                showDuration={true}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
