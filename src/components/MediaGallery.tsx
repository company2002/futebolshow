import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface MediaItem {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  source: string;
  title: string;
  description?: string;
}

interface MediaGalleryProps {
  title?: string;
  subtitle?: string;
  mediaItems?: MediaItem[];
}

const MediaGallery = ({
  title = "Media Highlights",
  subtitle = "Check out the best moments and professional photos",
  mediaItems = [
    {
      id: "1",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
      source:
        "https://player.vimeo.com/external/373803358.sd.mp4?s=388f7d5b5ceb30e62c71c0f8137156de8abe3a0f&profile_id=165&oauth2_token_id=57447761",
      title: "Goal against Barcelona",
      description: "Amazing goal scored in the Champions League quarterfinals",
    },
    {
      id: "2",
      type: "image",
      thumbnail:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80",
      source:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80",
      title: "Professional photoshoot",
      description: "Official team photoshoot for the current season",
    },
    {
      id: "3",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      source:
        "https://player.vimeo.com/external/370467031.sd.mp4?s=32d2aa1c88e69c6f6fecbec0af8cc801daf27b33&profile_id=165&oauth2_token_id=57447761",
      title: "Free kick technique",
      description: "Compilation of the best free kicks from last season",
    },
    {
      id: "4",
      type: "image",
      thumbnail:
        "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80",
      source:
        "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=1200&q=80",
      title: "Trophy celebration",
      description: "Celebrating the league title with teammates",
    },
    {
      id: "5",
      type: "video",
      thumbnail:
        "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
      source:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f62a23d39fd9a85bbcf4b0848e8d42a6dc&profile_id=165&oauth2_token_id=57447761",
      title: "Training session highlights",
      description: "Behind the scenes from pre-season training",
    },
    {
      id: "6",
      type: "image",
      thumbnail:
        "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=800&q=80",
      source:
        "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=80",
      title: "Fan interaction",
      description: "Meeting with supporters after an important match",
    },
  ],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    if (media.type === "video") {
      setIsPlaying(false);
      // Small timeout to ensure video element is mounted before attempting to play
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 100);
    }
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [selectedMedia]);

  // Implement lazy loading for carousel items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute("data-src");
            }
            observer.unobserve(lazyImage);
          }
        });
      },
      { rootMargin: "100px" },
    );

    // Small timeout to ensure DOM is ready
    setTimeout(() => {
      const lazyImages = document.querySelectorAll(".lazy-image");
      lazyImages.forEach((img) => observer.observe(img));
    }, 100);

    return () => {
      const lazyImages = document.querySelectorAll(".lazy-image");
      lazyImages.forEach((img) => observer.unobserve(img));
    };
  }, [currentIndex]);

  // Calculate visible thumbnails
  const visibleThumbnails = () => {
    const items = [];
    const totalItems = mediaItems.length;
    const maxVisible = 5; // Maximum number of visible thumbnails

    for (let i = 0; i < maxVisible; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push(mediaItems[index]);
    }

    return items;
  };

  return (
    <div className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8">
          <Card className="overflow-hidden bg-white rounded-xl shadow-lg">
            <div className="aspect-w-16 aspect-h-9 relative">
              {mediaItems[currentIndex].type === "image" ? (
                <img
                  src={mediaItems[currentIndex].source}
                  alt={mediaItems[currentIndex].title}
                  className="w-full h-full object-cover"
                  onClick={() => handleMediaClick(mediaItems[currentIndex])}
                />
              ) : (
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => handleMediaClick(mediaItems[currentIndex])}
                >
                  <img
                    src={mediaItems[currentIndex].thumbnail}
                    alt={mediaItems[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="rounded-full bg-white bg-opacity-80 p-4">
                      <Play className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {mediaItems[currentIndex].title}
              </h3>
              <p className="text-gray-600">
                {mediaItems[currentIndex].description}
              </p>
            </div>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-gray-100"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-gray-100"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Thumbnails */}
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {mediaItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${currentIndex === index ? "scale-105 ring-2 ring-blue-500" : "opacity-70 hover:opacity-100"}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="w-32 h-24 md:w-40 md:h-28 relative rounded-lg overflow-hidden">
                <img
                  className="lazy-image w-full h-full object-cover"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
                  data-src={item.thumbnail}
                  alt={item.title}
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Full-size Media Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                onClick={handleCloseModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.source}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              ) : (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={selectedMedia.source}
                    className="w-full h-auto max-h-[80vh]"
                    controls={false}
                    playsInline
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold">{selectedMedia.title}</h3>
                {selectedMedia.description && (
                  <p className="text-gray-300">{selectedMedia.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
