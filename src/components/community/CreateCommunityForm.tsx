"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const SPECIALIZATIONS = [
  "Cardiologia",
  "Neurologia",
  "Pediatria",
  "Ortopedia",
  "Dermatologia",
  "Ginecologia",
  "Oftalmologia",
  "Outro",
];

const communitySchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("URL inválida").optional(),
  specialization: z.string().nonempty("Selecione uma especialidade"),
  customSpecialization: z.string().optional(),
});

type CommunityFormData = z.infer<typeof communitySchema>;

const CreateCommunityForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
  });

  const onSubmit = async (data: CommunityFormData) => {
    try {
      console.log("Dados da comunidade:", data);
      router.push("/communities");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Comunidade</Label>
        <Input
          id="name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          {...register("description")}
          className={errors.description ? "border-red-500" : ""}
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">URL da Imagem (opcional)</Label>
        <Input
          id="image"
          type="url"
          {...register("image")}
          className={errors.image ? "border-red-500" : ""}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialization">Especialidade</Label>
        <Select
          {...register("specialization")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma especialidade" />
          </SelectTrigger>
          <SelectContent>
            {SPECIALIZATIONS.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {register("specialization").value === "Outro" && (
        <div className="space-y-2">
          <Label htmlFor="customSpecialization">Especifique a especialidade</Label>
          <Input
            id="customSpecialization"
            {...register("customSpecialization")}
          />
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Criando..." : "Criar Comunidade"}
      </Button>
    </form>
  );
};

export default CreateCommunityForm;
