# 🎨 Picolo Design Digital

Portfolio profissional de Rodrigo Picolo — Designer Digital especializado em UX/UI, Product Design e IA.

## ✨ Features

- **Estética Híbrida Tátil / CRT** — Interface imersiva inspirada em hardware físico, com chanfros geométricos (`clip-path`), scanlines sutis e controles táteis
- **Navegação em Canais (PicoloTV)** — Estrutura de canais para explorar Home, Sobre e os estudos de caso com fluidez
- **Language Switcher Tátil** — Seletor físico deslizante com suporte bilíngue completo (Português do Brasil `pt-BR` e Inglês `en-US`)
- **Case Studies Modulares** — Páginas de projetos ricas e interativas com mockups realistas de hardware (MacBook e iPhone), fluxos de protótipo e handoff
- **Theming Dinâmico por Projeto** — Paleta de acento contextual adaptada para cada projeto (Teal, Sage Neon, Azul Elétrico, Navy)
- **Responsivo** — Adaptado e testado para mobile, tablet e desktop
- **SEO Otimizado** — Meta tags, Open Graph e Twitter Cards

## 🛠️ Tech Stack

| Tecnologia | Uso |
| :--- | :--- |
| React 18 | UI Framework |
| TypeScript | Tipagem estática |
| Vite 6 | Build tool & Dev Server |
| Tailwind CSS v4 | Estilização moderna e variáveis CSS |
| Framer Motion | Animações de entrada e transições de tela |
| Radix UI | Primitivas acessíveis de UI |
| React Router DOM 7 | Gerenciamento de rotas e navegação |
| Lucide React | Biblioteca de ícones |
| Lottie React | Micro-interações e animações vetoriais |

## 📁 Estrutura do Projeto

```text
src/
├── assets/                  # Imagens, logos e recursos estáticos
├── components/
│   ├── crt/                 # TopBar tátil, Guide (sitemap), HomeChannel e PicoloTV
│   ├── layout/              # ProjectLayout (wrapper padronizado de case studies)
│   ├── pages/               # Páginas principais (AboutPage)
│   ├── projects/            # Páginas individuais de case studies
│   │   └── shared/          # Seções compartilhadas e modulares de projetos
│   └── ui/                  # Componentes base, botões, modais e partículas
├── contexts/                # LanguageContext, ProjectThemeContext, ContactModalContext
├── hooks/                   # useProjectPageData, useAboutPageData, useAppNavigation, useTranslation
├── locales/                 # Dicionários de tradução (pt-BR.json, en-US.json)
├── config/                  # Configurações de projetos e carrossel
├── index.css                # CSS global, tokens do design system e Tailwind v4
└── App.tsx                  # Componente raiz da aplicação

public/
└── assets/                  # Assets públicos servidos estaticamente
```

## 🌐 Deploy

O site é automaticamente publicado no GitHub Pages através do workflow de CI/CD.

**URL:** [https://elpicollon.github.io/](https://elpicollon.github.io/)

## 📄 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

---

Desenvolvido com ☕ e 💚 por **Rodrigo Picolo**
