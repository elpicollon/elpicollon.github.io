import { useEffect } from 'react';
import {
    Compass, LayoutGrid, Smartphone, MessageSquare,
    ShieldCheck, TrendingUp, Code, BarChart3
} from 'lucide-react';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjectPageData } from '../../hooks/useProjectPageData';
import ProjectLayout from '../layout/ProjectLayout';
import { CHANNELS } from '../crt/channels';

import {
    ProjectOverviewSection,
    ProjectCardGridSection,
    ProjectPrototypeSection,
    getProjectSectionLabels,
} from './shared';

const FALLBACK_DATA = {
    title: "IA Notetaker - App Leads2b",
    category: "Product Design",
    year: "2025",
    resumo: "Expansão do ecossistema do Meetnotes (IA para transcrição e insights) para o ambiente mobile, focando na captação de áudio e inteligência de vendas para equipes em campo (porta-a-porta e visitas presenciais).",
    objetivo: "Descentralizar a captura de dados de reuniões, levando o poder da documentação automatizada para fora das videochamadas. O foco foi transformar o smartphone do vendedor em um assistente de captação ágil, eliminando a dependência de computadores e a perda de informações no trabalho de campo.",
    desafio: "Desenhar uma interface de baixa fricção que respeitasse a imprevisibilidade do ambiente externo. Era preciso garantir que a gravação e a vinculação de dados ao CRM fossem quase instantâneas, não interrompendo o fluxo natural de uma conversa presencial, além de lidar com limitações de hardware (bateria, oscilação de rede e interrupções do sistema).",
    meuPapel: [
        { title: "Estratégia e Contexto", desc: "Redefinição do Job-to-be-Done (de 'consumo denso em vídeo' na web para 'captação ágil em áudio' no mobile)." },
        { title: "Arquitetura de Informação", desc: "Desenho de fluxos enxutos para vinculação de gravações a negócios (deals) em andamento ou criação instantânea de novos." },
        { title: "Design de Interação e Edge Cases", desc: "Mapeamento de cenários de erro e interrupção (ex: chamadas recebidas durante a gravação, gestão de estado offline/online)." },
        { title: "UI e Carga Cognitiva", desc: "Adaptação da leitura de transcrições longas para o modelo mental de aplicativos de mensagens." },
    ],
    prototipo: {
        telas: [
            { titulo: "Áudio-First: Foco na Captação", descricao: "Diferente da versão web, o contexto mobile exigiu a remoção deliberada da interface de vídeo. O app foca exclusivamente em áudio. Essa decisão estratégica não apenas simplificou a interface, reduzindo a carga cognitiva, mas também otimizou o consumo de bateria e processamento do dispositivo do vendedor em campo.", imagens: ["/assets/projects/ia-notetaker-app/1.webp"] },
            { titulo: "Criação de Negócios On-the-Fly", descricao: "Vendedores porta-a-porta não têm tempo para fluxos complexos. Integramos o acesso ao CRM diretamente na tela de gravação. O usuário pode vincular a conversa a um Deal existente ou criar um novo negócio instantaneamente. A inteligência do sistema permite ainda reconhecer participantes pelo tom de voz, automatizando a ata da reunião antes mesmo do vendedor voltar para o carro.", imagens: ["/assets/projects/ia-notetaker-app/2.webp"] },
            { titulo: "Transcrições com Modelo Mental de Chat", descricao: "Apresentar blocos densos de texto de uma reunião em uma tela de celular compromete a legibilidade. A solução foi adotar o modelo mental de aplicativos de mensagens: balões estilizados, diferenciação visual clara por participante, marcações temporais e bookmarks na timeline, tornando a leitura fluida e instantaneamente escaneável.", imagens: ["/assets/projects/ia-notetaker-app/3.webp"] },
            { titulo: "Smart Insights Gerados por IA", descricao: "Além da transcrição literal, o app processa a conversa para gerar resumos executivos e feedbacks analíticos estruturados da ligação — identificando tópicos-chave, direcionamentos práticos e vícios de linguagem dos vendedores para apoiar o aprimoramento contínuo das abordagens comerciais.", imagens: ["/assets/projects/ia-notetaker-app/4.mp4"] },
            { titulo: "Resiliência: Lidando com o Caos do Mundo Real", descricao: "O design previu as interrupções naturais do mobile. Se o vendedor recebe uma ligação, o app pausa a gravação automaticamente, protegendo o contexto sem perda de dados. Além disso, estruturamos os estados da interface para lidar com oscilações da rede 4G, garantindo que o áudio seja salvo localmente e sincronizado com o processamento da IA na nuvem apenas quando houver estabilidade, mitigando a ansiedade do usuário.", imagens: ["/assets/projects/ia-notetaker-app/5.webp"] },
        ]
    },
    resultados: [
        { title: "Captura do 'Funil Invisível'", desc: "Reuniões físicas, que antes dependiam da memória do vendedor ou de anotações manuais precárias, passaram a gerar dados estruturados, enriquecendo o CRM com transcrições precisas." },
        { title: "Adoção sem Fricção", desc: "A simplicidade do modelo 'gravar e vincular' reduziu a barreira de entrada para vendedores externos, transformando o celular em uma ferramenta de inteligência competitiva em tempo real." },
    ],
    licoes: [
        { title: "Contexto dita a Interface", desc: "Tentar espelhar a densidade da versão web no mobile seria um erro crasso. Entender que o vendedor em campo precisa de um 'capturador' (e não de um painel de análise complexo) foi o divisor de águas para o sucesso da usabilidade." },
        { title: "Design para a Imperfeição", desc: "Trabalhar com áudio no mobile ensina que o sistema nunca atua em condições ideais. Projetar os estados intermediários (pausas forçadas, ausência de rede, processamento em background) é tão importante quanto desenhar a 'tela feliz'." },
        { title: "Familiaridade Acelera a Adoção", desc: "Reutilizar o modelo visual de mensageria (balões de chat) para a leitura de transcrições provou que não precisamos reinventar a roda quando já existe um padrão mental consolidado no dia a dia do usuário." },
    ]
};

export function IANotetakerApp() {
    const projectData = useProjectPageData('iaNotetakerApp', FALLBACK_DATA, '/assets/projects/ia-notetaker-app');
    const { isPortuguese } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const c = CHANNELS.find((chan) => chan.path === "/projeto/ia-notetaker-app") || CHANNELS[1];

    const roleIcons = [Compass, LayoutGrid, Smartphone, MessageSquare];
    const resultIcons = [ShieldCheck, TrendingUp];
    const lessonIcons = [Code, TrendingUp, BarChart3];
    const labels = getProjectSectionLabels(isPortuguese);

    return (
        <ProjectLayout c={c} title={projectData.title} deviceType="iphone">
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

            <ProjectPrototypeSection
                id="prototype"
                label="03"
                sublabel={labels.prototype.sublabel}
                title={labels.prototype.title}
                telas={projectData.prototipo.telas}
                defaultDeviceType="iphone"
            />

            <ProjectCardGridSection
                id="results"
                label="04"
                sublabel={labels.results.sublabel}
                title={labels.results.title}
                items={projectData.resultados}
                defaultIcons={resultIcons}
                layoutVariant="grid"
            />

            <ProjectCardGridSection
                id="lessons"
                label="05"
                sublabel={labels.lessons.sublabel}
                title={labels.lessons.title}
                items={projectData.licoes}
                defaultIcons={lessonIcons}
                layoutVariant="centered"
            />

            <AudioMiniPlayer />
        </ProjectLayout>
    );
}
