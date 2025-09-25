'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Heart, 
  Music, 
  TrendingUp, 
  Clock,
  Shuffle,
  Radio,
  Star
} from 'lucide-react';
import { Track, Playlist, PlaybackState } from '@/types';
import { fakeApi } from '@/lib/fakeApi';
import { recommendationEngine, getTimeOfDay } from '@/lib/recommend';
import { storage } from '@/lib/storage';
import { OnboardingWizard } from '@/components/onboarding';
import { PlayerBar, TrackItem } from '@/components/player';
import { PlaylistCard } from '@/components/playlist';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatDuration } from '@/lib/utils';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isShuffled: false,
    repeatMode: 'none',
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      
      // Check if user has completed onboarding
      const onboardingData = storage.getOnboardingData();
      if (!onboardingData?.isCompleted) {
        setShowOnboarding(true);
      }

      // Load data
      const [tracksData, playlistsData, recommendationsData, recentlyPlayedData, featuredData] = await Promise.all([
        fakeApi.getTracks(),
        fakeApi.getPlaylists(),
        fakeApi.getRecommendations(),
        fakeApi.getRecentlyPlayed(),
        fakeApi.getFeaturedPlaylists(),
      ]);

      setTracks(tracksData);
      setPlaylists(playlistsData);
      setRecommendations(recommendationsData);
      setRecentlyPlayed(recentlyPlayedData);
      setFeaturedPlaylists(featuredData);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    storage.setOnboardingData(data);
    setShowOnboarding(false);
    // TODO: Update recommendations based on onboarding data
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setPlaybackState(prev => ({
      ...prev,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration,
    }));
    
    // Add to recently played
    storage.addRecentlyPlayed(track.id);
  };

  const handlePause = () => {
    setPlaybackState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleLikeTrack = async (trackId: string) => {
    try {
      const isLiked = await fakeApi.toggleLikeTrack(trackId);
      setTracks(prev => prev.map(track => 
        track.id === trackId ? { ...track, isLiked } : track
      ));
      
      if (isLiked) {
        storage.addLikedTrack(trackId);
      } else {
        storage.removeLikedTrack(trackId);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      handlePlayTrack(playlist.tracks[0]);
    }
  };

  const handleSeek = (time: number) => {
    setPlaybackState(prev => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (volume: number) => {
    setPlaybackState(prev => ({ ...prev, volume }));
  };

  const handleShuffleToggle = () => {
    setPlaybackState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  };

  const handleRepeatToggle = () => {
    const modes = ['none', 'all', 'one'] as const;
    const currentIndex = modes.indexOf(playbackState.repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setPlaybackState(prev => ({ ...prev, repeatMode: modes[nextIndex] }));
  };

  const handleLikeToggle = () => {
    if (currentTrack) {
      handleLikeTrack(currentTrack.id);
    }
  };

  const handleShowQueue = () => {
    // TODO: Implement queue modal
    console.log('Show queue');
  };

  const handleShowTrackOptions = () => {
    // TODO: Implement track options modal
    console.log('Show track options');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Aurora Player...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Onboarding */}
      {showOnboarding && (
        <OnboardingWizard
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Main Content */}
      <div className="pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora-gradient opacity-10"></div>
          <div className="relative px-6 py-16 md:py-24">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Aurora Player
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Discover your next favorite song with our premium music experience. 
                No ads, just pure music enjoyment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handlePlayTrack(tracks[0])}
                  leftIcon={<Play size={20} />}
                >
                  Start Listening
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowOnboarding(true)}
                >
                  Personalize Experience
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shuffle, label: 'Shuffle Play', color: 'bg-purple-500' },
                { icon: Radio, label: 'Radio', color: 'bg-blue-500' },
                { icon: Heart, label: 'Liked Songs', color: 'bg-red-500' },
                { icon: Star, label: 'Favorites', color: 'bg-yellow-500' },
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {action.label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Tracks */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Recommended for You
              </h2>
              <Button variant="ghost" size="sm">
                See All
              </Button>
            </div>
            <div className="space-y-2">
              {recommendations.slice(0, 5).map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={currentTrack?.id === track.id && playbackState.isPlaying}
                  onPlay={handlePlayTrack}
                  onPause={handlePause}
                  onLike={handleLikeTrack}
                  onShowOptions={() => console.log('Track options')}
                  showIndex={true}
                  showAlbum={true}
                  showDuration={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Featured Playlists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPlay={handlePlayPlaylist}
                  onPause={handlePause}
                  onLike={(id) => console.log('Like playlist', id)}
                  onShowOptions={(playlist) => console.log('Playlist options', playlist)}
                  onNavigate={(id) => console.log('Navigate to playlist', id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Played */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Recently Played
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentlyPlayed.slice(0, 8).map((track) => (
                <Card
                  key={track.id}
                  className="p-4 cursor-pointer"
                  hover
                  clickable
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {track.artist}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Player Bar */}
      <PlayerBar
        currentTrack={currentTrack}
        playbackState={playbackState}
        onPlayPause={currentTrack ? (playbackState.isPlaying ? handlePause : () => handlePlayTrack(currentTrack)) : () => {}}
        onNext={() => console.log('Next track')}
        onPrevious={() => console.log('Previous track')}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onShuffleToggle={handleShuffleToggle}
        onRepeatToggle={handleRepeatToggle}
        onLikeToggle={handleLikeToggle}
        onShowQueue={handleShowQueue}
        onShowTrackOptions={handleShowTrackOptions}
      />
    </div>
  );
}
