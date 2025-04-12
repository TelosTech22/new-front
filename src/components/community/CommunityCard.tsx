"use client";

import React from "react";
import Link from "next/link";
import { Community } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CommunityCardProps {
  community: Community;
  isMember?: boolean;
  onJoin?: (communityId: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  isMember = false,
  onJoin,
}) => {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onJoin) {
      onJoin(community.id);
    }
  };

  return (
    <Link href={`/communities/${community.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-[32rem] flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={community.image || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop"}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="flex-none">
          <h3 className="text-xl font-semibold">{community.name}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 line-clamp-4">{community.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {community.memberCount} membros
          </p>
        </CardContent>
        <CardFooter className="flex-none">
          {!isMember ? (
            <Button
              onClick={handleJoinClick}
              className="w-full bg-medico-600 hover:bg-medico-700 text-white"
            >
              <UserPlus size={16} className="mr-1" />
              Participar
            </Button>
          ) : (
            <Badge className="bg-teal-500">Membro</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CommunityCard;
