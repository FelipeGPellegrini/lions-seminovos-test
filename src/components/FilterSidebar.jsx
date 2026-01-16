import React from 'react';
import { X, Filter, Search, Shield } from 'lucide-react';

export const FilterSidebar = ({ filters, setFilters, isOpen, setIsOpen, counts }) => {
  
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* 1. OVERLAY (Fundo escuro quando abre no mobile) */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. SIDEBAR (Gaveta) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[85%] max-w-[320px] bg-gray-900 border-r border-white/10 shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-out
        lg:relative lg:translate-x-0 lg:w-full lg:h-auto lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:z-0 lg:overflow-visible
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Cabeçalho Mobile (Botão Fechar) */}
        <div className="flex justify-between items-center lg:hidden mb-8 border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Filter size={20} className="text-primary" /> 
            Filtros
          </h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Título Desktop */}
        <div className="hidden lg:flex items-center gap-2 mb-6 text-white border-b border-white/10 pb-4">
          <Filter size={20} className="text-primary" />
          <span className="font-bold text-lg">Filtrar Resultados</span>
        </div>

        {/* --- CONTEÚDO DOS FILTROS --- */}

        {/* Busca */}
        <div className="mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block tracking-wider">Buscar</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nome ou marca..." 
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-primary focus:outline-none placeholder-gray-600 transition-colors"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        {/* Categoria */}
        <div className="mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Categoria</label>
          <div className="space-y-1">
            {['todos', 'suv', 'sedan', 'hatch', 'utilitario', 'motos'].map((cat) => (
              <div 
                key={cat} 
                onClick={() => handleChange('category', cat)} // AÇÃO DIRETA NO CLIQUE
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  filters.category === cat ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Bolinha Customizada (Radio Fake) */}
                  <div className={`
                    w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                    ${filters.category === cat 
                      ? 'border-primary' 
                      : 'border-gray-600'}
                  `}>
                    {filters.category === cat && (
                      <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(227,30,36,0.8)]" />
                    )}
                  </div>
                  
                  {/* Texto da Categoria */}
                  <span className={`capitalize text-sm ${filters.category === cat ? 'text-white font-semibold' : 'text-gray-400'}`}>
                    {cat === 'todos' ? 'Todas' : cat}
                  </span>
                </div>
                
                {/* Contador */}
                <span className={`text-xs font-mono px-2 py-0.5 rounded transition-colors ${
                   filters.category === cat ? 'bg-primary/20 text-primary' : 'bg-black/30 text-gray-600'
                }`}>
                  {counts[cat] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preço */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Orçamento Máximo</label>
            <span className="text-primary text-sm font-bold">R$ {filters.maxPrice.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="300000" 
            step="5000" 
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-red-500"
          />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono">
            <span>R$ 0</span>
            <span>R$ 300k+</span>
          </div>
        </div>

        {/* Switch Blindado */}
        <div className="mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white text-sm font-medium flex items-center gap-2">
                  <Shield size={16} className={filters.blindado ? 'text-primary' : 'text-gray-500'} />
                  Apenas Blindados
                </span>
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${filters.blindado ? 'bg-primary' : 'bg-gray-700'}`}>
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${filters.blindado ? 'translate-x-5' : 'translate-x-0'}`} />
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={filters.blindado}
                      onChange={(e) => handleChange('blindado', e.target.checked)}
                    />
                </div>
            </label>
        </div>

        {/* Botão Mobile: Aplicar Filtros (Apenas visual, pois fecha o menu) */}
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg"
          >
            VER RESULTADOS
          </button>
        </div>

      </aside>
    </>
  );
};