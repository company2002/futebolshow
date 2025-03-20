import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeroSectionProps {
  playerName?: string;
  position?: string;
  profileImage?: string;
  highlightVideo?: string;
  autoPlay?: boolean;
}

const HeroSection = ({
  playerName = "Carlos Piquet",
  position = "Atacante / Ponta Esquerda",
  profileImage = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
  highlightVideo = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
  autoPlay = false,
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);

  useEffect(() => {
    // Simulate video loading delay
    if (autoPlay) {
      setIsVideoBuffering(true);
      const timer = setTimeout(() => {
        setIsVideoLoaded(true);
        setIsVideoBuffering(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const handlePlayPause = () => {
    if (!isVideoLoaded) {
      setIsVideoBuffering(true);
      setTimeout(() => {
        setIsVideoLoaded(true);
        setIsVideoBuffering(false);
        setIsPlaying(true);
      }, 1500);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full h-[800px] bg-gray-900 text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900 z-10"></div>

      {/* Player image */}
      <div className="absolute inset-0 z-0">
        <img
          src={profileImage}
          alt={playerName}
          className="w-full h-full object-cover object-center opacity-60"
        />
      </div>

      {/* Video container */}
      <div className="absolute right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 h-full z-0 overflow-hidden">
        {isVideoLoaded ? (
          <video
            src={highlightVideo}
            className="w-full h-full object-cover object-center"
            autoPlay={isPlaying}
            loop
            muted={isMuted}
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {isVideoBuffering ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white/80">Carregando vídeo...</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Content container */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white drop-shadow-lg">
            {playerName}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-8 text-white/90">
            {position}
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-xl text-white/80">
            Jogador profissional com técnica refinada e visão de jogo
            excepcional. Especialista em finalizações precisas e criação de
            oportunidades decisivas.
          </p>

          <div className="flex space-x-4">
            <Button
              variant="default"
              size="lg"
              className="bg-white text-gray-900 hover:bg-white/90"
            >
              Ver Perfil Completo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20"
            >
              Contato
            </Button>
          </div>
        </div>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pausar" : "Reproduzir"} vídeo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={handleMuteToggle}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Ativar" : "Desativar"} som</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default HeroSection;
