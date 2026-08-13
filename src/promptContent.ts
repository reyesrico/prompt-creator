import type { Language } from './i18n'

export type DomainKey = 'marketing' | 'finance' | 'health' | 'people' | 'digital' | 'general'

type PromptContent = {
  title: string
  headings: Record<'domain' | 'role' | 'context' | 'objective' | 'users' | 'requirements' | 'constraints' | 'method' | 'deliverables' | 'success' | 'style', string>
  domains: Record<DomainKey, string>
  role: (domain: string) => string
  professional: string
  personal: string
  available: string
  availableFallback: string
  objectiveFallback: string
  usersFallback: string
  userRequirements: string
  requirementsFallback: string
  domainRequirements: string
  requirements: (domain: string) => string
  marketingRequirements: string
  userConstraints: string
  constraintsFallback: string
  domainGuardrails: string
  guardrails: string
  methods: string[]
  deliverables: string[]
  marketingDeliverables: string[]
  successFallback: string
  style: string
  errors: { title: string; objective: string; success: string; fence: string }
}

export const promptContent: Record<Language, PromptContent> = {
  en: {
    title: 'Project Creation Prompt',
    headings: { domain: 'Domain', role: 'Role', context: 'Context', objective: 'Objective', users: 'Intended Users', requirements: 'Essential Requirements', constraints: 'Constraints and Guardrails', method: 'Working Method', deliverables: 'Deliverables', success: 'Success Criteria', style: 'Response Style' },
    domains: { marketing: 'Marketing analytics and reporting', finance: 'Finance and business analysis', health: 'Health, learning, and accessibility', people: 'People operations', digital: 'Digital product development', general: 'General project planning' },
    role: (domain) => `Act as a senior specialist in ${domain}, using established professional methods and explaining decisions in plain language for a non-developer.`,
    professional: 'Professional or organizational', personal: 'Personal or community', available: 'Available knowledge and materials',
    availableFallback: 'Ask what source material or subject expertise I can provide before making assumptions.', objectiveFallback: 'Turn this idea into a practical, responsible, and complete project plan, then implement it step by step.',
    usersFallback: 'Identify the primary users and confirm their needs, abilities, context, and accessibility requirements.', userRequirements: 'User-provided requirements', requirementsFallback: 'No detailed requirements have been confirmed yet.', domainRequirements: 'Domain requirements',
    requirements: (domain) => `Apply the standards and decision methods appropriate to ${domain}. Translate the stated goal into specific, testable requirements and preserve traceability to supplied evidence.`,
    marketingRequirements: 'Turn the business questions and source columns into explicit metrics, formulas, comparisons, and decision-ready findings. Preserve traceability to every source file.',
    userConstraints: 'User-provided constraints', constraintsFallback: 'No additional constraints have been confirmed yet.', domainGuardrails: 'Domain guardrails',
    guardrails: 'Do not invent domain facts, values, definitions, or requirements. Label assumptions, protect confidential information, and flag decisions requiring a qualified expert.',
    methods: ['Restate the goal and list assumptions.', 'Ask concise questions only when an answer would materially change the result.', 'Allow questions to be skipped and proceed with clearly labeled reasonable defaults.', 'Propose a phased plan before implementation.', 'Map every outcome to an input, method, output, and acceptance check.', 'Use proven standards and tools appropriate to the domain.', 'Flag legal, medical, financial, security, privacy, or accessibility risks for expert review.', 'Verify the final work against source material and success criteria.'],
    deliverables: ['A concise project brief and clearly stated scope.', 'Intended users or stakeholders and their needs.', 'Prioritized requirements with acceptance criteria.', 'A practical approach, milestones, risks, and mitigations.', 'The requested final output and a verification checklist.'],
    marketingDeliverables: ['A source-data inventory and data dictionary for every required column.', 'A validation plan for missing values, duplicates, types, date ranges, and labels.', 'Explicit formulas and business rules for spend, leads, conversions, revenue, and return on investment.', 'Prioritized findings explaining what happened, why it matters, and which action should follow.', 'A reproducible dashboard specification and a reconciliation checklist against source files.'],
    successFallback: 'Define measurable outcomes with me and verify the final result against every agreed requirement.',
    style: 'Use clear headings, concise explanations, concrete examples, and actionable next steps. Avoid unexplained technical terms. Do not invent facts; label assumptions and request confirmation when risk is meaningful.',
    errors: { title: 'A level-one title is required.', objective: 'The objective section is required.', success: 'Success criteria are required.', fence: 'A code block is not closed.' },
  },
  es: {
    title: 'Prompt para crear el proyecto',
    headings: { domain: 'Área', role: 'Rol', context: 'Contexto', objective: 'Objetivo', users: 'Usuarios previstos', requirements: 'Requisitos esenciales', constraints: 'Restricciones y salvaguardas', method: 'Método de trabajo', deliverables: 'Entregables', success: 'Criterios de éxito', style: 'Estilo de respuesta' },
    domains: { marketing: 'Análisis e informes de marketing', finance: 'Finanzas y análisis empresarial', health: 'Salud, aprendizaje y accesibilidad', people: 'Operaciones de personas', digital: 'Desarrollo de productos digitales', general: 'Planificación general de proyectos' },
    role: (domain) => `Actúa como especialista sénior en ${domain}, aplica métodos profesionales consolidados y explica las decisiones en lenguaje claro para una persona no desarrolladora.`,
    professional: 'Profesional u organizacional', personal: 'Personal o comunitario', available: 'Conocimientos y materiales disponibles',
    availableFallback: 'Pregunta qué materiales de referencia o experiencia puedo aportar antes de asumir información.', objectiveFallback: 'Convierte esta idea en un plan de proyecto práctico, responsable y completo, y después impleméntalo paso a paso.',
    usersFallback: 'Identifica a los usuarios principales y confirma sus necesidades, capacidades, contexto y requisitos de accesibilidad.', userRequirements: 'Requisitos aportados por el usuario', requirementsFallback: 'Aún no se han confirmado requisitos detallados.', domainRequirements: 'Requisitos del área',
    requirements: (domain) => `Aplica las normas y métodos de decisión adecuados para ${domain}. Convierte el objetivo en requisitos específicos y verificables, manteniendo la trazabilidad con las evidencias aportadas.`,
    marketingRequirements: 'Convierte las preguntas de negocio y las columnas de origen en métricas, fórmulas, comparaciones y conclusiones accionables. Mantén la trazabilidad con cada archivo de origen.',
    userConstraints: 'Restricciones aportadas por el usuario', constraintsFallback: 'Aún no se han confirmado restricciones adicionales.', domainGuardrails: 'Salvaguardas del área',
    guardrails: 'No inventes hechos, valores, definiciones ni requisitos. Identifica las suposiciones, protege la información confidencial y señala las decisiones que requieran una persona experta.',
    methods: ['Reformula el objetivo y enumera las suposiciones.', 'Haz preguntas breves solo cuando la respuesta cambie materialmente el resultado.', 'Permite omitir preguntas y continúa con valores razonables claramente identificados.', 'Propón un plan por fases antes de implementar.', 'Relaciona cada resultado con una entrada, un método, una salida y una comprobación.', 'Usa normas y herramientas probadas del área.', 'Señala riesgos legales, médicos, financieros, de seguridad, privacidad o accesibilidad.', 'Verifica el trabajo final con los materiales de origen y los criterios de éxito.'],
    deliverables: ['Un resumen conciso del proyecto y su alcance.', 'Usuarios o partes interesadas y sus necesidades.', 'Requisitos priorizados con criterios de aceptación.', 'Enfoque práctico, hitos, riesgos y medidas de mitigación.', 'Resultado final solicitado y lista de verificación.'],
    marketingDeliverables: ['Inventario de datos y diccionario de cada columna necesaria.', 'Plan de validación para valores ausentes, duplicados, tipos, fechas y etiquetas.', 'Fórmulas y reglas para inversión, clientes potenciales, conversiones, ingresos y retorno de inversión.', 'Conclusiones priorizadas que expliquen qué ocurrió, por qué importa y qué acción tomar.', 'Especificación reproducible del panel y conciliación con los archivos de origen.'],
    successFallback: 'Define conmigo resultados medibles y verifica el resultado final con cada requisito acordado.',
    style: 'Usa títulos claros, explicaciones breves, ejemplos concretos y próximos pasos accionables. Evita términos técnicos sin explicar. No inventes hechos; identifica las suposiciones y pide confirmación cuando exista un riesgo importante.',
    errors: { title: 'Se requiere un título de nivel uno.', objective: 'Se requiere la sección de objetivo.', success: 'Se requieren criterios de éxito.', fence: 'Hay un bloque de código sin cerrar.' },
  },
  fr: {
    title: 'Prompt de création du projet',
    headings: { domain: 'Domaine', role: 'Rôle', context: 'Contexte', objective: 'Objectif', users: 'Utilisateurs visés', requirements: 'Exigences essentielles', constraints: 'Contraintes et garde-fous', method: 'Méthode de travail', deliverables: 'Livrables', success: 'Critères de réussite', style: 'Style de réponse' },
    domains: { marketing: 'Analyse et reporting marketing', finance: 'Finance et analyse métier', health: 'Santé, apprentissage et accessibilité', people: 'Gestion des personnes', digital: 'Développement de produits numériques', general: 'Planification générale de projet' },
    role: (domain) => `Agissez comme spécialiste senior en ${domain}, appliquez des méthodes professionnelles reconnues et expliquez les décisions clairement à une personne non développeuse.`,
    professional: 'Professionnel ou organisationnel', personal: 'Personnel ou communautaire', available: 'Connaissances et ressources disponibles',
    availableFallback: 'Demandez quelles sources ou compétences je peux fournir avant de faire des hypothèses.', objectiveFallback: 'Transformez cette idée en un plan de projet pratique, responsable et complet, puis mettez-le en œuvre étape par étape.',
    usersFallback: 'Identifiez les utilisateurs principaux et confirmez leurs besoins, capacités, contexte et exigences d’accessibilité.', userRequirements: 'Exigences fournies par l’utilisateur', requirementsFallback: 'Aucune exigence détaillée n’est encore confirmée.', domainRequirements: 'Exigences du domaine',
    requirements: (domain) => `Appliquez les normes et méthodes de décision adaptées à ${domain}. Transformez l’objectif en exigences précises et vérifiables, reliées aux éléments fournis.`,
    marketingRequirements: 'Transformez les questions métier et colonnes sources en métriques, formules, comparaisons et conclusions exploitables. Conservez la traçabilité de chaque fichier source.',
    userConstraints: 'Contraintes fournies par l’utilisateur', constraintsFallback: 'Aucune contrainte supplémentaire n’est encore confirmée.', domainGuardrails: 'Garde-fous du domaine',
    guardrails: 'N’inventez ni faits, ni valeurs, ni définitions, ni exigences. Signalez les hypothèses, protégez les informations confidentielles et indiquez les décisions nécessitant un expert qualifié.',
    methods: ['Reformulez l’objectif et listez les hypothèses.', 'Posez des questions concises uniquement si la réponse modifie réellement le résultat.', 'Permettez de passer des questions et utilisez des valeurs raisonnables clairement signalées.', 'Proposez un plan par phases avant la mise en œuvre.', 'Reliez chaque résultat à une entrée, une méthode, une sortie et un contrôle.', 'Utilisez les normes et outils éprouvés du domaine.', 'Signalez les risques juridiques, médicaux, financiers, de sécurité, de confidentialité ou d’accessibilité.', 'Vérifiez le travail final avec les sources et critères de réussite.'],
    deliverables: ['Un brief concis et un périmètre clair.', 'Les utilisateurs ou parties prenantes et leurs besoins.', 'Des exigences prioritaires avec critères d’acceptation.', 'Une approche pratique, des jalons, risques et mesures.', 'Le résultat demandé et une liste de vérification.'],
    marketingDeliverables: ['Un inventaire des données et un dictionnaire des colonnes.', 'Un plan de validation des valeurs manquantes, doublons, types, dates et libellés.', 'Des formules et règles pour dépenses, prospects, conversions, revenus et retour sur investissement.', 'Des constats prioritaires expliquant les faits, leur importance et l’action à mener.', 'Une spécification reproductible du tableau de bord et un rapprochement avec les sources.'],
    successFallback: 'Définissez avec moi des résultats mesurables et vérifiez le résultat final par rapport à chaque exigence.',
    style: 'Utilisez des titres clairs, des explications brèves, des exemples concrets et des prochaines étapes. Évitez le jargon non expliqué. N’inventez pas de faits ; signalez les hypothèses et demandez confirmation en cas de risque.',
    errors: { title: 'Un titre de niveau un est requis.', objective: 'La section objectif est requise.', success: 'Les critères de réussite sont requis.', fence: 'Un bloc de code n’est pas fermé.' },
  },
  de: {
    title: 'Prompt zur Projekterstellung',
    headings: { domain: 'Fachgebiet', role: 'Rolle', context: 'Kontext', objective: 'Ziel', users: 'Vorgesehene Nutzer', requirements: 'Wesentliche Anforderungen', constraints: 'Einschränkungen und Leitplanken', method: 'Arbeitsmethode', deliverables: 'Ergebnisse', success: 'Erfolgskriterien', style: 'Antwortstil' },
    domains: { marketing: 'Marketinganalyse und Berichtswesen', finance: 'Finanz- und Geschäftsanalyse', health: 'Gesundheit, Lernen und Barrierefreiheit', people: 'Personalprozesse', digital: 'Digitale Produktentwicklung', general: 'Allgemeine Projektplanung' },
    role: (domain) => `Handle als erfahrene Fachkraft für ${domain}, nutze bewährte professionelle Methoden und erkläre Entscheidungen verständlich für Nichtentwickler.`,
    professional: 'Beruflich oder organisatorisch', personal: 'Persönlich oder gemeinschaftlich', available: 'Verfügbares Wissen und Material',
    availableFallback: 'Frage vor Annahmen, welche Quellen oder Fachkenntnisse ich bereitstellen kann.', objectiveFallback: 'Verwandle diese Idee in einen praktischen, verantwortungsvollen und vollständigen Projektplan und setze ihn schrittweise um.',
    usersFallback: 'Bestimme die Hauptnutzer und bestätige ihre Bedürfnisse, Fähigkeiten, ihren Kontext und Anforderungen an Barrierefreiheit.', userRequirements: 'Vom Nutzer genannte Anforderungen', requirementsFallback: 'Es wurden noch keine detaillierten Anforderungen bestätigt.', domainRequirements: 'Fachliche Anforderungen',
    requirements: (domain) => `Wende die für ${domain} geeigneten Standards und Entscheidungsmethoden an. Übersetze das Ziel in konkrete, prüfbare Anforderungen und erhalte die Rückverfolgbarkeit zu den Quellen.`,
    marketingRequirements: 'Übersetze Geschäftsfragen und Quellspalten in eindeutige Kennzahlen, Formeln, Vergleiche und handlungsreife Erkenntnisse. Erhalte die Rückverfolgbarkeit zu jeder Quelldatei.',
    userConstraints: 'Vom Nutzer genannte Einschränkungen', constraintsFallback: 'Es wurden noch keine weiteren Einschränkungen bestätigt.', domainGuardrails: 'Fachliche Leitplanken',
    guardrails: 'Erfinde keine Fakten, Werte, Definitionen oder Anforderungen. Kennzeichne Annahmen, schütze vertrauliche Informationen und markiere Entscheidungen, die qualifizierte Fachprüfung benötigen.',
    methods: ['Formuliere das Ziel neu und liste Annahmen auf.', 'Stelle kurze Fragen nur, wenn die Antwort das Ergebnis wesentlich ändert.', 'Erlaube das Überspringen und nutze klar gekennzeichnete vernünftige Standardwerte.', 'Schlage vor der Umsetzung einen Phasenplan vor.', 'Ordne jedem Ergebnis Eingabe, Methode, Ausgabe und Prüfung zu.', 'Nutze bewährte Standards und Werkzeuge des Fachgebiets.', 'Markiere rechtliche, medizinische, finanzielle, Sicherheits-, Datenschutz- oder Barrierefreiheitsrisiken.', 'Prüfe das Endergebnis anhand der Quellen und Erfolgskriterien.'],
    deliverables: ['Eine kurze Projektbeschreibung mit klarem Umfang.', 'Nutzer oder Beteiligte und ihre Bedürfnisse.', 'Priorisierte Anforderungen mit Abnahmekriterien.', 'Ein praktischer Ansatz mit Meilensteinen, Risiken und Maßnahmen.', 'Das gewünschte Endergebnis und eine Prüfliste.'],
    marketingDeliverables: ['Dateninventar und Datenwörterbuch aller benötigten Spalten.', 'Validierungsplan für fehlende Werte, Duplikate, Typen, Datumsbereiche und Bezeichnungen.', 'Formeln und Regeln für Ausgaben, Leads, Conversions, Umsatz und Kapitalrendite.', 'Priorisierte Erkenntnisse mit Bedeutung und nächster Maßnahme.', 'Reproduzierbare Dashboard-Spezifikation und Abgleich mit den Quelldateien.'],
    successFallback: 'Definiere mit mir messbare Ergebnisse und prüfe das Endergebnis gegen jede vereinbarte Anforderung.',
    style: 'Nutze klare Überschriften, kurze Erklärungen, konkrete Beispiele und umsetzbare nächste Schritte. Vermeide unerklärte Fachbegriffe. Erfinde keine Fakten; kennzeichne Annahmen und bitte bei wesentlichem Risiko um Bestätigung.',
    errors: { title: 'Eine Überschrift erster Ebene ist erforderlich.', objective: 'Der Abschnitt Ziel ist erforderlich.', success: 'Erfolgskriterien sind erforderlich.', fence: 'Ein Codeblock ist nicht geschlossen.' },
  },
  zh: {
    title: '项目创建提示词',
    headings: { domain: '领域', role: '角色', context: '背景', objective: '目标', users: '目标用户', requirements: '核心要求', constraints: '限制与保障', method: '工作方法', deliverables: '交付成果', success: '成功标准', style: '回复风格' },
    domains: { marketing: '营销分析与报告', finance: '财务与业务分析', health: '健康、学习与无障碍', people: '人员运营', digital: '数字产品开发', general: '通用项目规划' },
    role: (domain) => `担任${domain}领域的资深专家，采用成熟的专业方法，并以非开发人员能够理解的语言解释决策。`,
    professional: '专业或组织项目', personal: '个人或社区项目', available: '可用知识与材料',
    availableFallback: '在作出假设前，询问我可以提供哪些资料或专业知识。', objectiveFallback: '将这一想法转化为切实、负责且完整的项目计划，然后分步骤实施。',
    usersFallback: '识别主要用户，并确认其需求、能力、使用场景和无障碍要求。', userRequirements: '用户提供的要求', requirementsFallback: '尚未确认详细要求。', domainRequirements: '领域要求',
    requirements: (domain) => `采用适用于${domain}的标准和决策方法，将目标转化为具体、可验证的要求，并保持与所提供证据的可追溯性。`,
    marketingRequirements: '将业务问题和源数据列转化为明确的指标、公式、比较和可执行结论，并保持对每个源文件的可追溯性。',
    userConstraints: '用户提供的限制', constraintsFallback: '尚未确认其他限制。', domainGuardrails: '领域保障',
    guardrails: '不得编造领域事实、数值、定义或要求。标明假设，保护机密信息，并指出需要合格专家审查的决策。',
    methods: ['重述目标并列出假设。', '仅在答案会实质改变结果时提出简短问题。', '允许跳过问题，并使用明确标注的合理默认值。', '实施前提出分阶段计划。', '将每项成果对应到输入、方法、输出和验收检查。', '使用该领域成熟的标准和工具。', '标明需要专家审查的法律、医疗、财务、安全、隐私或无障碍风险。', '根据源材料和成功标准验证最终成果。'],
    deliverables: ['简洁的项目说明和明确范围。', '目标用户或利益相关者及其需求。', '带验收标准的优先级要求。', '切实的方法、里程碑、风险和缓解措施。', '所需最终成果和验证清单。'],
    marketingDeliverables: ['所需数据列的清单和数据字典。', '针对缺失值、重复项、类型、日期范围和标签的验证计划。', '支出、潜在客户、转化率、收入和投资回报率的公式与业务规则。', '解释发生了什么、为何重要以及应采取何种行动的优先结论。', '可复现的仪表板规格以及与源文件的核对清单。'],
    successFallback: '与我共同定义可衡量的成果，并根据每项已确认要求验证最终结果。',
    style: '使用清晰标题、简洁解释、具体示例和可执行的后续步骤。避免使用未解释的技术术语。不得编造事实；标明假设，并在存在重大风险时请求确认。',
    errors: { title: '需要一级标题。', objective: '需要目标部分。', success: '需要成功标准。', fence: '代码块未闭合。' },
  },
  ar: {
    title: 'مطالبة إنشاء المشروع',
    headings: { domain: 'المجال', role: 'الدور', context: 'السياق', objective: 'الهدف', users: 'المستخدمون المستهدفون', requirements: 'المتطلبات الأساسية', constraints: 'القيود والضوابط', method: 'منهجية العمل', deliverables: 'المخرجات', success: 'معايير النجاح', style: 'أسلوب الاستجابة' },
    domains: { marketing: 'تحليلات التسويق وإعداد التقارير', finance: 'التحليل المالي والتجاري', health: 'الصحة والتعلم وإمكانية الوصول', people: 'عمليات الأفراد', digital: 'تطوير المنتجات الرقمية', general: 'التخطيط العام للمشروعات' },
    role: (domain) => `اعمل كخبير أول في ${domain}، واستخدم أساليب مهنية مثبتة واشرح القرارات بلغة واضحة لغير المطورين.`,
    professional: 'مهني أو مؤسسي', personal: 'شخصي أو مجتمعي', available: 'المعرفة والمواد المتاحة',
    availableFallback: 'اسأل عن المصادر أو الخبرات التي يمكنني تقديمها قبل وضع الافتراضات.', objectiveFallback: 'حوّل هذه الفكرة إلى خطة مشروع عملية ومسؤولة ومتكاملة، ثم نفذها خطوة بخطوة.',
    usersFallback: 'حدد المستخدمين الأساسيين وتأكد من احتياجاتهم وقدراتهم وسياقهم ومتطلبات إمكانية الوصول.', userRequirements: 'المتطلبات المقدمة من المستخدم', requirementsFallback: 'لم يتم تأكيد متطلبات تفصيلية بعد.', domainRequirements: 'متطلبات المجال',
    requirements: (domain) => `طبّق المعايير وأساليب القرار المناسبة لـ${domain}. حوّل الهدف إلى متطلبات محددة وقابلة للاختبار مع الحفاظ على إمكانية تتبع الأدلة المقدمة.`,
    marketingRequirements: 'حوّل أسئلة العمل وأعمدة المصدر إلى مقاييس وصيغ ومقارنات ونتائج قابلة للتنفيذ، مع الحفاظ على إمكانية التتبع لكل ملف مصدر.',
    userConstraints: 'القيود المقدمة من المستخدم', constraintsFallback: 'لم يتم تأكيد قيود إضافية بعد.', domainGuardrails: 'ضوابط المجال',
    guardrails: 'لا تخترع حقائق أو قيماً أو تعريفات أو متطلبات. وضّح الافتراضات واحمِ المعلومات السرية وحدد القرارات التي تحتاج إلى مراجعة خبير مؤهل.',
    methods: ['أعد صياغة الهدف واسرد الافتراضات.', 'اطرح أسئلة موجزة فقط عندما تغير الإجابة النتيجة فعلياً.', 'اسمح بتخطي الأسئلة واستخدم افتراضات معقولة ومعلّمة بوضوح.', 'اقترح خطة مرحلية قبل التنفيذ.', 'اربط كل نتيجة بمدخل وطريقة ومخرج واختبار قبول.', 'استخدم معايير وأدوات مثبتة ومناسبة للمجال.', 'حدد المخاطر القانونية أو الطبية أو المالية أو الأمنية أو المتعلقة بالخصوصية وإمكانية الوصول.', 'تحقق من العمل النهائي مقابل المصادر ومعايير النجاح.'],
    deliverables: ['موجز مشروع مختصر ونطاق واضح.', 'المستخدمون أو أصحاب المصلحة واحتياجاتهم.', 'متطلبات مرتبة حسب الأولوية مع معايير قبول.', 'نهج عملي ومراحل ومخاطر وإجراءات تخفيف.', 'المخرج النهائي المطلوب وقائمة تحقق.'],
    marketingDeliverables: ['قائمة بمصادر البيانات وقاموس لكل عمود مطلوب.', 'خطة للتحقق من القيم المفقودة والتكرار والأنواع والتواريخ والتسميات.', 'صيغ وقواعد للإنفاق والعملاء المحتملين والتحويلات والإيرادات والعائد على الاستثمار.', 'نتائج مرتبة تشرح ما حدث وأهميته والإجراء التالي.', 'مواصفات لوحة قابلة للتكرار وقائمة مطابقة مع ملفات المصدر.'],
    successFallback: 'حدد معي نتائج قابلة للقياس وتحقق من النتيجة النهائية مقابل كل متطلب متفق عليه.',
    style: 'استخدم عناوين واضحة وشروحات موجزة وأمثلة محددة وخطوات تالية قابلة للتنفيذ. تجنب المصطلحات التقنية غير المشروحة. لا تخترع حقائق؛ وضّح الافتراضات واطلب التأكيد عند وجود مخاطر مهمة.',
    errors: { title: 'يلزم عنوان من المستوى الأول.', objective: 'يلزم قسم الهدف.', success: 'تلزم معايير النجاح.', fence: 'هناك كتلة برمجية غير مغلقة.' },
  },
}