import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { useContactModal } from '../../contexts/ContactModalContext';
import { ProjectPageLayout, ProjectSection } from '../ProjectPageLayout';
import { SingleCard, SingleImage, PlaceholderContent } from '../MockupContentComponents';

// Dados do projeto
const projectData = {
    title: "Transcrições & Insights com IA",
    category: "Product Design",
    year: "2024",

    resumo: <>Redesign do ecossistema de videoconferências focado na centralização de gravações, transcrições e insights de IA.<br />O projeto automatizou a documentação pós-reunião, eliminando trabalho manual e transformando uma ferramenta operacional em um ativo estratégico de vendas, validado por alta adoção espontânea.</>,

    objetivo: <>Centralizar gravações, transcrições e insights de IA para eliminar a gestão manual e o ruído no compartilhamento de dados.<br />O foco foi transformar registros de reuniões em inteligência acionável para times de Vendas, Suporte e Produto, elevando a competitividade da ferramenta no mercado.</>,

    desafio: <>Arquitetar a unificação de múltiplas fontes de dados (vídeo, ligações e transcrições) que eram dispostos em diferentes locais, integrando um volume denso de informações em um fluxo único e performático, reduzindo a carga cognitiva do usuário sem comprometer experiência de uso e viabilidade técnica.</>,

    meuPapel: [
        <><span className="highlight-title">Discovery e Estratégia:</span> Diagnóstico de fricções e benchmarking competitivo para definição de requisitos.</>,
        <><span className="highlight-title">Arquitetura e Interação:</span> Redesign da jornada para integrar vídeo e dados em um fluxo único.</>,
        <><span className="highlight-title">Viabilidade Técnica:</span> Alinhamento com engenharia para implementação dos recursos de IA.</>,
        <><span className="highlight-title">Validação e Refino:</span> Ajustes de usabilidade baseados em feedback qualitativo.</>,
    ],

    processoPesquisa: [
        <><span className="highlight-title">Auditoria do Legado:</span> Análise heurística da versão anterior para mapear fricções e dívidas de experiência.</>,
        <><span className="highlight-title">Dados Internos:</span> Cruzamento de chamados de Suporte e Vendas para validar dores reais e priorizar correções.</>,
        <><span className="highlight-title">Benchmarking:</span> Estudo de padrões de interação em players como Apollo, Fireflies, tl;dv e Bluedot.</>,
        <><span className="highlight-title">Viabilidade Técnica:</span> Validação precoce com engenharia para antecipar restrições e evitar retrabalho.</>,
    ],

    descobertas: [
        <><span className="highlight-title">Acesso à Inteligência:</span> Transformar um simples "log de reunião" em um hub de conteúdo pesquisável (transcrição e IA), eliminando a necessidade de assistir ao vídeo completo.</>,
        <><span className="highlight-title">Centralização da Verdade:</span> Unificar calls internas e externas em uma visualização única, removendo a fricção de buscar registros dentro de pipelines de vendas.</>,
        <><span className="highlight-title">Desbloqueio de Colaboração:</span> Compartilhamento fácil para que a informação flua entre Vendas, Suporte e Produto sem barreiras manuais.</>,
        <><span className="highlight-title">Estratégia de Viralização:</span> Envio automático de resumos como alavanca de Product-Led Growth, estimulando a adoção espontânea por novos usuários.</>,
    ],

    prototipo: {
        intro: "O protótipo final foi desenvolvido alinhado às expectativas dos stakeholders.",
        telas: [
            {
                titulo: "Tela Inicial",
                descricao: "Organização em duas abas — agendamentos futuros e realizados.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/tela-inicial-1.png",
                    "/assets/projects/transcricoes-insights-ia/tela-inicial-2.png"
                ]
            },
            {
                titulo: "Visualização das Gravações",
                descricao: "Acesso simultâneo a gravação, transcrições, comentários e insights.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-1.png",
                    "/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-2.png"
                ]
            },
            {
                titulo: "Gravações de Áudio",
                descricao: "Inclusão das gravações de ligações em áudio na mesma rotina visual.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/gravacoes-audio-2.png"
                ]
            },
            {
                titulo: "Email de Resumo",
                descricao: "E-mail de resumo contendo informações-chave da reunião.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/email-resumo-correto.png"
                ]
            }
        ]
    },

    resultados: {
        positivos: [
            <><span className="highlight-title">Eficiência Operacional:</span> Centralização de assets (gravação, transcrição e IA) em um único hub, eliminando a organização manual de atas e liberando horas produtivas dos times.</>,
            <><span className="highlight-title">Impacto Comercial:</span> A nova interface elevou a percepção de valor do produto, sendo adotada pela equipe de Vendas como diferencial competitivo em demonstrações para novos clientes.</>,
            <><span className="highlight-title">Growth e Adoção:</span> O redirecionamento automático pós-reunião impulsionou a descoberta orgânica da feature, integrando-a naturalmente ao fluxo diário sem custo de marketing.</>,
            <><span className="highlight-title">Recuperação de Confiança:</span> Usuários detratores da versão anterior tornaram-se promotores da nova funcionalidade, validando a resolução das fricções críticas de usabilidade.</>,
        ]
    },

    licoes: [
        <><span className="highlight-title">Shift-Left Dev:</span> A validação técnica na fase de ideação provou-se vital para calibração e eliminação de retrabalho.</>,
        <><span className="highlight-title">Alavancas de Growth</span> O redirecionamento automático evidenciou que pequenas intervenções no fluxo podem gerar mais adoção orgânica do que grandes funcionalidades.</>,
        <><span className="highlight-title">Dados como Premissa</span> A experiência reforçou que a definição de KPIs deve nascer junto com o projeto, garantindo a mensuração de sucesso no rollout.</>,
    ]
};

// Scroll Progress Bar
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-300 origin-left z-50"
            style={{ scaleX }}
        />
    );
}

// Build sections array
function buildSections(): ProjectSection[] {
    // Overview cards como seções individuais (4 seções)
    const totalOverview = 4;
    const overviewSections: ProjectSection[] = [
        {
            id: 'resumo',
            title: 'Resumo',
            subtitle: `Visão Geral • 1/${totalOverview}`,
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Resumo"
                    icon={<Sparkles size={24} />}
                    content={<p>{projectData.resumo}</p>}
                    number="01"
                />
            )
        },
        {
            id: 'objetivo',
            title: 'Objetivo',
            subtitle: `Visão Geral • 2/${totalOverview}`,
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Objetivo"
                    icon={<Target size={24} />}
                    content={<p>{projectData.objetivo}</p>}
                    number="02"
                />
            )
        },
        {
            id: 'desafio',
            title: 'Desafio',
            subtitle: `Visão Geral • 3/${totalOverview}`,
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Desafio"
                    icon={<Zap size={24} />}
                    content={<p>{projectData.desafio}</p>}
                    number="03"
                />
            )
        },
        {
            id: 'meu-papel',
            title: 'Meu Papel',
            subtitle: `Visão Geral • 4/${totalOverview}`,
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Meu Papel"
                    icon={<Users size={24} />}
                    content={
                        <ul className="space-y-5 text-left-list">
                            {projectData.meuPapel.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-teal-400 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    }
                    number="04"
                />
            )
        }
    ];

    // Processo de Pesquisa como uma única seção com bullet points
    const processoSection: ProjectSection = {
        id: 'processo-pesquisa',
        title: 'Processo de Pesquisa',
        subtitle: 'Pesquisa • 1/1',
        leftContent: null,
        mockupContent: (
            <SingleCard
                title="Processo de Pesquisa"
                icon={<Search size={24} />}
                content={
                    <ul className="space-y-5 text-left-list">
                        {projectData.processoPesquisa.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-teal-400 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                }
                number="01"
            />
        )
    };

    // Descobertas divididas em duas seções com bullet points
    const descobertasSections: ProjectSection[] = [
        {
            id: 'descobertas-1',
            title: 'Descobertas & Definições',
            subtitle: 'Descobertas • 1/2',
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Descobertas"
                    icon={<Lightbulb size={24} />}
                    content={
                        <ul className="space-y-5 text-left-list">
                            {projectData.descobertas.slice(0, 2).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-teal-400 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    }
                    number="01"
                />
            )
        },
        {
            id: 'descobertas-2',
            title: 'Descobertas & Definições',
            subtitle: 'Descobertas • 2/2',
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Descobertas"
                    icon={<Lightbulb size={24} />}
                    content={
                        <ul className="space-y-5 text-left-list">
                            {projectData.descobertas.slice(2, 4).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-teal-400 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    }
                    number="02"
                />
            )
        }
    ];

    // Protótipo - uma seção por imagem (flatMap para expandir todas as imagens)
    const prototipoSections: ProjectSection[] = projectData.prototipo.telas.flatMap((tela, telaIndex) =>
        tela.imagens.map((imagem, imagemIndex) => {
            // Calcular índice global da imagem
            const totalImagensBefore = projectData.prototipo.telas
                .slice(0, telaIndex)
                .reduce((acc, t) => acc + t.imagens.length, 0);
            const globalIndex = totalImagensBefore + imagemIndex + 1;
            const totalImagens = projectData.prototipo.telas.reduce((acc, t) => acc + t.imagens.length, 0);

            return {
                id: `prototipo-${telaIndex}-${imagemIndex}`,
                title: tela.titulo,
                subtitle: `Protótipo • ${globalIndex}/${totalImagens}`,
                leftSubtitle: tela.descricao,
                leftContent: null,
                mockupContent: <SingleImage src={imagem} alt={`${tela.titulo} - Imagem ${imagemIndex + 1}`} />
            };
        })
    );

    // Resultados divididos em cards (Conquistas)
    const resultadosSections: ProjectSection[] = [
        // Conquistas - Card 1 (2 primeiros)
        {
            id: 'resultados-positivos-1',
            title: 'Resultados & Impacto',
            subtitle: 'Resultados • 1/2',
            leftSubtitle: 'Baseado em dados de indicadores qualitativos e padrões iniciais de adoção.',
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Conquistas"
                    icon={<CheckCircle2 size={24} className="text-emerald-400" />}
                    content={
                        <ul className="space-y-5 text-left-list">
                            {projectData.resultados.positivos.slice(0, 2).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    }
                    number="01"
                />
            )
        },
        // Conquistas - Card 2 (2 últimos)
        {
            id: 'resultados-positivos-2',
            title: 'Resultados & Impacto',
            subtitle: 'Resultados • 2/2',
            leftSubtitle: 'Baseado em dados de indicadores qualitativos e padrões iniciais de adoção.',
            leftContent: null,
            mockupContent: (
                <SingleCard
                    title="Conquistas"
                    icon={<CheckCircle2 size={24} className="text-emerald-400" />}
                    content={
                        <ul className="space-y-5 text-left-list">
                            {projectData.resultados.positivos.slice(2, 4).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400 mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    }
                    number="02"
                />
            )
        }
    ];

    // Lições como uma única seção com bullet points
    const licoesSection: ProjectSection = {
        id: 'licoes',
        title: 'Insights do Projeto',
        subtitle: 'Insights • 1/1',
        leftSubtitle: 'Principais lições estratégicas no processo de design.',
        leftContent: null,
        mockupContent: (
            <SingleCard
                title="Lições Aprendidas"
                icon={<Lightbulb size={24} />}
                content={
                    <ul className="space-y-5 text-left-list">
                        {projectData.licoes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-teal-400 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                }
                number="01"
            />
        )
    };

    return [
        // 1. Hero
        {
            id: 'hero',
            title: '',
            subtitle: '',
            leftContent: (
                <div>
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors group mb-8"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium uppercase tracking-wider">Voltar</span>
                    </Link>

                    {/* Title */}
                    <div className="mb-8">
                        <h1
                            className="font-bold text-[#0f172a] tracking-tight leading-[1.05] whitespace-nowrap"
                            style={{ fontSize: 'clamp(2.3rem, 4.5vw, 5rem)' }}
                        >
                            Transcrições &
                        </h1>
                        <h1
                            className="font-bold tracking-tight leading-[1.05] whitespace-nowrap"
                            style={{ fontSize: 'clamp(2.3rem, 4.5vw, 5rem)', color: '#0d9488', marginTop: '-0.15em' }}
                        >
                            Insights com IA
                        </h1>
                    </div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-4 items-center mb-16"
                    >
                        <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                            <span className="text-sm md:text-base font-medium text-slate-600">
                                Product Design
                            </span>
                        </div>
                        <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                            <span className="text-sm md:text-base font-medium text-slate-600">
                                2024
                            </span>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-[30px] h-[48px] border-2 border-slate-400 rounded-full flex justify-center pt-2">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 bg-slate-600 rounded-full"
                            />
                        </div>
                        <span className="text-sm font-medium text-slate-500 tracking-widest uppercase">
                            Scroll to explore
                        </span>
                    </motion.div>
                </div>
            ),
            mockupContent: <PlaceholderContent text="Imagem de capa do projeto" />
        },
        // 2-5. Overview (Resumo, Objetivo, Desafio, Meu Papel)
        ...overviewSections,
        // 6. Processo de Pesquisa
        processoSection,
        // 7-8. Descobertas
        ...descobertasSections,
        // 18-21. Protótipo
        ...prototipoSections,
        // 22-28. Resultados
        ...resultadosSections,
        // Lições Aprendidas
        licoesSection
    ];
}

export function TranscricoesInsightsIA() {
    const { openModal } = useContactModal();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = buildSections();

    // CTA e Footer fora do layout com MacBook
    const footerContent = (
        <>
            {/* CTA Section */}
            <section className="min-h-[calc(100vh-100px)] flex items-center justify-center py-20 px-6 md:px-12 bg-gradient-to-br from-purple-50 via-white to-violet-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-12 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl"
                    >
                        <div className="text-center lg:text-left max-w-xl">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-800 mb-4">
                                Vamos criar algo incrível juntos?
                            </h2>
                            <p className="text-zinc-600 text-lg">
                                Se você gostou deste projeto e quer discutir como posso ajudar sua equipe, entre em contato!
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                            <motion.button
                                onClick={openModal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-300 whitespace-nowrap cursor-pointer"
                            >
                                Entre em Contato
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-purple-600 rounded-full hover:bg-purple-50 transition-all font-medium whitespace-nowrap"
                                >
                                    <ArrowLeft size={18} />
                                    Voltar aos Projetos
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FooterNew />
        </>
    );

    return (
        <div ref={containerRef}>
            <ScrollProgress />

            <ProjectPageLayout
                sections={sections}
                headerContent={<MinimalNav />}
                footerContent={footerContent}
            />
        </div>
    );
}
