import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import {
  Save,
  Upload,
  Plus,
  Trash2,
  ArrowLeft,
  RefreshCw,
  Key,
  User,
  Phone,
  Music,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getData, saveData, resetData, PlayerData } from "./DataService";
import {
  getAuthData,
  saveAuthData,
  resetAuthData,
  AuthData,
} from "./AuthService";
import SupabaseStatus from "../SupabaseStatus";
import { savePlayerData } from "../../lib/playerDataService";

interface AdminPanelProps {
  initialData?: PlayerData;
  onSave?: (data: PlayerData) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  initialData,
  onSave = () => {},
}) => {
  const [formData, setFormData] = useState<PlayerData>(
    initialData || getData(),
  );
  const [authData, setAuthData] = useState<AuthData>(getAuthData());
  const [activeTab, setActiveTab] = useState("profile");
  const [newSkill, setNewSkill] = useState({ name: "", value: 50 });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    year: new Date().getFullYear(),
  });
  const [newMediaItem, setNewMediaItem] = useState({
    id: "",
    type: "image",
    thumbnail: "",
    source: "",
    title: "",
    description: "",
  });
  const [backgroundMusicUrl, setBackgroundMusicUrl] = useState(
    formData.backgroundMusic?.url || "",
  );
  const [autoPlayMusic, setAutoPlayMusic] = useState(
    formData.backgroundMusic?.autoPlay || false,
  );
  const [musicVolume, setMusicVolume] = useState(
    formData.backgroundMusic?.volume || 0.5,
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Load data from localStorage if available
    const savedData = localStorage.getItem("playerShowcaseData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);

        // Set music settings
        if (parsedData.backgroundMusic) {
          setBackgroundMusicUrl(parsedData.backgroundMusic.url || "");
          setAutoPlayMusic(parsedData.backgroundMusic.autoPlay || false);
          setMusicVolume(parsedData.backgroundMusic.volume || 0.5);
        }
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleNestedInputChange = (
    section: string,
    nestedSection: string,
    field: string,
    value: any,
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [nestedSection]: {
          ...formData[section][nestedSection],
          [field]: value,
        },
      },
    });
  };

  const handleArrayItemChange = (
    section: string,
    index: number,
    field: string,
    value: any,
  ) => {
    const newArray = [...formData[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData({
      ...formData,
      [section]: newArray,
    });
  };

  const addSkill = () => {
    if (newSkill.name.trim() === "") return;
    setFormData({
      ...formData,
      skills: [...formData.skills, { ...newSkill }],
    });
    setNewSkill({ name: "", value: 50 });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const addAchievement = () => {
    if (newAchievement.title.trim() === "") return;
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { ...newAchievement }],
    });
    setNewAchievement({ title: "", year: new Date().getFullYear() });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = [...formData.achievements];
    newAchievements.splice(index, 1);
    setFormData({
      ...formData,
      achievements: newAchievements,
    });
  };

  const addMediaItem = () => {
    if (newMediaItem.title.trim() === "" || newMediaItem.source.trim() === "")
      return;
    const newItem = {
      ...newMediaItem,
      id: Date.now().toString(),
      thumbnail: newMediaItem.thumbnail || newMediaItem.source,
    };
    setFormData({
      ...formData,
      mediaItems: [...formData.mediaItems, newItem],
    });
    setNewMediaItem({
      id: "",
      type: "image",
      thumbnail: "",
      source: "",
      title: "",
      description: "",
    });
    // Show confirmation message
    alert("Item de mídia adicionado com sucesso!");
  };

  const removeMediaItem = (index: number) => {
    const newMediaItems = [...formData.mediaItems];
    newMediaItems.splice(index, 1);
    setFormData({
      ...formData,
      mediaItems: newMediaItems,
    });
  };

  const handleSave = async () => {
    // Update background music settings before saving
    const updatedFormData = {
      ...formData,
      backgroundMusic: {
        url: backgroundMusicUrl,
        autoPlay: autoPlayMusic,
        volume: musicVolume,
      },
    };

    // Save to both localStorage and Supabase (if configured)
    try {
      // First save to local storage as a fallback
      saveData(updatedFormData);

      // Then save to Supabase for real-time updates
      const success = await savePlayerData(updatedFormData);

      if (success) {
        setFormData(updatedFormData);
        onSave(updatedFormData);
        alert(
          "Dados salvos com sucesso! As alterações serão atualizadas em tempo real para todos os usuários.",
        );
      } else {
        alert("Erro ao salvar os dados. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Erro ao salvar os dados. Por favor, tente novamente.");
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Tem certeza que deseja restaurar todos os dados para os valores padrão? Esta ação não pode ser desfeita.",
      )
    ) {
      const success = resetData();
      if (success) {
        setFormData(getData());
        alert("Dados restaurados com sucesso!");
      } else {
        alert("Erro ao restaurar os dados. Por favor, tente novamente.");
      }
    }
  };

  const handleBackToSite = () => {
    navigate("/");
  };

  const handleVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-4"
              onClick={handleBackToSite}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="mr-2">
              <SupabaseStatus
                onConfigure={() => {
                  window.location.href = "/?setup=supabase";
                }}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Restaurar Padrões
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="mr-2 h-4 w-4" /> Salvar Alterações
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="media">Mídia</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="music">Música</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Jogador</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="playerName">Nome</Label>
                    <Input
                      id="playerName"
                      value={formData.player.name}
                      onChange={(e) =>
                        handleInputChange("player", "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerPosition">Posição</Label>
                    <Input
                      id="playerPosition"
                      value={formData.player.position}
                      onChange={(e) =>
                        handleInputChange("player", "position", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerAge">Idade</Label>
                    <Input
                      id="playerAge"
                      type="number"
                      value={formData.player.age}
                      onChange={(e) =>
                        handleInputChange(
                          "player",
                          "age",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerNationality">Nacionalidade</Label>
                    <Input
                      id="playerNationality"
                      value={formData.player.nationality}
                      onChange={(e) =>
                        handleInputChange(
                          "player",
                          "nationality",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerHeight">Altura</Label>
                    <Input
                      id="playerHeight"
                      value={formData.player.height}
                      onChange={(e) =>
                        handleInputChange("player", "height", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerWeight">Peso</Label>
                    <Input
                      id="playerWeight"
                      value={formData.player.weight}
                      onChange={(e) =>
                        handleInputChange("player", "weight", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerClub">Clube</Label>
                    <Input
                      id="playerClub"
                      value={formData.player.club}
                      onChange={(e) =>
                        handleInputChange("player", "club", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playerBio">Biografia</Label>
                  <Textarea
                    id="playerBio"
                    rows={4}
                    value={formData.player.bio}
                    onChange={(e) =>
                      handleInputChange("player", "bio", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileImage">URL da Imagem de Perfil</Label>
                  <Input
                    id="profileImage"
                    value={formData.player.profileImage}
                    onChange={(e) =>
                      handleInputChange(
                        "player",
                        "profileImage",
                        e.target.value,
                      )
                    }
                  />
                  {formData.player.profileImage && (
                    <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden">
                      <img
                        src={formData.player.profileImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlightVideo">
                    URL do Vídeo de Destaque
                  </Label>
                  <Input
                    id="highlightVideo"
                    value={formData.player.highlightVideo}
                    onChange={(e) =>
                      handleInputChange(
                        "player",
                        "highlightVideo",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="statsGoals">Gols</Label>
                    <Input
                      id="statsGoals"
                      type="number"
                      value={formData.stats.goals}
                      onChange={(e) =>
                        handleInputChange(
                          "stats",
                          "goals",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statsAssists">Assistências</Label>
                    <Input
                      id="statsAssists"
                      type="number"
                      value={formData.stats.assists}
                      onChange={(e) =>
                        handleInputChange(
                          "stats",
                          "assists",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statsMatches">Partidas</Label>
                    <Input
                      id="statsMatches"
                      type="number"
                      value={formData.stats.matches}
                      onChange={(e) =>
                        handleInputChange(
                          "stats",
                          "matches",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statsMinutesPlayed">Minutos Jogados</Label>
                    <Input
                      id="statsMinutesPlayed"
                      type="number"
                      value={formData.stats.minutesPlayed}
                      onChange={(e) =>
                        handleInputChange(
                          "stats",
                          "minutesPlayed",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-medium mb-4">Habilidades</h3>
                  <div className="space-y-4">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            value={skill.name}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "skills",
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Nome da habilidade"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.value}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "skills",
                                index,
                                "value",
                                parseInt(e.target.value),
                              )
                            }
                            placeholder="Valor (0-100)"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          value={newSkill.name}
                          onChange={(e) =>
                            setNewSkill({ ...newSkill, name: e.target.value })
                          }
                          placeholder="Nova habilidade"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={newSkill.value}
                          onChange={(e) =>
                            setNewSkill({
                              ...newSkill,
                              value: parseInt(e.target.value),
                            })
                          }
                          placeholder="Valor (0-100)"
                        />
                      </div>
                      <Button variant="outline" size="icon" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-medium mb-4">Conquistas</h3>
                  <div className="space-y-4">
                    {formData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            value={achievement.title}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "achievements",
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Título da conquista"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={achievement.year}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "achievements",
                                index,
                                "year",
                                e.target.value,
                              )
                            }
                            placeholder="Ano"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeAchievement(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          value={newAchievement.title}
                          onChange={(e) =>
                            setNewAchievement({
                              ...newAchievement,
                              title: e.target.value,
                            })
                          }
                          placeholder="Nova conquista"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          value={newAchievement.year}
                          onChange={(e) =>
                            setNewAchievement({
                              ...newAchievement,
                              year: e.target.value,
                            })
                          }
                          placeholder="Ano"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={addAchievement}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Mídia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.mediaItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "mediaItems",
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Título"
                          />
                          <Input
                            value={item.source}
                            onChange={(e) =>
                              handleArrayItemChange(
                                "mediaItems",
                                index,
                                "source",
                                e.target.value,
                              )
                            }
                            placeholder="URL da fonte"
                          />
                          <div className="flex items-center space-x-2">
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={item.type}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "mediaItems",
                                  index,
                                  "type",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="image">Imagem</option>
                              <option value="video">Vídeo</option>
                            </select>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeMediaItem(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-medium">Adicionar Novo Item</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="newMediaTitle">Título</Label>
                          <Input
                            id="newMediaTitle"
                            value={newMediaItem.title}
                            onChange={(e) =>
                              setNewMediaItem({
                                ...newMediaItem,
                                title: e.target.value,
                              })
                            }
                            placeholder="Título do item"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newMediaType">Tipo</Label>
                          <select
                            id="newMediaType"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={newMediaItem.type}
                            onChange={(e) =>
                              setNewMediaItem({
                                ...newMediaItem,
                                type: e.target.value as "image" | "video",
                              })
                            }
                          >
                            <option value="image">Imagem</option>
                            <option value="video">Vídeo</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newMediaSource">URL da Fonte</Label>
                        <Input
                          id="newMediaSource"
                          value={newMediaItem.source}
                          onChange={(e) =>
                            setNewMediaItem({
                              ...newMediaItem,
                              source: e.target.value,
                            })
                          }
                          placeholder="URL da imagem ou vídeo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newMediaThumbnail">
                          URL da Miniatura (opcional para vídeos)
                        </Label>
                        <Input
                          id="newMediaThumbnail"
                          value={newMediaItem.thumbnail}
                          onChange={(e) =>
                            setNewMediaItem({
                              ...newMediaItem,
                              thumbnail: e.target.value,
                            })
                          }
                          placeholder="URL da miniatura"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newMediaDescription">Descrição</Label>
                        <Textarea
                          id="newMediaDescription"
                          value={newMediaItem.description}
                          onChange={(e) =>
                            setNewMediaItem({
                              ...newMediaItem,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descrição do item"
                        />
                      </div>

                      <Button onClick={addMediaItem} className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Item
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      value={formData.contact.email}
                      onChange={(e) =>
                        handleInputChange("contact", "email", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Telefone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        handleInputChange("contact", "phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium mb-4">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="socialFacebook">Facebook</Label>
                    <Input
                      id="socialFacebook"
                      value={formData.contact.socialLinks.facebook}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "contact",
                          "socialLinks",
                          "facebook",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialInstagram">Instagram</Label>
                    <Input
                      id="socialInstagram"
                      value={formData.contact.socialLinks.instagram}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "contact",
                          "socialLinks",
                          "instagram",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialTwitter">Twitter</Label>
                    <Input
                      id="socialTwitter"
                      value={formData.contact.socialLinks.twitter}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "contact",
                          "socialLinks",
                          "twitter",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialLinkedin">LinkedIn</Label>
                    <Input
                      id="socialLinkedin"
                      value={formData.contact.socialLinks.linkedin}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "contact",
                          "socialLinks",
                          "linkedin",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Otimização para Motores de Busca (SEO)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">Título da Página</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seo.title}
                    onChange={(e) =>
                      handleInputChange("seo", "title", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Descrição</Label>
                  <Textarea
                    id="seoDescription"
                    rows={3}
                    value={formData.seo.description}
                    onChange={(e) =>
                      handleInputChange("seo", "description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoKeywords">Palavras-chave</Label>
                  <Textarea
                    id="seoKeywords"
                    rows={2}
                    value={formData.seo.keywords}
                    onChange={(e) =>
                      handleInputChange("seo", "keywords", e.target.value)
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Separe as palavras-chave com vírgulas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoImageUrl">
                    URL da Imagem para Compartilhamento
                  </Label>
                  <Input
                    id="seoImageUrl"
                    value={formData.seo.imageUrl}
                    onChange={(e) =>
                      handleInputChange("seo", "imageUrl", e.target.value)
                    }
                  />
                  {formData.seo.imageUrl && (
                    <div className="mt-2 w-full max-w-md rounded-lg overflow-hidden">
                      <img
                        src={formData.seo.imageUrl}
                        alt="Preview"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Acesso e Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Credenciais de Acesso</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminUsername">Nome de Usuário</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          <User size={18} />
                        </div>
                        <Input
                          id="adminUsername"
                          value={authData.username}
                          onChange={(e) =>
                            setAuthData({
                              ...authData,
                              username: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Senha</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          <Key size={18} />
                        </div>
                        <Input
                          id="adminPassword"
                          type="password"
                          value={authData.password}
                          onChange={(e) =>
                            setAuthData({
                              ...authData,
                              password: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Configurações de WhatsApp
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Phone size={18} />
                      </div>
                      <Input
                        id="whatsappNumber"
                        value={authData.whatsappNumber}
                        onChange={(e) =>
                          setAuthData({
                            ...authData,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="pl-10"
                        placeholder="Ex: 5521977434614 (apenas números)"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Digite apenas números, incluindo código do país (55) e
                      DDD, sem espaços ou caracteres especiais.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Tem certeza que deseja restaurar as configurações padrão?",
                        )
                      ) {
                        const defaultData = resetAuthData();
                        setAuthData(getAuthData());
                        alert("Configurações restauradas com sucesso!");
                      }
                    }}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Restaurar Padrões
                  </Button>
                  <Button
                    onClick={() => {
                      const success = saveAuthData(authData);
                      if (success) {
                        alert("Configurações salvas com sucesso!");
                      } else {
                        alert(
                          "Erro ao salvar as configurações. Por favor, tente novamente.",
                        );
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Música de Fundo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundMusicUrl">
                      URL do Arquivo de Música
                    </Label>
                    <Input
                      id="backgroundMusicUrl"
                      value={backgroundMusicUrl}
                      onChange={(e) => setBackgroundMusicUrl(e.target.value)}
                      placeholder="https://exemplo.com/musica.mp3"
                    />
                    <p className="text-sm text-muted-foreground">
                      Insira a URL de um arquivo de áudio MP3 ou outro formato
                      suportado
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoPlayMusic"
                      checked={autoPlayMusic}
                      onCheckedChange={setAutoPlayMusic}
                    />
                    <Label htmlFor="autoPlayMusic">
                      Iniciar música automaticamente
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="musicVolume">Volume Inicial</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Slider
                          value={[musicVolume]}
                          min={0}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          aria-label="Volume"
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-20">
                        <Volume2 className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {Math.round(musicVolume * 100)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Define o volume inicial da música (0 = mudo, 100% = volume
                      máximo)
                    </p>
                  </div>

                  {backgroundMusicUrl && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Music className="mr-2 h-4 w-4" /> Testar Música
                      </h4>
                      <audio
                        controls
                        src={backgroundMusicUrl}
                        className="w-full"
                      >
                        Seu navegador não suporta o elemento de áudio.
                      </audio>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
