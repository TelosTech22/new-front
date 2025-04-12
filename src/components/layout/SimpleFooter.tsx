import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-4 text-center text-gray-600 text-sm border-t">
      <p>© {new Date().getFullYear()} T.Elos - Todos os direitos reservados</p>
    </footer>
  );
};

export default SimpleFooter; 