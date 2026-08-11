import { type ReactNode, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  GraduationCap,
  ListChecks,
  Network,
  Route,
  Search,
  Server,
  Shield,
  Wifi
} from "lucide-react";

type Status = "nao_iniciado" | "estudando" | "concluido" | "revisar";

type Lesson = {
  id: string;
  name: string;
  status?: Status;
};

type Course = {
  id: string;
  title: string;
  block: string;
  priority: number;
  image: string;
  goal: string;
  lessons: Lesson[];
};

type DayPlan = {
  day: string;
  focus: string;
  blocks: string[];
};

const courses: Course[] = [
  {
    id: "036",
    title: "036 - Como Estudar Redes do Zero",
    block: "Base obrigatoria",
    priority: 1,
    image: "/course-images/036-como-estudar-redes-do-zero.png",
    goal: "Fechar metodo de estudo, OSI/TCP-IP, IP e Netmask.",
    lessons: [
      { id: "036-01", name: "01 - CONVERSA INICIAL", status: "concluido" },
      { id: "036-02", name: "02 - POR ONDE COMEÇAR", status: "concluido" },
      { id: "036-03", name: "03 - COMO FAZER UM CRONOGRAMA DE ESTUDOS", status: "estudando" },
      { id: "036-04", name: "CRONOGRAMA DE ESTUDOS", status: "estudando" },
      { id: "036-05", name: "04 - TÉCNICAS DE ESTUDO" },
      { id: "036-06", name: "05 - REVISÃO OSI TCP/IP" },
      { id: "036-07", name: "06 - REVISÃO DE IP E NETMASK" },
      { id: "036-08", name: "Pesquisa Como Estudar Redes do Zero" }
    ]
  },
  {
    id: "redes-gratis-2",
    title: "Curso de Redes Gratis 2.0",
    block: "MikroTik inicial",
    priority: 2,
    image: "/course-images/curso-de-redes-gratis-2.png",
    goal: "Aplicar LAN, DHCP, PPPoE, NAT, bridge, rotas e backup.",
    lessons: [
      { id: "rg2-01", name: "Apresentação Inicial" },
      { id: "rg2-02", name: "O que são RouterBoards" },
      { id: "rg2-03", name: "Conhecendo Alguns Modelos de RouterBoards" },
      { id: "rg2-04", name: "Conhecendo o RouterOS" },
      { id: "rg2-05", name: "Download do Laboratório" },
      { id: "rg2-06", name: "01 - Conhecendo o Roteador" },
      { id: "rg2-07", name: "02 - Primeiro Acesso" },
      { id: "rg2-08", name: "03 - Configurando Redes Local + DHCP" },
      { id: "rg2-09", name: "04 - Ativando Link de Internet PPPoE + NAT" },
      { id: "rg2-10", name: "05 - Como e Porque Atualizar o Roteador" },
      { id: "rg2-11", name: "06 - Segurança Básica (IP Services)" },
      { id: "rg2-12", name: "07 - Segurança Avançada (Firewall)" },
      { id: "rg2-13", name: "08 - O que é e Como Configurar Bridge" },
      { id: "rg2-14", name: "09 - Ativando o Link 2 (DHCP) + Rotas" },
      { id: "rg2-15", name: "10 - Ativando o Link 3 (Config. Estática)" },
      { id: "rg2-16", name: "11 - Script de Failover de Links" },
      { id: "rg2-17", name: "12 - Como Fazer Backup" }
    ]
  },
  {
    id: "mikrotik-gratis",
    title: "Curso de MikroTik Gratis",
    block: "Laboratorios basicos",
    priority: 2,
    image: "/course-images/como-estudar-redes-do-zero.png",
    goal: "Reforçar primeiro acesso, reset, topologia e labs.",
    lessons: [
      { id: "mg-01", name: "APOSTILA DO CURSO" },
      { id: "mg-02", name: "01 - APRESENTAÇÃO INICIAL" },
      { id: "mg-03", name: "02 - O QUE SÃO ROUTERBOARDS" },
      { id: "mg-04", name: "03 - CONHECENDO ALGUNS MODELOS DE ROUTERBOARDS" },
      { id: "mg-05", name: "04 - CONHECENDO O ROUTEROS" },
      { id: "mg-06", name: "05 - PRIMEIRO ACESSO AO ROTEADOR" },
      { id: "mg-07", name: "06 - RESETANDO O ROTEADOR" },
      { id: "mg-08", name: "DOWNLOAD DO LABORATÓRIO" },
      { id: "mg-09", name: "07 - TOPOLOGIA E IDENTIFICAÇÃO" },
      { id: "mg-10", name: "08 - LAB 1" },
      { id: "mg-11", name: "09 - LAB 2" },
      { id: "mg-12", name: "10 - LAB 3" },
      { id: "mg-13", name: "11 - LAB 4" },
      { id: "mg-14", name: "12 - CONCLUSÃO LAB 4" },
      { id: "mg-15", name: "PROVA" }
    ]
  },
  {
    id: "mikrotik-zero",
    title: "Curso MikroTik do Zero",
    block: "MikroTik pratico",
    priority: 2,
    image: "/course-images/mikrotik-do-zero.png",
    goal: "Configuração inicial, firewall, NAT, failover, VLAN, IPv6, VPN e Wi-Fi.",
    lessons: [
      { id: "mz-01", name: "FORMULÁRIO DE CHECKIN OBRIGATÓRIO" },
      { id: "mz-02", name: "APOSTILA - AULA 1" },
      { id: "mz-03", name: "1 - CONFIGURAÇÃO INICIAL, FIREWALL E NAT" },
      { id: "mz-04", name: "APOSTILA - AULA 2" },
      { id: "mz-05", name: "2 - FAILOVER E LOADBALANCE" },
      { id: "mz-06", name: "APOSTILA - AULA 3" },
      { id: "mz-07", name: "3 - VLANS E IPV6" },
      { id: "mz-08", name: "APOSTILA - AULA 4" },
      { id: "mz-09", name: "4 - VPNS E WI-FI" }
    ]
  },
  {
    id: "lab-zero",
    title: "038 - Laboratorio Virtual do Zero",
    block: "Infraestrutura",
    priority: 3,
    image: "/course-images/lab-virtual-do-zero.png",
    goal: "Criar ambiente de laboratorio para praticar com segurança.",
    lessons: [
      { id: "lvz-01", name: "DOWNLOAD DO VMWARE PLAYER" },
      { id: "lvz-02", name: "01 - CONVERSA INICIAL" },
      { id: "lvz-03", name: "02 - FORMAS DE UTILIZAR UM LAB" },
      { id: "lvz-04", name: "03 - EXEMPLOS DE SOFTWARE PARA LAB" },
      { id: "lvz-05", name: "04 - INSTALANDO O EVE-NG EM UMA VM" },
      { id: "lvz-06", name: "05 - ADICIONANDO IMAGENS NO EVE-NG" },
      { id: "lvz-07", name: "06 - INSTALANDO VM DO PNETLAB" },
      { id: "lvz-08", name: "07 - LABORATORIOS AVANÇADOS" }
    ]
  },
  {
    id: "roteamento-vlans",
    title: "Curso Roteamento e VLANs",
    block: "Roteamento",
    priority: 3,
    image: "/course-images/roteamentos-e-vlans.png",
    goal: "Entrar em VLAN, roteamento estatico e OSPF depois da base.",
    lessons: [
      { id: "rv-01", name: "APOSTILA AULA 1" },
      { id: "rv-02", name: "01 - CONFIGURAÇÃO INICIAL DE MIKROTIK, HUAWEI E CISCO" },
      { id: "rv-03", name: "APOSTILA AULA 2" },
      { id: "rv-04", name: "02 - CONFIGURAÇÃO DE VLANS" },
      { id: "rv-05", name: "APOSTILA AULA 3" },
      { id: "rv-06", name: "03 - ROTEAMENTO ESTÁTICO" },
      { id: "rv-07", name: "APOSTILA AULA 4" },
      { id: "rv-08", name: "04 - ROTEAMENTO DINAMICO COM OSPF" }
    ]
  },
  {
    id: "switches",
    title: "010 - Switches MikroTik",
    block: "Switching",
    priority: 3,
    image: "/course-images/switch-mikrotik.png",
    goal: "Entender switching MikroTik depois de bridge, VLAN e LAN.",
    lessons: [
      { id: "sw-01", name: "AULA DE SWITCHES MIKROTIK" },
      { id: "sw-02", name: "QUIZ - 001 SWITCHES MIKROTIK DO ZERO" }
    ]
  },
  {
    id: "ipv6",
    title: "016 - IPv6 do Zero",
    block: "IPv6",
    priority: 4,
    image: "/course-images/ipv6-do-zero.png",
    goal: "Estudar depois que IPv4 estiver firme.",
    lessons: [
      { id: "ipv6-01", name: "1 - INTRODUÇÃO" },
      { id: "ipv6-02", name: "QUIZ - AULA 01" },
      { id: "ipv6-03", name: "2 - MÁSCARA DE REDE E ENTREGA DE ENDEREÇO IPV6" },
      { id: "ipv6-04", name: "QUIZ - AULA 02" },
      { id: "ipv6-05", name: "3 - TIPOS DE ENDEREÇOS IPV6" },
      { id: "ipv6-06", name: "QUIZ - AULA 03" }
    ]
  },
  {
    id: "lab-avancado",
    title: "040 - Laboratorio Virtual Avancado",
    block: "Avancado",
    priority: 4,
    image: "/course-images/lab-virtual-avancado.png",
    goal: "Fazer depois de base, MikroTik inicial, VLAN e roteamento.",
    lessons: [
      { id: "lva-01", name: "01 - INTRODUÇÃO" },
      { id: "lva-02", name: "02 - IMAGEM PERSONALIZADA DE MIKROTIK" },
      { id: "lva-03", name: "QUIZ - 02 - IMAGEM PERSONALIZADA DE MIKROTIK" },
      { id: "lva-04", name: "03 - IMAGEM PERSONALIZADA DE LINUX" },
      { id: "lva-05", name: "QUIZ - 03 - IMAGEM PERSONALIZADA DE LINUX" },
      { id: "lva-06", name: "04 - LABORATÓRIO AVANÇADO DE BGP" },
      { id: "lva-07", name: "QUIZ - 04 - LABORATÓRIO AVANÇADO DE BGP" },
      { id: "lva-08", name: "SCRIPTS DOS LINKS" }
    ]
  }
];

const weeklyPlan: DayPlan[] = [
  {
    day: "Segunda",
    focus: "Aula principal + revisão curta",
    blocks: ["05:50 - 06:15 Revisão leve", "11:20 - 12:10 Aula principal", "Serviço: exercícios quando houver tempo"]
  },
  {
    day: "Terça",
    focus: "Estudo leve por causa da natação",
    blocks: ["05:50 - 06:15 Revisão", "11:20 - 12:10 Aula curta", "Noite livre de cobrança pesada"]
  },
  {
    day: "Quarta",
    focus: "Aula principal + prática",
    blocks: ["05:50 - 06:15 Revisão", "11:20 - 12:10 Aula principal", "Serviço: IP, máscara, DHCP ou NAT"]
  },
  {
    day: "Quinta",
    focus: "Revisão leve por causa da natação",
    blocks: ["05:50 - 06:15 Revisão", "11:20 - 12:10 Aula curta", "Noite livre de cobrança pesada"]
  },
  {
    day: "Sexta",
    focus: "Fechamento da semana",
    blocks: ["05:50 - 06:15 Revisão semanal", "11:20 - 12:10 Aula ou prática", "Serviço: fechar pendências"]
  },
  {
    day: "Sábado",
    focus: "Bloco forte cedo",
    blocks: ["06:00 - 07:20 Estudo principal", "08:00 - 12:00 Trabalho", "Depois: iFood sem estudo obrigatório"]
  },
  {
    day: "Domingo",
    focus: "Melhor bloco da semana",
    blocks: ["08:00 - 10:30 Estudo com calma", "11:00 - 23:00 iFood", "Meta: revisão e prática"]
  }
];

const fundamentalsGate = [
  "Modelo OSI e TCP/IP",
  "IP, máscara e CIDR",
  "Gateway e DNS",
  "DHCP e NAT",
  "TCP, UDP e ICMP",
  "Bridge, switch, roteador e firewall",
  "Rota e tabela de roteamento"
];

const statusLabel: Record<Status, string> = {
  nao_iniciado: "Não iniciado",
  estudando: "Estudando",
  concluido: "Concluído",
  revisar: "Revisar"
};

const weekdayMap = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function App() {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("cronograma-redes-status");
    if (saved) return JSON.parse(saved) as Record<string, boolean>;

    const initial: Record<string, boolean> = {};
    courses.forEach((course) => {
      course.lessons.forEach((lesson) => {
        initial[lesson.id] = lesson.status === "concluido";
      });
    });
    return initial;
  });
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("todos");

  const allLessons = courses.flatMap((course) => course.lessons.map((lesson) => ({ ...lesson, course: course.title })));
  const completed = allLessons.filter((lesson) => done[lesson.id]).length;
  const progress = Math.round((completed / allLessons.length) * 100);

  const todayName = weekdayMap[new Date().getDay()];
  const todayPlan = weeklyPlan.find((plan) => plan.day === todayName) ?? weeklyPlan[0];
  const nextLessons = allLessons.filter((lesson) => !done[lesson.id]).slice(0, 4);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesPriority = priority === "todos" || course.priority === Number(priority);
      const matchesQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.block.toLowerCase().includes(normalizedQuery) ||
        course.lessons.some((lesson) => lesson.name.toLowerCase().includes(normalizedQuery));
      return matchesPriority && matchesQuery;
    });
  }, [priority, query]);

  function toggleLesson(id: string) {
    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      localStorage.setItem("cronograma-redes-status", JSON.stringify(next));
      return next;
    });
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <span className="eyebrow">Cronograma Nodeia</span>
          <h1>Cronograma de Estudos de Redes</h1>
          <p>Foco nos fundamentos primeiro, depois MikroTik, laboratório, VLAN, roteamento e IPv6.</p>
        </div>
        <div className="domain-box">
          <Network size={18} />
          <span>cronograma.nodeia.tech</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <Metric icon={<GraduationCap />} label="Aulas mapeadas" value={allLessons.length.toString()} helper="Trilha Fundamentos de Redes" />
        <Metric icon={<CheckCircle2 />} label="Progresso geral" value={`${progress}%`} helper={`${completed} de ${allLessons.length} concluídas`} />
        <Metric icon={<Clock3 />} label="Foco de hoje" value={todayPlan.day} helper={todayPlan.focus} />
        <Metric icon={<Route />} label="Prioridade atual" value="Base" helper="OSI/TCP-IP, IP e Netmask" />
      </section>

      <section className="workbench">
        <div className="panel today-panel">
          <div className="section-title">
            <CalendarDays />
            <div>
              <h2>Hoje</h2>
              <p>{todayPlan.focus}</p>
            </div>
          </div>
          <div className="timeline">
            {todayPlan.blocks.map((block) => (
              <div className="timeline-row" key={block}>
                <span />
                <p>{block}</p>
              </div>
            ))}
          </div>
          <h3>Próximas aulas</h3>
          <div className="next-list">
            {nextLessons.map((lesson) => (
              <button className="lesson-button compact" key={lesson.id} onClick={() => toggleLesson(lesson.id)}>
                <Circle size={17} />
                <span>{lesson.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel gate-panel">
          <div className="section-title">
            <ListChecks />
            <div>
              <h2>Regra para avançar</h2>
              <p>Antes de acelerar no MikroTik, explique estes pontos com suas palavras.</p>
            </div>
          </div>
          <div className="gate-grid">
            {fundamentalsGate.map((item) => (
              <div className="gate-item" key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="courses-header">
          <div>
            <h2>Trilha Fundamentos de Redes</h2>
            <p>Ordem prática para não se perder: base, MikroTik inicial, laboratório, roteamento e IPv6.</p>
          </div>
          <div className="filters">
            <label className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aula ou curso" />
            </label>
            <select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filtrar prioridade">
              <option value="todos">Todas</option>
              <option value="1">Prioridade 1</option>
              <option value="2">Prioridade 2</option>
              <option value="3">Prioridade 3</option>
              <option value="4">Prioridade 4</option>
            </select>
          </div>
        </div>

        <div className="course-grid">
          {filteredCourses.map((course) => {
            const courseDone = course.lessons.filter((lesson) => done[lesson.id]).length;
            const courseProgress = Math.round((courseDone / course.lessons.length) * 100);
            return (
              <article className="course-card" key={course.id}>
                <img src={course.image} alt="" />
                <div className="course-body">
                  <div className="course-meta">
                    <span>{course.block}</span>
                    <strong>Prioridade {course.priority}</strong>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.goal}</p>
                  <div className="progress-row">
                    <div className="progress-track">
                      <span style={{ width: `${courseProgress}%` }} />
                    </div>
                    <b>{courseProgress}%</b>
                  </div>
                  <div className="lesson-list">
                    {course.lessons.map((lesson) => {
                      const checked = done[lesson.id];
                      const originalStatus = lesson.status ?? "nao_iniciado";
                      return (
                        <button className="lesson-button" key={lesson.id} onClick={() => toggleLesson(lesson.id)}>
                          {checked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                          <span>{lesson.name}</span>
                          <em>{checked ? "Concluído" : statusLabel[originalStatus]}</em>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{helper}</p>
    </div>
  );
}

export default App;
