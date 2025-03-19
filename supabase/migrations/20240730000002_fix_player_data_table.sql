-- Create player_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS player_data (
  id BIGINT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data if the table is empty
INSERT INTO player_data (id, data)
SELECT 
  1, 
  jsonb_build_object(
    'player', jsonb_build_object(
      'name', 'Cristiano Santos',
      'position', 'Atacante / Ponta Esquerda',
      'age', 24,
      'nationality', 'Brasil',
      'height', '1.85m',
      'weight', '78kg',
      'club', 'FC Barcelona',
      'profileImage', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
      'highlightVideo', 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      'bio', 'Cristiano Santos é um atacante versátil conhecido por sua velocidade explosiva e finalização precisa. Formado nas categorias de base do Santos FC, ganhou destaque internacional após sua transferência para a Europa. Sua capacidade de jogar em múltiplas posições no ataque e sua mentalidade competitiva o tornaram um dos jogadores mais promissores de sua geração.'
    ),
    'stats', jsonb_build_object(
      'goals', 87,
      'assists', 42,
      'matches', 156,
      'minutesPlayed', 12480
    ),
    'skills', jsonb_build_array(
      jsonb_build_object('name', 'Finalização', 'value', 92),
      jsonb_build_object('name', 'Velocidade', 'value', 88),
      jsonb_build_object('name', 'Drible', 'value', 85),
      jsonb_build_object('name', 'Passe', 'value', 78),
      jsonb_build_object('name', 'Força Física', 'value', 75),
      jsonb_build_object('name', 'Visão de Jogo', 'value', 82)
    ),
    'achievements', jsonb_build_array(
      jsonb_build_object('title', 'Campeão Nacional', 'year', 2022),
      jsonb_build_object('title', 'Artilheiro da Temporada', 'year', 2021),
      jsonb_build_object('title', 'Melhor Jogador Jovem', 'year', 2020),
      jsonb_build_object('title', 'Copa Internacional Sub-20', 'year', 2019)
    ),
    'contact', jsonb_build_object(
      'email', 'contato@cristianosantos.com',
      'phone', '+55 11 99999-9999',
      'socialLinks', jsonb_build_object(
        'facebook', 'https://facebook.com/cristianosantos',
        'instagram', 'https://instagram.com/cristianosantos',
        'twitter', 'https://twitter.com/cristianosantos',
        'linkedin', 'https://linkedin.com/in/cristianosantos'
      )
    ),
    'seo', jsonb_build_object(
      'title', 'Cristiano Santos | Atacante Profissional | Perfil Oficial',
      'description', 'Perfil oficial de Cristiano Santos, atacante profissional do FC Barcelona. Estatísticas, vídeos de destaque e informações para contato profissional.',
      'keywords', 'Cristiano Santos, atacante, futebol profissional, FC Barcelona, jogador brasileiro',
      'imageUrl', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
    ),
    'mediaItems', jsonb_build_array(
      jsonb_build_object(
        'id', '1',
        'type', 'video',
        'thumbnail', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
        'source', 'https://player.vimeo.com/external/373803358.sd.mp4?s=388f7d5b5ceb30e62c71c0f8137156de8abe3a0f&profile_id=165&oauth2_token_id=57447761',
        'title', 'Goal against Barcelona',
        'description', 'Amazing goal scored in the Champions League quarterfinals'
      ),
      jsonb_build_object(
        'id', '2',
        'type', 'image',
        'thumbnail', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
        'source', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
        'title', 'Professional photoshoot',
        'description', 'Official team photoshoot for the current season'
      )
    ),
    'backgroundMusic', jsonb_build_object(
      'url', '',
      'autoPlay', false,
      'volume', 0.5
    )
  )
WHERE NOT EXISTS (SELECT 1 FROM player_data WHERE id = 1);