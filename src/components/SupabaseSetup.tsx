import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle, Database, Key } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface SupabaseSetupProps {
  onSetup?: (url: string, key: string) => void;
}

const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onSetup }) => {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetup = async () => {
    setError("");
    setIsLoading(true);

    if (!supabaseUrl || !supabaseKey) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      // Store the values in localStorage
      localStorage.setItem("VITE_SUPABASE_URL", supabaseUrl);
      localStorage.setItem("VITE_SUPABASE_ANON_KEY", supabaseKey);

      if (onSetup) {
        onSetup(supabaseUrl, supabaseKey);
      }

      // Reload the page to apply the new configuration
      window.location.reload();
    } catch (error) {
      console.error("Error setting up Supabase:", error);
      setError(
        "Ocorreu um erro ao configurar o Supabase. Por favor, tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Configurar Supabase
          </CardTitle>
          <CardDescription>
            Configure o Supabase para habilitar atualizações em tempo real para
            todos os usuários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="supabaseUrl">URL do Supabase</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Database size={18} />
              </div>
              <Input
                id="supabaseUrl"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://seu-projeto.supabase.co"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supabaseKey">Chave Anônima do Supabase</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Key size={18} />
              </div>
              <Input
                id="supabaseKey"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="sua-chave-anonima-do-supabase"
                className="pl-10"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 mt-4">
            <p className="font-medium">
              Como obter suas credenciais do Supabase:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>
                Crie uma conta em{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  supabase.com
                </a>
              </li>
              <li>Crie um novo projeto</li>
              <li>Vá para Configurações &gt; API</li>
              <li>Copie a "URL" e a "anon public" key</li>
              <li>Cole nos campos acima</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSetup} className="w-full" disabled={isLoading}>
            {isLoading ? "Configurando..." : "Configurar Supabase"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupabaseSetup;
