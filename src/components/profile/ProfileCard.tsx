"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User } from "@/types";
import { Edit, Save } from "lucide-react";

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    specialization: user.specialization,
    bio: user.bio || "",
    email: user.email,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    console.log("Updated profile data:", formData);
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-medico-500 to-teal-500 h-32 w-full"></div>
      <div className="relative px-6 pb-6">
        <div className="flex justify-between">
          <Avatar className="h-24 w-24 border-4 border-white -mt-12 bg-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-medico-100 text-medico-600 text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4">
            <Button
              variant={isEditing ? "default" : "outline"}
              className={isEditing ? "bg-medico-600 hover:bg-medico-700" : ""}
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            >
              {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {isEditing ? "Salvar" : "Editar Perfil"}
            </Button>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          {isEditing ? (
            <>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="specialization">Especialidade</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-medico-600 font-semibold">{user.specialization}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Biografia</h3>
                <p className="text-gray-600">{user.bio || "Nenhuma biografia adicionada."}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Membro desde</h3>
                <p className="text-gray-600">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
