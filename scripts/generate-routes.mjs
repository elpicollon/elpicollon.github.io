import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.resolve(rootDir, 'build');

const routes = [
  {
    path: '/sobre',
    title: 'Sobre Rodrigo Picolo | Trajetória, Formação e Certificações',
    description: 'Conheça a trajetória de Rodrigo Picolo, Staff Product Designer com background técnico, pós-graduação em Design Digital e atuação AI-First.',
    ogImage: '/assets/image-rp.webp'
  },
  {
    path: '/projeto/ia-notetaker-app',
    title: 'IA Notetaker App · Case de UX/UI | Rodrigo Picolo',
    description: 'Case de design do aplicativo mobile IA Notetaker: áudio-first, transcrição estilo chat e Smart Insights gerados por IA para vendedores em campo.',
    ogImage: '/assets/projects/ia-notetaker-app/card-home.webp'
  },
  {
    path: '/projeto/transcricoes-insights-ia',
    title: 'Transcrições & Insights com IA · Case de UX/UI | Rodrigo Picolo',
    description: 'Redesign de ecossistema de videoconferências focado na centralização de gravações, transcrições e insights de IA com estratégias de PLG.',
    ogImage: '/assets/projects/transcricoes-insights-ia/card-home.webp'
  },
  {
    path: '/projeto/medical-office',
    title: 'Medical Office · Case de UX/UI | Rodrigo Picolo',
    description: 'Redesign completo de software médico legado para clínicas e consultórios, reduzindo carga cognitiva e aumentando a agilidade clínica.',
    ogImage: '/assets/projects/medical-office/card-home.webp'
  },
  {
    path: '/projeto/importacao-empresas',
    title: 'Importação de Empresas · Case de UX/UI | Rodrigo Picolo',
    description: 'Fluxo intuitivo e resiliente para importação em lote e enriquecimento de dados corporativos em plataforma B2B.',
    ogImage: '/assets/projects/importacao-empresas/capa.webp'
  }
];

function generateStaticRoutes() {
  const indexHtmlPath = path.join(buildDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('build/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const route of routes) {
    const targetDir = path.join(buildDir, ...route.path.split('/').filter(Boolean));
    fs.mkdirSync(targetDir, { recursive: true });

    let customizedHtml = baseHtml;
    const canonicalUrl = `https://picolodesign.com.br${route.path}`;

    // Update <title>
    customizedHtml = customizedHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${route.title}</title>`
    );

    // Update <meta name="description">
    customizedHtml = customizedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Update canonical link
    customizedHtml = customizedHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Update og tags
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    if (route.ogImage) {
      customizedHtml = customizedHtml.replace(
        /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:image" content="https://picolodesign.com.br${route.ogImage}" />`
      );
    }

    // Write route index.html
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, customizedHtml, 'utf8');
    console.log(`✓ Generated static route: ${route.path} -> ${path.relative(rootDir, targetFile)}`);
  }
}

generateStaticRoutes();
