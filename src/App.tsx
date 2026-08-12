import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  FileText,
  Filter,
  GraduationCap,
  ListChecks,
  LockKeyhole,
  Network,
  PencilLine,
  Search,
  Shield,
  Target,
  Trophy
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

type LessonWithCourse = Lesson & {
  course: string;
  block: string;
};

type Certification = {
  id: string;
  name: string;
  vendor: string;
  level: string;
  summary: string;
  materials: Array<{
    href: string;
    label: string;
    kind: string;
  }>;
  facts: string[];
  focus: string[];
};

type StudyEntry = {
  percent: number;
  note?: string;
  completedLessons?: number;
};

const courses: Course[] = [
  {
    id: "036",
    title: "Como Estudar Redes do Zero",
    block: "Base obrigatória",
    priority: 1,
    image: "/course-images/como-estudar-redes-do-zero.png",
    goal: "Fechar método de estudo, OSI/TCP-IP, IP e Netmask.",
    lessons: [
      { id: "036-01", name: "01 - CONVERSA INICIAL", status: "concluido" },
      { id: "036-02", name: "02 - POR ONDE COMEÇAR", status: "concluido" },
      { id: "036-03", name: "03 - COMO FAZER UM CRONOGRAMA DE ESTUDOS", status: "concluido" },
      { id: "036-04", name: "CRONOGRAMA DE ESTUDOS", status: "concluido" },
      { id: "036-05", name: "04 - TÉCNICAS DE ESTUDO", status: "concluido" },
      { id: "036-06", name: "05 - REVISÃO OSI TCP/IP", status: "concluido" },
      { id: "036-07", name: "06 - REVISÃO DE IP E NETMASK", status: "concluido" },
      { id: "036-08", name: "Pesquisa Como Estudar Redes do Zero", status: "concluido" }
    ]
  },
  {
    id: "redes-gratis-2",
    title: "Curso de Redes Grátis 2.0",
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
    title: "Curso de MikroTik Grátis",
    block: "Laboratórios básicos",
    priority: 2,
    image: "/course-images/036-como-estudar-redes-do-zero.png",
    goal: "Reforçar primeiro acesso, reset, topologia e laboratórios.",
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
    block: "MikroTik prático",
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
    title: "038 - Laboratório Virtual do Zero",
    block: "Infraestrutura",
    priority: 3,
    image: "/course-images/lab-virtual-do-zero.png",
    goal: "Criar ambiente de laboratório para praticar com segurança.",
    lessons: [
      { id: "lvz-01", name: "DOWNLOAD DO VMWARE PLAYER" },
      { id: "lvz-02", name: "01 - CONVERSA INICIAL" },
      { id: "lvz-03", name: "02 - FORMAS DE UTILIZAR UM LAB" },
      { id: "lvz-04", name: "03 - EXEMPLOS DE SOFTWARE PARA LAB" },
      { id: "lvz-05", name: "04 - INSTALANDO O EVE-NG EM UMA VM" },
      { id: "lvz-06", name: "05 - ADICIONANDO IMAGENS NO EVE-NG" },
      { id: "lvz-07", name: "06 - INSTALANDO VM DO PNETLAB" },
      { id: "lvz-08", name: "07 - LABORATÓRIOS AVANÇADOS" }
    ]
  },
  {
    id: "roteamento-vlans",
    title: "Curso Roteamento e VLANs",
    block: "Roteamento",
    priority: 3,
    image: "/course-images/roteamentos-e-vlans.png",
    goal: "Entrar em VLAN, roteamento estático e OSPF depois da base.",
    lessons: [
      { id: "rv-01", name: "APOSTILA AULA 1" },
      { id: "rv-02", name: "01 - CONFIGURAÇÃO INICIAL DE MIKROTIK, HUAWEI E CISCO" },
      { id: "rv-03", name: "APOSTILA AULA 2" },
      { id: "rv-04", name: "02 - CONFIGURAÇÃO DE VLANS" },
      { id: "rv-05", name: "APOSTILA AULA 3" },
      { id: "rv-06", name: "03 - ROTEAMENTO ESTÁTICO" },
      { id: "rv-07", name: "APOSTILA AULA 4" },
      { id: "rv-08", name: "04 - ROTEAMENTO DINÂMICO COM OSPF" }
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
    title: "040 - Laboratório Virtual Avançado",
    block: "Avançado",
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
const calendarWeekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const feynmanPrompts = [
  "Explique o tema como se estivesse ensinando alguém que nunca viu redes.",
  "Quais foram os pontos em que você travou ou percebeu que ainda não sabe explicar?",
  "Qual exemplo prático, comando ou cenário real prova que você entendeu esse conteúdo?",
  "Qual pergunta você faria para testar se outra pessoa também entendeu?"
];

const firstCourseLessonSplit = {
  "2026-08-11": ["036-01", "036-02", "036-03", "036-04"],
  "2026-08-12": ["036-05", "036-06", "036-07", "036-08"]
};

const certifications: Certification[] = [
  {
    id: "mtcna",
    name: "MTCNA",
    vendor: "MikroTik",
    level: "Base de redes e RouterOS",
    summary: "Certificação inicial para validar fundamentos de rede, configuração básica no RouterOS, serviços IP, firewall, wireless e troubleshooting.",
    materials: [
      {
        href: "/MTCNA.pdf",
        label: "Material MTCNA",
        kind: "PDF"
      }
    ],
    facts: ["25 questões", "60 minutos", "60% aprovação", "Validade de 3 anos"],
    focus: ["TCP/IP", "Bridge e switching", "Roteamento básico", "Firewall e NAT", "DHCP e DNS", "RouterOS"]
  },
  {
    id: "hcia-datacom",
    name: "HCIA-Datacom V2.0",
    vendor: "Huawei",
    level: "Especialização Datacom",
    summary: "Material de treinamento para evoluir em redes corporativas Huawei, arquitetura Datacom, roteamento, switching, serviços e operação.",
    materials: [
      {
        href: "/HCIA-Datacom-V2.0-Training-Material.pdf",
        label: "Training Material",
        kind: "PDF"
      },
      {
        href: "/HCIA-Datacom-V2.0-Lab-Guide-eNSP-Pro.pdf",
        label: "Lab Guide eNSP Pro",
        kind: "Laboratório"
      }
    ],
    facts: ["Huawei", "Datacom V2.0", "Material oficial", "Especialização"],
    focus: ["Fundamentos IP", "Ethernet", "VLAN", "Roteamento", "Segurança", "Operação de rede"]
  }
];

function getInitialDone() {
  const initial: Record<string, boolean> = {};
  courses.forEach((course) => {
    course.lessons.forEach((lesson) => {
      initial[lesson.id] = lesson.status === "concluido";
    });
  });

  try {
    const saved = localStorage.getItem("cronograma-redes-status");
    return saved ? ({ ...initial, ...JSON.parse(saved) } as Record<string, boolean>) : initial;
  } catch {
    return initial;
  }
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getMonthCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date,
      key: getDateKey(date),
      inMonth: date.getMonth() === month
    };
  });
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function getCompletedLessonsForDate(completionDates: Record<string, string>, dateKey: string) {
  return Object.values(completionDates).filter((completionDate) => completionDate === dateKey).length;
}

function getPercentFromLessonCount(completedCount: number, totalLessons: number) {
  if (totalLessons === 0 || completedCount === 0) return 0;
  return Math.min(100, Math.round((completedCount / totalLessons) * 100));
}

function getStudyPercentForDate(
  entries: Record<string, StudyEntry>,
  completionDates: Record<string, string>,
  dateKey: string,
  totalLessons: number
) {
  const automaticPercent = getPercentFromLessonCount(getCompletedLessonsForDate(completionDates, dateKey), totalLessons);
  return entries[dateKey]?.percent ?? automaticPercent;
}

function getAutomaticMonthStats(entries: Record<string, StudyEntry>, completionDates: Record<string, string>, monthDate: Date, totalLessons: number) {
  const monthKey = getMonthKey(monthDate);
  const monthDates = new Set<string>();

  Object.keys(entries)
    .filter((key) => key.startsWith(monthKey))
    .forEach((key) => monthDates.add(key));

  Object.values(completionDates)
    .filter((dateKey) => dateKey.startsWith(monthKey))
    .forEach((dateKey) => monthDates.add(dateKey));

  const percentages = Array.from(monthDates).map((dateKey) => getStudyPercentForDate(entries, completionDates, dateKey, totalLessons));
  const totalPercent = percentages.reduce((total, percent) => total + percent, 0);
  const studiedDays = percentages.filter((percent) => percent > 0).length;
  const averagePercent = studiedDays > 0 ? Math.round(totalPercent / studiedDays) : 0;
  const completedLessons = Object.values(completionDates).filter((dateKey) => dateKey.startsWith(monthKey)).length;

  const today = new Date();
  const visibleMonth = monthDate.getMonth();
  const visibleYear = monthDate.getFullYear();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  const isCurrentMonth = visibleMonth === currentMonth && visibleYear === currentYear;
  const isFutureMonth = visibleYear > currentYear || (visibleYear === currentYear && visibleMonth > currentMonth);
  const daysConsidered = isFutureMonth ? 0 : isCurrentMonth ? today.getDate() : daysInMonth;
  const noStudyDays = Math.max(0, daysConsidered - studiedDays);

  return {
    totalPercent,
    studiedDays,
    noStudyDays,
    averagePercent,
    completedLessons
  };
}

function clampPercent(value: string) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(100, Math.max(0, parsed));
}

function shouldKeepStudyEntry(entry: StudyEntry | undefined) {
  if (!entry) return false;
  return entry.percent > 0 || Boolean(entry.note?.trim()) || Boolean(entry.completedLessons && entry.completedLessons > 0);
}

function cleanupStudyEntries(entries: Record<string, StudyEntry>) {
  return Object.fromEntries(Object.entries(entries).filter(([, entry]) => shouldKeepStudyEntry(entry)));
}

function App() {
  const [done, setDone] = useState<Record<string, boolean>>(getInitialDone);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("todos");
  const [activeCertification, setActiveCertification] = useState(certifications[0].id);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => getDateKey(new Date()));
  const [studyEntries, setStudyEntries] = useState<Record<string, StudyEntry>>(() => {
    try {
      const saved = localStorage.getItem("cronograma-redes-calendar");
      return saved ? (JSON.parse(saved) as Record<string, StudyEntry>) : {};
    } catch {
      return {};
    }
  });
  const [lessonCompletionDates, setLessonCompletionDates] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("cronograma-redes-completion-dates");
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });
  const [feynmanNotes, setFeynmanNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("cronograma-redes-feynman");
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const migrationKey = "cronograma-redes-migration-first-course-split-v1";
    if (localStorage.getItem(migrationKey)) return;

    const firstCourseLessonIds = Object.values(firstCourseLessonSplit).flat();

    setDone((current) => {
      const next = { ...current };
      firstCourseLessonIds.forEach((lessonId) => {
        next[lessonId] = true;
      });
      localStorage.setItem("cronograma-redes-status", JSON.stringify(next));
      return next;
    });

    setLessonCompletionDates((current) => {
      const next = { ...current };
      Object.entries(firstCourseLessonSplit).forEach(([dateKey, lessonIds]) => {
        lessonIds.forEach((lessonId) => {
          next[lessonId] = dateKey;
        });
      });
      localStorage.setItem("cronograma-redes-completion-dates", JSON.stringify(next));
      return next;
    });

    setStudyEntries((current) => {
      const next = cleanupStudyEntries(current);
      next["2026-08-11"] = {
        ...(next["2026-08-11"] ?? {}),
        percent: 5,
        completedLessons: 4
      };
      next["2026-08-12"] = {
        ...(next["2026-08-12"] ?? {}),
        percent: 5,
        completedLessons: 4
      };
      localStorage.setItem("cronograma-redes-calendar", JSON.stringify(next));
      return next;
    });

    localStorage.setItem(migrationKey, "done");
  }, []);

  const allLessons: LessonWithCourse[] = courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      ...lesson,
      course: course.title,
      block: course.block
    }))
  );

  const completed = allLessons.filter((lesson) => done[lesson.id]).length;
  const progress = Math.round((completed / allLessons.length) * 100);
  const todayName = weekdayMap[new Date().getDay()];
  const todayPlan = weeklyPlan.find((plan) => plan.day === todayName) ?? weeklyPlan[0];
  const nextLessons = allLessons.filter((lesson) => !done[lesson.id]).slice(0, 5);
  const selectedCertification = certifications.find((certification) => certification.id === activeCertification) ?? certifications[0];
  const calendarDays = useMemo(() => getMonthCalendarDays(visibleMonth), [visibleMonth]);
  const monthStats = useMemo(
    () => getAutomaticMonthStats(studyEntries, lessonCompletionDates, visibleMonth, allLessons.length),
    [allLessons.length, lessonCompletionDates, studyEntries, visibleMonth]
  );
  const todayKey = getDateKey(new Date());
  const todayCompletedLessons = getCompletedLessonsForDate(lessonCompletionDates, todayKey);
  const todayPercent = getStudyPercentForDate(studyEntries, lessonCompletionDates, todayKey, allLessons.length);
  const selectedCompletedLessons = getCompletedLessonsForDate(lessonCompletionDates, selectedDate);
  const selectedAutomaticPercent = getPercentFromLessonCount(selectedCompletedLessons, allLessons.length);
  const selectedEntry = studyEntries[selectedDate] ?? { percent: selectedAutomaticPercent, note: "", completedLessons: selectedCompletedLessons };

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
    const today = getDateKey(new Date());
    const nextIsDone = !done[id];

    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      localStorage.setItem("cronograma-redes-status", JSON.stringify(next));
      return next;
    });

    setLessonCompletionDates((current) => {
      const next = { ...current };
      const previousDate = current[id];
      const affectedDates = new Set<string>([today]);
      if (previousDate) affectedDates.add(previousDate);

      if (nextIsDone) {
        next[id] = today;
      } else {
        delete next[id];
      }

      localStorage.setItem("cronograma-redes-completion-dates", JSON.stringify(next));

      setStudyEntries((entries) => {
        const nextEntries = { ...entries };
        affectedDates.forEach((dateKey) => {
          const completedInDate = getCompletedLessonsForDate(next, dateKey);
          const updatedEntry = {
            ...(entries[dateKey] ?? {}),
            percent: getPercentFromLessonCount(completedInDate, allLessons.length),
            completedLessons: completedInDate
          };
          if (shouldKeepStudyEntry(updatedEntry)) {
            nextEntries[dateKey] = updatedEntry;
          } else {
            delete nextEntries[dateKey];
          }
        });
        localStorage.setItem("cronograma-redes-calendar", JSON.stringify(nextEntries));
        return nextEntries;
      });

      return next;
    });
  }

  function updateFeynmanNote(courseId: string, value: string) {
    setFeynmanNotes((current) => {
      const next = { ...current, [courseId]: value };
      localStorage.setItem("cronograma-redes-feynman", JSON.stringify(next));
      return next;
    });
  }

  function changeMonth(direction: -1 | 1) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  function updateStudyEntry(dateKey: string, entry: StudyEntry) {
    setStudyEntries((current) => {
      const next = { ...current };
      if (shouldKeepStudyEntry(entry)) {
        next[dateKey] = entry;
      } else {
        delete next[dateKey];
      }
      localStorage.setItem("cronograma-redes-calendar", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="workspace">
      <aside className="sidebar">
        <div className="brand">
          <span>CR</span>
          <div>
            <strong>Cronograma</strong>
            <small>Redes & Certificações</small>
          </div>
        </div>

        <nav className="nav-list" aria-label="Navegação principal">
          <a href="#visao-geral">
            <BarChart3 size={18} />
            Visão geral
          </a>
          <a href="#hoje">
            <CalendarDays size={18} />
            Hoje
          </a>
          <a href="#calendario">
            <BarChart3 size={18} />
            Calendário
          </a>
          <a href="#cursos">
            <BookOpen size={18} />
            Cursos
          </a>
          <a href="#certificacoes">
            <Trophy size={18} />
            Certificações
          </a>
        </nav>

        <div className="sidebar-note">
          <LockKeyhole size={18} />
          <span>Acesso protegido por Basic Auth na EasyPanel.</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow">Cronograma Nodeia</span>
            <h1>Plano de estudos em redes</h1>
            <p>Fundamentos primeiro, MikroTik em seguida, laboratório e certificações como meta de evolução técnica.</p>
          </div>

          <div className="header-actions">
            <a className="quiet-link" href="#certificacoes">
              <FileText size={18} />
              Certificações
            </a>
            <span className="domain-box">
              <Network size={18} />
              cronograma.nodeia.tech
            </span>
          </div>
        </header>

        <section className="overview-grid" id="visao-geral">
          <Metric icon={<GraduationCap />} label="Aulas mapeadas" value={allLessons.length.toString()} helper={`${courses.length} cursos na trilha`} />
          <Metric icon={<CheckCircle2 />} label="Progresso geral" value={`${progress}%`} helper={`${completed} de ${allLessons.length} concluídas`} />
          <Metric icon={<Clock3 />} label="Foco de hoje" value={todayPlan.day} helper={todayPlan.focus} />
          <Metric
            icon={<Target />}
            label="Hoje registrado"
            value={todayPercent > 0 ? `${todayPercent}%` : "Sem registro"}
            helper={`${todayCompletedLessons} de ${allLessons.length} aulas marcadas hoje`}
          />
        </section>

        <section className="operations-grid">
          <article className="panel today-panel" id="hoje">
            <PanelTitle icon={<CalendarDays />} title="Agenda de hoje" description={todayPlan.focus} />
            <div className="timeline">
              {todayPlan.blocks.map((block) => (
                <div className="timeline-row" key={block}>
                  <span />
                  <p>{block}</p>
                </div>
              ))}
            </div>

            <div className="subhead">
              <h3>Próximas aulas</h3>
              <small>{nextLessons.length} pendências imediatas</small>
            </div>
            <div className="next-list">
              {nextLessons.map((lesson) => (
                <button className="lesson-button compact" key={lesson.id} onClick={() => toggleLesson(lesson.id)}>
                  <Circle size={17} />
                  <span>
                    {lesson.name}
                    <small>{lesson.course}</small>
                  </span>
                </button>
              ))}
            </div>
          </article>

          <article className="panel gate-panel">
            <PanelTitle icon={<ListChecks />} title="Regra para avançar" description="Antes de acelerar no MikroTik, explique estes pontos com suas palavras." />
            <div className="gate-grid">
              {fundamentalsGate.map((item) => (
                <div className="gate-item" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

        </section>

        <section className="study-calendar-section" id="calendario">
          <div className="section-toolbar">
            <div>
              <span className="eyebrow">Métricas diárias</span>
              <h2>Calendário de evolução</h2>
              <p>Registre a porcentagem feita em cada dia para acompanhar consistência, dias zerados e média de estudo.</p>
            </div>

            <div className="month-controls" aria-label="Controle de mês">
              <button onClick={() => changeMonth(-1)} type="button">
                <ChevronLeft size={18} />
              </button>
              <strong>{getMonthLabel(visibleMonth)}</strong>
              <button onClick={() => changeMonth(1)} type="button">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="calendar-metrics">
            <div>
              <span>Total lançado</span>
              <strong>{monthStats.totalPercent}%</strong>
            </div>
            <div>
              <span>Dias estudados</span>
              <strong>{monthStats.studiedDays}</strong>
            </div>
            <div>
              <span>Aulas do mês</span>
              <strong>{monthStats.completedLessons}</strong>
            </div>
            <div>
              <span>Dias zerados</span>
              <strong>{monthStats.noStudyDays}</strong>
            </div>
            <div>
              <span>Média estudada</span>
              <strong>{monthStats.averagePercent}%</strong>
            </div>
          </div>

          <div className="calendar-workspace">
            <div className="calendar-card">
              <div className="calendar-weekdays">
                {calendarWeekdays.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>
              <div className="calendar-grid">
                {calendarDays.map((day) => {
                  const entry = studyEntries[day.key];
                  const completedInDay = getCompletedLessonsForDate(lessonCompletionDates, day.key);
                  const percent = entry?.percent ?? getPercentFromLessonCount(completedInDay, allLessons.length);
                  const hasStudy = percent > 0;
                  const isSelected = day.key === selectedDate;
                  const isToday = day.key === getDateKey(new Date());
                  return (
                    <button
                      className={`${day.inMonth ? "" : "muted"} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                      key={day.key}
                      onClick={() => setSelectedDate(day.key)}
                      type="button"
                    >
                      <span>{day.date.getDate()}</span>
                      <strong>{hasStudy ? `${percent}%` : ""}</strong>
                      {hasStudy ? <i style={{ width: `${percent}%` }} /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="daily-entry">
              <PanelTitle
                icon={<CalendarDays />}
                title="Registro do dia"
                description={`${new Date(`${selectedDate}T12:00:00`).toLocaleDateString("pt-BR")} • ${selectedCompletedLessons} de ${allLessons.length} aulas`}
              />

              <div className="auto-percent">
                <span>Automático pelo checklist</span>
                <strong>{selectedAutomaticPercent}%</strong>
                <p>{selectedCompletedLessons} aula(s) concluída(s) neste dia.</p>
              </div>

              <label className="percent-field">
                <span>Porcentagem do dia</span>
                <input
                  max={100}
                  min={0}
                  onChange={(event) =>
                    updateStudyEntry(selectedDate, {
                      ...selectedEntry,
                      percent: clampPercent(event.target.value),
                      completedLessons: selectedCompletedLessons
                    })
                  }
                  type="number"
                  value={selectedEntry.percent}
                />
              </label>

              <div className="quick-percent">
                {[0, 1, 5, 10, 25, 50].map((percent) => (
                  <button
                    className={selectedEntry.percent === percent ? "active" : ""}
                    key={percent}
                    onClick={() => updateStudyEntry(selectedDate, { ...selectedEntry, percent, completedLessons: selectedCompletedLessons })}
                    type="button"
                  >
                    {percent}%
                  </button>
                ))}
              </div>

              <label className="note-field">
                <span>Observação</span>
                <textarea
                  onChange={(event) =>
                    updateStudyEntry(selectedDate, {
                      ...selectedEntry,
                      note: event.target.value,
                      completedLessons: selectedCompletedLessons
                    })
                  }
                  placeholder="Ex: revisei OSI, fiz laboratório de DHCP, não estudei por causa do iFood..."
                  value={selectedEntry.note ?? ""}
                />
              </label>
            </aside>
          </div>
        </section>

        <section className="certifications-section" id="certificacoes">
          <div className="section-toolbar">
            <div>
              <span className="eyebrow">Materiais e metas</span>
              <h2>Certificações</h2>
              <p>Área para acompanhar as certificações que vão guiar a trilha: primeiro MTCNA, depois especialização Huawei HCIA-Datacom.</p>
            </div>
          </div>

          <div className="cert-tabs" role="tablist" aria-label="Certificações">
            {certifications.map((certification) => (
              <button
                className={certification.id === activeCertification ? "active" : ""}
                key={certification.id}
                onClick={() => setActiveCertification(certification.id)}
                role="tab"
                type="button"
              >
                <Trophy size={17} />
                <span>{certification.name}</span>
              </button>
            ))}
          </div>

          <article className="cert-detail">
            <div className="cert-summary">
              <div className="cert-kicker">
                <span>{selectedCertification.vendor}</span>
                <strong>{selectedCertification.level}</strong>
              </div>
              <h3>{selectedCertification.name}</h3>
              <p>{selectedCertification.summary}</p>

              <div className="cert-facts">
                {selectedCertification.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>

              <div className="material-list">
                {selectedCertification.materials.map((material) => (
                  <a className="material-link" href={material.href} key={material.href} target="_blank" rel="noreferrer">
                    <FileText size={18} />
                    <span>
                      {material.label}
                      <small>{material.kind}</small>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="cert-focus">
              <PanelTitle icon={<Shield />} title="Pontos de estudo" description="Assuntos que devem orientar revisão, laboratório e simulados." />
              <div className="focus-grid">
                {selectedCertification.focus.map((item) => (
                  <div className="focus-item" key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="courses-section" id="cursos">
          <div className="section-toolbar">
            <div>
              <span className="eyebrow">Trilha completa</span>
              <h2>Fundamentos de Redes</h2>
              <p>Ordem prática para estudar sem pular a base: teoria, MikroTik inicial, laboratório, roteamento e IPv6.</p>
            </div>

            <div className="filters">
              <label className="search-box">
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aula ou curso" />
              </label>
              <label className="select-box">
                <Filter size={17} />
                <select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filtrar prioridade">
                  <option value="todos">Todas</option>
                  <option value="1">Prioridade 1</option>
                  <option value="2">Prioridade 2</option>
                  <option value="3">Prioridade 3</option>
                  <option value="4">Prioridade 4</option>
                </select>
              </label>
            </div>
          </div>

          <div className="course-list">
            {filteredCourses.map((course) => {
              const courseDone = course.lessons.filter((lesson) => done[lesson.id]).length;
              const courseProgress = Math.round((courseDone / course.lessons.length) * 100);
              return (
                <article className="course-card" key={course.id}>
                  <div className="course-image">
                    <img src={course.image} alt="" />
                  </div>

                  <div className="course-content">
                    <div className="course-topline">
                      <span className={`priority-badge p${course.priority}`}>P{course.priority}</span>
                      <span>{course.block}</span>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.goal}</p>

                    <div className="course-progress">
                      <div className="progress-track">
                        <span style={{ width: `${courseProgress}%` }} />
                      </div>
                      <strong>{courseProgress}%</strong>
                      <small>{courseDone}/{course.lessons.length} aulas</small>
                    </div>
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

                  <div className="feynman-box">
                    <div className="feynman-header">
                      <span>
                        <PencilLine size={17} />
                        Método Feynman
                      </span>
                      <small>{courseProgress === 100 ? "Avaliação final" : "Use ao concluir o curso"}</small>
                    </div>
                    <div className="feynman-prompts">
                      {feynmanPrompts.map((prompt) => (
                        <p key={prompt}>{prompt}</p>
                      ))}
                    </div>
                    <textarea
                      aria-label={`Resposta Feynman para ${course.title}`}
                      onChange={(event) => updateFeynmanNote(course.id, event.target.value)}
                      placeholder="Escreva sua explicação com suas palavras. Se ficar difícil explicar, marque o curso para revisar."
                      value={feynmanNotes[course.id] ?? ""}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{helper}</p>
      </div>
    </article>
  );
}

function PanelTitle({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="panel-title">
      <div className="panel-icon">{icon}</div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <ChevronRight className="panel-chevron" size={18} />
    </div>
  );
}

export default App;
