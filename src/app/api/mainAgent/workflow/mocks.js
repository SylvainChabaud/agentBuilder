const userId = 'user-1234';
const workflowId = 'wf-5678';
const state_lite = {
  status: 'initialized',
  objective: {
    id: 'wf-5678',
    text: [
      "Analyser la structure pédagogique d'un programme d'introduction à l'IA.",
    ],
    context: {
      summary:
        'Le programme vise à initier des professionnels non techniques à l’IA. Il couvre les bases, les outils comme ChatGPT, et l’éthique.',
      keyElements: [
        'Public cible : débutants',
        'Durée : 2 jours',
        'Modalité : présentiel ou distanciel',
      ],
    },
  },
  tasks: [
    {
      name: 'Évaluer la clarté des objectifs pédagogiques',
      description:
        "S'assurer que les objectifs sont compréhensibles et atteignables.",
      priority: 'high',
    },
    {
      name: 'Vérifier la structure progressive',
      description:
        'Analyser si le contenu suit une logique de montée en compétences.',
      priority: 'medium',
    },
  ],
  agents: [
    {
      id: 'agent-1-pedagogie',
      name: 'Agent Pédagogie',
      role: 'coWorker',
      expertise: 'Pédagogie',
      systemPrompt: 'Tu es un expert en pédagogie.',
      userPrompt: 'Analyse la clarté et la logique pédagogique du programme.',
      tools: ['generic-llm'],
      memory: {
        context: {
          objective: [
            "Analyser la structure pédagogique d'un programme d'introduction à l'IA.",
          ],
          summary:
            'Le programme vise à initier des professionnels non techniques à l’IA.',
          keyElements: ['Débutants', '2 jours', 'Présentiel/distanciel'],
        },
        history: [],
        inputs: [],
        outputs: [],
      },
      status: 'idle',
    },
  ],
  plan: [
    {
      task: {
        name: 'Évaluer la clarté des objectifs pédagogiques',
        description:
          "S'assurer que les objectifs sont compréhensibles et atteignables.",
        priority: 'high',
      },
      assignedAgentId: 'agent-1-pedagogie',
      dependencies: [],
    },
    {
      task: {
        name: 'Vérifier la structure progressive',
        description:
          'Analyser si le contenu suit une logique de montée en compétences.',
        priority: 'medium',
      },
      assignedAgentId: 'agent-1-pedagogie',
      dependencies: ['Évaluer la clarté des objectifs pédagogiques'],
    },
  ],
  memory: {
    version: 1,
    content: {
      byAgent: {
        'agent-1-pedagogie': [],
      },
      byTask: {
        'task-1': [],
        'task-2': [],
      },
    },
  },
  logs: [],
  output: null,
  validation: null,
  expertises: ['Pédagogie'],
};

// const state_global = {
//   workflowId: '2f0052eb-0a3e-4aed-9eec-1907e7bd89fb',
//   status: 'initialized',
//   objective: {
//     id: '2f0052eb-0a3e-4aed-9eec-1907e7bd89fb',
//     text: [
//       'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//     ],
//     context: {
//       summary:
//         "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//       keyElements: [
//         'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//         'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//         "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//         'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//         'Accessibilité: Aménagements pour situations de handicap disponibles.',
//         'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//         'Tarifs: 1250€ HT (1500€ TTC).',
//         'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//         'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//         'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//         'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//         'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//         'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//       ],
//     },
//   },
//   tasks: [
//     {
//       name: 'Analyser les objectifs pédagogiques',
//       description:
//         'Vérifier si les objectifs pédagogiques sont clairement définis et alignés avec les besoins du public cible.',
//       priority: 'high',
//     },
//     {
//       name: 'Évaluer la clarté du programme',
//       description:
//         "Examiner la structure et la formulation du programme pour s'assurer qu'il est facile à comprendre pour des débutants.",
//       priority: 'high',
//     },
//     {
//       name: 'Vérifier la progressivité des modules',
//       description:
//         "Analyser l'ordre et la progression des modules pour garantir une montée en compétence logique et fluide.",
//       priority: 'high',
//     },
//     {
//       name: "Assurer l'adéquation au public cible",
//       description:
//         'Confirmer que le contenu et la méthode pédagogique sont adaptés à un public non technique et varié.',
//       priority: 'high',
//     },
//     {
//       name: 'Proposer des ajustements pédagogiques',
//       description:
//         "Suggérer des modifications pour améliorer la clarté, la progressivité et l'adéquation du programme.",
//       priority: 'medium',
//     },
//     {
//       name: "Évaluer les méthodes d'encadrement",
//       description:
//         "Vérifier que les méthodes d'encadrement et les ressources pédagogiques sont adaptées aux besoins des apprenants.",
//       priority: 'medium',
//     },
//     {
//       name: "Analyser les modalités d'évaluation",
//       description:
//         "Examiner les méthodes d'évaluation pour s'assurer qu'elles mesurent efficacement les acquis des participants.",
//       priority: 'medium',
//     },
//     {
//       name: "Vérifier l'accessibilité",
//       description:
//         "S'assurer que la formation est accessible à tous, y compris aux personnes en situation de handicap.",
//       priority: 'low',
//     },
//     {
//       name: 'Évaluer les ressources pédagogiques',
//       description:
//         'Analyser la qualité et la pertinence des ressources pédagogiques fournies aux participants.',
//       priority: 'low',
//     },
//   ],
//   agents: [
//     {
//       id: 'agent-1-pédagogie',
//       name: 'Agent Pédagogie',
//       role: 'coWorker',
//       expertise: 'Pédagogie',
//       systemPrompt:
//         'Tu es un agent IA expert en pédagogie, rigoureux et collaboratif. Ta spécialisation est d’analyser et d’optimiser les programmes de formation pour garantir leur clarté, progressivité et adéquation au public cible. Tu fais partie d’un écosystème d’agents IA complémentaires travaillant ensemble sur ce projet. Ton rôle est d’évaluer le programme de formation en profondeur, de proposer des ajustements pédagogiques et de veiller à ce qu’il réponde aux besoins des débutants en IA. Tu dois agir de manière autonome pour atteindre cet objectif complexe, tout en restant aligné avec les autres agents.',
//       userPrompt:
//         "Analyse le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité'. Vérifie spécifiquement la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques pour améliorer l’apprentissage des concepts de base de l’IA et l’utilisation de ChatGPT. Concentre-toi sur l’équilibre entre théorie et pratique, les méthodes d’enseignement, et les ressources disponibles pour les apprenants. Ne donne pas de détails sur le contexte global, mais assure-toi que tes propositions sont adaptées aux débutants et renforcent leur compréhension.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-2-didactique',
//       name: 'Agent Didactique',
//       role: 'coWorker',
//       expertise: 'Didactique',
//       systemPrompt:
//         "Vous êtes un expert en didactique, rigoureux et collaboratif, spécialisé dans l'analyse et l'optimisation de programmes de formation. Votre rôle est d'évaluer la clarté, la progressivité, et l'adéquation au public cible d'un programme de formation, afin de proposer des ajustements pédagogiques pertinents. Vous faites partie d'un écosystème d'agents IA complémentaires, chacun apportant son expertise spécifique pour atteindre un objectif complexe. Vous devez agir de manière autonome, tout en gardant à l'esprit que vos contributions s'intègrent dans un projet global. Votre analyse doit être précise, constructive, et alignée sur les besoins du public cible.",
//       userPrompt:
//         "Analysez le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' en vous focalisant sur la clarté des objectifs pédagogiques, la progressivité des modules, et l'adéquation au public cible composé de professionnels non techniques. Proposez des ajustements pédagogiques permettant d'améliorer ces aspects, en tenant compte du temps limité de la formation (1 à 2 jours). Votre analyse doit inclure des suggestions concrètes pour rendre le contenu plus accessible et percutant.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-3-conception-de-programmes-de-formation',
//       name: 'Agent Conception de programmes de formation',
//       role: 'coWorker',
//       expertise: 'Conception de programmes de formation',
//       systemPrompt:
//         "Tu es un expert en conception de programmes de formation, spécialisé dans l'analyse et l'optimisation de contenus pédagogiques. Ton rôle est de garantir la clarté, la progressivité et l'adéquation des programmes de formation au public cible. Tu travailles en collaboration avec d'autres agents IA pour atteindre un objectif complexe : améliorer la qualité et l'efficacité d'un programme de formation en IA pour débutants. Tu es rigoureux, méthodique et orienté vers les résultats. Tu dois agir de manière autonome, en proposant des ajustements pédagogiques pertinents et en justifiant tes recommandations. Ton expertise est cruciale pour assurer que le programme répond aux besoins des apprenants et atteint ses objectifs pédagogiques.",
//       userPrompt:
//         "Analyse le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' en te focalisant sur la clarté, la progressivité et l'adéquation au public cible. Vérifie si les objectifs pédagogiques sont bien alignés avec les besoins des débutants en IA. Propose des ajustements pédagogiques pour améliorer la structure, le contenu et les méthodes d'enseignement. Justifie tes recommandations en te basant sur les éléments clés fournis et sur ton expertise en conception de programmes de formation.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-4-expertise-en-ia',
//       name: 'Agent Expertise en IA',
//       role: 'coWorker',
//       expertise: 'Expertise en IA',
//       systemPrompt:
//         "Tu es un expert en intelligence artificielle, spécialisé dans l'analyse et l'optimisation de programmes de formation en IA. Ton rôle est de vérifier la clarté, la progressivité et l'adéquation du programme de formation au public cible, et de proposer des ajustements pédagogiques pertinents. Tu es rigoureux, méthodique et collaboratif, travaillant en synergie avec d'autres agents IA pour atteindre un objectif complexe. Tu es autonome dans ton analyse et tu dois fournir des recommandations précises et actionnables pour améliorer la qualité de la formation.",
//       userPrompt:
//         "Analyse le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' en te focalisant sur la clarté, la progressivité et l'adéquation au public cible. Vérifie si les objectifs pédagogiques sont bien alignés avec les besoins des débutants en IA. Propose des ajustements pédagogiques pour améliorer l'efficacité de la formation, en tenant compte des éléments clés fournis. Fournis tes recommandations de manière structurée et détaillée.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-5-accessibilité',
//       name: 'Agent Accessibilité',
//       role: 'coWorker',
//       expertise: 'Accessibilité',
//       systemPrompt:
//         'Tu es un expert en accessibilité, rigoureux et collaboratif, spécialisé dans l’analyse des programmes de formation pour garantir leur clarté, progressivité et adéquation au public cible, en particulier pour les débutants. Tu fais partie d’un écosystème d’agents IA complémentaires, chacun ayant une expertise spécifique. Ton rôle est de vérifier que le programme de formation est accessible à tous, y compris aux personnes en situation de handicap, et de proposer des ajustements pédagogiques pour améliorer l’expérience d’apprentissage. Tu dois travailler en autonomie tout en contribuant à l’objectif global d’évaluer et d’optimiser ce programme de formation.',
//       userPrompt:
//         "Analyse le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' en te concentrant sur son accessibilité. Vérifie si les aménagements pour les situations de handicap mentionnés sont suffisants et pertinents. Propose des ajustements pour améliorer la clarté et la progressivité de la formation, en tenant compte des besoins spécifiques du public cible, y compris les personnes en situation de handicap. Assure-toi que les ressources pédagogiques et les modalités de suivi sont accessibles à tous les participants.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-6-évaluation-pédagogique',
//       name: 'Agent Évaluation pédagogique',
//       role: 'coWorker',
//       expertise: 'Évaluation pédagogique',
//       systemPrompt:
//         "Tu es un expert en évaluation pédagogique, rigoureux et méticuleux dans l'analyse des programmes de formation. Ta spécialité est de vérifier la clarté, la progressivité et l'adéquation des contenus au public cible, tout en proposant des ajustements pertinents pour améliorer l'efficacité didactique. Tu fais partie d'un écosystème d'agents IA collaboratifs, chacun jouant un rôle précis dans l'atteinte d'un objectif complexe. Tu es autonome dans ton domaine d'expertise, mais tu restes ouvert aux interactions avec les autres agents pour garantir une analyse complète et cohérente du programme.",
//       userPrompt:
//         "Analyse le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' en te focalisant sur la clarté, la progressivité et l'adéquation au public cible. Vérifie si les objectifs pédagogiques sont atteignables pour des débutants sans prérequis techniques. Identifie les points forts et les faiblesses du programme, puis propose des ajustements pédagogiques pour optimiser l'apprentissage et l'engagement des participants. Fournis tes propositions sous forme de recommandations structurées.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective: [
//             'Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//           ],
//           summary:
//             "Le programme de formation 'Maîtrisez l'IA pour Booster Votre Productivité' est conçu pour permettre aux professionnels d'intégrer l'intelligence artificielle dans leur travail afin d'optimiser leur productivité et d'automatiser les tâches. La formation s'adresse à un large public, y compris les consultants, entrepreneurs, et dirigeants d'entreprise, sans nécessiter de prérequis techniques. Elle dure 1 à 2 jours et est disponible en présentiel ou à distance. Les participants apprendront les bases de l'IA, exploiteront ChatGPT, et appliqueront des techniques de prompt engineering pour automatiser des tâches. La formation inclut également des modules sur l'éthique et les limites de l'IA. Le tarif est de 1250€ HT. Les modalités d'évaluation incluent des QCM avant, pendant, et après la formation.",
//           keyElements: [
//             'Public visé: consultants, experts-comptables, responsables RH, professions libérales, entrepreneurs, dirigeants d’entreprise, gestionnaires de projet.',
//             'Pré requis: Aucun prérequis technique, aisance avec les outils numériques est un plus.',
//             "Objectifs pédagogiques: Comprendre les concepts de base de React, créer des composants réutilisables, gérer l'état et les événements, implémenter le routage.",
//             'Durée et modalité: 1 à 2 jours, 7h ou 14h de formation, en présentiel ou à distance, groupes de 5 à 10 participants.',
//             'Accessibilité: Aménagements pour situations de handicap disponibles.',
//             'Modalité et délai d’accès: Dossier de candidature à retourner 5 jours avant la formation.',
//             'Tarifs: 1250€ HT (1500€ TTC).',
//             'Déroulé de la formation: Introduction et bases de l’IA, maîtrise de ChatGPT, automatisation des tâches, bonnes pratiques et éthique, cas pratiques avancés.',
//             'Moyens d’encadrement: Sylvain Chabaud, formateur expert en développement web et IA.',
//             'Méthodes mobilisées: 40% de théorie, 60% de pratique, participation active des apprenants.',
//             'Ressources pédagogiques: Imprimées et délivrées en fin de formation.',
//             'Modalités de suivi et d’évaluation: QCM avant, pendant, et après la formation, feuilles d’émargement.',
//             'Indicateurs de résultats: Taux de satisfaction et de recommandation de 100%, 1 formation dispensée.',
//           ],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//   ],
//   plan: [
//     {
//       task: {
//         name: 'Analyser les objectifs pédagogiques',
//         description:
//           'Vérifier si les objectifs pédagogiques sont clairement définis et alignés avec les besoins du public cible.',
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-1-pédagogie',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: 'Évaluer la clarté du programme',
//         description:
//           "Examiner la structure et la formulation du programme pour s'assurer qu'il est easy à comprendre pour des débutants.",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-2-didactique',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: 'Vérifier la progressivité des modules',
//         description:
//           "Analyser l'ordre et la progression des modules pour garantir une montée en compétence logique et fluide.",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-3-conception-de-programmes-de-formation',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: "Assurer l'adéquation au public cible",
//         description:
//           'Confirmer que le contenu et la méthode pédagogique sont adaptés à un public non technique et varié.',
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-1-pédagogie',
//       dependencies: ['Analyser les objectifs pédagogiques'],
//     },
//     {
//       task: {
//         name: 'Proposer des ajustements pédagogiques',
//         description:
//           "Suggérer des modifications pour améliorer la clarté, la progressivité et l'adéquation du programme.",
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-2-didactique',
//       dependencies: [
//         'Évaluer la clarté du programme',
//         'Vérifier la progressivité des modules',
//         "Assurer l'adéquation au public cible",
//       ],
//     },
//     {
//       task: {
//         name: "Évaluer les méthodes d'encadrement",
//         description:
//           "Vérifier que les méthodes d'encadrement et les ressources pédagogiques sont adaptées aux besoins des apprenants.",
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-6-évaluation-pédagogique',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: "Analyser les modalités d'évaluation",
//         description:
//           "Examiner les méthodes d'évaluation pour s'assurer qu'elles mesurent efficacement les acquis des participants.",
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-6-évaluation-pédagogique',
//       dependencies: ["Évaluer les méthodes d'encadrement"],
//     },
//     {
//       task: {
//         name: "Vérifier l'accessibilité",
//         description:
//           "S'assurer que la formation est accessible à tous, y compris aux personnes en situation de handicap.",
//         priority: 'low',
//       },
//       assignedAgentId: 'agent-5-accessibilité',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: 'Évaluer les ressources pédagogiques',
//         description:
//           'Analyser la qualité et la pertinence des ressources pédagogiques fournies aux participants.',
//         priority: 'low',
//       },
//       assignedAgentId: 'agent-1-pédagogie',
//       dependencies: [],
//     },
//   ],
//   memory: {
//     version: 1,
//     content: {
//       byAgent: {
//         'agent-1-pédagogie': [],
//         'agent-2-didactique': [],
//         'agent-3-conception-de-programmes-de-formation': [],
//         'agent-4-expertise-en-ia': [],
//         'agent-5-accessibilité': [],
//         'agent-6-évaluation-pédagogique': [],
//       },
//       byTask: {
//         'task-1': [],
//         'task-2': [],
//         'task-3': [],
//         'task-4': [],
//         'task-5': [],
//         'task-6': [],
//         'task-7': [],
//         'task-8': [],
//         'task-9': [],
//       },
//     },
//   },
//   logs: [
//     {
//       type: 'info',
//       message:
//         '🚀 Nouveau workflow initialisé. Objectif enregistré : Analyse ce programme de formation pour des débutants en IA. Vérifie la clarté, la progressivité et l’adéquation au public cible. Propose des ajustements pédagogiques.',
//     },
//     {
//       type: 'info',
//       message: '🧠 Objectif analysé avec succès : 9 tâches, 6 expertises.',
//     },
//     {
//       type: 'info',
//       message: '🤖 6 agents IA spécialisés créés à partir des expertises.',
//     },
//     {
//       type: 'info',
//       message: '🧠 Mémoire IA initialisée pour 6 agents et 9 tâches.',
//     },
//     {
//       type: 'info',
//       message: '📋 Plan stratégique généré avec 9 étapes.',
//     },
//   ],
//   output: null,
//   validation: null,
//   expertises: [
//     'Pédagogie',
//     'Didactique',
//     'Conception de programmes de formation',
//     'Expertise en IA',
//     'Accessibilité',
//     'Évaluation pédagogique',
//   ],
// };

// const state_global = {
//   workflowId: 'af5bef6b-9980-49c6-8791-e29f4a14cadb',
//   status: 'initialized',
//   objective: {
//     id: 'af5bef6b-9980-49c6-8791-e29f4a14cadb',
//     text: [
//       'Imagine une stratégie d’innovation pour une PME du secteur artisanal souhaitant intégrer l’IA dans ses processus. Identifie les opportunités concrètes d’automatisation ou d’optimisation, les freins potentiels, et propose une feuille de route en 3 étapes.',
//     ],
//     context: null,
//     customText:
//       "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//   },
//   tasks: [
//     {
//       name: 'Analyse des processus actuels',
//       description:
//         "Identifier et documenter les processus clés de l'entreprise artisanale susceptibles d'être optimisés ou automatisés par l'IA.",
//       priority: 'high',
//     },
//     {
//       name: 'Benchmark sectoriel',
//       description:
//         "Rechercher et analyser des cas d'utilisation similaires dans le secteur artisanal ou des industries connexes.",
//       priority: 'medium',
//     },
//     {
//       name: 'Identification des opportunités IA',
//       description:
//         "Déterminer les applications concrètes de l'IA (ex: prévision de demande, personnalisation, automatisation de tâches répétitives).",
//       priority: 'high',
//     },
//     {
//       name: 'Évaluation des freins',
//       description:
//         "Analyser les obstacles potentiels (techniques, financiers, culturels) à l'adoption de l'IA dans l'entreprise.",
//       priority: 'high',
//     },
//     {
//       name: 'Étude de faisabilité',
//       description:
//         'Évaluer la viabilité technique et économique des solutions IA identifiées.',
//       priority: 'medium',
//     },
//     {
//       name: 'Priorisation des initiatives',
//       description:
//         'Classer les opportunités par impact potentiel et facilité de mise en œuvre.',
//       priority: 'high',
//     },
//     {
//       name: 'Définition de la feuille de route',
//       description:
//         "Élaborer un plan en 3 étapes (court, moyen, long terme) pour l'intégration progressive des solutions IA.",
//       priority: 'high',
//     },
//     {
//       name: 'Plan de formation',
//       description:
//         "Prévoir les besoins en formation des équipes pour accompagner la transition vers l'IA.",
//       priority: 'medium',
//     },
//     {
//       name: 'Prototypage',
//       description:
//         'Développer un pilote pour valider le concept sur une application prioritaire.',
//       priority: 'medium',
//     },
//     {
//       name: 'Évaluation et ajustement',
//       description:
//         "Mesurer l'impact des premières implémentations et ajuster la stratégie en conséquence.",
//       priority: 'low',
//     },
//   ],
//   agents: [
//     {
//       id: 'agent-1-consultant-en-transformation-numérique',
//       name: 'Agent Consultant en transformation numérique',
//       role: 'coWorker',
//       expertise: 'Consultant en transformation numérique',
//       systemPrompt:
//         "Tu es un consultant expert en transformation numérique pour les PME artisanales. Ton rôle est d'analyser avec rigueur les besoins spécifiques de ces entreprises et de proposer des solutions d'intégration de l'IA adaptées à leur contexte. Tu adoptes une posture à la fois experte et pragmatique, en tenant compte des contraintes techniques, humaines et financières. Tu fais partie d'un écosystème d'agents IA complémentaires (experts en IA, en gestion de projet, etc.) avec lesquels tu collabores pour atteindre l'objectif global. Tu es autonome dans ton domaine d'expertise mais conscient de la nécessité de coordonner tes propositions avec les autres agents.",
//       userPrompt:
//         "En tant que consultant en transformation numérique, identifie 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale spécialisée dans la fabrication de meubles sur mesure. Pour chaque opportunité, précise brièvement : le processus concerné, le gain potentiel et les prérequis techniques. Ne développe pas encore les solutions, concentre-toi sur l'identification des cas d'usage pertinents.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective:
//             "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//           summary: null,
//           keyElements: [],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-2-spécialiste-ia',
//       name: 'Agent Spécialiste IA',
//       role: 'coWorker',
//       expertise: 'Spécialiste IA',
//       systemPrompt:
//         "Tu es un expert en Intelligence Artificielle, spécialisé dans l'intégration de solutions IA pour les PME artisanales. Ton rôle est d'identifier les opportunités concrètes d'application de l'IA, d'analyser les freins potentiels et de proposer une feuille de route réaliste. Tu adoptes une posture rigoureuse et pragmatique, en te basant sur des données et des cas d'usage pertinents. Tu fais partie d'un écosystème d'agents IA complémentaires et tu dois collaborer avec eux pour atteindre l'objectif global. Tu es autonome dans ta spécialité mais conscient des interdépendances avec les autres domaines (technique, RH, financier, etc.).",
//       userPrompt:
//         "Identifie 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale spécialisée dans la fabrication de meubles sur mesure. Pour chaque opportunité, précise brièvement : le gain potentiel, les données nécessaires et les compétences à mobiliser. Ne développe pas encore les freins ou la feuille de route.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective:
//             "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//           summary: null,
//           keyElements: [],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-3-analyste-métier',
//       name: 'Agent Analyste métier',
//       role: 'coWorker',
//       expertise: 'Analyste métier',
//       systemPrompt:
//         "Vous êtes un Analyste Métier IA spécialisé dans l'accompagnement des PME artisanales. Votre posture est rigoureuse, pragmatique et orientée solutions. Votre expertise couvre l'analyse des processus métiers, l'identification des gains potentiels par l'IA et la détection des freins opérationnels. Vous collaborez avec d'autres agents IA (techniques, RH, financiers) pour concevoir des stratégies d'intégration réalistes. Vous devez travailler en autonomie sur votre domaine tout en contribuant activement à l'objectif global. Vos analyses doivent être concrètes, chiffrées lorsque possible et immédiatement actionnables par une TPE/PME.",
//       userPrompt:
//         "Pour une PME artisanale de 15 salariés spécialisée dans la menuiserie sur mesure, identifiez 3 opportunités d'automatisation par IA avec : 1) le processus concerné 2) le gain temps/qualité estimé 3) les compétences internes mobilisables. Formulez ensuite le principal frein organisationnel anticipé. Ne proposez pas encore de solutions techniques.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective:
//             "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//           summary: null,
//           keyElements: [],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-4-expert-sectoriel-artisanal',
//       name: 'Agent Expert sectoriel artisanal',
//       role: 'coWorker',
//       expertise: 'Expert sectoriel artisanal',
//       systemPrompt:
//         "Vous êtes un expert sectoriel spécialisé dans l'artisanat, avec une profonde connaissance des enjeux, des processus métiers et des défis spécifiques aux PME artisanales. Votre posture est à la fois rigoureuse et pragmatique, combinant expertise technique et compréhension des réalités terrain. Vous collaborez au sein d'un écosystème d'agents IA complémentaires pour concevoir une stratégie d'intégration de l'IA adaptée aux besoins des artisans. Votre rôle est d'apporter votre expertise sectorielle pour identifier les opportunités concrètes, analyser les freins spécifiques au milieu artisanal et contribuer à l'élaboration d'une feuille de route réaliste. Vous travaillez en autonomie tout en coordonnant vos analyses avec les autres agents pour atteindre l'objectif complexe du projet.",
//       userPrompt:
//         "En tant qu'expert sectoriel artisanal, votre première mission est d'identifier 3 à 5 opportunités concrètes d'intégration de l'IA dans les processus clés d'une PME artisanale typique (production, gestion, relation client). Pour chaque opportunité, précisez brièvement le gain potentiel et les spécificités artisanales à prendre en compte. Ne traitez pas encore des freins ou de la feuille de route - d'autres agents s'en chargeront ultérieurement.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective:
//             "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//           summary: null,
//           keyElements: [],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//     {
//       id: 'agent-5-gestionnaire-de-projet',
//       name: 'Agent Gestionnaire de projet',
//       role: 'coWorker',
//       expertise: 'Gestionnaire de projet',
//       systemPrompt:
//         "Tu es un Gestionnaire de Projet IA spécialisé dans l'accompagnement des PME artisanales. Ton expertise réside dans la structuration de projets d'intégration technologique, l'identification des risques et la création de feuilles de route pragmatiques. Tu adoptes une posture méthodique et pédagogue, capable de traduire des concepts complexes en actions tangibles. Tu es un maillon clé d'une équipe multi-agents où chacun apporte sa spécialité (technique, RH, financière...). Ton rôle est d'orchestrer les livrables intermédiaires vers l'objectif final : une stratégie d'intégration de l'IA réaliste et adaptée. Tu dois faire preuve d'autonomie dans ton domaine tout en collaborant étroitement avec les autres agents lorsque des interfaces sont nécessaires.",
//       userPrompt:
//         "En tant que Gestionnaire de Projet IA, ton premier livrable consiste à établir une cartographie des processus métiers prioritaires pour une PME artisanale (ex: gestion des commandes, suivi de production). Identifie pour chaque processus : 1) Les gains potentiels avec l'IA 2) Les prérequis techniques/humains 3) Une estimation réaliste du niveau d'effort (faible/moyen/élevé). Présente ces éléments sous forme de tableau synthétique. Ne traite pas encore des solutions techniques spécifiques - d'autres agents interviendront sur cet aspect.",
//       tools: ['generic-llm'],
//       memory: {
//         context: {
//           objective:
//             "Concevoir une stratégie d'intégration de l'IA adaptée à une PME artisanale, incluant l'identification d'opportunités concrètes, l'analyse des freins et une feuille de route en 3 étapes.",
//           summary: null,
//           keyElements: [],
//         },
//         history: [],
//         inputs: [],
//         outputs: [],
//       },
//       status: 'idle',
//     },
//   ],
//   plan: [
//     {
//       task: {
//         name: 'Analyse des processus actuels',
//         description:
//           "Identifier et documenter les processus clés de l'entreprise artisanale susceptibles d'être optimisés ou automatisés par l'IA.",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-3-analyste-métier',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: 'Benchmark sectoriel',
//         description:
//           "Rechercher et analyser des cas d'utilisation similaires dans le secteur artisanal ou des industries connexes.",
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-4-expert-sectoriel-artisanal',
//       dependencies: [],
//     },
//     {
//       task: {
//         name: 'Identification des opportunités IA',
//         description:
//           "Déterminer les applications concrètes de l'IA (ex: prévision de demande, personnalisation, automatisation de tâches répétitives).",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-2-spécialiste-ia',
//       dependencies: ['Analyse des processus actuels', 'Benchmark sectoriel'],
//     },
//     {
//       task: {
//         name: 'Évaluation des freins',
//         description:
//           "Analyser les obstacles potentiels (techniques, financiers, culturels) à l'adoption de l'IA dans l'entreprise.",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-1-consultant-en-transformation-numérique',
//       dependencies: ['Identification des opportunités IA'],
//     },
//     {
//       task: {
//         name: 'Étude de faisabilité',
//         description:
//           'Évaluer la viabilité technique et économique des solutions IA identifiées.',
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-1-consultant-en-transformation-numérique',
//       dependencies: ['Évaluation des freins'],
//     },
//     {
//       task: {
//         name: 'Priorisation des initiatives',
//         description:
//           'Classer les opportunités par impact potentiel et facilité de mise en œuvre.',
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-5-gestionnaire-de-projet',
//       dependencies: ['Étude de faisabilité'],
//     },
//     {
//       task: {
//         name: 'Définition de la feuille de route',
//         description:
//           "Élaborer un plan en 3 étapes (court, moyen, long terme) pour l'intégration progressive des solutions IA.",
//         priority: 'high',
//       },
//       assignedAgentId: 'agent-5-gestionnaire-de-projet',
//       dependencies: ['Priorisation des initiatives'],
//     },
//     {
//       task: {
//         name: 'Plan de formation',
//         description:
//           "Prévoir les besoins en formation des équipes pour accompagner la transition vers l'IA.",
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-1-consultant-en-transformation-numérique',
//       dependencies: ['Définition de la feuille de route'],
//     },
//     {
//       task: {
//         name: 'Prototypage',
//         description:
//           'Développer un pilote pour valider le concept sur une application prioritaire.',
//         priority: 'medium',
//       },
//       assignedAgentId: 'agent-2-spécialiste-ia',
//       dependencies: ['Définition de la feuille de route'],
//     },
//     {
//       task: {
//         name: 'Évaluation et ajustement',
//         description:
//           "Mesurer l'impact des premières implémentations et ajuster la stratégie en conséquence.",
//         priority: 'low',
//       },
//       assignedAgentId: 'agent-5-gestionnaire-de-projet',
//       dependencies: ['Prototypage'],
//     },
//   ],
//   memory: {
//     version: 1,
//     content: {
//       byAgent: {
//         'agent-1-consultant-en-transformation-numérique': [
//           {
//             task: {
//               name: 'Évaluation des freins',
//               description:
//                 "Analyser les obstacles potentiels (techniques, financiers, culturels) à l'adoption de l'IA dans l'entreprise.",
//               priority: 'high',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification des principaux freins à l'adoption de l'IA pour une PME artisanale de fabrication de meubles sur mesure.",
//                 recommendations: [
//                   'Conduire un audit des compétences numériques internes pour évaluer le gap de formation',
//                   "Évaluer la maturité numérique actuelle de l'entreprise (équipements, connectivité, logiciels existants)",
//                   "Prévoir un accompagnement au changement pour l'équipe artisanale peu familiarisée avec l'IA",
//                 ],
//                 justification:
//                   'Les obstacles identifiés sont typiques des PME artisanales : méconnaissance technologique (frein culturel), investissement initial perçu comme élevé (frein financier), et infrastructure informatique souvent limitée (frein technique). Ces éléments doivent être adressés avant toute implémentation.',
//                 rating: {
//                   clarity: 4,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//           {
//             task: {
//               name: 'Étude de faisabilité',
//               description:
//                 'Évaluer la viabilité technique et économique des solutions IA identifiées.',
//               priority: 'medium',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale spécialisée dans la fabrication de meubles sur mesure, avec évaluation de leur viabilité technique et économique.",
//                 recommendations: [
//                   {
//                     processus: 'Conception personnalisée',
//                     gain_potentiel:
//                       'Réduction du temps de conception et amélioration de la satisfaction client grâce à des visualisations 3D réalistes et des suggestions de design basées sur les préférences du client.',
//                     prerequis_techniques:
//                       "Logiciel de conception 3D compatible avec des modules IA, formation du personnel à l'utilisation des outils IA, accès à des bases de données de designs de meubles.",
//                   },
//                   {
//                     processus: 'Optimisation des stocks et des achats',
//                     gain_potentiel:
//                       'Réduction des coûts de stockage et des surplus de matériaux grâce à des prévisions plus précises des besoins en matières premières basées sur les commandes passées et les tendances du marché.',
//                     prerequis_techniques:
//                       "Système de gestion des stocks connecté à un outil d'analyse prédictive, historique des commandes et des achats numérisé.",
//                   },
//                   {
//                     processus: 'Service après-vente et maintenance prédictive',
//                     gain_potentiel:
//                       "Amélioration de la satisfaction client et réduction des coûts de réparation grâce à la détection précoce des problèmes potentiels et à des recommandations personnalisées pour l'entretien des meubles.",
//                     prerequis_techniques:
//                       "Plateforme de collecte de données clients (feedback, utilisation), outils d'analyse de données en temps réel, intégration avec les systèmes CRM.",
//                   },
//                 ],
//                 justification:
//                   "Ces opportunités ont été sélectionnées pour leur potentiel à adresser des défis spécifiques de la PME (personnalisation, gestion des coûts, satisfaction client) tout en étant réalisables avec des technologies IA actuelles et accessibles. Chaque cas d'usage offre un retour sur investissement clair et mesurable.",
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//           {
//             task: {
//               name: 'Plan de formation',
//               description:
//                 "Prévoir les besoins en formation des équipes pour accompagner la transition vers l'IA.",
//               priority: 'medium',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification des besoins en formation pour l'intégration de l'IA dans une PME artisanale de fabrication de meubles sur mesure.",
//                 recommendations: [
//                   "Formation aux outils de conception assistée par IA pour les artisans et designers, afin de maximiser l'utilisation des logiciels de modélisation 3D et de personnalisation.",
//                   "Formation à l'analyse des données clients et des tendances du marché via des outils d'IA, pour le service commercial et marketing, afin d'améliorer la prise de décision.",
//                   "Formation à la maintenance prédictive des machines-outils via l'IA, pour les équipes techniques, afin de réduire les temps d'arrêt et les coûts de maintenance.",
//                 ],
//                 justification:
//                   "Ces formations ciblent les principaux domaines où l'IA peut apporter une valeur ajoutée immédiate : la conception, la relation client et la maintenance. Elles sont adaptées aux compétences existantes des équipes et aux besoins spécifiques de l'artisanat.",
//                 rating: {
//                   clarity: 4,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//         ],
//         'agent-2-spécialiste-ia': [
//           {
//             task: {
//               name: 'Identification des opportunités IA',
//               description:
//                 "Déterminer les applications concrètes de l'IA (ex: prévision de demande, personnalisation, automatisation de tâches répétitives).",
//               priority: 'high',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale de fabrication de meubles sur mesure.",
//                 recommendations: [
//                   {
//                     opportunity: 'Optimisation des plans de découpe',
//                     gain_potentiel:
//                       "Réduction des coûts matière (jusqu'à 15%) et du temps de préparation",
//                     donnees_necessaires:
//                       'Historique des commandes, dimensions des planches, schémas de découpe optimaux',
//                     competences:
//                       'IA générative (algorithmes de bin packing), intégration avec logiciels de CAO',
//                   },
//                   {
//                     opportunity: 'Recommandation de designs personnalisés',
//                     gain_potentiel:
//                       'Augmentation du panier moyen (+20%) et satisfaction client',
//                     donnees_necessaires:
//                       'Catalogue produits, préférences clients (couleurs, styles), tendances marché',
//                     competences:
//                       'Systèmes de recommandation (filtrage collaboratif), vision par ordinateur',
//                   },
//                   {
//                     opportunity: 'Prévision des délais de production',
//                     gain_potentiel:
//                       'Amélioration de la satisfaction client (réduction des retards) et meilleure planification',
//                     donnees_necessaires:
//                       'Historique des projets (temps réel par étape), disponibilité des artisans, aléas passés',
//                     competences:
//                       'Modèles prédictifs (régression, LSTM), analyse de séries temporelles',
//                   },
//                 ],
//                 justification:
//                   "Ces opportunités ciblent des points critiques du métier (gaspillage matière, personnalisation, gestion des délais) avec des technologies IA matures et des ROI mesurables. Chaque proposition s'appuie sur des données déjà disponibles ou facilement collectables.",
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//           {
//             task: {
//               name: 'Prototypage',
//               description:
//                 'Développer un pilote pour valider le concept sur une application prioritaire.',
//               priority: 'medium',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale de fabrication de meubles sur mesure, avec gain potentiel, données nécessaires et compétences à mobiliser.",
//                 recommendations: [
//                   {
//                     opportunite: 'Optimisation des plans de découpe',
//                     gain_potentiel:
//                       "Réduction des chutes de matériaux (jusqu'à 20%), gain de temps en conception",
//                     donnees_necessaires:
//                       'Historique des découpes, dimensions des planches, contraintes techniques',
//                     competences:
//                       "Algorithmes d'optimisation, intégration avec logiciels de CAO",
//                   },
//                   {
//                     opportunite:
//                       'Assistant virtuel pour la personnalisation client',
//                     gain_potentiel:
//                       'Augmentation du taux de conversion (estimé +15%), réduction du temps de conception',
//                     donnees_necessaires:
//                       'Catalogue produits, préférences clients, contraintes techniques',
//                     competences:
//                       'Chatbot avec NLP, base de connaissances produits',
//                   },
//                   {
//                     opportunite: 'Prédiction des délais de fabrication',
//                     gain_potentiel:
//                       'Amélioration de la satisfaction client (moins de retards), optimisation du planning',
//                     donnees_necessaires:
//                       'Historique des commandes, temps de fabrication, disponibilité des matériaux',
//                     competences:
//                       'Modèles prédictifs, analyse des données temporelles',
//                   },
//                 ],
//                 justification:
//                   'Ces opportunités ciblent des points critiques pour les artisans (gaspillage, relation client, gestion des délais) avec des technologies IA matures et des données généralement disponibles.',
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//         ],
//         'agent-3-analyste-métier': [
//           {
//             task: {
//               name: 'Analyse des processus actuels',
//               description:
//                 "Identifier et documenter les processus clés de l'entreprise artisanale susceptibles d'être optimisés ou automatisés par l'IA.",
//               priority: 'high',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Identification de 3 opportunités d'automatisation par IA pour une PME artisanale de menuiserie sur mesure, incluant les processus concernés, les gains estimés et les compétences internes mobilisables, ainsi que le principal frein organisationnel anticipé.",
//                 recommendations: [
//                   {
//                     processus: 'Conception et planification des projets',
//                     gain_temps:
//                       'Réduction de 20-30% du temps de conception grâce à des outils IA générant des plans et modèles 3D à partir de croquis ou descriptions clients.',
//                     gain_qualite:
//                       'Amélioration de la précision des plans et réduction des erreurs de mesure.',
//                     competences_mobilisables:
//                       "Chef d'atelier (expérience en conception), menuisiers seniors (validation des plans)",
//                   },
//                   {
//                     processus: 'Gestion des stocks et approvisionnements',
//                     gain_temps:
//                       'Réduction de 40-50% du temps passé à la gestion manuelle des stocks grâce à une IA prédictive des besoins en matériaux.',
//                     gain_qualite:
//                       'Optimisation des niveaux de stock et réduction des ruptures ou surplus.',
//                     competences_mobilisables:
//                       "Responsable d'atelier (connaissance des matériaux), assistant administratif (suivi des commandes)",
//                   },
//                   {
//                     processus: 'Suivi et relation client',
//                     gain_temps:
//                       'Réduction de 30-40% du temps passé à la gestion des demandes clients via un chatbot IA pour les questions fréquentes et le suivi de projet.',
//                     gain_qualite:
//                       'Amélioration de la réactivité et de la satisfaction client.',
//                     competences_mobilisables:
//                       'Commercial (relation client), assistant administratif (coordination)',
//                   },
//                 ],
//                 justification:
//                   "Ces processus ont été sélectionnés car ils représentent des tâches répétitives et chronophages où l'IA peut apporter une valeur ajoutée significative en termes d'efficacité et de qualité, tout en s'appuyant sur des compétences existantes dans l'entreprise.",
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//         ],
//         'agent-4-expert-sectoriel-artisanal': [
//           {
//             task: {
//               name: 'Benchmark sectoriel',
//               description:
//                 "Rechercher et analyser des cas d'utilisation similaires dans le secteur artisanal ou des industries connexes.",
//               priority: 'medium',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Benchmark sectoriel réalisé pour identifier des cas d'utilisation de l'IA dans le secteur artisanal et des industries connexes. L'analyse a permis de dégager des opportunités concrètes adaptées aux PME artisanales.",
//                 recommendations: [
//                   "Optimisation des stocks et des approvisionnements : Utilisation de l'IA pour prévoir les besoins en matières premières en fonction des commandes et des tendances saisonnières. Gain : réduction des coûts de stockage et des ruptures de stock. Spécificité : nécessité de prendre en compte les variations artisanales et les petits volumes.",
//                   'Personnalisation des produits : IA pour analyser les préférences des clients et proposer des options de personnalisation. Gain : augmentation de la valeur perçue et de la satisfaction client. Spécificité : respect des techniques artisanales et des temps de production.',
//                   "Maintenance prédictive des équipements : IA pour surveiller l'état des machines et prévenir les pannes. Gain : réduction des temps d'arrêt et des coûts de réparation. Spécificité : adaptation aux équipements souvent anciens ou modifiés manuellement.",
//                   "Gestion des relations clients : Chatbots ou assistants IA pour répondre aux questions fréquentes et prendre des rendez-vous. Gain : amélioration du service client sans surcharge de travail. Spécificité : maintien d'une touche humaine dans les interactions.",
//                   "Analyse de marché et tendances : IA pour identifier les tendances émergentes et adapter l'offre. Gain : meilleure réactivité aux demandes du marché. Spécificité : nécessité de concilier tendances et savoir-faire traditionnel.",
//                 ],
//                 justification:
//                   "Ces recommandations sont basées sur des cas observés dans des secteurs similaires (artisanat, petites productions) où l'IA a apporté des gains significatifs tout en respectant les contraintes spécifiques des artisans. Les solutions proposées sont adaptables à différentes tailles d'entreprises et types de métiers artisanaux.",
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//         ],
//         'agent-5-gestionnaire-de-projet': [
//           {
//             task: {
//               name: 'Priorisation des initiatives',
//               description:
//                 'Classer les opportunités par impact potentiel et facilité de mise en œuvre.',
//               priority: 'high',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Cartographie des processus métiers prioritaires pour une PME artisanale avec évaluation des gains potentiels, prérequis et niveau d'effort.",
//                 recommendations: [
//                   'Prioriser la gestion des commandes pour un impact immédiat sur la satisfaction client et une mise en œuvre relativement simple.',
//                   'Envisager le suivi de production dans un second temps, car bien que plus complexe, il offre des gains significatifs en efficacité.',
//                 ],
//                 justification:
//                   'La gestion des commandes a été classée en premier en raison de son impact direct sur les revenus et de sa facilité de mise en œuvre. Le suivi de production, bien que plus complexe, offre des gains à moyen terme en optimisant les ressources et réduisant les délais.',
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//           {
//             task: {
//               name: 'Définition de la feuille de route',
//               description:
//                 "Élaborer un plan en 3 étapes (court, moyen, long terme) pour l'intégration progressive des solutions IA.",
//               priority: 'high',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Élaboration d'une feuille de route en 3 étapes pour l'intégration progressive de l'IA dans une PME artisanale, basée sur une cartographie préalable des processus métiers prioritaires.",
//                 recommendations: [
//                   'Court terme (0-6 mois) : Automatiser les tâches répétitives et à faible valeur ajoutée (ex: gestion des commandes) avec des solutions IA simples et peu coûteuses.',
//                   'Moyen terme (6-18 mois) : Optimiser les processus clés (ex: suivi de production) avec des outils IA plus sophistiqués nécessitant une formation des équipes.',
//                   "Long terme (18-36 mois) : Intégrer des solutions IA avancées pour la prévision et la prise de décision stratégique, en s'appuyant sur les données collectées.",
//                 ],
//                 justification:
//                   "Cette approche progressive permet de minimiser les risques, de former les équipes pas à pas et de s'assurer de la viabilité économique à chaque étape. Elle s'aligne sur les capacités techniques et humaines typiques des PME artisanales.",
//                 rating: {
//                   clarity: 5,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//           {
//             task: {
//               name: 'Évaluation et ajustement',
//               description:
//                 "Mesurer l'impact des premières implémentations et ajuster la stratégie en conséquence.",
//               priority: 'low',
//             },
//             output: {
//               result: {
//                 summary:
//                   "Évaluation des premières implémentations d'IA dans les processus prioritaires de la PME artisanale, avec ajustement des priorités et des ressources en fonction des résultats observés.",
//                 recommendations: [
//                   'Réaliser une analyse comparative des gains obtenus par rapport aux prévisions initiales pour identifier les écarts et leurs causes.',
//                   "Ajuster la feuille de route en reclassant les processus en fonction de leur ROI réel et de la facilité d'implémentation observée.",
//                 ],
//                 justification:
//                   "L'évaluation initiale était basée sur des hypothèses qui doivent être validées par des données réelles. Les ajustements permettront d'optimiser l'allocation des ressources et d'augmenter les chances de succès des prochaines implémentations.",
//                 rating: {
//                   clarity: 4,
//                   relevance: 5,
//                   impact: 4,
//                 },
//               },
//             },
//           },
//         ],
//       },
//       byTask: {
//         'task-1': {
//           result: {
//             summary:
//               "Identification de 3 opportunités d'automatisation par IA pour une PME artisanale de menuiserie sur mesure, incluant les processus concernés, les gains estimés et les compétences internes mobilisables, ainsi que le principal frein organisationnel anticipé.",
//             recommendations: [
//               {
//                 processus: 'Conception et planification des projets',
//                 gain_temps:
//                   'Réduction de 20-30% du temps de conception grâce à des outils IA générant des plans et modèles 3D à partir de croquis ou descriptions clients.',
//                 gain_qualite:
//                   'Amélioration de la précision des plans et réduction des erreurs de mesure.',
//                 competences_mobilisables:
//                   "Chef d'atelier (expérience en conception), menuisiers seniors (validation des plans)",
//               },
//               {
//                 processus: 'Gestion des stocks et approvisionnements',
//                 gain_temps:
//                   'Réduction de 40-50% du temps passé à la gestion manuelle des stocks grâce à une IA prédictive des besoins en matériaux.',
//                 gain_qualite:
//                   'Optimisation des niveaux de stock et réduction des ruptures ou surplus.',
//                 competences_mobilisables:
//                   "Responsable d'atelier (connaissance des matériaux), assistant administratif (suivi des commandes)",
//               },
//               {
//                 processus: 'Suivi et relation client',
//                 gain_temps:
//                   'Réduction de 30-40% du temps passé à la gestion des demandes clients via un chatbot IA pour les questions fréquentes et le suivi de projet.',
//                 gain_qualite:
//                   'Amélioration de la réactivité et de la satisfaction client.',
//                 competences_mobilisables:
//                   'Commercial (relation client), assistant administratif (coordination)',
//               },
//             ],
//             justification:
//               "Ces processus ont été sélectionnés car ils représentent des tâches répétitives et chronophages où l'IA peut apporter une valeur ajoutée significative en termes d'efficacité et de qualité, tout en s'appuyant sur des compétences existantes dans l'entreprise.",
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-2': {
//           result: {
//             summary:
//               "Benchmark sectoriel réalisé pour identifier des cas d'utilisation de l'IA dans le secteur artisanal et des industries connexes. L'analyse a permis de dégager des opportunités concrètes adaptées aux PME artisanales.",
//             recommendations: [
//               "Optimisation des stocks et des approvisionnements : Utilisation de l'IA pour prévoir les besoins en matières premières en fonction des commandes et des tendances saisonnières. Gain : réduction des coûts de stockage et des ruptures de stock. Spécificité : nécessité de prendre en compte les variations artisanales et les petits volumes.",
//               'Personnalisation des produits : IA pour analyser les préférences des clients et proposer des options de personnalisation. Gain : augmentation de la valeur perçue et de la satisfaction client. Spécificité : respect des techniques artisanales et des temps de production.',
//               "Maintenance prédictive des équipements : IA pour surveiller l'état des machines et prévenir les pannes. Gain : réduction des temps d'arrêt et des coûts de réparation. Spécificité : adaptation aux équipements souvent anciens ou modifiés manuellement.",
//               "Gestion des relations clients : Chatbots ou assistants IA pour répondre aux questions fréquentes et prendre des rendez-vous. Gain : amélioration du service client sans surcharge de travail. Spécificité : maintien d'une touche humaine dans les interactions.",
//               "Analyse de marché et tendances : IA pour identifier les tendances émergentes et adapter l'offre. Gain : meilleure réactivité aux demandes du marché. Spécificité : nécessité de concilier tendances et savoir-faire traditionnel.",
//             ],
//             justification:
//               "Ces recommandations sont basées sur des cas observés dans des secteurs similaires (artisanat, petites productions) où l'IA a apporté des gains significatifs tout en respectant les contraintes spécifiques des artisans. Les solutions proposées sont adaptables à différentes tailles d'entreprises et types de métiers artisanaux.",
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-3': {
//           result: {
//             summary:
//               "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale de fabrication de meubles sur mesure.",
//             recommendations: [
//               {
//                 opportunity: 'Optimisation des plans de découpe',
//                 gain_potentiel:
//                   "Réduction des coûts matière (jusqu'à 15%) et du temps de préparation",
//                 donnees_necessaires:
//                   'Historique des commandes, dimensions des planches, schémas de découpe optimaux',
//                 competences:
//                   'IA générative (algorithmes de bin packing), intégration avec logiciels de CAO',
//               },
//               {
//                 opportunity: 'Recommandation de designs personnalisés',
//                 gain_potentiel:
//                   'Augmentation du panier moyen (+20%) et satisfaction client',
//                 donnees_necessaires:
//                   'Catalogue produits, préférences clients (couleurs, styles), tendances marché',
//                 competences:
//                   'Systèmes de recommandation (filtrage collaboratif), vision par ordinateur',
//               },
//               {
//                 opportunity: 'Prévision des délais de production',
//                 gain_potentiel:
//                   'Amélioration de la satisfaction client (réduction des retards) et meilleure planification',
//                 donnees_necessaires:
//                   'Historique des projets (temps réel par étape), disponibilité des artisans, aléas passés',
//                 competences:
//                   'Modèles prédictifs (régression, LSTM), analyse de séries temporelles',
//               },
//             ],
//             justification:
//               "Ces opportunités ciblent des points critiques du métier (gaspillage matière, personnalisation, gestion des délais) avec des technologies IA matures et des ROI mesurables. Chaque proposition s'appuie sur des données déjà disponibles ou facilement collectables.",
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-4': {
//           result: {
//             summary:
//               "Identification des principaux freins à l'adoption de l'IA pour une PME artisanale de fabrication de meubles sur mesure.",
//             recommendations: [
//               'Conduire un audit des compétences numériques internes pour évaluer le gap de formation',
//               "Évaluer la maturité numérique actuelle de l'entreprise (équipements, connectivité, logiciels existants)",
//               "Prévoir un accompagnement au changement pour l'équipe artisanale peu familiarisée avec l'IA",
//             ],
//             justification:
//               'Les obstacles identifiés sont typiques des PME artisanales : méconnaissance technologique (frein culturel), investissement initial perçu comme élevé (frein financier), et infrastructure informatique souvent limitée (frein technique). Ces éléments doivent être adressés avant toute implémentation.',
//             rating: {
//               clarity: 4,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-5': {
//           result: {
//             summary:
//               "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale spécialisée dans la fabrication de meubles sur mesure, avec évaluation de leur viabilité technique et économique.",
//             recommendations: [
//               {
//                 processus: 'Conception personnalisée',
//                 gain_potentiel:
//                   'Réduction du temps de conception et amélioration de la satisfaction client grâce à des visualisations 3D réalistes et des suggestions de design basées sur les préférences du client.',
//                 prerequis_techniques:
//                   "Logiciel de conception 3D compatible avec des modules IA, formation du personnel à l'utilisation des outils IA, accès à des bases de données de designs de meubles.",
//               },
//               {
//                 processus: 'Optimisation des stocks et des achats',
//                 gain_potentiel:
//                   'Réduction des coûts de stockage et des surplus de matériaux grâce à des prévisions plus précises des besoins en matières premières basées sur les commandes passées et les tendances du marché.',
//                 prerequis_techniques:
//                   "Système de gestion des stocks connecté à un outil d'analyse prédictive, historique des commandes et des achats numérisé.",
//               },
//               {
//                 processus: 'Service après-vente et maintenance prédictive',
//                 gain_potentiel:
//                   "Amélioration de la satisfaction client et réduction des coûts de réparation grâce à la détection précoce des problèmes potentiels et à des recommandations personnalisées pour l'entretien des meubles.",
//                 prerequis_techniques:
//                   "Plateforme de collecte de données clients (feedback, utilisation), outils d'analyse de données en temps réel, intégration avec les systèmes CRM.",
//               },
//             ],
//             justification:
//               "Ces opportunités ont été sélectionnées pour leur potentiel à adresser des défis spécifiques de la PME (personnalisation, gestion des coûts, satisfaction client) tout en étant réalisables avec des technologies IA actuelles et accessibles. Chaque cas d'usage offre un retour sur investissement clair et mesurable.",
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-6': {
//           result: {
//             summary:
//               "Cartographie des processus métiers prioritaires pour une PME artisanale avec évaluation des gains potentiels, prérequis et niveau d'effort.",
//             recommendations: [
//               'Prioriser la gestion des commandes pour un impact immédiat sur la satisfaction client et une mise en œuvre relativement simple.',
//               'Envisager le suivi de production dans un second temps, car bien que plus complexe, il offre des gains significatifs en efficacité.',
//             ],
//             justification:
//               'La gestion des commandes a été classée en premier en raison de son impact direct sur les revenus et de sa facilité de mise en œuvre. Le suivi de production, bien que plus complexe, offre des gains à moyen terme en optimisant les ressources et réduisant les délais.',
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-7': {
//           result: {
//             summary:
//               "Élaboration d'une feuille de route en 3 étapes pour l'intégration progressive de l'IA dans une PME artisanale, basée sur une cartographie préalable des processus métiers prioritaires.",
//             recommendations: [
//               'Court terme (0-6 mois) : Automatiser les tâches répétitives et à faible valeur ajoutée (ex: gestion des commandes) avec des solutions IA simples et peu coûteuses.',
//               'Moyen terme (6-18 mois) : Optimiser les processus clés (ex: suivi de production) avec des outils IA plus sophistiqués nécessitant une formation des équipes.',
//               "Long terme (18-36 mois) : Intégrer des solutions IA avancées pour la prévision et la prise de décision stratégique, en s'appuyant sur les données collectées.",
//             ],
//             justification:
//               "Cette approche progressive permet de minimiser les risques, de former les équipes pas à pas et de s'assurer de la viabilité économique à chaque étape. Elle s'aligne sur les capacités techniques et humaines typiques des PME artisanales.",
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-8': {
//           result: {
//             summary:
//               "Identification des besoins en formation pour l'intégration de l'IA dans une PME artisanale de fabrication de meubles sur mesure.",
//             recommendations: [
//               "Formation aux outils de conception assistée par IA pour les artisans et designers, afin de maximiser l'utilisation des logiciels de modélisation 3D et de personnalisation.",
//               "Formation à l'analyse des données clients et des tendances du marché via des outils d'IA, pour le service commercial et marketing, afin d'améliorer la prise de décision.",
//               "Formation à la maintenance prédictive des machines-outils via l'IA, pour les équipes techniques, afin de réduire les temps d'arrêt et les coûts de maintenance.",
//             ],
//             justification:
//               "Ces formations ciblent les principaux domaines où l'IA peut apporter une valeur ajoutée immédiate : la conception, la relation client et la maintenance. Elles sont adaptées aux compétences existantes des équipes et aux besoins spécifiques de l'artisanat.",
//             rating: {
//               clarity: 4,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-9': {
//           result: {
//             summary:
//               "Identification de 3 opportunités concrètes d'intégration de l'IA pour une PME artisanale de fabrication de meubles sur mesure, avec gain potentiel, données nécessaires et compétences à mobiliser.",
//             recommendations: [
//               {
//                 opportunite: 'Optimisation des plans de découpe',
//                 gain_potentiel:
//                   "Réduction des chutes de matériaux (jusqu'à 20%), gain de temps en conception",
//                 donnees_necessaires:
//                   'Historique des découpes, dimensions des planches, contraintes techniques',
//                 competences:
//                   "Algorithmes d'optimisation, intégration avec logiciels de CAO",
//               },
//               {
//                 opportunite:
//                   'Assistant virtuel pour la personnalisation client',
//                 gain_potentiel:
//                   'Augmentation du taux de conversion (estimé +15%), réduction du temps de conception',
//                 donnees_necessaires:
//                   'Catalogue produits, préférences clients, contraintes techniques',
//                 competences: 'Chatbot avec NLP, base de connaissances produits',
//               },
//               {
//                 opportunite: 'Prédiction des délais de fabrication',
//                 gain_potentiel:
//                   'Amélioration de la satisfaction client (moins de retards), optimisation du planning',
//                 donnees_necessaires:
//                   'Historique des commandes, temps de fabrication, disponibilité des matériaux',
//                 competences:
//                   'Modèles prédictifs, analyse des données temporelles',
//               },
//             ],
//             justification:
//               'Ces opportunités ciblent des points critiques pour les artisans (gaspillage, relation client, gestion des délais) avec des technologies IA matures et des données généralement disponibles.',
//             rating: {
//               clarity: 5,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//         'task-10': {
//           result: {
//             summary:
//               "Évaluation des premières implémentations d'IA dans les processus prioritaires de la PME artisanale, avec ajustement des priorités et des ressources en fonction des résultats observés.",
//             recommendations: [
//               'Réaliser une analyse comparative des gains obtenus par rapport aux prévisions initiales pour identifier les écarts et leurs causes.',
//               "Ajuster la feuille de route en reclassant les processus en fonction de leur ROI réel et de la facilité d'implémentation observée.",
//             ],
//             justification:
//               "L'évaluation initiale était basée sur des hypothèses qui doivent être validées par des données réelles. Les ajustements permettront d'optimiser l'allocation des ressources et d'augmenter les chances de succès des prochaines implémentations.",
//             rating: {
//               clarity: 4,
//               relevance: 5,
//               impact: 4,
//             },
//           },
//         },
//       },
//     },
//   },
//   logs: [
//     {
//       type: 'info',
//       message:
//         '🚀 Nouveau workflow initialisé. Objectif enregistré : Imagine une stratégie d’innovation pour une PME du secteur artisanal souhaitant intégrer l’IA dans ses processus. Identifie les opportunités concrètes d’automatisation ou d’optimisation, les freins potentiels, et propose une feuille de route en 3 étapes.',
//     },
//     {
//       type: 'info',
//       message: '🧠 Objectif analysé avec succès : 10 tâches, 5 expertises.',
//     },
//     {
//       type: 'info',
//       message: '🤖 5 agents IA spécialisés créés à partir des expertises.',
//     },
//     {
//       type: 'info',
//       message: '🧠 Mémoire IA initialisée pour 5 agents et 10 tâches.',
//     },
//     {
//       type: 'info',
//       message: '📋 Plan stratégique généré avec 10 étapes.',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Analyse des processus actuels" exécutée par Agent Analyste métier',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Benchmark sectoriel" exécutée par Agent Expert sectoriel artisanal',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Identification des opportunités IA" exécutée par Agent Spécialiste IA',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Évaluation des freins" exécutée par Agent Consultant en transformation numérique',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Étude de faisabilité" exécutée par Agent Consultant en transformation numérique',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Priorisation des initiatives" exécutée par Agent Gestionnaire de projet',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Définition de la feuille de route" exécutée par Agent Gestionnaire de projet',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Plan de formation" exécutée par Agent Consultant en transformation numérique',
//     },
//     {
//       type: 'info',
//       message: '✅ Tâche "Prototypage" exécutée par Agent Spécialiste IA',
//     },
//     {
//       type: 'info',
//       message:
//         '✅ Tâche "Évaluation et ajustement" exécutée par Agent Gestionnaire de projet',
//     },
//   ],
//   output: null,
//   validation: null,
//   expertises: [
//     'Consultant en transformation numérique',
//     'Spécialiste IA',
//     'Analyste métier',
//     'Expert sectoriel artisanal',
//     'Gestionnaire de projet',
//   ],
// };

const state_final_result = {
  workflowId: '2f0052eb-0a3e-4aed-9eec-1907e7bd89fb',
  objective: {
    customText:
      'Proposer une stratégie pour améliorer le suivi des patients chroniques dans un cabinet de médecine générale',
  },
  memory: {
    content: {
      byAgent: {
        'agent-1-organisation': [
          {
            task: {
              name: 'Identification des obstacles actuels',
              description:
                'Recenser les difficultés rencontrées dans le suivi des patients chroniques (temps, outils, coordination).',
              priority: 'high',
            },
            output: {
              result: {
                summary:
                  'Trois obstacles majeurs ont été identifiés : manque de temps en consultation, absence d’outils centralisés et difficulté de coordination avec les autres professionnels de santé.',
                recommendations: [
                  'Mettre en place des consultations dédiées aux patients chroniques.',
                  'Utiliser un logiciel de suivi partagé avec rappels automatisés.',
                  'Créer un canal de communication avec les infirmiers et pharmaciens de ville.',
                ],
                justification:
                  'Ces freins sont fréquents dans les cabinets de médecine générale et nuisent à la continuité et à la qualité du suivi à long terme.',
              },
            },
          },
        ],
        'agent-2-stratégie': [
          {
            task: {
              name: "Élaboration d'un plan d'action structuré",
              description:
                "Définir une feuille de route pour la mise en œuvre progressive de mesures d'amélioration.",
              priority: 'high',
            },
            output: {
              result: {
                summary:
                  'Un plan en trois étapes a été proposé pour améliorer durablement le suivi des patients chroniques dans le cabinet.',
                recommendations: [
                  'Phase 1 : Sensibilisation de l’équipe médicale et recueil des besoins.',
                  'Phase 2 : Test d’un outil de suivi partagé sur un échantillon de patients.',
                  'Phase 3 : Généralisation et intégration dans les pratiques courantes.',
                ],
                justification:
                  'Cette démarche progressive permet d’ajuster les solutions au terrain et d’assurer leur acceptation par les soignants.',
                rating: {
                  clarity: 5,
                  relevance: 5,
                  impact: 4,
                },
              },
            },
          },
        ],
      },
    },
  },
  logs: [
    {
      type: 'info',
      message:
        '🚀 Nouveau workflow initialisé. Objectif enregistré : Proposer une stratégie pour améliorer le suivi des patients chroniques dans un cabinet de médecine générale.',
    },
  ],
};

export const MOCK_RUN_WORKFLOW = {
  userId: 'user-1',
  workflowId: state_final_result.workflowId,
  state: state_final_result,
};
