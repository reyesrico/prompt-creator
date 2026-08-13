export type ProjectType = 'professional' | 'personal'
export type Answers = Record<string, string>

export const questions = [
  { key: 'audience', text: 'Who will use this project, and what should be accessible or easy for them?' },
  { key: 'outcome', text: 'What is the most important result this project should achieve?' },
  { key: 'features', text: 'Which capabilities or deliverables are essential?' },
  { key: 'context', text: 'What information, expertise, or materials can you provide?' },
  { key: 'constraints', text: 'Are there limits around time, budget, technology, privacy, safety, or regulation?' },
  { key: 'success', text: 'How will you know the result is useful and successful?' },
]

export const exampleBrief = 'Create a marketing campaign performance dashboard that combines monthly Excel reports from email, social media, and paid advertising. Marketing managers need to compare spend, leads, conversions, revenue, and return on investment, identify underperforming campaigns, and receive clear recommendations for the next budget cycle.'

const professionalTerms = [
  'business', 'company', 'team', 'customer', 'client', 'employee', 'report', 'finance', 'health',
  'marketing', 'sales', 'research', 'engineering', 'legal', 'retail', 'bank', 'management', 'logistics',
  'empresa', 'equipo', 'cliente', 'informe', 'finanzas', 'salud', 'ventas', 'investigación',
]

export function cleanMarkdown(value: string) {
  return value.trim().replace(/```/g, '`` `')
}

export function classify(brief: string): ProjectType {
  const normalized = brief.toLowerCase()
  return professionalTerms.some((term) => normalized.includes(term)) ? 'professional' : 'personal'
}

type DomainProfile = {
  name: string
  role: string
  requirements: string
  guardrails: string
  deliverables: string[]
}

function getDomainProfile(source: string): DomainProfile {
  const text = source.toLowerCase()
  const matches = (...terms: string[]) => terms.some((term) => text.includes(term))

  if (matches('marketing', 'campaign', 'leads', 'conversion', 'advertising') && matches('excel', 'report', 'sales', 'cost', 'revenue', 'data')) {
    return {
      name: 'Marketing analytics and reporting',
      role: 'Act as a senior marketing analytics consultant and data analyst with strong Excel reporting, KPI design, data-quality, and business-communication expertise.',
      requirements: 'Turn the stated business questions and source columns into explicit metrics, calculations, comparisons, and decision-ready findings. Preserve traceability to the source files.',
      guardrails: 'Treat the supplied files as the source of truth. Do not guess column meanings, formulas, units, date ranges, or attribution rules. Ask for a data dictionary or sample rows when definitions are missing. Protect confidential business data.',
      deliverables: [
        'A source-data inventory and data dictionary for every required Excel column.',
        'A validation and cleaning plan covering missing values, duplicates, types, date ranges, and inconsistent labels.',
        'Explicit formulas and business rules for sales, revenue or gains, costs, acquired users, and derived KPIs.',
        'Prioritized findings that explain what happened, why it matters, and which marketing action should follow.',
        'A reproducible report or dashboard specification with filters, comparisons, and audience-appropriate summaries.',
        'A reconciliation checklist proving that totals and calculations match the source files.',
      ],
    }
  }

  if (matches('finance', 'financial', 'bank', 'budget', 'accounting')) {
    return {
      name: 'Finance and business analysis',
      role: 'Act as a senior financial analyst and business requirements specialist with expertise in controls, traceability, and executive reporting.',
      requirements: 'Translate the stated objective into defined financial inputs, calculations, controls, and decision-ready outputs.',
      guardrails: 'Do not invent figures, accounting treatments, assumptions, or regulatory conclusions. Preserve source traceability and flag decisions requiring qualified financial or legal review.',
      deliverables: ['A source and assumptions register.', 'Defined calculations and control checks.', 'Decision-ready analysis tied to the objective.', 'Risks, exceptions, and items requiring expert review.', 'Acceptance tests that reconcile outputs to source data.'],
    }
  }

  if (matches('health', 'medical', 'patient', 'clinical', 'autism', 'biology')) {
    return {
      name: 'Health, learning, and accessibility',
      role: 'Act as a health-focused product specialist and accessibility practitioner who works with subject-matter experts and communicates clearly with non-developers.',
      requirements: 'Convert the supplied expert knowledge and user needs into safe, accessible requirements and measurable outcomes.',
      guardrails: 'Do not present generated content as medical advice. Minimize sensitive data, require informed expert review, and apply age-appropriate accessibility and safety practices.',
      deliverables: ['A needs and accessibility brief.', 'Prioritized capabilities with acceptance criteria.', 'A content and interaction plan grounded in supplied expertise.', 'Privacy, safety, and expert-review requirements.', 'A testing plan with representative users and measurable outcomes.'],
    }
  }

  if (matches('human resources', ' hr ', 'employee', 'recruit', 'training')) {
    return {
      name: 'People operations',
      role: 'Act as a senior people-operations analyst and process designer with expertise in fair, auditable, and privacy-conscious workflows.',
      requirements: 'Define the workflow, participants, decisions, records, and measurable service outcomes.',
      guardrails: 'Protect employee data, avoid discriminatory criteria, preserve human review, and flag jurisdiction-specific employment requirements.',
      deliverables: ['A current and target workflow.', 'Roles, decisions, and approval rules.', 'Data and privacy requirements.', 'Fairness and exception controls.', 'Service metrics and acceptance criteria.'],
    }
  }

  if (matches('software', 'web app', 'mobile app', 'website', 'platform', 'system')) {
    return {
      name: 'Digital product development',
      role: 'Act as a senior product architect and implementation lead with expertise in accessible interfaces, reliable software delivery, and plain-language stakeholder communication.',
      requirements: 'Turn the stated user problem into scoped capabilities, user flows, technical requirements, and verifiable acceptance criteria.',
      guardrails: 'Prefer the smallest maintainable solution. Protect privacy and security by default, identify assumptions, and do not choose technology before requirements justify it.',
      deliverables: ['A scoped product brief.', 'User journeys and accessibility requirements.', 'Prioritized functional and non-functional requirements.', 'Recommended architecture and implementation milestones.', 'Acceptance tests, launch checks, and maintenance guidance.'],
    }
  }

  return {
    name: 'General project planning',
    role: 'Act as a senior project specialist in the domain described below. First identify the relevant discipline, then use its established methods and terminology while explaining decisions in plain language.',
    requirements: 'Translate the stated goal into specific requirements and distinguish confirmed facts from assumptions and optional enhancements.',
    guardrails: 'Do not invent domain facts or requirements. Ask only questions that materially affect the result and flag decisions that require a qualified expert.',
    deliverables: ['A concise project brief and scope.', 'Intended users or stakeholders and their needs.', 'Prioritized requirements with acceptance criteria.', 'A practical approach, milestones, risks, and mitigations.', 'The requested final output and a verification checklist.'],
  }
}

export function buildPrompt(brief: string, projectType: ProjectType, answers: Answers) {
  const value = (key: string, fallback: string) => cleanMarkdown(answers[key] || fallback)
  const profile = getDomainProfile(`${brief} ${Object.values(answers).join(' ')}`)
  const deliverables = profile.deliverables.map((item) => `- ${item}`).join('\n')
  return `# Project Creation Prompt

## Domain
${profile.name}

## Role
${profile.role} Explain decisions in plain language suitable for a non-developer.

## Context
${cleanMarkdown(brief)}

Project setting: ${projectType === 'professional' ? 'Professional or organizational' : 'Personal or community'}.
Available knowledge and materials: ${value('context', 'Ask what source material or subject expertise I can provide before making assumptions.')}

## Objective
${value('outcome', 'Turn this idea into a practical, responsible, and complete project plan, then implement it step by step.')}

## Intended Users
${value('audience', 'Identify the primary users and confirm their needs, abilities, context, and accessibility requirements.')}

## Essential Requirements
User-provided requirements: ${value('features', 'No detailed requirements have been confirmed yet.')}

Domain requirements: ${profile.requirements}

## Constraints and Guardrails
User-provided constraints: ${value('constraints', 'No additional constraints have been confirmed yet.')}

Domain guardrails: ${profile.guardrails}

## Working Method
1. Restate the goal and list any assumptions.
2. Ask concise, high-value questions only when an answer would materially change the result.
3. Allow me to skip a question or ask you to proceed with reasonable defaults.
4. Propose a phased plan in plain language before implementation.
5. Create a requirements table that maps every requested outcome to an input, method, output, and acceptance check.
6. Use proven standards and tools appropriate to the detected domain.
7. Flag legal, medical, financial, security, privacy, or accessibility risks for expert review.
8. Verify the final work against the supplied source material and success criteria.

## Deliverables
${deliverables}

## Success Criteria
${value('success', 'Define measurable outcomes with me, and verify the final result against every agreed requirement.')}

## Response Style
Use clear headings, short explanations, concrete examples, and actionable next steps. Avoid unexplained technical terms. Do not invent facts; label assumptions and ask for confirmation when risk is meaningful.
`
}

export function validateMarkdown(markdown: string) {
  const errors: string[] = []
  if (!markdown.trim().startsWith('# ')) errors.push('A level-one title is required.')
  if (!markdown.includes('## Objective')) errors.push('The objective section is required.')
  if (!markdown.includes('## Success Criteria')) errors.push('Success criteria are required.')
  if ((markdown.match(/```/g) || []).length % 2 !== 0) errors.push('A code block is not closed.')
  return errors
}