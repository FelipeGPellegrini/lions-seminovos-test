import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarCard } from '../components/CarCard'; // Ajuste o import conforme sua estrutura
import { FilterSidebar } from '../components/FilterSidebar';
import rawData from '../data/cars.json'; // Importando o JSON

export const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados dos Filtros
  const [filters, setFilters] = useState({
    search: '',
    category: 'todos',
    maxPrice: 300000,
    blindado: false,
  });

  // 1. LER URL NA INICIALIZAÇÃO (Vindo da Home)
  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    const specParam = searchParams.get('spec');
    const brandParam = searchParams.get('marca');

    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
    if (specParam === 'blindado') {
      setFilters(prev => ({ ...prev, blindado: true }));
    }
    if (brandParam) {
      setFilters(prev => ({ ...prev, search: brandParam })); // Usamos o search para marca por simplicidade
    }
    
    // Simular loading de API
    setTimeout(() => setLoading(false), 800);
  }, [searchParams]);

  // 2. LÓGICA DE FILTRAGEM (Realtime)
  const filteredCars = useMemo(() => {
    return rawData.filter(car => {
      // Filtro Texto (Nome ou Marca)
      const matchesSearch = car.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            car.make.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filtro Categoria
      const matchesCategory = filters.category === 'todos' || car.category === filters.category;
      
      // Filtro Preço
      const matchesPrice = car.price <= filters.maxPrice;

      // Filtro Blindado
      const matchesBlindado = !filters.blindado || car.spec === 'blindado';

      return matchesSearch && matchesCategory && matchesPrice && matchesBlindado;
    });
  }, [filters]);

  // Contagem para o menu lateral
  const counts = useMemo(() => {
    const c = { todos: rawData.length };
    rawData.forEach(car => {
      c[car.category] = (c[car.category] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Nosso Estoque</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Encontre o carro perfeito entre nossas <strong>{filteredCars.length}</strong> opções disponíveis.
          </p>

          {/* Botão de Filtro Mobile */}
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden w-full md:w-auto bg-primary text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-primary/20 hover:bg-red-700 transition-colors"
          >
            <Filter size={18} /> 
            FILTRAR ({filteredCars.length})
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* SIDEBAR WRAPPER
            No mobile: A div wrapper existe mas não tem largura forçada (child é fixed).
            No desktop: lg:w-1/4 ocupa 25% da tela.
        */}
        <div className="lg:w-1/4 w-0"> 
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            isOpen={isMobileFilterOpen}
            setIsOpen={setIsMobileFilterOpen}
            counts={counts}
          />
        </div>

        {/* GRID DE RESULTADOS WRAPPER
            No desktop: Ocupa os 75% restantes.
            No mobile: Ocupa 100% (w-full).
        */}
        <div className="w-full lg:w-3/4">
          
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-800/50 rounded-2xl h-[380px] animate-pulse border border-white/5"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Tags de Filtros Ativos (UX) */}
              {(filters.category !== 'todos' || filters.blindado || filters.search) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.category !== 'todos' && (
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-white/10">
                      Categoria: <span className="text-white capitalize">{filters.category}</span>
                      <button onClick={() => setFilters(prev => ({...prev, category: 'todos'}))}><X size={12}/></button>
                    </span>
                  )}
                  {filters.blindado && (
                    <span className="bg-yellow-900/30 text-yellow-500 px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-yellow-700/30">
                      Blindado
                      <button onClick={() => setFilters(prev => ({...prev, blindado: false}))}><X size={12}/></button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-white/10">
                      Busca: "{filters.search}"
                      <button onClick={() => setFilters(prev => ({...prev, search: ''}))}><X size={12}/></button>
                    </span>
                  )}
                  <button 
                    onClick={() => setFilters({ search: '', category: 'todos', maxPrice: 300000, blindado: false })}
                    className="text-xs text-primary hover:underline ml-2"
                  >
                    Limpar tudo
                  </button>
                </div>
              )}

              {/* Grid Principal */}
              {filteredCars.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-700/50">
                  <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum resultado</h3>
                  <p className="text-gray-500 max-w-md mx-auto px-4">
                    Não encontramos carros com esses filtros. Tente buscar por outros termos ou limpar os filtros.
                  </p>
                  <button 
                    onClick={() => setFilters({ search: '', category: 'todos', maxPrice: 300000, blindado: false })}
                    className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-sm font-bold transition-all"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};