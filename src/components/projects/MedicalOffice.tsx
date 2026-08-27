import { useEffect } from 'react';
import {
    Users, Compass, PenTool, Layout, Sparkles,
    Search, Lightbulb, ShieldCheck, Code,
    Gauge, Palette, Layers,
    TrendingUp, BarChart3
} from 'lucide-react';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjectPageData } from '../../hooks/useProjectPageData';
import ProjectLayout from '../layout/ProjectLayout';
import { CHANNELS } from '../crt/channels';

import {
    ProjectOverviewSection,
    ProjectCardGridSection,
    ProjectProcessSection,
    ProjectProductVisionSection,
    ProjectImageCarouselSection,
    ProjectPrototypeSection,
    ProjectHandoffSection,
    getProjectSectionLabels,
} from './shared';

const FALLBACK_DATA = {
    title: "Redesign Medical Office",
    category: "UX Design",
    year: "2021",
    resumo: "Redesign UI/UX da plataforma web Medical Office, que conecta profissionais de saúde sem espaço próprio a clínicas com capacidade ociosa.<br />O objetivo principal foi redesenhar a interface, torná-la responsiva e aprimorar a usabilidade, mantendo uma experiência familiar para os usuários já existentes.",
    objetivo: "A Medical Office é uma plataforma web que conecta profissionais de saúde iniciantes que não possuem espaço físico para atuação, com proprietários de consultórios que possuem espaços ociosos.<br />Dessa forma, busca suprir a demanda de múltiplos profissionais, viabilizando a geração de renda aos proprietários através do aluguel.",
    desafio: "Redesenhar a ferramenta tornando-a mais moderna e responsiva, facilitando o uso e mantendo o feeling já adquirido pelos usuários. O redesign precisava equilibrar inovação com familiaridade, garantindo que a transição fosse suave para a base de usuários existente.",
    meuPapel: [
        { title: "Lean Inception", desc: "Participação no workshop colaborativo para alinhar o MVP com stakeholders e equipe de desenvolvimento." },
        { title: "Pesquisa & Discovery", desc: "Criação de Matriz CSD, personas e mapeamento de jornadas do usuário." },
        { title: "Design de Interface", desc: "Atuação como designer único após a inception, criando protótipos de alta fidelidade." },
        { title: "Handoff Colaborativo", desc: "Trabalho integrado com a equipe de desenvolvimento desde a concepção." },
    ],
    processoPesquisa: [
        { title: "Lean Inception", desc: "Workshop colaborativo com 2 Designers, 2 Desenvolvedores, COO, CTO e 3 fundadores para definir o MVP." },
        { title: "Matriz CSD", desc: "Levantamento de Certezas, Suposições e Dúvidas para alinhamento da equipe sobre o produto." },
        { title: "Visão Atual", desc: "Documentação da plataforma existente para entender pontos de fricção e identificar oportunidades de melhoria." },
        { title: "Visão do Produto", desc: "Definição do que o produto é, não é, faz e não faz para evitar ambiguidades e definir escopo." },
        { title: "Personas", desc: "Criação de três perfis de usuário: Administrador, Locador e Locatário, com suas necessidades específicas." },
        { title: "Sequenciamento", desc: "Priorização de funcionalidades por importância, valor de negócio e viabilidade técnica para criar uma sequência lógica de desenvolvimento." },
    ],
    descobertas: [
        { title: "Benchmarking", desc: "Análise de plataformas como Airbnb, Booking e QuintoAndar para identificar padrões de mercado e reduzir fricções." },
        { title: "Fluxos de Usuário", desc: "Criação de fluxogramas detalhados indicando o caminho desde o ponto inicial até o objetivo final de cada jornada." },
        { title: "Débito Técnico", desc: "Identificação de limitações técnicas que impactaram o redesign, exigindo ajustes no escopo de algumas rotinas." },
        { title: "Cadastro Problemático", desc: "O fluxo anterior era moroso com formulário extenso; implementamos processo passo a passo mais intuitivo." },
    ],
    prototipo: {
        intro: "O protótipo final foi desenvolvido considerando a responsividade, os anseios dos stakeholders, os insights obtidos a partir de um benchmarking detalhado e o atendimento às principais heurísticas de usabilidade.",
        telas: [
            { titulo: "Landing Page", descricao: "A landing page foi reformulada com base nas diretrizes definidas pelos stakeholders.", imagens: ["/assets/projects/medical-office/Home.webp"], scrollAnimation: true },
            { titulo: "Plataforma Web", descricao: "Algumas limitações de débito técnico impactaram o redesign.", imagens: ["/assets/projects/medical-office/prototipo/2-1.webp", "/assets/projects/medical-office/prototipo/2-2.webp", "/assets/projects/medical-office/prototipo/2-3.webp", "/assets/projects/medical-office/prototipo/2-4.webp"] },
            {
                titulo: "Cadastro de Espaços",
                descricao: "Implementamos um fluxo de cadastro passo a passo, mais intuitivo.",
                imagens: [
                    "/assets/projects/medical-office/prototipo/3-0.webp",
                    "/assets/projects/medical-office/prototipo/3-1.webp",
                    "/assets/projects/medical-office/prototipo/3-2.webp",
                    "/assets/projects/medical-office/prototipo/3-3.webp",
                    "/assets/projects/medical-office/prototipo/3-4.webp",
                    "/assets/projects/medical-office/prototipo/3-5.webp",
                    "/assets/projects/medical-office/prototipo/3-6.webp",
                    "/assets/projects/medical-office/prototipo/3-7.webp",
                    "/assets/projects/medical-office/prototipo/3-8.webp",
                    "/assets/projects/medical-office/prototipo/3-9.webp"
                ]
            },
            {
                titulo: "Templates de Email",
                descricao: "Desenvolvemos templates de e-mail personalizados para os três tipos de usuários.",
                imagens: [
                    "/assets/projects/medical-office/prototipo/4-1.webp",
                    "/assets/projects/medical-office/prototipo/4-2.webp",
                    "/assets/projects/medical-office/prototipo/4-3.webp",
                    "/assets/projects/medical-office/prototipo/4-4.webp",
                    "/assets/projects/medical-office/prototipo/4-5.webp",
                    "/assets/projects/medical-office/prototipo/4-6.webp"
                ],
                imageFit: 'contain' as const
            },
            {
                titulo: "Plataforma Mobile",
                descricao: "Todo o layout foi projetado com foco na responsividade.",
                imagens: ["/assets/projects/medical-office/Home-mobile.webp"],
                secondaryImagens: [
                    "/assets/projects/medical-office/prototipo/5-1.webp",
                    "/assets/projects/medical-office/prototipo/5-2.webp",
                    "/assets/projects/medical-office/prototipo/5-3.webp",
                    "/assets/projects/medical-office/prototipo/5-4.webp",
                    "/assets/projects/medical-office/prototipo/5-5.webp",
                    "/assets/projects/medical-office/prototipo/5-6.webp",
                    "/assets/projects/medical-office/prototipo/5-7.webp"
                ],
                deviceType: 'dual-iphone' as const,
                scrollAnimation: true
            }
        ]
    },
    handoff: {
        titulo: "Handoff Design-Dev",
        descricao: "Atuamos de forma colaborativa desde as etapas iniciais de prototipação, definindo um escopo viável com base na stack tecnológica e no tempo disponível para o projeto. Eventuais limitações técnicas eram identificadas e ajustadas ainda na fase de prototipação.\n\nPara garantir a consistência dessa entrega, foi criado um style guide componentizado, pensado para facilitar tanto a criação quanto a manutenção futura da interface, seguindo diretrizes definidas com o time de marketing.",
        bullets: [
            "Colaboração: Envolvimento da engenharia desde a fase de ideação",
            "Viabilidade: Apenas rotinas viáveis e refinadas encaminhadas para desenvolvimento",
            "Comunicação: Processo promove integração fluida entre designers e desenvolvedores"
        ],
        imagem: "/assets/projects/medical-office/prototipo/style-guide.webp"
    },
    resultados: [
        { title: "Responsividade Total", desc: "Toda a plataforma passou a funcionar perfeitamente em dispositivos móveis." },
        { title: "Experiência Otimizada", desc: "O novo fluxo de cadastro passo a passo reduziu significativamente a fricção." },
        { title: "Identidade Visual", desc: "Templates de email e style guide criaram um padrão de comunicação consistente." },
    ],
    licoes: [
        { title: "Familiaridade com Mudança", desc: "Redesenhar um produto com base de usuários ativa exige equilibrar inovação com o feeling já consolidado." },
        { title: "Envolvimento da Engenharia", desc: "A presença dos desenvolvedores na Lean Inception evitou retrabalho e garantiu viabilidade técnica das decisões." },
        { title: "Design System Precoce", desc: "Criar o style guide desde o início acelerou tanto a prototipação quanto o desenvolvimento das telas." },
    ],
    productVision: {
        whatItIs: { title: "O que É", items: ["Uma plataforma de conexão entre profissionais de saúde e proprietários de consultórios", "Um marketplace para locação de espaços médicos ociosos", "Uma solução digital para otimizar a ocupação de consultórios"] },
        whatItIsNot: { title: "O que NÃO É", items: ["Uma clínica ou consultório próprio", "Um sistema de gestão de prontuários médicos", "Uma plataforma de telemedicina"] },
        whatItDoes: { title: "O que FAZ", items: ["Conecta profissionais iniciantes a espaços disponíveis", "Facilita a geração de renda para proprietários", "Gerencia reservas e disponibilidade de espaços"] },
        whatItDoesNot: { title: "O que NÃO FAZ", items: ["Não oferece serviços médicos diretamente", "Não gerencia agenda de pacientes", "Não processa pagamentos de consultas"] },
    },
    previousView: {
        desc: "Veja como a plataforma era antes do processo de redesign. As imagens abaixo mostram o estado anterior da interface que foi completamente repensada.",
    },
    ferramentas: [
        { title: "Figma", desc: "Prototipagem em alta fidelidade" },
        { title: "Photoshop", desc: "Manipulação de imagens" },
        { title: "Miro", desc: "Lean Inception e fluxogramas" },
        { title: "Jira", desc: "Gerenciamento e handoff" },
    ]
};

export function MedicalOffice() {
    const projectData = useProjectPageData('medicalOffice', FALLBACK_DATA);
    const { isPortuguese } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const c = CHANNELS.find((chan) => chan.path === "/projeto/medical-office") || CHANNELS[2];

    const roleIcons = [Users, Compass, PenTool, Layout];
    const discoveryIcons = [Search, Compass, Layers, Lightbulb];
    const resultIcons = [Gauge, ShieldCheck, Palette, Sparkles];
    const lessonIcons = [Code, TrendingUp, BarChart3];
    const toolIcons = [Palette, PenTool, Layout, Layers];

    const labels = {
        ...getProjectSectionLabels(isPortuguese),
        research: {
            sublabel: isPortuguese ? "PESQUISA & DEFINIÇÃO" : "RESEARCH & DEFINITION",
            title: isPortuguese ? "Processo de Pesquisa" : "Research Process"
        },
        previousView: {
            sublabel: isPortuguese ? "ANTES DO REDESIGN" : "BEFORE REDESIGN",
            title: isPortuguese ? "Visão Prévia" : "Previous View",
            desc: projectData.previousView?.desc || (isPortuguese ? "Interface anterior antes do processo de redesign." : "Previous interface before the redesign process.")
        },
        discoveries: {
            sublabel: isPortuguese ? "DESCOBERTAS" : "DISCOVERIES",
            title: isPortuguese ? "Principais Insights" : "Key Discoveries"
        },
        tools: {
            sublabel: isPortuguese ? "FERRAMENTAS" : "TOOLS",
            title: isPortuguese ? "Ferramentas Utilizadas" : "Tools Used"
        }
    };

    return (
        <ProjectLayout c={c} title={projectData.title}>
            <ProjectOverviewSection
                label="01"
                sublabel={labels.overview.sublabel}
                title={labels.overview.title}
                resumo={projectData.resumo}
                objetivo={projectData.objetivo}
                desafio={projectData.desafio}
            />

            <ProjectCardGridSection
                id="role"
                label="02"
                sublabel={labels.role.sublabel}
                title={labels.role.title}
                items={projectData.meuPapel}
                defaultIcons={roleIcons}
                layoutVariant="split"
            />

            <ProjectProcessSection
                id="research"
                label="03"
                sublabel={labels.research.sublabel}
                title={labels.research.title}
                items={projectData.processoPesquisa}
            />

            <ProjectImageCarouselSection
                id="previous-view"
                label="04"
                sublabel={labels.previousView.sublabel}
                title={labels.previousView.title}
                description={labels.previousView.desc}
                images={[
                    "/assets/projects/medical-office/before-1.webp",
                    "/assets/projects/medical-office/before-2.webp",
                    "/assets/projects/medical-office/before-3.webp"
                ]}
            />

            <ProjectProductVisionSection
                id="product-vision"
                label="05"
                sublabel={labels.productVision.sublabel}
                title={labels.productVision.title}
                data={projectData.productVision}
                images={[
                    "/assets/projects/medical-office/visao-de-produto/Frame 182.webp",
                    "/assets/projects/medical-office/visao-de-produto/Frame 183.webp",
                    "/assets/projects/medical-office/visao-de-produto/Frame 185.webp",
                    "/assets/projects/medical-office/visao-de-produto/Frame 189.webp",
                    "/assets/projects/medical-office/visao-de-produto/Frame 190.webp",
                    "/assets/projects/medical-office/visao-de-produto/flow.webp",
                    "/assets/projects/medical-office/visao-de-produto/image 11.webp",
                    "/assets/projects/medical-office/visao-de-produto/image 14.webp",
                    "/assets/projects/medical-office/visao-de-produto/image 18.webp",
                    "/assets/projects/medical-office/visao-de-produto/image 20.webp"
                ]}
            />

            <ProjectCardGridSection
                id="discoveries"
                label="06"
                sublabel={labels.discoveries.sublabel}
                title={labels.discoveries.title}
                items={projectData.descobertas}
                defaultIcons={discoveryIcons}
                layoutVariant="grid"
            />

            <ProjectPrototypeSection
                id="prototype"
                label="07"
                sublabel={labels.prototype.sublabel}
                title={labels.prototype.title}
                intro={projectData.prototipo?.intro}
                telas={projectData.prototipo?.telas || []}
            />

            <ProjectHandoffSection
                id="handoff"
                label="08"
                sublabel={labels.handoff.sublabel}
                data={projectData.handoff}
            />

            <ProjectCardGridSection
                id="results"
                label="09"
                sublabel={labels.results.sublabel}
                title={labels.results.title}
                items={projectData.resultados || []}
                defaultIcons={resultIcons}
                layoutVariant="grid"
            />

            <ProjectCardGridSection
                id="lessons"
                label="10"
                sublabel={labels.lessons.sublabel}
                title={labels.lessons.title}
                items={projectData.licoes || []}
                defaultIcons={lessonIcons}
                layoutVariant="centered"
            />

            {projectData.ferramentas && projectData.ferramentas.length > 0 && (
                <ProjectCardGridSection
                    id="tools"
                    label="11"
                    sublabel={labels.tools.sublabel}
                    title={labels.tools.title}
                    items={projectData.ferramentas.map((f: { name?: string; title?: string; desc: string }) => ({
                        title: f.title || f.name || "",
                        desc: f.desc
                    }))}
                    defaultIcons={toolIcons}
                    layoutVariant="grid"
                />
            )}

            <AudioMiniPlayer />
        </ProjectLayout>
    );
}
