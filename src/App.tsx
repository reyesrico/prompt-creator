import { useEffect, useState } from 'react'
import { GitFork } from 'lucide-react'
import { AppDialogs, type Dialog } from './components/AppDialogs'
import { AppHeader, type Theme } from './components/AppHeader'
import { QuestionView } from './components/QuestionView'
import { ResultView } from './components/ResultView'
import { StartView } from './components/StartView'
import { translations, type CopyKey, type Language } from './i18n'
import {
  buildPrompt, classify, cleanMarkdown, exampleBriefs, questions, validateMarkdown,
  type Answers, type ProjectType,
} from './prompt'
import { getThemeForHour } from './theme'
import './App.css'

type Stage = 'start' | 'questions' | 'result'
type Session = { brief: string; projectType: ProjectType }

function App() {
  const [theme, setTheme] = useState<Theme>(() => getThemeForHour(new Date().getHours()))
  const [language, setLanguage] = useState<Language>('en')
  const [stage, setStage] = useState<Stage>('start')
  const [brief, setBrief] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [prompt, setPrompt] = useState('')
  const [promptLanguage, setPromptLanguage] = useState<Language>('en')
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [extra, setExtra] = useState('')
  const [copied, setCopied] = useState(false)
  const [dialog, setDialog] = useState<Dialog | null>(null)
  const t = (key: CopyKey) => translations[language][key]
  const errors = validateMarkdown(prompt, promptLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    if (stage === 'result' && session && !editing) {
      setPrompt(buildPrompt(session.brief, session.projectType, answers, nextLanguage))
      setPromptLanguage(nextLanguage)
    }
  }

  const begin = (idea = brief) => {
    if (!idea.trim()) return
    const nextBrief = idea.trim()
    setBrief(nextBrief)
    setSession({ brief: nextBrief, projectType: classify(nextBrief) })
    setAnswers({})
    setQuestionIndex(0)
    setAnswer('')
    setStage('questions')
  }

  const beginExample = () => {
    setDialog(null)
    begin(exampleBriefs[language])
  }

  const finish = (nextAnswers = answers) => {
    if (!session) return
    setPrompt(buildPrompt(session.brief, session.projectType, nextAnswers, language))
    setPromptLanguage(language)
    setStage('result')
    setEditing(false)
  }

  const submitAnswer = () => {
    const nextAnswers = answer.trim()
      ? { ...answers, [questions[questionIndex].key]: answer }
      : answers
    setAnswers(nextAnswers)
    setAnswer('')
    if (questionIndex === questions.length - 1) finish(nextAnswers)
    else setQuestionIndex((current) => current + 1)
  }

  const goBack = () => {
    if (questionIndex === 0) setStage('start')
    else {
      const previous = questionIndex - 1
      setQuestionIndex(previous)
      setAnswer(answers[questions[previous].key] || '')
    }
  }

  const addDetail = () => {
    if (!extra.trim()) return
    setPrompt((current) => `${current.trim()}\n\n## ${translations[promptLanguage].additionalContext}\n${cleanMarkdown(extra)}\n`)
    setExtra('')
    setAdding(false)
  }

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const download = () => {
    if (errors.length) return
    const url = URL.createObjectURL(new Blob([prompt], { type: 'text/markdown;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'project-prompt.md'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setBrief('')
    setSession(null)
    setAnswers({})
    setPrompt('')
    setStage('start')
  }

  return (
    <div className="app" data-theme={theme} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <AppHeader language={language} theme={theme} t={t} onLanguageChange={changeLanguage} onThemeToggle={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} onHome={reset} onOpenDialog={setDialog} />
      <main>
        {stage === 'start' && <StartView brief={brief} t={t} onBriefChange={setBrief} onBegin={() => begin()} onExample={beginExample} />}
        {stage === 'questions' && session && <QuestionView answer={answer} brief={session.brief} projectType={session.projectType} questionIndex={questionIndex} t={t} onAnswerChange={setAnswer} onBack={goBack} onFinish={() => finish()} onSubmit={submitAnswer} />}
        {stage === 'result' && <ResultView adding={adding} copied={copied} editing={editing} errors={errors} extra={extra} prompt={prompt} t={t} onAdd={addDetail} onAddingChange={setAdding} onCopy={copyPrompt} onDownload={download} onEditingChange={setEditing} onExtraChange={setExtra} onPromptChange={setPrompt} onReset={reset} />}
      </main>
      <footer><span>{t('created')}</span><a href="https://github.com/reyesrico" target="_blank" rel="noreferrer"><GitFork size={16} />@reyesrico</a></footer>
      <AppDialogs dialog={dialog} t={t} onClose={() => setDialog(null)} onExample={beginExample} />
    </div>
  )
}

export default App