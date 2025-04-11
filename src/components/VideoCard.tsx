
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, ExternalLink, Trash2 } from 'lucide-react';
import { getVideoUrl } from '@/lib/youtubeApi';
import type { VideoItem } from '@/lib/supabase';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
  };
  inCollection?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  inCollection = false,
  onAdd,
  onRemove
}) => {
  return (
    <div className="video-card bg-card rounded-lg overflow-hidden border border-border">
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-2">{video.title}</h3>
        <div className="flex justify-between items-center">
          <a 
            href={getVideoUrl(video.id)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1"
          >
            <ExternalLink size={14} />
            Watch on YouTube
          </a>
          {!inCollection ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onAdd}
              className="text-accent hover:text-accent-foreground hover:bg-accent/20"
            >
              <PlusCircle size={16} className="mr-1" />
              Add
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRemove}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
