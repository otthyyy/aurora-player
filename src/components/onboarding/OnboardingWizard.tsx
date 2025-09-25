'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Music, 
  Heart, 
  Zap,
  Moon,
  Sun,
  Coffee
} from 'lucide-react';
import { OnboardingData } from '@/types';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

export interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const GENRES = [
  { id: 'pop', name: 'Pop', icon: '🎵', color: 'bg-pink-500' },
  { id: 'rock', name: 'Rock', icon: '🎸', color: 'bg-red-500' },
  { id: 'hip-hop', name: 'Hip Hop', icon: '🎤', color: 'bg-purple-500' },
  { id: 'electronic', name: 'Electronic', icon: '🎛️', color: 'bg-blue-500' },
  { id: 'jazz', name: 'Jazz', icon: '🎷', color: 'bg-yellow-500' },
  { id: 'classical', name: 'Classical', icon: '🎼', color: 'bg-green-500' },
  { id: 'country', name: 'Country', icon: '🤠', color: 'bg-orange-500' },
  { id: 'indie', name: 'Indie', icon: '🎨', color: 'bg-teal-500' },
  { id: 'r&b', name: 'R&B', icon: '💫', color: 'bg-indigo-500' },
  { id: 'reggae', name: 'Reggae', icon: '🌴', color: 'bg-lime-500' },
];

const ARTISTS = [
  { id: 'the-weeknd', name: 'The Weeknd', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  { id: 'dua-lipa', name: 'Dua Lipa', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop' },
  { id: 'olivia-rodrigo', name: 'Olivia Rodrigo', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop' },
  { id: 'lil-nas-x', name: 'Lil Nas X', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  { id: 'billie-eilish', name: 'Billie Eilish', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop' },
  { id: 'harry-styles', name: 'Harry Styles', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop' },
  { id: 'taylor-swift', name: 'Taylor Swift', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  { id: 'ed-sheeran', name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop' },
];

const MOODS = [
  { id: 'chill', name: 'Chill', icon: Moon, description: 'Relaxing and mellow vibes', color: 'bg-blue-500' },
  { id: 'energetic', name: 'Energetic', icon: Zap, description: 'High energy and upbeat', color: 'bg-yellow-500' },
  { id: 'mixed', name: 'Mixed', icon: Music, description: 'A bit of everything', color: 'bg-purple-500' },
];

const TIMES = [
  { id: 'morning', name: 'Morning', icon: Sun, description: '6 AM - 12 PM', color: 'bg-orange-500' },
  { id: 'afternoon', name: 'Afternoon', icon: Coffee, description: '12 PM - 6 PM', color: 'bg-yellow-500' },
  { id: 'evening', name: 'Evening', icon: Moon, description: '6 PM - 10 PM', color: 'bg-purple-500' },
  { id: 'night', name: 'Night', icon: Moon, description: '10 PM - 6 AM', color: 'bg-indigo-500' },
  { id: 'anytime', name: 'Anytime', icon: Music, description: 'All day long', color: 'bg-gray-500' },
];

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const steps = [
    {
      title: 'Welcome to Aurora Player',
      subtitle: 'Let\'s personalize your music experience',
      content: 'welcome'
    },
    {
      title: 'What genres do you like?',
      subtitle: 'Select your favorite music genres',
      content: 'genres'
    },
    {
      title: 'Who are your favorite artists?',
      subtitle: 'Choose artists you love',
      content: 'artists'
    },
    {
      title: 'What\'s your music mood?',
      subtitle: 'How do you like to listen?',
      content: 'mood'
    },
    {
      title: 'When do you listen to music?',
      subtitle: 'Your preferred listening time',
      content: 'time'
    },
    {
      title: 'All set!',
      subtitle: 'Your personalized experience is ready',
      content: 'complete'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const data: OnboardingData = {
        selectedGenres,
        selectedArtists,
        musicMood: selectedMood as any,
        listeningTime: selectedTime as any,
        isCompleted: true,
      };
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleArtistToggle = (artistId: string) => {
    setSelectedArtists(prev => 
      prev.includes(artistId) 
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedGenres.length > 0;
      case 2: return selectedArtists.length > 0;
      case 3: return selectedMood !== '';
      case 4: return selectedTime !== '';
      default: return true;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.content) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music size={48} className="text-white" />
              </div>
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to Aurora Player
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Your premium music experience awaits. Let's customize it just for you.
              </p>
            </div>
          </div>
        );

      case 'genres':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {GENRES.map((genre) => (
                <motion.button
                  key={genre.id}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all duration-200 text-center',
                    selectedGenres.includes(genre.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                  onClick={() => handleGenreToggle(genre.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-2">{genre.icon}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {genre.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'artists':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ARTISTS.map((artist) => (
                <motion.button
                  key={artist.id}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all duration-200 text-center',
                    selectedArtists.includes(artist.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                  onClick={() => handleArtistToggle(artist.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {artist.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.id}
                    className={cn(
                      'p-6 rounded-xl border-2 transition-all duration-200 text-center',
                      selectedMood === mood.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                    onClick={() => setSelectedMood(mood.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4', mood.color)}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {mood.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {mood.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 'time':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIMES.map((time) => {
                const Icon = time.icon;
                return (
                  <motion.button
                    key={time.id}
                    className={cn(
                      'p-6 rounded-xl border-2 transition-all duration-200 text-center',
                      selectedTime === time.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                    onClick={() => setSelectedTime(time.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4', time.color)}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {time.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {time.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={48} className="text-white" />
              </div>
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                You're all set!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Your personalized music experience is ready. Let's start discovering amazing music together!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {steps[currentStep].title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {steps[currentStep].subtitle}
              </p>
            </div>
            
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={onSkip}
            >
              Skip
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    index <= currentStep ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight size={16} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard;
