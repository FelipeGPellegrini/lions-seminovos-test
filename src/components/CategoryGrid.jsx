import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'suv',
    title: 'SUVs',
    description: 'Conforto e robustez',
    image: '/assets/suv.jpg',
    link: '/catalogo?categoria=suv',
    // Bento Grid config: Ocupa 2 colunas e 2 linhas (Bloco Grande)
    className: 'md:col-span-2 md:row-span-2', 
  },
  {
    id: 'hatch',
    title: 'Hatchs',
    description: 'Compactos e econômicos',
    image: '/assets/hatch.jpg',
    link: '/catalogo?categoria=hatch',
    // Ocupa 1 coluna (Canto Superior Direito)
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'sedan',
    title: 'Sedans',
    description: 'Elegância e espaço',
    image: '/assets/sedan.jpg',
    link: '/catalogo?categoria=sedan',
    // Ocupa 1 coluna (Meio Direito)
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'utilitario',
    title: 'Utilitários',
    description: 'Força para o trabalho',
    image: '/assets/utilitario.jpg',
    link: '/catalogo?categoria=utilitario',
    // Ocupa 2 colunas (Rodapé Esquerdo)
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'motos',
    title: 'Motos',
    description: 'Liberdade e agilidade',
    image: '/assets/moto.jpg',
    link: '/catalogo?categoria=motos',
    // Ocupa 1 coluna (Preenche o vazio do Rodapé Direito)
    className: 'md:col-span-1 md:row-span-1',
  },
];

// Configuração da animação de entrada (Surgindo)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Um item aparece depois do outro
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Começa invisível e 50px para baixo
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Só anima uma vez
          className="mb-10 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Navegue por Categoria
          </h2>
          <p className="text-gray-400">
            Escolha o estilo que mais combina com você.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Começa a animar um pouco antes de chegar
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              onClick={() => navigate(cat.link)}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer border border-white/10 ${cat.className}`}
            >
              {/* IMAGEM DE FUNDO (Preto e Branco -> Colorida) */}
              <div className="absolute inset-0 w-full h-full bg-gray-800">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-all duration-700 
                             filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>

              {/* OVERLAY ESCURO (Para texto ler melhor) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* CONTEÚDO */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                
                {/* Ícone de seta que aparece no hover */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/30">
                    <ArrowUpRight size={24} />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {cat.title}
                </h3>
                
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};