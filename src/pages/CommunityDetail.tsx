import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CommunityHeader from "@/components/community/CommunityHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityPosts from "@/components/community/CommunityPosts";
import CommunityMembers from "@/components/community/CommunityMembers";
import CommunityAbout from "@/components/community/CommunityAbout";
import { Community, Post, Member, User } from "@/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import CommunityCard from "@/components/community/CommunityCard";
import { Button } from "@/components/ui/button";

interface CommunityDetailProps {
  communityId: string;
}

const CommunityDetail: React.FC<CommunityDetailProps> = ({ communityId }) => {
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<(Member & { user: User })[]>([]);
  const [activeTab, setActiveTab] = useState<string>("posts");
  
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        const mockCommunities: Community[] = [
          {
            id: "1",
            name: "Cardiologistas do Brasil",
            description: "Comunidade para discussão de casos clínicos e avanços em cardiologia.",
            specialization: "Cardiologia",
            memberCount: 237,
            createdBy: "1",
            createdAt: new Date("2022-02-10"),
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop",
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
        ];
        
        const communityData = mockCommunities.find(c => c.id === communityId);
        
        if (!communityData) {
          toast.error("Comunidade não encontrada");
          return;
        }
        
        setCommunity(communityData);
        
        const mockPosts: Post[] = [
          {
            id: "1",
            content: "Acabei de publicar um artigo sobre novas técnicas de tratamento para insuficiência cardíaca. O que vocês acham?",
            userId: "1",
            communityId: "1",
            createdAt: new Date("2023-03-15"),
            likes: 24,
            comments: 5
          },
          {
            id: "2",
            content: "Alguém tem experiência com o uso de betabloqueadores em pacientes com asma controlada? Preciso de opiniões para um caso difícil.",
            userId: "2",
            communityId: "1",
            createdAt: new Date("2023-03-10"),
            likes: 18,
            comments: 12
          },
          {
            id: "3",
            content: "Compartilhando um caso interessante de miocardite que atendi esta semana. Sintomas atípicos que quase passaram despercebidos.",
            userId: "3",
            communityId: "1",
            createdAt: new Date("2023-03-05"),
            likes: 32,
            comments: 8
          }
        ];
        
        const mockUsers: User[] = [
          {
            id: "1",
            name: "Dr. Carlos Santos",
            email: "carlos.santos@email.com",
            specialization: "Cardiologia",
            bio: "Cardiologista com 15 anos de experiência em cardiopatias congênitas.",
            avatar: "https://i.pravatar.cc/300?u=1",
            createdAt: new Date("2021-01-10"),
          },
          {
            id: "2",
            name: "Dra. Amanda Silva",
            email: "amanda.silva@email.com",
            specialization: "Cardiologia",
            bio: "Especialista em ecocardiografia e doenças valvulares.",
            avatar: "https://i.pravatar.cc/300?u=2",
            createdAt: new Date("2021-02-15"),
          },
          {
            id: "3",
            name: "Dr. Rafael Oliveira",
            email: "rafael.oliveira@email.com",
            specialization: "Cardiologia",
            bio: "Eletrofisiologista cardíaco com foco em arritmias complexas.",
            avatar: "https://i.pravatar.cc/300?u=3",
            createdAt: new Date("2021-03-20"),
          },
        ];
        
        const mockMembers: Member[] = [
          {
            userId: "1",
            communityId: "1",
            role: "admin",
            joinedAt: new Date("2022-02-10"),
          },
          {
            userId: "2",
            communityId: "1",
            role: "member",
            joinedAt: new Date("2022-02-15"),
          },
          {
            userId: "3",
            communityId: "1",
            role: "member",
            joinedAt: new Date("2022-02-20"),
          },
        ];
        
        const filteredPosts = mockPosts.filter(post => post.communityId === communityId);
        const filteredMembers = mockMembers
          .filter(member => member.communityId === communityId)
          .map(member => {
            const user = mockUsers.find(u => u.id === member.userId);
            return { ...member, user: user! };
          });
        
        setPosts(filteredPosts);
        setMembers(filteredMembers);
      } catch (error) {
        console.error("Error fetching community data:", error);
        toast.error("Erro ao carregar dados da comunidade");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCommunityData();
  }, [communityId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-medico-600" />
          <span className="ml-2 text-medico-600">Carregando comunidade...</span>
        </main>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Comunidade não encontrada</h1>
            <p className="mt-2">A comunidade que você está procurando não existe ou foi removida.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <CommunityCard community={community} />
              <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Sobre a Comunidade</h2>
                <p className="text-gray-600">{community.description}</p>
              </div>
            </div>
            <div>
              <CommunityMembers members={members} />
              <div className="mt-8">
                <Button className="w-full">Participar da Comunidade</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDetail;
