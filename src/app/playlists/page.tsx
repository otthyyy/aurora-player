'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { Playlist } from '@/types';
import { cn } from '@/lib/utils';
import { fakeApi } from '@/lib/fakeApi';
import { PlaylistCard } from '@/components/playlist';
import { Button, Input, Modal } from '@/components/ui';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlaylists();
  }, []);

  useEffect(() => {
    filterPlaylists();
  }, [playlists, searchQuery]);

  const loadPlaylists = async () => {
    try {
      setIsLoading(true);
      const data = await fakeApi.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPlaylists = () => {
    const filtered = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlaylists(filtered);
  };

  const handleCreatePlaylist = async (data: { name: string; description?: string; isPublic?: boolean }) => {
    try {
      const newPlaylist = await fakeApi.createPlaylist(data);
      setPlaylists(prev => [newPlaylist, ...prev]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    // TODO: Implement playlist playback
    console.log('Play playlist:', playlist);
  };

  const handleLikePlaylist = async (playlistId: string) => {
    try {
      // TODO: Implement playlist like toggle
      console.log('Like playlist:', playlistId);
    } catch (error) {
      console.error('Error liking playlist:', error);
    }
  };

  const handleShowOptions = (playlist: Playlist) => {
    // TODO: Implement playlist options
    console.log('Playlist options:', playlist);
  };

  const handleNavigate = (playlistId: string) => {
    // TODO: Navigate to playlist detail
    console.log('Navigate to playlist:', playlistId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Your Playlists
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {playlists.length} playlists
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus size={20} />}
          >
            Create Playlist
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="ghost" size="sm">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Playlists Grid/List */}
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No playlists found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first playlist to get started'}
            </p>
            {!searchQuery && (
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                leftIcon={<Plus size={20} />}
              >
                Create Playlist
              </Button>
            )}
          </div>
        ) : (
          <motion.div
            className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            )}
            layout
          >
            {filteredPlaylists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PlaylistCard
                  playlist={playlist}
                  onPlay={handlePlayPlaylist}
                  onPause={() => {}}
                  onLike={handleLikePlaylist}
                  onShowOptions={handleShowOptions}
                  onNavigate={handleNavigate}
                  compact={viewMode === 'list'}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
}

// Create Playlist Modal Component
interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; description?: string; isPublic?: boolean }) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreate(formData);
      setFormData({ name: '', description: '', isPublic: false });
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Playlist"
      description="Give your playlist a name and description"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Playlist Name"
          placeholder="Enter playlist name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        
        <Input
          label="Description"
          placeholder="Enter playlist description (optional)"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
        
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
            Create Playlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};
