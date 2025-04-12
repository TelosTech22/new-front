import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const Login: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-0">
        <AuthForm isLogin={true} />
      </div>
    </main>
  );
};

export default Login;
