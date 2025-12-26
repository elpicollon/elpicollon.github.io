import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Zap, Lightbulb, CheckCircle2, XCircle, Sparkles, Clock, TrendingUp, Share2, Layers, Rocket, FileText } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { useContactModal } from '../../contexts/ContactModalContext';

// Componente de Progress Bar no scroll
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-violet-500 origin-left z-50"
            style={{ scaleX }}
        />
    );
}

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
        "Otimização de tempo de gestão",
        "Validação com usuários",
        "Apoio a times de vendas"
    ],

    processoPesquisa: [
        {
            titulo: "Visão Anterior",
            descricao: "Documentação da versão atual do produto para identificar pontos de fricção e mapear oportunidades de melhoria."
        },
        {
            titulo: "Levantamento de Dados",
            descricao: "Análise de dados provenientes dos setores de Suporte, Vendas e Pós-Vendas para embasar decisões."
        },
        {
            titulo: "Benchmarking",
            descricao: "Análise comparativa com Apollo, Fireflies, tl;dv e Bluedot para identificar boas práticas de mercado."
        },
        {
            titulo: "Alinhamento com Engenharia",
            descricao: "Conexão constante entre Design e Desenvolvimento para antecipar limitações técnicas."
        }
    ],

    descobertas: [
        { id: 1, titulo: "Informações úteis", descricao: "Na versão anterior, não era possível acessar o conteúdo das gravações, apenas o registro de que a videoconferência havia ocorrido.", icon: FileText },
        { id: 2, titulo: "Integração eficiente", descricao: "Ligações e videochamadas de outras ferramentas não eram integradas nem exibidas, fragmentando o histórico.", icon: Layers },
        { id: 3, titulo: "Decisões estratégicas", descricao: "Dados de transcrição e insights gerados não eram exibidos na interface anterior.", icon: Target },
        { id: 4, titulo: "Alinhamento prejudicado", descricao: "Não havia possibilidade de compartilhar dados da reunião com os participantes de forma estruturada.", icon: Share2 },
        { id: 5, titulo: "Visibilidade centralizada", descricao: "Gestores tinham dificuldade para acompanhar negociações em andamento.", icon: Users },
        { id: 6, titulo: "Eficiência na operação", descricao: "Era necessário assistir à gravação completa para identificar pontos relevantes.", icon: Clock },
        { id: 7, titulo: "Escalabilidade", descricao: "Era necessário abrir cada card individualmente no pipeline para acessar o conteúdo.", icon: TrendingUp },
        { id: 8, titulo: "Efeito viral", descricao: "Gerar viralização entre participantes, estimulando compartilhamento espontâneo.", icon: Rocket }
    ],

    prototipo: {
        intro: "O protótipo final foi desenvolvido alinhado às expectativas dos stakeholders, benchmarks de mercado e insights gerados a partir de escuta ativa dos clientes.",
        telas: [
            {
                titulo: "Tela Inicial",
                descricao: "A tela inicial foi desenvolvida com base nos padrões visuais do Design System da Leads2b. O conteúdo foi organizado em duas abas distintas — uma para agendamentos futuros e outra para os já realizados. A resolução de 1280x550 foi adotada como padrão após análises detalhadas da área útil de tela dos usuários.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/tela-inicial-1.png",
                    "/src/assets/projects/transcricoes-insights-ia/tela-inicial-2.png"
                ]
            },
            {
                titulo: "Visualização das Gravações",
                descricao: "A estrutura permite que o usuário acompanhe a gravação sendo executada, enquanto tem acesso simultâneo a dados como transcrições, comentários, participantes e insights gerados por IA. A interface mantém visíveis os principais dados de negócio e ações rápidas.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-1.png",
                    "/src/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-2.png"
                ]
            },
            {
                titulo: "Gravações de Áudio",
                descricao: "Inclusão das gravações de ligações em áudio na mesma rotina visual utilizada para as gravações de vídeo, visando facilitar a navegação e padronizar o formato de apresentação das informações.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/gravacoes-audio-2.png"
                ]
            },
            {
                titulo: "Email de Resumo",
                descricao: "E-mail de resumo da gravação contendo informações-chave da reunião e gatilhos estratégicos que incentivam o prospect a criar uma conta na plataforma.",
                imagens: [
                    "/src/assets/projects/transcricoes-insights-ia/email-resumo-correto.png"
                ]
            }
        ]
    },

    resultados: {
        positivos: [
            { titulo: "Redução do tempo de gestão", descricao: "Usuários acessam transcrições, gravações e insights em um único lugar." },
            { titulo: "Adoção orgânica", descricao: "Redirecionamento automático ao término das reuniões promoveu descoberta natural." },
            { titulo: "Aumento da satisfação", descricao: "Clientes com reclamações anteriores passaram a usar a funcionalidade com frequência." },
            { titulo: "Ganho de valor comercial", descricao: "Nova tela usada como recurso principal nas demonstrações para novos clientes." },
            { titulo: "Simplificação do processo", descricao: "Melhoria em processos como vínculo com negócios, registro de atividades e cópia de trechos." }
        ],
        negativos: [
            { titulo: "Comparação de métricas", descricao: "Liberação controlada impossibilitou comparativos precisos de uso." },
            { titulo: "Ajustes pontuais", descricao: "Funcionalidade de compartilhamento precisou ser redesenhada após dificuldades operacionais." }
        ]
    },

    licoes: [
        { categoria: "Processo e Colaboração", descricao: "Colaboração entre Design e Engenharia desde o início foi essencial para alinhar escopo e viabilidade técnica." },
        { categoria: "Experiência do Usuário", descricao: "Testar e ajustar com base em feedback contínuo é fundamental para aprimorar a experiência." },
        { categoria: "Métricas e Validação", descricao: "Acesso contínuo a métricas é crucial para validar decisões de design." }
    ],

    ferramentas: ["Figma", "GitHub", "Productboard"]
};

export function TranscricoesInsightsIA() {
    const { openModal } = useContactModal();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f2f4f7]">
            <ScrollProgress />
            <MinimalNav />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 via-[#f2f4f7] to-[#f2f4f7]" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-zinc-600 hover:text-purple-600 transition-colors mb-12 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Voltar aos projetos</span>
                        </Link>
                    </motion.div>

                    {/* Category tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                            {projectData.category} • {projectData.year}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#0f172a] mb-8 max-w-4xl"
                    >
                        {projectData.title}
                    </motion.h1>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '200px' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-gradient-to-r from-purple-600 to-violet-400"
                    />
                </div>
            </section>

            {/* Overview Cards Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Resumo */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-purple-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Sparkles className="text-purple-600" size={20} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800">Resumo</h3>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{projectData.resumo}</p>
                        </motion.div>

                        {/* Objetivo */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-purple-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                                    <Target className="text-violet-600" size={20} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800">Objetivo</h3>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{projectData.objetivo}</p>
                        </motion.div>

                        {/* Desafio */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-purple-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Zap className="text-amber-600" size={20} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800">Desafio</h3>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{projectData.desafio}</p>
                        </motion.div>

                        {/* Meu Papel */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-purple-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Users className="text-emerald-600" size={20} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800">Meu Papel</h3>
                            </div>
                            <ul className="space-y-2">
                                {projectData.meuPapel.slice(0, 4).map((item, index) => (
                                    <li key={index} className="text-zinc-600 text-sm flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Processo de Pesquisa - Timeline */}
            <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#f2f4f7] to-purple-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4">
                            Processo de Pesquisa
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '150px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-transparent"
                        />
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-200 transform md:-translate-x-1/2" />

                        {projectData.processoPesquisa.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-purple-600 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg shadow-purple-300" />

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md"
                                    >
                                        <span className="text-sm text-purple-600 font-medium">0{index + 1}</span>
                                        <h3 className="text-xl font-semibold text-slate-800 mt-1 mb-2">{item.titulo}</h3>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{item.descricao}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Descobertas & Definições - Bento Grid */}
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4">
                            Descobertas & Definições
                        </h2>
                        <p className="text-zinc-600 max-w-2xl mb-6">
                            A partir da análise consolidada de todas as informações levantadas, sintetizei os principais aprendizados e direcionamentos estratégicos.
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '150px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-transparent"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {projectData.descobertas.map((descoberta, index) => (
                            <motion.div
                                key={descoberta.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-xl hover:border-purple-200 transition-all cursor-default group"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                        <descoberta.icon size={16} className="text-purple-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-2xl font-bold text-purple-200 group-hover:text-purple-400 transition-colors">
                                        0{descoberta.id}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-slate-800 mb-2">{descoberta.titulo}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{descoberta.descricao}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ferramentas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100"
                    >
                        <h4 className="font-semibold text-slate-800 mb-4">Softwares & Ferramentas</h4>
                        <div className="flex flex-wrap gap-3">
                            {projectData.ferramentas.map((ferramenta, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium shadow-sm"
                                >
                                    {ferramenta}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* O Protótipo */}
            <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-purple-50/30 to-[#f2f4f7]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4">
                            O Protótipo
                        </h2>
                        <p className="text-zinc-600 max-w-3xl mb-6">
                            {projectData.prototipo.intro}
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '150px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-transparent"
                        />
                    </motion.div>

                    <div className="space-y-16">
                        {projectData.prototipo.telas.map((tela, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Card Container */}
                                <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg">
                                    {/* Header with number and title */}
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-200">
                                            <span className="text-white text-xl font-bold">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">
                                                {tela.titulo}
                                            </h3>
                                            <p className="text-zinc-600 leading-relaxed">
                                                {tela.descricao}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Images Grid */}
                                    <div className={`grid gap-6 ${tela.imagens.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                                        {tela.imagens.map((imagem, imgIndex) => (
                                            <motion.div
                                                key={imgIndex}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 + imgIndex * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ y: -4, scale: 1.01 }}
                                                className="group relative overflow-hidden rounded-2xl border border-purple-100 shadow-md hover:shadow-xl hover:border-purple-200 transition-all duration-300 bg-zinc-50"
                                            >
                                                <img
                                                    src={imagem}
                                                    alt={`${tela.titulo} - Imagem ${imgIndex + 1}`}
                                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                />
                                                {/* Subtle overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resultados */}
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4">
                            Resultados
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '150px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-transparent"
                        />
                    </motion.div>

                    {/* Positivos */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8 pl-4 border-l-4 border-emerald-500">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-500/10">
                                <CheckCircle2 size={24} className="text-emerald-500" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-semibold text-emerald-700">
                                Resultados Positivos
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {projectData.resultados.positivos.map((resultado, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-500 overflow-hidden cursor-default"
                                >
                                    {/* Animated Gradient Blob */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-emerald-500/10" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-6 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-500 w-fit">
                                            <CheckCircle2 className="w-6 h-6 text-zinc-500 group-hover:text-emerald-600 transition-colors duration-500" />
                                        </div>

                                        <h4 className="text-xl md:text-2xl font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-3">
                                            {resultado.titulo}
                                        </h4>

                                        <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-base leading-relaxed mt-auto">
                                            {resultado.descricao}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Negativos */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 pl-4 border-l-4 border-amber-500">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500/10">
                                <XCircle size={24} className="text-amber-500" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-semibold text-amber-700">
                                Pontos de Atenção
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {projectData.resultados.negativos.map((resultado, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10 hover:bg-amber-50 hover:border-amber-200 transition-all duration-500 overflow-hidden cursor-default"
                                >
                                    {/* Animated Gradient Blob */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-amber-500/10" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-6 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all duration-500 w-fit">
                                            <XCircle className="w-6 h-6 text-zinc-500 group-hover:text-amber-600 transition-colors duration-500" />
                                        </div>

                                        <h4 className="text-xl md:text-2xl font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-3">
                                            {resultado.titulo}
                                        </h4>

                                        <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-base leading-relaxed mt-auto">
                                            {resultado.descricao}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Lições & Aprendizados */}
            <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#f2f4f7] to-purple-50/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4">
                            Lições & Aprendizados
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '150px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-transparent"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {projectData.licoes.map((licao, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10 hover:bg-zinc-100 transition-all duration-500 overflow-hidden cursor-default"
                            >
                                {/* Animated Gradient Blob */}
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-500 w-fit">
                                        <Lightbulb className="w-8 h-8 text-zinc-500 group-hover:text-purple-600 transition-colors duration-500" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-3">
                                        {licao.categoria}
                                    </h3>

                                    <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-base leading-relaxed mt-auto">
                                        {licao.descricao}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-purple-50 via-white to-violet-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-purple-100 shadow-xl"
                    >
                        {/* Text content */}
                        <div className="text-center lg:text-left max-w-xl">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-800 mb-4">
                                Vamos criar algo incrível juntos?
                            </h2>
                            <p className="text-zinc-600 text-lg">
                                Se você gostou deste projeto e quer discutir como posso ajudar sua equipe, entre em contato!
                            </p>
                        </div>

                        {/* Buttons */}
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
        </div>
    );
}
