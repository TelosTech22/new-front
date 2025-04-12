"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Community, Post, Member, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Users, BellOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunityDetail = () => {
  const params = useParams();
  const communityId = params?.communityId as string;
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<(Member & { user: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [newPostContent, setNewPostContent] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const mockCommunity: Community = {
          id: communityId,
          name: "Cardiologistas do Brasil",
          description: "Comunidade para cardiologistas compartilharem experiências e conhecimentos.",
          specialization: "Cardiologia",
          memberCount: 1500,
          createdBy: "1",
          createdAt: new Date(),
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        };

        const mockPosts: Post[] = [
          {
            id: "1",
            content: "Acabei de publicar um artigo sobre novas técnicas de tratamento para insuficiência cardíaca. O que vocês acham?",
            userId: "1",
            communityId: communityId,
            createdAt: new Date("2023-03-15"),
            likes: 24,
            comments: 5
          },
          {
            id: "2",
            content: "Alguém tem experiência com o uso de betabloqueadores em pacientes com asma controlada?",
            userId: "2",
            communityId: communityId,
            createdAt: new Date("2023-03-10"),
            likes: 18,
            comments: 12
          }
        ];

        const mockUsers: User[] = [
          {
            id: "1",
            name: "Dr. Carlos Santos",
            email: "carlos.santos@email.com",
            specialization: "Cardiologia",
            bio: "Cardiologista com 15 anos de experiência",
            avatar: "https://i.pravatar.cc/300?u=1",
            createdAt: new Date("2021-01-10"),
          },
          {
            id: "2",
            name: "Dra. Ana Silva",
            email: "ana.silva@email.com",
            specialization: "Cardiologia",
            bio: "Especialista em ecocardiografia",
            avatar: "https://i.pravatar.cc/300?u=2",
            createdAt: new Date("2021-02-15"),
          }
        ];

        const mockMembers: Member[] = [
          {
            userId: "1",
            communityId: communityId,
            role: "admin",
            joinedAt: new Date("2022-02-10"),
          },
          {
            userId: "2",
            communityId: communityId,
            role: "member",
            joinedAt: new Date("2022-02-15"),
          }
        ];

        setCommunity(mockCommunity);
        setPosts(mockPosts);
        setMembers(mockMembers.map(member => ({
          ...member,
          user: mockUsers.find(u => u.id === member.userId)!
        })));
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados da comunidade:", error);
        toast.error("Erro ao carregar dados da comunidade");
        setIsLoading(false);
      }
    };

    if (communityId) {
      fetchCommunityData();
    }
  }, [communityId]);

  const handleJoinCommunity = async () => {
    try {
      setIsMember(true);
      toast.success("Você agora é membro desta comunidade!");
    } catch (error) {
      console.error("Erro ao entrar na comunidade:", error);
      toast.error("Erro ao entrar na comunidade");
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error("O post não pode estar vazio");
      return;
    }

    try {
      const newPost: Post = {
        id: Date.now().toString(),
        content: newPostContent,
        userId: "1",
        communityId: communityId,
        createdAt: new Date(),
        likes: 0,
        comments: 0
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
      setNewPostContent("");
      toast.success("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast.error("Erro ao criar post");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medico-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Comunidade não encontrada</h1>
            <p className="mt-2 text-gray-600">A comunidade que você está procurando não existe.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {community?.image && (
            <div className="rounded-lg overflow-hidden mb-6 h-48 sm:h-64">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{community?.name}</h1>
                    <Badge variant="outline" className="text-xs">
                      {community?.specialization}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{community?.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BellOff className="h-4 w-4 mr-1" />
                    Silenciar
                  </Button>
                  {!isMember ? (
                    <Button
                      onClick={handleJoinCommunity}
                      className="bg-medico-600 hover:bg-medico-700 text-white"
                      size="sm"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Participar
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Sair
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{community?.memberCount} membros</span>
                </div>
                <span>•</span>
                <span>Criada em {new Date(community?.createdAt || "").toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b">
              <div className="flex gap-6 px-6">
                <button
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "posts"
                      ? "border-medico-600 text-medico-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("posts")}
                >
                  Publicações
                </button>
                <button
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "members"
                      ? "border-medico-600 text-medico-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("members")}
                >
                  Membros
                </button>
                <button
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "about"
                      ? "border-medico-600 text-medico-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  Sobre
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "posts" && (
                <div className="space-y-6">
                  {isMember && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/300?u=1" />
                        <AvatarFallback>CS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Compartilhe conhecimento, tire dúvidas ou discuta casos clínicos..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="min-h-[80px] mb-3"
                        />
                        <div className="flex justify-end">
                          <Button
                            onClick={handleCreatePost}
                            className="bg-medico-600 hover:bg-medico-700 text-white"
                            size="sm"
                          >
                            Publicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {posts.map((post) => (
                    <div key={post.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={members.find(m => m.userId === post.userId)?.user.avatar} />
                          <AvatarFallback>
                            {members.find(m => m.userId === post.userId)?.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {members.find(m => m.userId === post.userId)?.user.name}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mt-2">{post.content}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                            <button className="hover:text-gray-700">{post.likes} curtidas</button>
                            <button className="hover:text-gray-700">{post.comments} comentários</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "members" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <div key={member.userId} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.user.avatar} />
                        <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm">{member.user.name}</h3>
                        <p className="text-xs text-gray-500">{member.user.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "about" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Descrição</h3>
                    <p className="text-sm text-gray-600">{community?.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">Especialização</h3>
                    <p className="text-sm text-gray-600">{community?.specialization}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDetail; 