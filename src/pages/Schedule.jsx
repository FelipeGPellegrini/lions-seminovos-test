import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Calendar, Clock, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import storesData from '../data/stores.json';

export const Schedule = () => {
  const [stores, setStores] = useState(storesData);
  const [selectedStore, setSelectedStore] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '' });

  // --- LÓGICA DE GEOLOCALIZAÇÃO ---
  
  // Fórmula de Haversine para calcular distância em km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  };

  const handleGetUserLocation = () => {
    setLocationStatus('loading');
    
    if (!navigator.geolocation) {
      setLocationStatus('error');
      alert('Seu navegador não suporta geolocalização.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Calcula a distância para cada loja e ordena
        const sortedStores = storesData.map(store => ({
          ...store,
          distance: calculateDistance(latitude, longitude, store.lat, store.lng)
        })).sort((a, b) => a.distance - b.distance);

        setStores(sortedStores);
        setSelectedStore(sortedStores[0]); // Seleciona automaticamente a mais próxima
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
        alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
      }
    );
  };

  // --- RENDERIZAÇÃO ---

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Agende sua Visita
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Venha tomar um café conosco e conhecer seu próximo carro de perto. 
          Escolha a unidade mais conveniente para você.
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUNA ESQUERDA: SELETOR DE LOJAS (5 colunas) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Botão de Geolocalização */}
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-white/10 text-center">
            <h3 className="text-white font-bold mb-3">Encontre a unidade mais próxima</h3>
            <button
              onClick={handleGetUserLocation}
              disabled={locationStatus === 'loading'}
              className="w-full bg-white/5 hover:bg-primary hover:text-white text-gray-300 border border-white/10 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              {locationStatus === 'loading' ? (
                <span className="animate-pulse">Calculando...</span>
              ) : (
                <>
                  <Navigation size={18} className={locationStatus === 'success' ? 'text-white' : 'text-primary group-hover:text-white'} />
                  {locationStatus === 'success' ? 'Distâncias Calculadas' : 'Usar minha localização atual'}
                </>
              )}
            </button>
          </div>

          {/* Lista de Lojas */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                layout // Animação suave quando a lista reordena
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedStore(store)}
                className={`p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${
                  selectedStore?.id === store.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-gray-900 border-white/5 hover:border-white/20'
                }`}
              >
                {/* Badge de "Mais Próxima" (Só aparece se tiver calculado distância e for a primeira) */}
                {store.distance && index === 0 && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    A MAIS PRÓXIMA
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Foto da loja (miniatura) */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/50 shrink-0">
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-1 ${selectedStore?.id === store.id ? 'text-primary' : 'text-white'}`}>
                      {store.name}
                    </h4>
                    <div className="flex items-start gap-2 text-gray-400 text-xs mb-2">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <p>{store.address}</p>
                    </div>
                    
                    {/* Exibição da Distância */}
                    {store.distance && (
                      <p className="text-sm font-bold text-white flex items-center gap-1">
                        <Navigation size={12} className="text-primary" />
                        {store.distance.toFixed(1)} km de você
                      </p>
                    )}
                  </div>

                  {/* Check de Seleção */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedStore?.id === store.id ? 'border-primary bg-primary text-white' : 'border-gray-600 text-transparent'
                  }`}>
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: FORMULÁRIO (7 colunas) */}
        <div className="lg:col-span-7">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 md:p-10 sticky top-28 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="text-primary" /> Dados do Agendamento
            </h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Seleção de Loja (Readonly - seleciona clicando na lista ao lado) */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Unidade Selecionada</label>
                {selectedStore ? (
                  <div className="flex items-center gap-3 text-white font-bold text-lg">
                    <MapPin className="text-primary" /> {selectedStore.name}
                  </div>
                ) : (
                  <div className="text-gray-500 italic flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Selecione uma loja na lista 
                  </div>
                )}
              </div>

              {/* Grid de Inputs Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Seu Nome</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Digite seu nome" />
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Seu Email</label>
                  <div className="relative">
                    <input type="email" className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="email@exemplo.com" />
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Celular / WhatsApp</label>
                <div className="relative">
                  <input type="tel" className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="(00) 00000-0000" />
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Data</label>
                  <div className="relative">
                    <input type="date" className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none" />
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Horário</label>
                  <div className="relative">
                    <select className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                      <option>Manhã (09:00 - 12:00)</option>
                      <option>Tarde (13:00 - 18:00)</option>
                    </select>
                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Botão Submit */}
              <button 
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  selectedStore 
                    ? 'bg-primary hover:bg-red-700 text-white transform hover:-translate-y-1' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedStore}
              >
                CONFIRMAR AGENDAMENTO
              </button>

              <p className="text-center text-xs text-gray-500">
                Ao confirmar, nossa equipe entrará em contato para validar o horário.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};