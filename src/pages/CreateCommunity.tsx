
import React from "react";
import CreateCommunityForm from "@/components/community/CreateCommunityForm";

const CreateCommunity: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Nova Comunidade</h1>
          <p className="text-gray-600 mb-8">
            Preencha as informações abaixo para criar uma nova comunidade para outros profissionais de medicina.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CreateCommunityForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCommunity;
