import React from "react";
import CommunityList from "@/components/community/CommunityList";
import { Community } from "@/types";

const Communities: React.FC = () => {
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
    {
      id: "3",
      name: "Atualizações em ECG",
      description: "Discussões sobre interpretação de eletrocardiogramas e casos clínicos.",
      specialization: "Cardiologia",
      memberCount: 89,
      createdBy: "3",
      createdAt: new Date("2022-05-20"),
    },
    {
      id: "4",
      name: "Pediatria em Foco",
      description: "Comunidade dedicada a pediatras e profissionais que atendem crianças.",
      specialization: "Pediatria",
      memberCount: 178,
      createdBy: "4",
      createdAt: new Date("2022-01-20"),
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop",
    },
    {
      id: "5",
      name: "Neurologia Clínica",
      description: "Espaço para neurologistas discutirem sobre diagnósticos e tratamentos.",
      specialization: "Neurologia",
      memberCount: 112,
      createdBy: "5",
      createdAt: new Date("2022-04-15"),
    },
    {
      id: "6",
      name: "Ortopedia e Traumatologia",
      description: "Grupo para discussão de casos e técnicas em ortopedia.",
      specialization: "Ortopedia",
      memberCount: 203,
      createdBy: "6",
      createdAt: new Date("2022-03-10"),
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop",
    },
    {
      id: "7",
      name: "Dermatologia Avançada",
      description: "Comunidade para dermatologistas compartilharem casos clínicos e pesquisas.",
      specialization: "Dermatologia",
      memberCount: 156,
      createdBy: "7",
      createdAt: new Date("2022-05-05"),
    },
    {
      id: "8",
      name: "Ginecologia e Obstetrícia",
      description: "Espaço para discussão sobre saúde da mulher e gestação.",
      specialization: "Ginecologia",
      memberCount: 192,
      createdBy: "8",
      createdAt: new Date("2022-02-25"),
      image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&auto=format&fit=crop",
    },
    {
      id: "9",
      name: "Oftalmologia em Evidência",
      description: "Comunidade para oftalmologistas compartilharem conhecimentos e casos.",
      specialization: "Oftalmologia",
      memberCount: 135,
      createdBy: "9",
      createdAt: new Date("2022-04-20"),
    },
    {
      id: "10",
      name: "Teste",
      description: "Comunidade de teste para demonstração e desenvolvimento de novas funcionalidades.",
      specialization: "Medicina Geral",
      memberCount: 50,
      createdBy: "10",
      createdAt: new Date("2023-01-01"),
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop",
    },
  ];

  const userCommunities = ["1", "3"];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Comunidades</h1>
          <CommunityList communities={mockCommunities} userCommunities={userCommunities} />
        </div>
      </main>
    </div>
  );
};

export default Communities;
