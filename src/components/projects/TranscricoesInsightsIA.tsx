import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, FileText, Layers, Share2, Clock, TrendingUp, Rocket, CheckCircle2, XCircle, Lightbulb, Eye, Search, Settings } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { useContactModal } from '../../contexts/ContactModalContext';
import { ProjectPageLayout, ProjectSection } from '../ProjectPageLayout';
import { SingleCard, SingleImage, PlaceholderContent } from '../MockupContentComponents';

// Dados do projeto
const projectData = {
    title: "Transcrições & Insights com IA",
    category: "UX Design",
    year: "2024",

    resumo: "Neste projeto foi feito o redesign da funcionalidade voltada à gravação e transcrição automática de videoconferências. A ideia foi centralizar tudo em um só lugar — transcrições, comentários e os insights gerados por IA — facilitando a consulta e o uso desses dados no dia a dia das equipes.",

    objetivo: "Centralizar e otimizar o acesso a informações geradas em reuniões — como gravações, transcrições e insights por IA — reduzindo o tempo gasto na gestão e compartilhamento desses dados, melhorando a eficiência e o aproveitamento comercial do conteúdo.",

    desafio: "Transformar um processo fragmentado e pouco eficiente de gestão de reuniões — com gravações, transcrições e anotações dispersas — em uma experiência unificada, intuitiva e que economizasse tempo para os usuários.",

    meuPapel: [
        "Mapeamento de fricções com base em entrevistas, suporte e comportamento de uso",
        "Benchmarking com Fireflies, tl;dv e outros players",
        "Redefinição do fluxo de uso para acesso intuitivo",
        "Criação de protótipos interativos",
        "Colaboração contínua com engenharia",
        "Validação com usuários"
    ],

    processoPesquisa: [
        { titulo: "Visão Anterior", descricao: "Documentação da versão atual do produto para identificar pontos de fricção.", icon: Eye },
        { titulo: "Levantamento de Dados", descricao: "Análise de dados provenientes dos setores de Suporte, Vendas e Pós-Vendas.", icon: Search },
        { titulo: "Benchmarking", descricao: "Análise comparativa com Apollo, Fireflies, tl;dv e Bluedot.", icon: Layers },
        { titulo: "Alinhamento com Engenharia", descricao: "Conexão constante entre Design e Desenvolvimento.", icon: Settings }
    ],

    descobertas: [
        { titulo: "Informações úteis", descricao: "Na versão anterior, não era possível acessar o conteúdo das gravações.", icon: FileText },
        { titulo: "Integração eficiente", descricao: "Ligações de outras ferramentas não eram integradas.", icon: Layers },
        { titulo: "Decisões estratégicas", descricao: "Dados de transcrição e insights não eram exibidos.", icon: Target },
        { titulo: "Alinhamento prejudicado", descricao: "Não havia compartilhamento estruturado.", icon: Share2 },
        { titulo: "Visibilidade centralizada", descricao: "Gestores tinham dificuldade para acompanhar negociações.", icon: Users },
        { titulo: "Eficiência na operação", descricao: "Era necessário assistir à gravação completa.", icon: Clock },
        { titulo: "Escalabilidade", descricao: "Era necessário abrir cada card individualmente.", icon: TrendingUp },
        { titulo: "Efeito viral", descricao: "Gerar viralização entre participantes.", icon: Rocket }
    ],

    prototipo: {
        intro: "O protótipo final foi desenvolvido alinhado às expectativas dos stakeholders.",
        telas: [
            {
                titulo: "Tela Inicial",
                descricao: "Organização em duas abas — agendamentos futuros e realizados.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/tela-inicial-1.png",
                    "/src/assets/projects/transcricoes-insights-ia/tela-inicial-2.png"
                ]
            },
            {
                titulo: "Visualização das Gravações",
                descricao: "Acesso simultâneo a gravação, transcrições, comentários e insights.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-1.png",
                    "/src/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-2.png"
                ]
            },
            {
                titulo: "Gravações de Áudio",
                descricao: "Inclusão das gravações de ligações em áudio na mesma rotina visual.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/gravacoes-audio-2.png"
                ]
            },
            {
                titulo: "Email de Resumo",
                descricao: "E-mail de resumo contendo informações-chave da reunião.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/email-resumo-correto.png"
                ]
            }
        ]
    },

    resultados: {
        positivos: [
            { titulo: "Redução do tempo de gestão", descricao: "Usuários acessam transcrições, gravações e insights em um único lugar." },
            { titulo: "Adoção orgânica", descricao: "Redirecionamento automático ao término das reuniões." },
            { titulo: "Aumento da satisfação", descricao: "Clientes passaram a usar a funcionalidade com frequência." },
            { titulo: "Ganho de valor comercial", descricao: "Usada como recurso principal nas demonstrações." },
            { titulo: "Simplificação do processo", descricao: "Melhoria em processos como vínculo com negócios." }
        ],
        negativos: [
            { titulo: "Comparação de métricas", descricao: "Liberação controlada impossibilitou comparativos precisos." },
            { titulo: "Ajustes pontuais", descricao: "Funcionalidade de compartilhamento precisou ser redesenhada." }
        ]
    },

    licoes: [
        { categoria: "Processo e Colaboração", descricao: "Colaboração entre Design e Engenharia desde o início foi essencial." },
        { categoria: "Experiência do Usuário", descricao: "Testar e ajustar com base em feedback contínuo é fundamental." },
        { categoria: "Métricas e Validação", descricao: "Acesso contínuo a métricas é crucial para validar decisões." }
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
    // Overview cards como seções individuais
    const overviewSections: ProjectSection[] = [
        {
            id: 'resumo',
            title: 'Resumo',
            subtitle: 'Visão Geral',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    Introdução ao projeto e contexto geral.
                </p>
            ),
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
            subtitle: 'Visão Geral',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    Meta principal do projeto.
                </p>
            ),
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
            subtitle: 'Visão Geral',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    Problema a ser resolvido.
                </p>
            ),
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
            subtitle: 'Visão Geral',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    Minhas responsabilidades no projeto.
                </p>
            ),
            mockupContent: (
                <SingleCard
                    title="Meu Papel"
                    icon={<Users size={24} />}
                    content={
                        <ul className="space-y-2">
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

    // Processo de Pesquisa como seções individuais
    const processoSections: ProjectSection[] = projectData.processoPesquisa.map((item, index) => ({
        id: `processo-${index}`,
        title: item.titulo,
        subtitle: 'Processo de Pesquisa',
        leftContent: (
            <p className="text-zinc-600 leading-relaxed">
                {item.descricao}
            </p>
        ),
        mockupContent: (
            <SingleCard
                title={item.titulo}
                icon={<item.icon size={24} />}
                content={<p>{item.descricao}</p>}
                number={String(index + 1).padStart(2, '0')}
            />
        )
    }));

    // Descobertas como seções individuais
    const descobertasSections: ProjectSection[] = projectData.descobertas.map((item, index) => ({
        id: `descoberta-${index}`,
        title: item.titulo,
        subtitle: 'Descobertas',
        leftContent: (
            <p className="text-zinc-600 leading-relaxed">
                {item.descricao}
            </p>
        ),
        mockupContent: (
            <SingleCard
                title={item.titulo}
                icon={<item.icon size={24} />}
                content={<p>{item.descricao}</p>}
                number={String(index + 1).padStart(2, '0')}
            />
        )
    }));

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
                leftContent: (
                    <p className="text-zinc-600 leading-relaxed">
                        {tela.descricao}
                    </p>
                ),
                mockupContent: <SingleImage src={imagem} alt={`${tela.titulo} - Imagem ${imagemIndex + 1}`} />
            };
        })
    );

    // Resultados como seções individuais
    const resultadosSections: ProjectSection[] = [
        // Negativos primeiro
        ...projectData.resultados.negativos.map((item, index) => ({
            id: `resultado-negativo-${index}`,
            title: item.titulo,
            subtitle: 'Resultados • Pontos de Atenção',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    {item.descricao}
                </p>
            ),
            mockupContent: (
                <SingleCard
                    title={item.titulo}
                    icon={<XCircle size={24} className="text-amber-400" />}
                    content={<p>{item.descricao}</p>}
                    number={String(index + 1).padStart(2, '0')}
                />
            )
        })),
        // Positivos
        ...projectData.resultados.positivos.map((item, index) => ({
            id: `resultado-positivo-${index}`,
            title: item.titulo,
            subtitle: 'Resultados • Conquistas',
            leftContent: (
                <p className="text-zinc-600 leading-relaxed">
                    {item.descricao}
                </p>
            ),
            mockupContent: (
                <SingleCard
                    title={item.titulo}
                    icon={<CheckCircle2 size={24} className="text-emerald-400" />}
                    content={<p>{item.descricao}</p>}
                    number={String(index + 1).padStart(2, '0')}
                />
            )
        }))
    ];

    // Lições como seções individuais
    const licoesSections: ProjectSection[] = projectData.licoes.map((item, index) => ({
        id: `licao-${index}`,
        title: item.categoria,
        subtitle: 'Lições Aprendidas',
        leftContent: (
            <p className="text-zinc-600 leading-relaxed">
                {item.descricao}
            </p>
        ),
        mockupContent: (
            <SingleCard
                title={item.categoria}
                icon={<Lightbulb size={24} />}
                content={<p>{item.descricao}</p>}
                number={String(index + 1).padStart(2, '0')}
            />
        )
    }));

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
                            style={{ fontSize: 'clamp(2.3rem, 4.5vw, 5rem)', color: '#0d9488' }}
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
        // 6-9. Processo de Pesquisa
        ...processoSections,
        // 10-17. Descobertas
        ...descobertasSections,
        // 18-21. Protótipo
        ...prototipoSections,
        // 22-28. Resultados
        ...resultadosSections,
        // 29-31. Lições
        ...licoesSections
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
