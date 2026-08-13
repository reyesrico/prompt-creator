# Prompt Creator

Live application: [reyesrico.github.io/prompt-creator](https://reyesrico.github.io/prompt-creator/)

Prompt Creator is a privacy-first web app that helps non-developers turn an idea into a structured, reusable project prompt. It identifies whether an idea is personal or professional, asks a short series of useful questions, and produces an editable Markdown prompt that is validated before download.

The app is designed for professionals across finance, health, science, technology, retail, communications, industry, energy, utilities, real estate, banking, HR, logistics, sales, marketing, research, engineering, operations, management, service, purchasing, legal, and quality assurance. It works just as well for personal and community projects.

## Features

- Guided six-question interview with skip, back, and early-finish controls
- Explicit per-interview context that prevents example content from leaking into a new idea
- Local classification for personal and professional projects plus domain-aware profiles for marketing analytics, finance, health, people operations, software, and general projects
- Standard prompt structure: role, context, objective, users, requirements, constraints, method, deliverables, success criteria, and response style
- Domain-specific roles, guardrails, methods, and deliverables based on the complete brief and answers
- Editable preview with the option to add more details
- Strict checks for required sections and unclosed Markdown code fences
- Safe `.md` export and one-click clipboard copy
- English, Spanish, French, German, Chinese, and Arabic UI, including RTL layout
- User-controlled light and dark themes initialized from the operating-system preference
- Built-in instructions and a complete marketing performance dashboard example
- No database, accounts, analytics, server calls, or browser storage

## Privacy

All processing happens in the browser. Ideas, answers, and generated prompts exist only in React state for the current tab. Refreshing or closing the page clears them. No project content is sent or stored anywhere.

## Prompt Method

The generated format follows common prompt-engineering guidance: clearly define the role, provide context, state the objective, identify the audience, specify requirements and constraints, describe expected deliverables, and define success criteria. It also instructs the receiving AI to state assumptions, ask only consequential questions, use plain language, and flag regulated or high-risk decisions for expert review.

Domain templates are intentionally public TypeScript source in [`src/prompt.ts`](src/prompt.ts). Interface translations are public in [`src/i18n.ts`](src/i18n.ts).

## Development

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Project Structure

- `src/App.tsx` — guided workflow and UI
- `src/prompt.ts` — classification, generation, sanitization, and validation
- `src/i18n.ts` — six-language interface copy
- `src/App.css` — responsive application design

## Contact

Created by [Carlos Reyes](https://github.com/reyesrico). Questions, ideas, and problems can be submitted through the repository's GitHub Issues page.