import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Gauge, Fuel, Zap, CheckCircle2, MessageCircle, Shield, Share2 } from 'lucide-react';
import carsData from '../data/cars.json'; // Certifique-se que o caminho está certo

export const CarDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // Busca o carro assim que a página carrega
  useEffect(() => {
    const foundCar = carsData.find((c) => c.slug === slug);
    if (foundCar) {
      setCar(foundCar);
      // Rola para o topo ao abrir
      window.scrollTo(0, 0);
    } else {
      // Se não achar (ex: url errada), volta pro catálogo
      navigate('/catalogo');
    }
  }, [slug, navigate]);

  if (!car) return null; // Ou um loading spinner

  // Formata Preço
  const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price);

  // Link do WhatsApp com mensagem personalizada
  const whatsappMessage = encodeURIComponent(`Olá! Vi o ${car.name} no site e tenho real interesse. Podem me passar mais detalhes?`);
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      
      {/* Botão Voltar (Breadcrumb simplificado) */}
      <div className="container mx-auto px-4 mb-6">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} /> Voltar para o estoque
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLUNA DA ESQUERDA: GALERIA (Ocupa 7 colunas) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Imagem Principal com Animação */}
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900 relative group"
            >
              <img 
                src={`/assets/${car.folder}/${activeImage + 1}.jpg`} 
                alt={`${car.name} vista ${activeImage + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/800x600/1a1a1a/FFF?text=Foto+Indisponivel'; }}
              />
              
              {/* Badge Blindado na foto */}
              {car.spec === 'blindado' && (
                 <div className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 border border-white/20">
                   <Shield size={12} className="text-yellow-500" /> BLINDADO
                 </div>
              )}
            </motion.div>

            {/* Grid de Miniaturas */}
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: car.imageCount || 3 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={`/assets/${car.folder}/${index + 1}.jpg`} 
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/200x150/1a1a1a/FFF?text=...'; }}
                  />
                </button>
              ))}
            </div>

            {/* Descrição do Veículo (Fica abaixo das fotos no Mobile) */}
            <div className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Sobre este veículo</h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Veículo periciado e aprovado, com garantia de procedência. 
                A Lions Seminovos oferece as melhores condições do mercado, com taxas especiais de financiamento 
                e a melhor avaliação do seu usado na troca. Este {car.model} está em estado de zero km, 
                com apenas {car.km.toLocaleString()} rodados. Interior impecável, pintura sem detalhes. 
                Venha conferir pessoalmente e se surpreender.
              </p>
            </div>
          </div>

          {/* COLUNA DA DIREITA: INFORMAÇÕES (Sticky - Ocupa 5 colunas) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-gray-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{car.make}</p>
                  <h1 className="text-3xl font-bold text-white leading-tight">{car.name}</h1>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Preço com Destaque */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <p className="text-sm text-gray-400 mb-1">Valor à vista</p>
                <div className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  {price}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Consulte condições para troca ou financiamento.
                </p>
              </div>

              {/* Grid de Especificações Técnicas */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <SpecItem icon={Calendar} label="Ano" value={car.year} />
                <SpecItem icon={Gauge} label="KM" value={`${car.km.toLocaleString()} km`} />
                <SpecItem icon={Fuel} label="Combustível" value={car.fuel} />
                <SpecItem icon={Zap} label="Câmbio" value={car.transmission} />
              </div>

              {/* Lista de Opcionais (Features) */}
              <div className="mb-8">
                <h3 className="text-white font-bold mb-4 text-sm uppercase">Opcionais Destacados</h3>
                <div className="grid grid-cols-1 gap-2">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação (CTA) */}
              <div className="space-y-3">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1"
                >
                  QUERO NEGOCIAR NO WHATSAPP
                </a>
                
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-colors text-sm">
                  SIMULAR FINANCIAMENTO
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para os itens de especificação
const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="bg-black/20 p-3 rounded-lg flex items-center gap-3 border border-white/5">
    <div className="bg-white/5 p-2 rounded text-gray-400">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase font-bold">{label}</p>
      <p className="text-white font-medium text-sm">{value}</p>
    </div>
  </div>
);