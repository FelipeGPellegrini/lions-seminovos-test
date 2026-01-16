import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const FinanceSection = () => {
  return (
    <section className="py-20 bg-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO: Imagem (Oculta no Mobile) 
              A classe 'hidden lg:block' faz ela sumir em telas pequenas
          */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[400px] hidden lg:block"
          >
            {/* Efeito de borda colorida sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl z-0 transform -rotate-2 scale-105" />
            
            <img 
              src="https://img.freepik.com/fotos-premium/o-vendedor-aperta-a-mao-do-cliente-e-entrega-as-chaves-do-carro_479128-374.jpg" 
              alt="Entrega de chaves" 
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* LADO DIREITO: Estrutura do Formulário (Visível sempre) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Título funcional */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simulação de Financiamento
            </h2>
            
            {/* Texto de marcação (Lorem Ipsum) */}
            <p className="text-gray-400 mb-6 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Bullets técnicos */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-primary" size={20} />
                <span>Duis aute irure dolor in reprehenderit</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-primary" size={20} />
                <span>Excepteur sint occaecat cupidatat non proident</span>
              </li>
            </ul>

            {/* O Formulário */}
            <form className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold">Nome</label>
                  <input type="text" className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold">CPF</label>
                  <input type="text" className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold">Modelo de Interesse</label>
                <select className="w-full bg-dark border border-gray-700 rounded p-2 text-white focus:border-primary focus:outline-none">
                  <option>Selecione uma categoria...</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Hatch</option>
                </select>
              </div>

              <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition-all mt-2">
                SIMULAR AGORA
                <ArrowRight size={18} />
              </button>
            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
};