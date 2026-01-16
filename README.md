# Lions Seminovos - Desafio Front-end 🦁

Aplicação web desenvolvida como parte do processo seletivo para a Lions Seminovos. O objetivo foi recriar a experiência do site institucional focando em performance, UX moderna e funcionalidades avançadas de catálogo e agendamento.

🔗 **Link do Projeto:** https://lions-seminovos-test.vercel.app/

## 🚀 Tecnologias e Decisões Técnicas

Para entregar uma aplicação robusta e escalável, optei pela seguinte stack:

* **React + Vite:** Para um ambiente de desenvolvimento rápido e build otimizado.
* **Tailwind CSS:** Para estilização ágil, responsiva e consistente (Design System).
* **Framer Motion:** Para micro-interações e animações que elevam a experiência do usuário (UX).
* **React Router Dom:** Para gerenciamento de rotas (SPA - Single Page Application).
* **Lucide React:** Para ícones vetoriais leves e modernos.

## ✨ Diferenciais Implementados

Além dos requisitos básicos, implementei funcionalidades focadas em conversão e usabilidade:

1.  **📍 Geolocalização Real (Store Locator):**
    * Na página "Agende uma Visita", o sistema utiliza a API de Geolocalização do navegador para calcular a distância exata do usuário até as lojas da Lions.
    * Utilizei a **Fórmula de Haversine** para o cálculo matemático de distância.
    * Ordenação automática da loja mais próxima.

2.  **🔍 Catálogo Inteligente (URL State):**
    * Filtros persistentes na URL. Se você compartilhar o link de um carro filtrado, o destinatário abre exatamente na mesma busca.
    * Filtros combinados (Categoria + Preço + Texto + Blindagem).
    * Layout responsivo com Sidebar (Desktop) e Drawer (Mobile).

3.  **💬 Botão WhatsApp Contextual:**
    * O botão flutuante detecta a página atual.
    * Na Home: "Quero ver ofertas".
    * No Carro X: "Tenho interesse no carro X".
    * No Agendamento: "Preciso de ajuda para agendar".

4.  **📱 Mobile First:**
    * Slider com suporte a toque e imagens otimizadas (`<picture>`) para economizar dados no celular.
    * Menu e filtros adaptados para uso com uma mão só.

## 🛠️ Como rodar o projeto localmenteas

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/FelipeGPellegrini/lions-seminovos-test](https://github.com/FelipeGPellegrini/lions-seminovos-test)
    ```
2.  Instale as dependências:
    ```bash
    cd lions-seminovos-test
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:5173` no seu navegador.

---
Desenvolvido com dedicação.