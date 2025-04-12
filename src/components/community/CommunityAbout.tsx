
import React from "react";
import { Community } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CalendarDays, 
  Users, 
  FileText, 
  Bookmark, 
  InfoIcon 
} from "lucide-react";

interface CommunityAboutProps {
  community: Community;
}

const CommunityAbout: React.FC<CommunityAboutProps> = ({ community }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sobre esta comunidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">Descrição</h4>
              <p className="text-gray-700">{community.description}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Bookmark className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">Especialização</h4>
              <p className="text-gray-700">{community.specialization}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">Membros</h4>
              <p className="text-gray-700">{community.memberCount} profissionais de saúde</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CalendarDays className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">Data de criação</h4>
              <p className="text-gray-700">{community.createdAt.toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="bg-medico-50 border-medico-200">
        <InfoIcon className="h-4 w-4 text-medico-500" />
        <AlertDescription className="text-medico-800">
          Esta comunidade segue as diretrizes profissionais do Conselho Federal de Medicina.
          Lembre-se de não compartilhar informações sensíveis de pacientes.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Regras da comunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Mantenha o respeito e profissionalismo nas discussões.</li>
            <li>Não compartilhe dados que possam identificar pacientes.</li>
            <li>Evite promover produtos ou serviços sem embasamento científico.</li>
            <li>Respeite a propriedade intelectual ao compartilhar conteúdos.</li>
            <li>Contribua com discussões construtivas e baseadas em evidências.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityAbout;
