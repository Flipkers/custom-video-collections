
import React from 'react';
import VideoCard from './VideoCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { YouTubeSearchResult } from '@/lib/youtubeApi';
import type { VideoItem } from '@/lib/supabase';

interface SearchResultsProps {
  results: YouTubeSearchResult[];
  onAddVideo: (video: VideoItem) => void;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  onAddVideo,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-secondary rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-4 text-center text-muted-foreground">
        No videos found. Try another search term.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result) => (
          <VideoCard
            key={result.id.videoId}
            video={{
              id: result.id.videoId,
              title: result.snippet.title,
              thumbnail: result.snippet.thumbnails.medium.url,
            }}
            onAdd={() => onAddVideo({
              id: result.id.videoId,
              title: result.snippet.title,
              thumbnail: result.snippet.thumbnails.medium.url,
            })}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SearchResults;
