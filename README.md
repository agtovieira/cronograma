# Cronograma de Estudos de Redes

Controle pessoal para organizar os estudos de redes, com foco inicial em fundamentos e evolucao para MikroTik.

## Objetivo

Sair da dificuldade no basico de redes e construir uma trilha de estudo progressiva:

1. Fundamentos de redes
2. LAN, MAN e WAN
3. Roteamento
4. MikroTik aplicado
5. Provedores, seguranca, monitoramento e virtualizacao

## Arquivos

- `src/`: aplicacao web do cronograma.
- `public/course-images/`: logos dos cursos usadas na interface.
- `public/MTCNA.pdf`: material de referencia para a certificacao MTCNA.
- `cronograma-estudos.md`: plano semanal e ordem recomendada de estudo.
- `trilha-fundamentos-redes.md`: checklist completo da trilha Fundamentos de Redes.
- `inventario-cursos.csv`: lista para organizar os 88 cursos/aulas encontrados na plataforma.
- `fotos/`: capturas da plataforma Redes Brasil usadas como referencia inicial.

## Como Rodar Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na EasyPanel

Aplicacao pronta para deploy como app Node/Vite ou via Dockerfile.

- Dominio planejado: `cronograma.nodeia.tech`
- IP informado da EasyPanel: `179.198.104.168`
- Build command: `npm run build`
- Output: `dist`
- Porta do container Docker: `80`

## Trilhas identificadas nas capturas

- Consultor de Redes MikroTik
- Fundamentos em Redes
- Mikrotik na Pratica (Operadores e Provedores)
- Seguranca e Monitoramento
- Provedores e ISPs
- Infraestrutura e Virtualizacao
- Carreira de Roteamento (Comunidade)

## Imagens de Referencia

- `fotos/1.png`: tela de trilhas com Consultor de Redes MikroTik, Fundamentos em Redes e Mikrotik na Pratica.
- `fotos/2.png`: tela de trilhas com Seguranca e Monitoramento, Provedores e ISPs e Infraestrutura e Virtualizacao.
- `fotos/3.png`: trilha Carreira de Roteamento.
- `fotos/4.png`: curso 036 - Como Estudar Redes do Zero.
- `fotos/5.png`: curso 038 - Laboratorio Virtual do Zero.
- `fotos/6.png`: curso 040 - Laboratorio Virtual Avancado.

## Regra principal

Antes de aprofundar em MikroTik, priorizar dominio de IP, mascara, gateway, DNS, DHCP, NAT, TCP, UDP, ICMP, switch, roteador, firewall e roteamento basico.

## Meta de Certificacao

Foco de medio prazo: MTCNA - MikroTik Certified Network Associate.

Dados oficiais da MikroTik:

- Certificacao basica da trilha MikroTik.
- Pre-requisito para certificacoes avancadas.
- Prova com 25 questoes.
- Tempo de prova: 60 minutos.
- Aprovacao: 60%.
- Validade: 3 anos.
