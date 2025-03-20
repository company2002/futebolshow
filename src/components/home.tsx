import React, { useState, useEffect } from "react";
import {
  getPlayerData,
  subscribeToPlayerData,
  initializeDatabase,
} from "../lib/playerDataService";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import ProfileSection from "./ProfileSection";
import MediaGallery from "./MediaGallery";
import ContactSection from "./ContactSection";
import SEOOptimizer from "./SEOOptimizer";
import MusicPlayer from "./MusicPlayer";

const Home = () => {
  // In a real application, this would come from a database or API
  // For demo purposes, we'll check localStorage first, then use default data
  const [playerData, setPlayerData] = useState({
    name: "Cristiano Santos",
    position: "Atacante / Ponta Esquerda",
    age: 24,
    nationality: "Brasil",
    height: "1.85m",
    weight: "78kg",
    club: "FC Barcelona",
    profileImage:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    highlightVideo:
      "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
    bio: "Cristiano Santos é um atacante versátil conhecido por sua velocidade explosiva e finalização precisa. Formado nas categorias de base do Santos FC, ganhou destaque internacional após sua transferência para a Europa. Sua capacidade de jogar em múltiplas posições no ataque e sua mentalidade competitiva o tornaram um dos jogadores mais promissores de sua geração.",
  });

  const [stats, setStats] = useState({
    goals: 87,
    assists: 42,
    matches: 156,
    minutesPlayed: 12480,
  });

  const [skills, setSkills] = useState([
    { name: "Finalização", value: 92 },
    { name: "Velocidade", value: 88 },
    { name: "Drible", value: 85 },
    { name: "Passe", value: 78 },
    { name: "Força Física", value: 75 },
    { name: "Visão de Jogo", value: 82 },
  ]);

  const [achievements, setAchievements] = useState([
    { title: "Campeão Nacional", year: 2022 },
    { title: "Artilheiro da Temporada", year: 2021 },
    { title: "Melhor Jogador Jovem", year: 2020 },
    { title: "Copa Internacional Sub-20", year: 2019 },
  ]);

  const [contact, setContact] = useState({
    email: "contato@cristianosantos.com",
    phone: "+55 11 99999-9999",
    socialLinks: {
      facebook: "https://facebook.com/cristianosantos",
      instagram: "https://instagram.com/cristianosantos",
      twitter: "https://twitter.com/cristianosantos",
      linkedin: "https://linkedin.com/in/cristianosantos",
    },
  });

  const [seo, setSeo] = useState({
    title: "Carlos Piquet | Atacante Profissional | Perfil Oficial",
    description:
      "Perfil oficial de Carlos Piquet, atacante profissional do FC Barcelona. Estatísticas, vídeos de destaque e informações para contato profissional.",
    keywords:
      "Carlos Piquet, atacante, futebol profissional, FC Barcelona, jogador brasileiro",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
  });

  const [mediaItems, setMediaItems] = useState([]);

  const [backgroundMusic, setBackgroundMusic] = useState({
    url: "",
    autoPlay: false,
    volume: 0.5,
  });

  // Initialize database and load data
  useEffect(() => {
    // Initialize the database with default data if empty
    initializeDatabase();

    // Load initial data
    const loadData = async () => {
      try {
        const data = await getPlayerData();
        updateUIWithData(data);
      } catch (error) {
        console.error("Error loading initial data:", error);
        // Fallback to localStorage if there's an error
        loadFromLocalStorage();
      }
    };

    loadData();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToPlayerData((data) => {
      console.log("Received real-time update", data);
      updateUIWithData(data);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Helper function to update UI with data
  const updateUIWithData = (data: any) => {
    if (data.player) setPlayerData(data.player);
    if (data.stats) setStats(data.stats);
    if (data.skills) setSkills(data.skills);
    if (data.achievements) setAchievements(data.achievements);
    if (data.contact) setContact(data.contact);
    if (data.seo) setSeo(data.seo);
    if (data.mediaItems) setMediaItems(data.mediaItems);
    if (data.backgroundMusic) setBackgroundMusic(data.backgroundMusic);
  };

  // Fallback function to load from localStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("playerShowcaseData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        updateUIWithData(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Music Player */}
      {backgroundMusic?.url && (
        <div className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm rounded-md shadow-md px-2 py-1">
          <MusicPlayer
            audioUrl={backgroundMusic.url}
            autoPlay={backgroundMusic.autoPlay}
            initialVolume={backgroundMusic.volume}
          />
        </div>
      )}

      {/* Admin Link - Only visible to admins in a real app */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/admin"
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Admin Login
        </Link>
      </div>

      {/* SEO Optimization */}
      <SEOOptimizer
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        playerName={playerData.name}
        playerPosition={playerData.position}
        playerTeam={playerData.club}
        imageUrl={seo.imageUrl}
      />

      {/* Hero Section */}
      <HeroSection
        playerName={playerData.name}
        position={playerData.position}
        profileImage={playerData.profileImage}
        highlightVideo={playerData.highlightVideo}
        autoPlay={true}
      />

      {/* Profile Section */}
      <ProfileSection
        playerName={playerData.name}
        age={playerData.age}
        nationality={playerData.nationality}
        height={playerData.height}
        weight={playerData.weight}
        position={playerData.position}
        club={playerData.club}
        bio={playerData.bio}
        stats={stats}
        skills={skills}
        achievements={achievements}
      />

      {/* Media Gallery */}
      <MediaGallery
        title="Galeria de Mídia"
        subtitle="Confira os melhores momentos e fotos profissionais"
        mediaItems={mediaItems.length > 0 ? mediaItems : undefined}
      />

      {/* Contact Section */}
      <ContactSection
        playerName={playerData.name}
        email={contact.email}
        phone={contact.phone}
        socialLinks={contact.socialLinks}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {playerData.name} | Todos os direitos
            reservados
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desenvolvido por Lazy Pager Sports Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
