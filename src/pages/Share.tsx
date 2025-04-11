
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import { toast } from 'sonner';
import type { Collection } from '@/lib/supabase';

const Share: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from Supabase
    // For now, we'll load from localStorage
    const loadCollection = () => {
      setLoading(true);
      try {
        const collections = JSON.parse(localStorage.getItem('collections') || '{}');
        const collection = collections[id || ''];
        setCollection(collection || null);
      } catch (error) {
        console.error('Failed to load collection:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCollection();
  }, [id]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse bg-secondary h-8 w-1/2 mb-8 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-secondary rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
          <p className="text-muted-foreground">The collection you're looking for doesn't exist or has been removed.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{collection.title}</h1>
          <Button onClick={handleShare} className="bg-accent hover:bg-accent/80">
            <Share2 size={16} className="mr-2" />
            Share Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {collection.videos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              inCollection={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Share;
