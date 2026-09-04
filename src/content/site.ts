/**
 * Fonte única de conteúdo do site.
 *
 * Tudo que o cliente ainda não confirmou vive em `PENDENTE` e aparece na tela
 * com sublinhado tracejado. Nada aqui é preenchido com conteúdo fictício:
 * o projeto no Claude Design se chama "Aguardando dados da empresa" por isso.
 */

export const EMPRESA = {
  nome: 'Top Soluções e Serviços',
  nomeCompleto: 'Top Soluções e Serviços',
  sigla: 'TS',
  tagline: 'Poda & Jardinagem',
  descricao:
    'Poda de árvores, jardinagem e manutenção de áreas verdes para residências, condomínios e empresas.',
} as const

export const CONTATO = {
  telefoneE164: '+5519997018466',
  telefoneDigitos: '5519997018466',
  telefoneExibicao: '19 99701-8466',
  telefoneExibicaoLonga: '+55 19 99701-8466',
} as const

/** Dados que o cliente ainda precisa enviar. */
export const PENDENTE = {
  cidade: '[CIDADE]',
  cidadeRegiao: '[CIDADE/REGIÃO]',
  cidadeEstado: '[CIDADE / ESTADO]',
  areaAtendimento: '[ÁREA DE ATENDIMENTO]',
  areaAtendimentoCompleta: '[CIDADE / ESTADO / REGIÃO ATENDIDA]',
  email: '[E-MAIL]',
  horario: '[HORÁRIO]',
  horarioCompleto: '[HORÁRIO DE ATENDIMENTO]',
} as const

export const DIFERENCIAIS_HERO = [
  'Equipe especializada',
  'Equipamento próprio',
  'Orçamento sem compromisso',
] as const

export const FAIXA_GARANTIAS = [
  {
    titulo: 'Trabalho seguro',
    texto: 'Técnicas de corte e amarração adequadas ao porte da árvore.',
  },
  {
    titulo: 'Equipe própria',
    texto: 'Profissionais treinados e equipamento para cada tipo de serviço.',
  },
  {
    titulo: 'Área limpa',
    texto: 'Recolhimento dos resíduos e local entregue organizado.',
  },
  {
    titulo: 'Resposta rápida',
    texto: 'Envie fotos pelo WhatsApp e receba uma avaliação inicial.',
  },
] as const

export const SERVICOS = [
  {
    titulo: 'Poda de pequeno porte',
    texto:
      'Arbustos, frutíferas e árvores baixas. Limpeza de galhos secos, condução da copa e acabamento no jardim.',
  },
  {
    titulo: 'Poda de médio porte',
    texto:
      'Árvores em calçadas, quintais e estacionamentos. Redução de peso da copa e afastamento de telhados e fiação.',
  },
  {
    titulo: 'Poda de grande porte',
    texto:
      'Serviço de risco, executado com escalada, cordas e desmonte por partes, com isolamento da área.',
  },
  {
    titulo: 'Remoção de árvores',
    texto:
      'Supressão de árvores comprometidas, secas ou em local inadequado, com destinação dos resíduos.',
  },
  {
    titulo: 'Coqueiros e palmeiras',
    texto:
      'Retirada de folhas secas, cachos e coco, com acesso por escalada. Evita queda de material e acidentes.',
  },
  {
    titulo: 'Jardinagem e manutenção',
    texto:
      'Visitas periódicas para poda de grama, canteiros, cercas vivas e revitalização de áreas verdes.',
  },
  {
    titulo: 'Implantação e paisagismo',
    texto:
      'Preparo do solo, plantio de grama e mudas, definição de canteiros e organização do espaço.',
  },
  {
    titulo: 'Limpeza de terreno',
    texto:
      'Corte de mato alto, retirada de entulho vegetal e preparo de lotes para obra ou venda.',
  },
] as const

export const METODO = [
  {
    titulo: 'Avaliação antes do corte',
    texto: 'Cada árvore recebe um plano de poda de acordo com espécie e porte.',
  },
  {
    titulo: 'Segurança no local',
    texto: 'Isolamento da área, uso de EPI e controle da queda dos galhos.',
  },
  {
    titulo: 'Entrega limpa',
    texto: 'Resíduos recolhidos e o espaço liberado para uso no mesmo dia.',
  },
] as const

export const COMO_FUNCIONA = [
  {
    titulo: 'Você entra em contato',
    texto:
      'Chame no WhatsApp e envie fotos da árvore ou da área. Isso já adianta a avaliação.',
  },
  {
    titulo: 'Avaliação técnica',
    texto:
      'Analisamos porte, acesso e risco. Quando necessário, visitamos o local antes de fechar o valor.',
  },
  {
    titulo: 'Orçamento e agendamento',
    texto: 'Você recebe o escopo, o valor e a data. Sem cobrança por avaliação.',
  },
  {
    titulo: 'Execução e limpeza',
    texto:
      'Serviço executado com a área isolada e os resíduos retirados no encerramento.',
  },
] as const

export const FAQ_HOME = [
  {
    pergunta: 'Como funciona o orçamento?',
    resposta:
      'Você manda fotos e a localização pelo WhatsApp. Fazemos uma avaliação inicial e, quando o serviço exige, agendamos uma visita para medir risco e acesso antes de passar o valor.',
  },
  {
    pergunta: 'Vocês fazem poda de árvores de grande porte?',
    resposta:
      'Sim. Árvores de grande porte são desmontadas por partes, com escalada e uso de cordas, e a área fica isolada durante o serviço.',
  },
  {
    pergunta: 'Fazem poda de coqueiros e palmeiras?',
    resposta:
      'Fazemos. Retiramos folhas secas, cachos e coco, reduzindo o risco de queda de material sobre pessoas, carros e telhados.',
  },
  {
    pergunta: 'Atendem residências e empresas?',
    resposta:
      'Atendemos casas, condomínios, comércios, empresas e áreas comuns. O escopo e a logística mudam conforme o tamanho do local.',
  },
  {
    pergunta: 'Quanto tempo leva o serviço?',
    resposta:
      'Depende do porte e do acesso. Podas menores costumam ser resolvidas no mesmo dia; remoções grandes e implantação de jardim são programadas com prazo informado no orçamento.',
  },
] as const

export const FAQ_SERVICOS = [
  {
    pergunta: 'Preciso de autorização para podar ou remover uma árvore?',
    resposta:
      'Em muitos municípios sim, principalmente em via pública ou com espécies protegidas. Orientamos sobre o procedimento na sua cidade antes de executar.',
  },
  {
    pergunta: 'Vocês retiram os galhos e os resíduos?',
    resposta:
      'Sim. A retirada do material entra no orçamento; o volume gerado influencia o valor final.',
  },
  {
    pergunta: 'Existe contrato de manutenção mensal?',
    resposta:
      'Sim, para jardins e áreas comuns que precisam de visitas regulares. A frequência é definida conforme o tamanho da área.',
  },
] as const

export const PORTES = [
  {
    slug: 'pequeno',
    etiqueta: 'Pequeno porte',
    titulo: 'Poda de pequeno porte',
    resumo: 'Arbustos, frutíferas, cercas vivas e árvores baixas do jardim.',
    blocos: [
      {
        rotulo: 'Quando é indicado',
        texto:
          'Galhos secos, copa fechada demais, formato irregular ou plantas invadindo muros e passagens.',
      },
      {
        rotulo: 'Benefícios',
        texto:
          'Crescimento saudável, jardim organizado e menos acúmulo de folhagem morta.',
      },
    ],
  },
  {
    slug: 'medio',
    etiqueta: 'Médio porte',
    titulo: 'Poda de médio porte',
    resumo: 'Árvores de quintal, calçada, pátio e estacionamento.',
    blocos: [
      {
        rotulo: 'Quando é indicado',
        texto:
          'Galhos sobre telhado, encostando em fiação, copa pesada ou desequilibrada.',
      },
      {
        rotulo: 'Benefícios',
        texto:
          'Menos risco de queda de galho, mais luz no imóvel e calhas mais limpas.',
      },
    ],
  },
  {
    slug: 'grande',
    etiqueta: 'Grande porte',
    titulo: 'Poda de grande porte',
    resumo: 'Árvores altas, antigas ou em locais de difícil acesso.',
    blocos: [
      {
        rotulo: 'Quando é indicado',
        texto:
          'Tronco inclinado, rachaduras, galhos sobre rede elétrica ou construção próxima.',
      },
      {
        rotulo: 'Como é executado',
        texto:
          'Escalada com cordas, desmonte por partes, descida controlada e área isolada.',
      },
    ],
  },
] as const

export const ESPECIES_ALTAS = [
  'Coqueiro',
  'Palmeira imperial',
  'Palmeira leque',
  'Outras espécies',
] as const

export const JARDINAGEM = [
  {
    titulo: 'Manutenção periódica',
    texto:
      'Visitas programadas para poda de grama, canteiros, cercas vivas e retirada de folhagem. Mantém a área sempre apresentável.',
  },
  {
    titulo: 'Poda de grama',
    texto:
      'Corte na altura correta para a espécie, acabamento em bordas e calçadas e recolhimento do material cortado.',
  },
  {
    titulo: 'Revitalização',
    texto:
      'Recuperação de jardins abandonados: limpeza geral, replantio, adubação e redefinição de canteiros.',
  },
  {
    titulo: 'Implantação',
    texto:
      'Preparo de solo, plantio de grama e mudas e definição do desenho do jardim junto com o cliente.',
  },
  {
    titulo: 'Limpeza de terreno',
    texto:
      'Corte de mato alto, remoção de entulho vegetal e preparo do lote para obra, venda ou uso.',
  },
  {
    titulo: 'Remoção de árvores',
    texto:
      'Supressão de árvores secas ou em local inadequado, com corte controlado e destinação dos resíduos.',
  },
] as const

export const OPCOES_SERVICO = [
  'Poda de árvores',
  'Remoção de árvore',
  'Coqueiros e palmeiras',
  'Jardinagem e manutenção',
  'Implantação / paisagismo',
  'Poda de grama',
  'Limpeza de terreno',
  'Outro',
] as const

export const OPCOES_PORTE = [
  'Pequeno porte',
  'Médio porte',
  'Grande porte',
  'Não sei avaliar',
] as const

export const LINKS_RODAPE_SERVICOS = [
  'Poda de árvores',
  'Coqueiros e palmeiras',
  'Jardinagem',
  'Poda de grama',
  'Limpeza de terreno',
] as const
