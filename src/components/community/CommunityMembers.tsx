import React from "react";
import Link from "next/link";
import { Member, User } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface CommunityMembersProps {
  members: (Member & { user: User })[];
}

const CommunityMembers: React.FC<CommunityMembersProps> = ({ members }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredMembers = searchQuery
    ? members.filter(
        (member) =>
          member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.user.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Membros</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar membros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredMembers.map((member) => (
            <Link
              key={member.userId}
              href={`/profile/${member.userId}`}
              className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <Avatar>
                {member.user.avatar ? (
                  <AvatarImage src={member.user.avatar} alt={member.user.name} />
                ) : (
                  <AvatarFallback>
                    {member.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">{member.user.name}</h4>
                  {member.role === "admin" && (
                    <Badge className="ml-2 bg-amber-100 text-amber-800 border border-amber-200">
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{member.user.specialization}</p>
                <p className="text-xs text-gray-500">
                  Membro desde {member.joinedAt.toLocaleDateString('pt-BR')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-800">Nenhum membro encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityMembers;
