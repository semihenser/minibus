import React from 'react';
import { Building2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm p-4 mb-6">
      <div className="container mx-auto flex items-center justify-center text-center flex-col md:flex-row gap-4">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white">
            <Building2 size={24} />
          </div>
          <div className="border-l-2 border-blue-900 pl-4 text-left">
            <h1 className="text-xl font-bold text-blue-900 leading-tight">İZMİR<br/>BÜYÜKŞEHİR<br/>BELEDİYESİ</h1>
          </div>
          <div className="border-l-2 border-gray-300 pl-4 text-left hidden md:block">
            <h2 className="text-lg font-semibold text-blue-800">ULAŞIM DAİRESİ BAŞKANLIĞI</h2>
            <h3 className="text-md font-medium text-blue-700">TOPLU ULAŞIM HİZMETLERİ<br/>ŞUBE MÜDÜRLÜĞÜ</h3>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h4 className="text-xl font-bold text-slate-700">“M PLAKALI MİNİBÜS HAT - PLAKA TANIMLAMA” MODÜLÜ</h4>
      </div>
    </header>
  );
};

export default Header;