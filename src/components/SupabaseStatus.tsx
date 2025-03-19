import React from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { Badge } from "./ui/badge";
import { Database, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface SupabaseStatusProps {
  onConfigure?: () => void;
}

const SupabaseStatus: React.FC<SupabaseStatusProps> = ({ onConfigure }) => {
  const configured = isSupabaseConfigured();

  return (
    <div className="flex items-center space-x-2">
      {configured ? (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
        >
          <Database className="h-3 w-3" />
          <span>Supabase Conectado</span>
        </Badge>
      ) : (
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            <span>Supabase Não Configurado</span>
          </Badge>
          {onConfigure && (
            <Button
              variant="outline"
              size="sm"
              onClick={onConfigure}
              className="text-xs h-7"
            >
              Configurar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SupabaseStatus;
