# 🦁 Lions Seminovos - Desafio Front-end

> Uma experiência de compra automotiva moderna, rápida e inteligente.

🔗 **Link do Projeto Online:** [Acesse a Demo na Vercel](https://lions-seminovos-test.vercel.app/)

---

## 🛠️ Stack Tecnológica

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

A escolha das tecnologias visou performance (Core Web Vitals) e DX (Developer Experience):

| Tecnologia | Função no Projeto |
| :--- | :--- |
| **React** | Biblioteca core para componentização e estado. |
| **Vite** | Build tool de alta performance. |
| **Tailwind CSS** | Estilização utility-first para layout responsivo e Design System. |
| **Framer Motion** | Biblioteca de animações para micro-interações e transições. |
| **React Router** | Roteamento SPA (Single Page Application). |
| **Lucide React** | Ícones vetoriais leves e consistentes. |

## 🖼️ Galeria do Projeto

### 1. Home Page
imgs\image.png
### 2. Catálogo com Filtros
_Filtros laterais e cards interativos._
### 3. Agendamento (Geolocalização)
_Cálculo real de distância entre o cliente e a loja._
### 4. Mobile e WhatsApp
_Responsividade total e integração inteligente._
---

## ✨ Diferenciais Implementados

### 📍 Store Locator (Geolocalização Real)
Na página "Agende uma Visita", o sistema utiliza a API do navegador para calcular a distância exata (em km) entre o usuário e as lojas, ordenando automaticamente pela mais próxima.

### 🔗 Catálogo Inteligente
Os filtros (Categoria, Preço, Blindado) ficam salvos na URL. Isso permite compartilhar um link de busca específica com qualquer pessoa.

### 💬 Botão WhatsApp Contextual
O botão flutuante muda a mensagem dependendo de onde o usuário está:
* **Home:** "Quero ver ofertas."
* **Detalhes do Carro:** "Tenho interesse neste carro específico."
* **Agendamento:** "Preciso de ajuda para agendar."

---

## 🚀 Como rodar localmente

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/FelipeGPellegrini/lions-seminovos-test.git](https://github.com/FelipeGPellegrini/lions-seminovos-test.git)
    ```

2.  Instale as dependências:
    ```bash
    cd lions-seminovos-test
    npm install
    ```

3.  Rode o projeto:
    ```bash
    npm run dev
    ```

4.  Acesse `http://localhost:5173`.

---

Desenvolvido por **Felipe Pellegrini** 🦁