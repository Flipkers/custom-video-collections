
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import VideoCard from './VideoCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Save, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from '@/components/ui/use-toast';
import type { Collection as CollectionType, VideoItem } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface CollectionProps {
  collection: CollectionType;
  onTitleChange: (title: string) => void;
  onRemoveVideo: (videoId: string) => void;
}

const Collection: React.FC<CollectionProps> = ({
  collection,
  onTitleChange,
  onRemoveVideo,
}) => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();

  const saveCollection = async () => {
    if (!collection.title.trim()) {
      uiToast({
        title: "Collection title required",
        description: "Please add a title for your collection",
        variant: "destructive"
      });
      return;
    }

    if (collection.videos.length === 0) {
      uiToast({
        title: "No videos in collection",
        description: "Please add at least one video to your collection",
        variant: "destructive"
      });
      return;
    }

    try {
      toast.loading("Saving collection...");
      
      // In a real implementation, this would use the Supabase client
      // For now, we'll simulate the save and generate a fake ID
      const fakeCollectionId = Math.random().toString(36).substring(2, 15);
      
      // Save to local storage for demo purposes
      const collections = JSON.parse(localStorage.getItem('collections') || '{}');
      collections[fakeCollectionId] = {
        ...collection,
        id: fakeCollectionId,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('collections', JSON.stringify(collections));
      
      toast.dismiss();
      toast.success("Collection saved successfully!");
      
      // Navigate to share page
      navigate(`/share/${fakeCollectionId}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to save collection");
      console.error("Save error:", error);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Input
            value={collection.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Collection Title"
            className="text-xl font-bold bg-transparent border-none shadow-none focus-visible:ring-0 p-0 h-auto"
          />
          <Button onClick={saveCollection} className="bg-accent hover:bg-accent/80 text-accent-foreground">
            <Save size={16} className="mr-2" />
            Save Collection
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {collection.videos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Your collection is empty. Search and add videos!</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collection.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  inCollection={true}
                  onRemove={() => onRemoveVideo(video.id)}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default Collection;
