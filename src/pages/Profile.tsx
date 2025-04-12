
import React from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import CommunityList from "@/components/community/CommunityList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Community } from "@/types";

const Profile: React.FC = () => {
  const mockUser: User = {
    id: "1",
    name: "Dr. Carlos Santos",
    email: "carlos.santos@example.com",
    specialization: "Cardiologia",
    bio: "Cardiologista com mais de 10 anos de experiência, especializado em cardiopatias congênitas e doenças valvulares.",
    createdAt: new Date("2022-01-15"),
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&auto=format&fit=crop",
  };

  const mockCommunities: Community[] = [
    {
      id: "1",
      name: "Cardiologistas do Brasil",
      description: "Comunidade para discussão de casos clínicos e avanços em cardiologia.",
      specialization: "Cardiologia",
      memberCount: 237,
      createdBy: "1",
      createdAt: new Date("2022-02-10"),
    },
    {
      id: "2",
      name: "Medicina Interna",
      description: "Grupo para médicos especialistas em medicina interna compartilharem conhecimentos.",
      specialization: "Medicina Interna",
      memberCount: 145,
      createdBy: "2",
      createdAt: new Date("2022-03-05"),
    },
    {
      id: "3",
      name: "Atualizações em ECG",
      description: "Discussões sobre interpretação de eletrocardiogramas e casos clínicos.",
      specialization: "Cardiologia",
      memberCount: 89,
      createdBy: "3",
      createdAt: new Date("2022-05-20"),
    },
  ];

  const userCommunities = ["1", "3"];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <ProfileCard user={mockUser} />
          </div>

          <Tabs defaultValue="communities" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="communities">Minhas Comunidades</TabsTrigger>
              <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
            </TabsList>
            <TabsContent value="communities" className="mt-6">
              <CommunityList
                communities={mockCommunities.filter(c => userCommunities.includes(c.id))}
                userCommunities={userCommunities}
              />
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-center">Sem atividades recentes para mostrar.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
