import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gauge, Calendar, Fuel, Zap, ArrowRight, Shield } from 'lucide-react'; // Importei Shield

export const CarCard = ({ car }) => {
  const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price);
  
  // Fallback de imagem caso não carregue
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400/1a1a1a/FFF?text=Imagem+Indisponivel';
  };

  const imagePath = `/assets/${car.folder}/1.jpg`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Área da Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        
        {/* BADGE BLINDADO PROFISSIONAL */}
        {car.spec === 'blindado' && (
          <div className="absolute top-3 right-3 bg-yellow-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 z-10 shadow-lg border border-yellow-400/30 tracking-wider uppercase">
            <Shield size={12} fill="currentColor" />
            Blindado
          </div>
        )}
        
        <img 
          src={imagePath} 
          alt={car.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            to={`/detalhes/${car.slug}`}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm"
          >
            VER DETALHES <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-1 truncate" title={car.name}>{car.name}</h3>
        <p className="text-primary font-bold text-xl mb-4">{price}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-400 mb-4 mt-auto">
          <div className="flex items-center gap-2" title="Ano">
            <Calendar size={14} className="text-gray-500 shrink-0" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2" title="Quilometragem">
            <Gauge size={14} className="text-gray-500 shrink-0" />
            <span>{car.km.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2" title="Combustível">
            <Fuel size={14} className="text-gray-500 shrink-0" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2" title="Câmbio">
            <Zap size={14} className="text-gray-500 shrink-0" />
            <span>{car.transmission}</span>
          </div>
        </div>
        
        {/* Linha divisória e opcionais */}
        <div className="border-t border-white/10 pt-3 mt-auto">
           <p className="text-[10px] text-gray-500 truncate uppercase tracking-wide">
            {car.features && car.features.join(' • ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};