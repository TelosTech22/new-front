
import React from "react";
import { Community } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

interface CommunityHeaderProps {
  community: Community;
  isMember?: boolean;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ 
  community, 
  isMember = false
}) => {
  const [notifications, setNotifications] = React.useState(true);

  const handleJoinLeave = () => {
    if (isMember) {
      toast.success("Você saiu da comunidade");
    } else {
      toast.success("Você entrou na comunidade");
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(
      notifications 
        ? "Notificações desativadas para esta comunidade" 
        : "Notificações ativadas para esta comunidade"
    );
  };

  return (
    <div className="relative">
      <div className="h-48 bg-gradient-to-r from-medico-500 to-teal-500 rounded-t-lg overflow-hidden">
        {community.image && (
          <img 
            src={community.image} 
            alt={community.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <Card className="rounded-lg shadow-md">
        <div className="px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">{community.name}</h1>
                <Badge className="ml-3 bg-medico-100 text-medico-700 border border-medico-200">
                  {community.specialization}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1 max-w-2xl line-clamp-2">
                {community.description}
              </p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>{community.memberCount} membros</span>
                <span className="mx-2">•</span>
                <span>Criada em {community.createdAt.toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isMember ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={toggleNotifications}
                    className="flex items-center"
                  >
                    {notifications ? <BellOff className="mr-1 h-4 w-4" /> : <Bell className="mr-1 h-4 w-4" />}
                    {notifications ? "Silenciar" : "Notificar"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleJoinLeave}
                    className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleJoinLeave}
                  className="bg-medico-600 hover:bg-medico-700"
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  Participar
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunityHeader;
