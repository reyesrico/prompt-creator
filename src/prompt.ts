import type { Language } from './i18n'
import { promptContent, type DomainKey } from './promptContent'

export type ProjectType = 'professional' | 'personal'
export type Answers = Record<string, string>

export const questions = [
  { key: 'audience' }, { key: 'outcome' }, { key: 'features' },
  { key: 'context' }, { key: 'constraints' }, { key: 'success' },
]

export const exampleBriefs: Record<Language, string> = {
  en: 'Create a marketing campaign performance dashboard that combines monthly Excel reports from email, social media, and paid advertising. Marketing managers need to compare spend, leads, conversions, revenue, and return on investment, identify underperforming campaigns, and receive clear recommendations for the next budget cycle.',
  es: 'Crear un panel de rendimiento de campañas de marketing que combine informes mensuales de Excel de correo electrónico, redes sociales y publicidad pagada. Los responsables de marketing necesitan comparar inversión, clientes potenciales, conversiones, ingresos y retorno de inversión, detectar campañas de bajo rendimiento y recibir recomendaciones claras para el próximo ciclo presupuestario.',
  fr: 'Créer un tableau de bord des performances marketing qui combine les rapports Excel mensuels des campagnes e-mail, des réseaux sociaux et de la publicité payante. Les responsables marketing doivent comparer les dépenses, prospects, conversions, revenus et retour sur investissement, repérer les campagnes peu performantes et obtenir des recommandations claires pour le prochain budget.',
  de: 'Erstelle ein Dashboard zur Leistung von Marketingkampagnen, das monatliche Excel-Berichte aus E-Mail, sozialen Medien und bezahlter Werbung zusammenführt. Marketingverantwortliche sollen Ausgaben, Leads, Conversions, Umsatz und Kapitalrendite vergleichen, schwache Kampagnen erkennen und klare Empfehlungen für die nächste Budgetrunde erhalten.',
  zh: '创建一个营销活动绩效仪表板，汇总电子邮件、社交媒体和付费广告的月度 Excel 报告。营销经理需要比较支出、潜在客户、转化率、收入和投资回报率，识别表现不佳的活动，并为下一轮预算获得明确建议。',
  ar: 'إنشاء لوحة معلومات لأداء الحملات التسويقية تجمع تقارير Excel الشهرية للبريد الإلكتروني ووسائل التواصل الاجتماعي والإعلانات المدفوعة. يحتاج مديرو التسويق إلى مقارنة الإنفاق والعملاء المحتملين والتحويلات والإيرادات والعائد على الاستثمار، وتحديد الحملات ضعيفة الأداء، والحصول على توصيات واضحة لدورة الميزانية التالية.',
}

const professionalTerms = [
  'business', 'company', 'team', 'customer', 'employee', 'report', 'finance', 'marketing', 'sales',
  'empresa', 'equipo', 'cliente', 'informe', 'finanzas', 'ventas', 'entreprise', 'équipe', 'rapport',
  'unternehmen', 'kunde', 'bericht', 'finanzen', 'vertrieb', '公司', '团队', '客户', '报告', '财务', '营销', '销售',
  'شركة', 'فريق', 'عميل', 'تقرير', 'مالية', 'تسويق', 'مبيعات',
]

const domainTerms: Record<Exclude<DomainKey, 'general'>, string[]> = {
  marketing: ['marketing', 'campaign', 'leads', 'conversion', 'advertising', 'campaña', 'conversión', 'publicidad', 'campagne', 'publicité', 'kampagne', 'werbung', '营销', '广告', '转化', 'تسويق', 'حملة', 'إعلانات'],
  finance: ['finance', 'financial', 'bank', 'budget', 'accounting', 'finanzas', 'presupuesto', 'contabilidad', 'banque', 'comptabilité', 'finanzen', 'buchhaltung', '财务', '银行', '预算', '会计', 'مالية', 'بنك', 'ميزانية', 'محاسبة'],
  health: ['health', 'medical', 'patient', 'clinical', 'biology', 'salud', 'médico', 'paciente', 'biología', 'santé', 'médical', 'gesundheit', 'medizin', '健康', '医疗', '患者', 'الصحة', 'طبي', 'مريض'],
  people: ['human resources', 'employee', 'recruit', 'training', 'recursos humanos', 'empleado', 'contratación', 'ressources humaines', 'recrutement', 'personalwesen', 'mitarbeiter', '人力资源', '员工', '招聘', 'الموارد البشرية', 'موظف', 'توظيف'],
  digital: ['software', 'web app', 'mobile app', 'website', 'platform', 'system', 'aplicación', 'sitio web', 'système', 'anwendung', '系统', '应用', '网站', 'تطبيق', 'موقع', 'نظام'],
}

export function cleanMarkdown(value: string) {
  return value.trim().replace(/```/g, '`` `')
}

export function classify(brief: string): ProjectType {
  const normalized = brief.toLowerCase()
  return professionalTerms.some((term) => normalized.includes(term)) ? 'professional' : 'personal'
}

function detectDomain(source: string): DomainKey {
  const normalized = source.toLowerCase()
  const match = (key: Exclude<DomainKey, 'general'>) => domainTerms[key].some((term) => normalized.includes(term))
  if (match('marketing')) return 'marketing'
  if (match('finance')) return 'finance'
  if (match('health')) return 'health'
  if (match('people')) return 'people'
  if (match('digital')) return 'digital'
  return 'general'
}

export function buildPrompt(brief: string, projectType: ProjectType, answers: Answers, language: Language) {
  const content = promptContent[language]
  const value = (key: string, fallback: string) => cleanMarkdown(answers[key] || fallback)
  const domainKey = detectDomain(`${brief} ${Object.values(answers).join(' ')}`)
  const domain = content.domains[domainKey]
  const requirements = domainKey === 'marketing' ? content.marketingRequirements : content.requirements(domain)
  const deliverables = domainKey === 'marketing' ? content.marketingDeliverables : content.deliverables
  const methodList = content.methods.map((item, index) => `${index + 1}. ${item}`).join('\n')
  const deliverableList = deliverables.map((item) => `- ${item}`).join('\n')
  const heading = (key: keyof typeof content.headings) => content.headings[key]

  return `# ${content.title}

## ${heading('domain')}
${domain}

## ${heading('role')}
${content.role(domain)}

## ${heading('context')}
${cleanMarkdown(brief)}

${projectType === 'professional' ? content.professional : content.personal}.
${content.available}: ${value('context', content.availableFallback)}

## ${heading('objective')}
${value('outcome', content.objectiveFallback)}

## ${heading('users')}
${value('audience', content.usersFallback)}

## ${heading('requirements')}
${content.userRequirements}: ${value('features', content.requirementsFallback)}

${content.domainRequirements}: ${requirements}

## ${heading('constraints')}
${content.userConstraints}: ${value('constraints', content.constraintsFallback)}

${content.domainGuardrails}: ${content.guardrails}

## ${heading('method')}
${methodList}

## ${heading('deliverables')}
${deliverableList}

## ${heading('success')}
${value('success', content.successFallback)}

## ${heading('style')}
${content.style}
`
}

export function validateMarkdown(markdown: string, language: Language) {
  const content = promptContent[language]
  const errors: string[] = []
  if (!markdown.trim().startsWith('# ')) errors.push(content.errors.title)
  if (!markdown.includes(`## ${content.headings.objective}`)) errors.push(content.errors.objective)
  if (!markdown.includes(`## ${content.headings.success}`)) errors.push(content.errors.success)
  if ((markdown.match(/```/g) || []).length % 2 !== 0) errors.push(content.errors.fence)
  return errors
}