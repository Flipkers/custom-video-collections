
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchResults from '@/components/SearchResults';
import Collection from '@/components/Collection';
import Navbar from '@/components/Navbar';
import { searchVideos, YouTubeSearchResult } from '@/lib/youtubeApi';
import type { Collection as CollectionType, VideoItem } from '@/lib/supabase';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [collection, setCollection] = useState<CollectionType>({
    title: 'My YouTube Collection',
    videos: [],
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const results = await searchVideos(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleAddVideo = (video: VideoItem) => {
    // Check if video is already in collection
    if (collection.videos.some(v => v.id === video.id)) {
      return;
    }
    
    setCollection(prev => ({
      ...prev,
      videos: [...prev.videos, video]
    }));
  };

  const handleRemoveVideo = (videoId: string) => {
    setCollection(prev => ({
      ...prev,
      videos: prev.videos.filter(video => video.id !== videoId)
    }));
  };

  const handleTitleChange = (title: string) => {
    setCollection(prev => ({
      ...prev,
      title
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-2 mb-8">
            <TabsTrigger value="search">Search Videos</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for YouTube videos..."
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </form>

            <SearchResults 
              results={searchResults} 
              onAddVideo={handleAddVideo} 
              isLoading={isSearching}
            />
          </TabsContent>
          
          <TabsContent value="collection">
            <Collection 
              collection={collection} 
              onRemoveVideo={handleRemoveVideo} 
              onTitleChange={handleTitleChange} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
