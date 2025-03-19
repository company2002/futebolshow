/**
 * Data Service for managing player showcase data
 * In a real application, this would connect to a backend API
 */

// Define the data structure
export interface PlayerData {
  player: {
    name: string;
    position: string;
    age: number;
    nationality: string;
    height: string;
    weight: string;
    club: string;
    profileImage: string;
    highlightVideo: string;
    bio: string;
  };
  stats: {
    goals: number;
    assists: number;
    matches: number;
    minutesPlayed: number;
  };
  skills: Array<{ name: string; value: number }>;
  achievements: Array<{ title: string; year: string | number }>;
  contact: {
    email: string;
    phone: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
      linkedin: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    imageUrl: string;
  };
  mediaItems: Array<{
    id: string;
    type: "image" | "video";
    thumbnail: string;
    source: string;
    title: string;
    description?: string;
  }>;
  backgroundMusic?: {
    url: string;
    autoPlay: boolean;
    volume: number;
  };
}

// Default data
const defaultData: PlayerData = {
  player: {
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
  },
  stats: {
    goals: 87,
    assists: 42,
    matches: 156,
    minutesPlayed: 12480,
  },
  skills: [
    { name: "Finalização", value: 92 },
    { name: "Velocidade", value: 88 },
    { name: "Drible", value: 85 },
    { name: "Passe", value: 78 },
    { name: "Força Física", value: 75 },
    { name: "Visão de Jogo", value: 82 },
  ],
  achievements: [
    { title: "Campeão Nacional", year: 2022 },
    { title: "Artilheiro da Temporada", year: 2021 },
    { title: "Melhor Jogador Jovem", year: 2020 },
    { title: "Copa Internacional Sub-20", year: 2019 },
  ],
  contact: {
    email: "contato@cristianosantos.com",
    phone: "+55 11 99999-9999",
    socialLinks: {
      facebook: "https://facebook.com/cristianosantos",
      instagram: "https://instagram.com/cristianosantos",
      twitter: "https://twitter.com/cristianosantos",
      linkedin: "https://linkedin.com/in/cristianosantos",
    },
  },
  seo: {
    title: "Cristiano Santos | Atacante Profissional | Perfil Oficial",
    description:
      "Perfil oficial de Cristiano Santos, atacante profissional do FC Barcelona. Estatísticas, vídeos de destaque e informações para contato profissional.",
    keywords:
      "Cristiano Santos, atacante, futebol profissional, FC Barcelona, jogador brasileiro",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
  },
  mediaItems: [
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
  backgroundMusic: {
    url: "",
    autoPlay: false,
    volume: 0.5,
  },
};

// Get data from localStorage or use default
export const getData = (): PlayerData => {
  try {
    const savedData = localStorage.getItem("playerShowcaseData");
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return defaultData;
};

// Save data to localStorage
export const saveData = (data: PlayerData): boolean => {
  try {
    localStorage.setItem("playerShowcaseData", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

// Reset data to default
export const resetData = (): boolean => {
  try {
    localStorage.setItem("playerShowcaseData", JSON.stringify(defaultData));
    return true;
  } catch (error) {
    console.error("Error resetting data:", error);
    return false;
  }
};
