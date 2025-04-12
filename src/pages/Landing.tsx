import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Users, MessageSquare } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-r from-medico-500 to-teal-500 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Conectando Médicos, Fortalecendo a Medicina
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Uma plataforma exclusiva para profissionais da medicina compartilharem conhecimentos, 
            experiências e construírem uma rede profissional de valor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-medico-600 hover:bg-gray-100">
              <Link href="/register">Criar Conta</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-medico-600 hover:bg-gray-100">
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Por que participar do T.Elos?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-medico-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-medico-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Comunidades Especializadas
              </h3>
              <p className="text-gray-600">
                Participe de comunidades específicas da sua área de atuação e tenha acesso a discussões relevantes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-medico-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-medico-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Troca de Experiências
              </h3>
              <p className="text-gray-600">
                Compartilhe casos clínicos, dúvidas e aprenda com a experiência de outros profissionais da área.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-medico-100 rounded-full flex items-center justify-center mb-6">
                <UserPlus className="h-6 w-6 text-medico-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Networking Profissional
              </h3>
              <p className="text-gray-600">
                Construa uma rede de contatos profissional e abra portas para colaborações e oportunidades na área médica.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button asChild className="bg-medico-600 hover:bg-medico-700">
              <Link href="/register" className="flex items-center">
                Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Crie sua Conta</h3>
                <p className="text-gray-600">
                  Registre-se como profissional da saúde e complete seu perfil com suas especialidades e áreas de interesse.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Explore Comunidades</h3>
                <p className="text-gray-600">
                  Descubra e participe de comunidades relevantes para sua área de atuação.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Interaja e Compartilhe</h3>
                <p className="text-gray-600">
                  Participe de discussões, compartilhe conhecimento e construa sua rede profissional.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Pronto para começar?</h3>
              <p className="text-gray-600 mb-6">
                Junte-se a milhares de profissionais da saúde que já estão conectados e compartilhando conhecimento.
              </p>
              <Button asChild className="w-full bg-medico-600 hover:bg-medico-700">
                <Link href="/register">Criar Conta Gratuitamente</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
