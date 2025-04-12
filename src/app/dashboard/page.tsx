"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  Users,
  MessageSquare,
  PlusCircle,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Adicionar Evento",
      description: "Agende uma nova consulta ou compromisso",
      icon: Calendar,
      href: "#",
      color: "text-blue-500",
    },
    {
      title: "Discussão de Caso",
      description: "Crie uma sala para discutir casos clínicos",
      icon: MessageSquare,
      href: "#",
      color: "text-green-500",
    },
    {
      title: "Nova Comunidade",
      description: "Crie uma comunidade de especialidade",
      icon: Users,
      href: "/create-community",
      color: "text-purple-500",
    },
    {
      title: "Adicionar ao Time",
      description: "Convide profissionais para seu time",
      icon: UserPlus,
      href: "#",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo(a), {user?.name || "Filipe"}!
        </h1>
        <p className="text-gray-600">
          O que você gostaria de fazer hoje?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow">
            <Link href={action.href}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <action.icon className={cn("h-6 w-6", action.color)} />
                  <PlusCircle className="h-5 w-5 text-gray-400" />
                </div>
                <CardTitle className="text-lg mt-3">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Atividades Recentes
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Suas atividades recentes aparecerão aqui.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 