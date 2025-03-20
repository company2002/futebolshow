import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
  Trophy,
  Goal,
  Timer,
  Activity,
  Award,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatItem = ({
  icon,
  label,
  value,
  color = "bg-primary",
}: StatItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
      <div className={`p-2 rounded-full ${color} text-white`}>{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

interface SkillBarProps {
  label: string;
  value: number;
}

const SkillBar = ({ label, value = 75 }: SkillBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

interface ProfileSectionProps {
  playerName?: string;
  age?: number;
  nationality?: string;
  height?: string;
  weight?: string;
  position?: string;
  club?: string;
  bio?: string;
  stats?: {
    goals?: number;
    assists?: number;
    matches?: number;
    minutesPlayed?: number;
  };
  skills?: Array<{ name: string; value: number }>;
  achievements?: Array<{ title: string; year: string | number }>;
}

const ProfileSection = ({
  playerName = "Carlos Piquet",
  age = 24,
  nationality = "Brasil",
  height = "1.85m",
  weight = "78kg",
  position = "Atacante",
  club = "FC Barcelona",
  bio = "Cristiano Santos é um atacante versátil conhecido por sua velocidade explosiva e finalização precisa. Formado nas categorias de base do Santos FC, ganhou destaque internacional após sua transferência para a Europa. Sua capacidade de jogar em múltiplas posições no ataque e sua mentalidade competitiva o tornaram um dos jogadores mais promissores de sua geração.",
  stats = {
    goals: 87,
    assists: 42,
    matches: 156,
    minutesPlayed: 12480,
  },
  skills = [
    { name: "Finalização", value: 92 },
    { name: "Velocidade", value: 88 },
    { name: "Drible", value: 85 },
    { name: "Passe", value: 78 },
    { name: "Força Física", value: 75 },
    { name: "Visão de Jogo", value: 82 },
  ],
  achievements = [
    { title: "Campeão Nacional", year: 2022 },
    { title: "Artilheiro da Temporada", year: 2021 },
    { title: "Melhor Jogador Jovem", year: 2020 },
    { title: "Copa Internacional Sub-20", year: 2019 },
  ],
}: ProfileSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background" id="profile">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Perfil e Estatísticas
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio and Personal Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome</span>
                  <span className="font-medium">{playerName}</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Idade</span>
                  <span className="font-medium">{age} anos</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nacionalidade</span>
                  <span className="font-medium">{nationality}</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Altura</span>
                  <span className="font-medium">{height}</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso</span>
                  <span className="font-medium">{weight}</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posição</span>
                  <span className="font-medium">{position}</span>
                </div>
                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clube Atual</span>
                  <span className="font-medium">{club}</span>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-2">Biografia</h4>
                <p className="text-sm text-muted-foreground">{bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Skills */}
          <Card className="lg:col-span-2">
            <Tabs defaultValue="stats" className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Desempenho</CardTitle>
                  <TabsList>
                    <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                    <TabsTrigger value="skills">Habilidades</TabsTrigger>
                    <TabsTrigger value="achievements">Conquistas</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>

              <CardContent>
                <TabsContent value="stats" className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatItem
                      icon={<Goal size={20} />}
                      label="Gols"
                      value={stats.goals || 0}
                      color="bg-red-500"
                    />
                    <StatItem
                      icon={<Trophy size={20} />}
                      label="Assistências"
                      value={stats.assists || 0}
                      color="bg-blue-500"
                    />
                    <StatItem
                      icon={<Users size={20} />}
                      label="Partidas"
                      value={stats.matches || 0}
                      color="bg-green-500"
                    />
                    <StatItem
                      icon={<Timer size={20} />}
                      label="Minutos Jogados"
                      value={stats.minutesPlayed || 0}
                      color="bg-purple-500"
                    />
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">
                      Estatísticas por Temporada
                    </h4>
                    <div className="relative h-64 w-full">
                      <div className="absolute inset-0 rounded-lg border overflow-hidden">
                        <div className="w-full h-full">
                          <div className="flex h-full">
                            <div className="flex flex-col justify-between py-4 pr-2">
                              <span className="text-xs">100</span>
                              <span className="text-xs">75</span>
                              <span className="text-xs">50</span>
                              <span className="text-xs">25</span>
                              <span className="text-xs">0</span>
                            </div>
                            <div className="flex-1 flex items-end justify-around pb-6">
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-12 bg-blue-500 rounded-t-sm"
                                  style={{
                                    height: `${(stats.goals / 100) * 240}px`,
                                  }}
                                ></div>
                                <span className="text-xs mt-2">Gols</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-12 bg-green-500 rounded-t-sm"
                                  style={{
                                    height: `${(stats.assists / 100) * 240}px`,
                                  }}
                                ></div>
                                <span className="text-xs mt-2">
                                  Assistências
                                </span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-12 bg-purple-500 rounded-t-sm"
                                  style={{
                                    height: `${(stats.matches / 200) * 240}px`,
                                  }}
                                ></div>
                                <span className="text-xs mt-2">Partidas</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-12 bg-amber-500 rounded-t-sm"
                                  style={{
                                    height: `${(stats.minutesPlayed / 15000) * 240}px`,
                                  }}
                                ></div>
                                <span className="text-xs mt-2">Minutos</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {skills.slice(0, 3).map((skill, index) => (
                        <SkillBar
                          key={index}
                          label={skill.name}
                          value={skill.value}
                        />
                      ))}
                    </div>
                    <div className="space-y-4">
                      {skills.slice(3, 6).map((skill, index) => (
                        <SkillBar
                          key={index}
                          label={skill.name}
                          value={skill.value}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">
                      Comparação com Média da Liga
                    </h4>
                    <div className="relative h-64 w-full">
                      {/* Placeholder for radar chart */}
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg border">
                        <p className="text-muted-foreground">
                          Gráfico de radar de habilidades
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border"
                      >
                        <div className="p-2 rounded-full bg-amber-500/20 text-amber-500">
                          <Award size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {achievement.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">
                      Destaques da Carreira
                    </h4>
                    <div className="relative h-64 w-full">
                      {/* Placeholder for timeline */}
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg border">
                        <p className="text-muted-foreground">
                          Linha do tempo de conquistas
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
