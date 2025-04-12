"use client";

import React, { useState } from "react";
import { Post, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2, Send } from "lucide-react";
import { toast } from "sonner";

interface CommunityPostsProps {
  posts: Post[];
}

const CommunityPosts: React.FC<CommunityPostsProps> = ({ posts }) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentUser: User = {
    id: "1",
    name: "Dr. Carlos Santos",
    email: "carlos.santos@email.com",
    specialization: "Cardiologia",
    bio: "Cardiologista com 15 anos de experiência em cardiopatias congênitas.",
    avatar: "https://i.pravatar.cc/300?u=1",
    createdAt: new Date("2021-01-10"),
  };
  
  const mockUsers: Record<string, User> = {
    "1": currentUser,
    "2": {
      id: "2",
      name: "Dra. Amanda Silva",
      email: "amanda.silva@email.com",
      specialization: "Cardiologia",
      bio: "Especialista em ecocardiografia e doenças valvulares.",
      avatar: "https://i.pravatar.cc/300?u=2",
      createdAt: new Date("2021-02-15"),
    },
    "3": {
      id: "3",
      name: "Dr. Rafael Oliveira",
      email: "rafael.oliveira@email.com",
      specialization: "Cardiologia",
      bio: "Eletrofisiologista cardíaco com foco em arritmias complexas.",
      avatar: "https://i.pravatar.cc/300?u=3",
      createdAt: new Date("2021-03-20"),
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast.error("O conteúdo da publicação não pode estar vazio");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Publicação criada com sucesso");
      setNewPostContent("");
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleLike = (postId: string) => {
    toast.success("Publicação curtida");
  };
  
  const handleComment = (postId: string) => {
    toast.success("Comentário adicionado");
  };
  
  const handleShare = (postId: string) => {
    toast.success("Link copiado para a área de transferência");
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'} atrás`;
    } else if (diffHrs < 24) {
      return `${diffHrs} ${diffHrs === 1 ? 'hora' : 'horas'} atrás`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <form className="flex-1" onSubmit={handleSubmitPost}>
              <Textarea 
                placeholder="Compartilhe conhecimento, tire dúvidas ou discuta casos clínicos..." 
                className="mb-3 min-h-[100px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-medico-600 hover:bg-medico-700"
                  disabled={isSubmitting || !newPostContent.trim()}
                >
                  {isSubmitting ? (
                    <>Publicando...</>
                  ) : (
                    <>
                      <Send className="mr-1 h-4 w-4" />
                      Publicar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-800">Nenhuma publicação ainda</h3>
          <p className="text-gray-600">Seja o primeiro a compartilhar algo com a comunidade!</p>
        </div>
      ) : (
        posts.map((post) => {
          const user = mockUsers[post.userId];
          return (
            <Card key={post.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{user?.name}</h4>
                    <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>
                <div className="flex items-center border-t pt-3 text-gray-600 text-sm">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center mr-4"
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes} {post.likes === 1 ? 'curtida' : 'curtidas'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center mr-4"
                    onClick={() => handleComment(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments} {post.comments === 1 ? 'comentário' : 'comentários'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default CommunityPosts;
