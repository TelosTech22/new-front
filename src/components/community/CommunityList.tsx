"use client";

import React, { useState } from "react";
import { Community } from "@/types";
import CommunityCard from "./CommunityCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface CommunityListProps {
  communities: Community[];
  userCommunities?: string[];
}

const SPECIALIZATIONS = [
  "Cardiologia",
  "Neurologia",
  "Pediatria",
  "Ortopedia",
  "Dermatologia",
  "Ginecologia",
  "Oftalmologia",
];

const CommunityList: React.FC<CommunityListProps> = ({ 
  communities, 
  userCommunities = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleJoinCommunity = (communityId: string) => {
    console.log(`Joining community: ${communityId}`);
    toast.success("Solicitação enviada com sucesso!");
  };

  const toggleSpecialization = (specialization: string) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(selectedSpecializations.filter(
        (spec) => spec !== specialization
      ));
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
    }
  };

  const clearFilters = () => {
    setSelectedSpecializations([]);
    setSearchQuery("");
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch = community.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization = selectedSpecializations.length === 0 ||
      selectedSpecializations.includes(community.specialization);

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar comunidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button asChild className="bg-medico-600 hover:bg-medico-700">
            <Link href="/create-community">
              Criar Comunidade
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800">Filtrar por especialidade</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
              <X className="mr-1 h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map((specialization) => (
              <Badge
                key={specialization}
                variant={selectedSpecializations.includes(specialization) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedSpecializations.includes(specialization) 
                    ? "bg-medico-600 hover:bg-medico-700" 
                    : "hover:bg-muted"
                }`}
                onClick={() => toggleSpecialization(specialization)}
              >
                {specialization}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              isMember={userCommunities.includes(community.id)}
              onJoin={handleJoinCommunity}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <h3 className="text-lg font-medium text-gray-800">Nenhuma comunidade encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus filtros ou criar uma nova comunidade.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityList;
