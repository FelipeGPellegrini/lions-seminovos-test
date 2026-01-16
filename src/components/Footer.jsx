import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MessageCircle, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUNA 1: Marca e Sobre */}
          <div className="space-y-4">
            <Link to="/" className="inline-block mb-2">
              <Logo className="h-8 w-auto text-white" />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum numquam nam rem eveniet cum? Eum excepturi ratione atque aspernatur, quasi quibusdam animi quia accusamus nostrum placeat harum enim amet repellat?
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Facebook} />
            </div>
          </div>

          {/* COLUNA 2: Navegação Rápida */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <FooterLink to="/" text="Início" />
              <FooterLink to="/catalogo" text="Catálogo de Veículos" />
              <FooterLink to="/catalogo?categoria=blindados" text="Blindados" />
              <FooterLink to="/agende" text="Agende uma Visita" />
            </ul>
          </div>

          {/* COLUNA 3: Institucional (SEO Trust) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Institucional</h3>
            <ul className="space-y-2">
              <FooterLink to="#" text="Sobre a Lions" />
              <FooterLink to="#" text="Trabalhe Conosco" />
              <FooterLink to="#" text="Política de Privacidade" />
              <FooterLink to="#" text="Termos de Uso" />
              <FooterLink to="#" text="Portal da Transparência" />
            </ul>
          </div>

          {/* COLUNA 4: Atendimento */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Central de Ajuda</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="text-primary shrink-0" size={20} />
                <div>
                  <span className="block text-white font-medium">Televendas</span>
                  <span>0800 123 4567</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MessageCircle className="text-primary shrink-0" size={20} />
                <div>
                  <span className="block text-white font-medium">WhatsApp</span>
                  <span>(11) 99999-9999</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="text-primary shrink-0" size={20} />
                <div>
                  <span className="block text-white font-medium">Email</span>
                  <span>contato@lionsseminovos.com.br</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BARRA INFERIOR (COPYRIGHT & CNPJ) */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} Lions Seminovos Ltda. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <span>CNPJ: 12.345.678/0001-90</span>
            <span className="hidden md:inline">|</span>
            <span>Avenida Brasil, 20384, Lote 2 - Barros Filho - RJ</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

// Componentes auxiliares para evitar repetição de código
const FooterLink = ({ to, text }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-primary transition-colors duration-200 block py-1">
      {text}
    </Link>
  </li>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    className="bg-white/5 hover:bg-primary p-2 rounded-full text-white transition-all duration-300 border border-white/10 hover:border-primary"
    target="_blank"
    rel="noreferrer"
  >
    <Icon size={18} />
  </a>
);