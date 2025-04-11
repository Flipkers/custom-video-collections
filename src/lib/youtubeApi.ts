
const YOUTUBE_API_KEY = 'AIzaSyAimM3FIehnFk1MPunKWwylJaGMiFYIokQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export const searchVideos = async (query: string): Promise<YouTubeSearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(
        query
      )}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to search videos');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

export const getVideoUrl = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};
