import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const Register: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-0">
        <AuthForm isLogin={false} />
      </div>
    </main>
  );
};

export default Register;
