import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, CircleHelp, Copy, Download, GitFork, Globe2,
  Lightbulb, Mail, Menu, Moon, Pencil, Plus, Send, ShieldCheck, Sparkles, Square,
  Sun, X,
} from 'lucide-react'
import { languageNames, translations, type CopyKey, type Language } from './i18n'
import {
  buildPrompt, classify, cleanMarkdown, exampleBrief, questions, validateMarkdown,
  type Answers, type ProjectType,
} from './prompt'
import './App.css'

type Stage = 'start' | 'questions' | 'result'
type Session = { brief: string; projectType: ProjectType }
type Theme = 'light' | 'dark'

function App() {
  const languagePickerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const [language, setLanguage] = useState<Language>('en')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [stage, setStage] = useState<Stage>('start')
  const [brief, setBrief] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [prompt, setPrompt] = useState('')
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [extra, setExtra] = useState('')
  const [copied, setCopied] = useState(false)
  const [dialog, setDialog] = useState<'how' | 'about' | null>(null)
  const t = (key: CopyKey) => translations[language][key]
  const errors = validateMarkdown(prompt)

  useEffect(() => {
    if (!languageOpen) return

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!languagePickerRef.current?.contains(event.target as Node)) setLanguageOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLanguageOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [languageOpen])

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

  const finish = (nextAnswers = answers) => {
    if (!session) return
    setPrompt(buildPrompt(session.brief, session.projectType, nextAnswers))
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
    setPrompt((current) => `${current.trim()}\n\n## Additional Context\n${cleanMarkdown(extra)}\n`)
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
      <header className="topbar">
        <button className="brand" onClick={reset} aria-label="Prompt Creator home">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>Prompt Creator</span>
        </button>
        <nav className="nav-actions" aria-label="Primary navigation">
          <button className="text-button desktop-only" onClick={() => setDialog('how')}><CircleHelp size={17} />{t('how')}</button>
          <button className="text-button desktop-only" onClick={() => setDialog('about')}>{t('about')}</button>
          <div className="language-picker" ref={languagePickerRef}>
            <button
              className="language-trigger"
              onClick={() => setLanguageOpen((current) => !current)}
              aria-label="Language"
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
            >
              <Globe2 size={17} />
              <span>{languageNames[language]}</span>
              <ChevronDown size={15} />
            </button>
            {languageOpen && (
              <div className="language-menu" role="listbox" aria-label="Language options">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    className={language === code ? 'selected' : ''}
                    role="option"
                    aria-selected={language === code}
                    onClick={() => {
                      setLanguage(code as Language)
                      setLanguageOpen(false)
                    }}
                  >
                    <span>{name}</span>
                    {language === code && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            title={theme === 'light' ? 'Dark theme' : 'Light theme'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="icon-button mobile-only" onClick={() => setDialog('how')} aria-label={t('how')}><Menu size={20} /></button>
        </nav>
      </header>

      <main>
        {stage === 'start' && (
          <section className="start-view">
            <div className="eyebrow"><Lightbulb size={15} />{t('useTitle')}</div>
            <h1>{t('tagline')}</h1>
            <p className="lede">{t('intro')}</p>
            <div className="composer">
              <textarea value={brief} onChange={(event) => setBrief(event.target.value)} placeholder={t('placeholder')} rows={5} autoFocus />
              <div className="composer-footer">
                <span>{brief.trim().length ? `${brief.trim().split(/\s+/).length} ${t('words')}` : t('privateNote')}</span>
                <button className="primary-button" disabled={!brief.trim()} onClick={() => begin()}>{t('start')}<ArrowRight size={18} /></button>
              </div>
            </div>
            <button className="example-link" onClick={() => begin(exampleBrief)}><Sparkles size={16} />{t('example')}</button>
            <div className="privacy-line"><ShieldCheck size={17} /><strong>{t('private')}</strong><span>{t('privateNote')}</span></div>
          </section>
        )}

        {stage === 'questions' && (
          <section className="question-view">
            <div className="progress-row">
              <span>{questionIndex + 1} / {questions.length}</span>
              <div className="progress-track"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
            </div>
            <div className="classification"><Check size={15} />{t('detected')}: <strong>{t(session?.projectType ?? 'personal')}</strong></div>
            <div className="active-brief"><span>{t('currentIdea')}</span><p>{session?.brief}</p></div>
            <p className="section-kicker">{t('question')}</p>
            <h2>{t(`q${questionIndex + 1}` as CopyKey)}</h2>
            <textarea className="answer-input" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={t('answer')} rows={5} autoFocus />
            <div className="question-actions">
              <button className="secondary-button" onClick={goBack}><ChevronLeft size={18} />{t('back')}</button>
              <div>
                <button className="quiet-button" onClick={() => finish()}><Square size={14} />{t('stop')}</button>
                <button className="secondary-button" onClick={submitAnswer}>{t('skip')}</button>
                <button className="primary-button" onClick={submitAnswer} disabled={!answer.trim()}>{t('next')}<ArrowRight size={18} /></button>
              </div>
            </div>
          </section>
        )}

        {stage === 'result' && (
          <section className="result-view">
            <div className="result-heading">
              <div><p className="section-kicker"><Check size={14} /> {t('ready')}</p><h1>{t('prompt')}</h1></div>
              <div className="segmented" aria-label="Prompt view">
                <button className={!editing ? 'active' : ''} onClick={() => setEditing(false)}>{t('preview')}</button>
                <button className={editing ? 'active' : ''} onClick={() => setEditing(true)}><Pencil size={14} />{t('edit')}</button>
              </div>
            </div>
            <div className="prompt-shell">
              {editing
                ? <textarea className="prompt-editor" value={prompt} onChange={(event) => setPrompt(event.target.value)} spellCheck="false" />
                : <pre className="prompt-preview">{prompt}</pre>}
            </div>
            <div className={`validation ${errors.length ? 'error' : ''}`}>
              {errors.length ? <X size={17} /> : <ShieldCheck size={17} />}
              <span>{errors.length ? `${t('invalid')}: ${errors.join(' ')}` : t('ready')}</span>
            </div>
            {adding && (
              <div className="add-detail">
                <textarea value={extra} onChange={(event) => setExtra(event.target.value)} placeholder={t('addPlaceholder')} rows={3} autoFocus />
                <div><button className="quiet-button" onClick={() => setAdding(false)}>{t('cancel')}</button><button className="primary-button" onClick={addDetail} disabled={!extra.trim()}><Send size={16} />{t('add')}</button></div>
              </div>
            )}
            <div className="result-actions">
              <div><button className="secondary-button" onClick={() => setAdding(true)}><Plus size={17} />{t('more')}</button><button className="quiet-button" onClick={reset}>{t('restart')}</button></div>
              <div><button className="secondary-button" onClick={copyPrompt}><Copy size={17} />{copied ? t('copied') : t('copy')}</button><button className="primary-button" onClick={download} disabled={!!errors.length}><Download size={17} />{t('download')}</button></div>
            </div>
          </section>
        )}
      </main>

      <footer><span>{t('created')}</span><a href="https://github.com/reyesrico" target="_blank" rel="noreferrer"><GitFork size={16} />@reyesrico</a></footer>

      {dialog && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setDialog(null)}>
          <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" onClick={() => setDialog(null)} aria-label={t('close')}><X size={20} /></button>
            {dialog === 'how' ? <>
              <p className="section-kicker">Prompt Creator</p><h2 id="dialog-title">{t('useTitle')}</h2>
              <ol><li><span>1</span>{t('use1')}</li><li><span>2</span>{t('use2')}</li><li><span>3</span>{t('use3')}</li></ol>
              <div className="example-box"><strong>{t('exampleTitle')}</strong><p>{t('exampleText')}</p><button className="secondary-button" onClick={() => { setDialog(null); begin(exampleBrief) }}>{t('example')}<ArrowRight size={16} /></button></div>
            </> : <>
              <p className="section-kicker">Prompt Creator</p><h2 id="dialog-title">{t('created')}</h2>
              <p className="dialog-copy">{t('aboutDescription')}</p>
              <a className="primary-button link-button" href="https://github.com/reyesrico" target="_blank" rel="noreferrer"><GitFork size={17} />{t('contact')}</a>
              <a className="secondary-button link-button" href="https://github.com/reyesrico/prompt-creator/issues" target="_blank" rel="noreferrer"><Mail size={17} />{t('openIssue')}</a>
            </>}
          </section>
        </div>
      )}
    </div>
  )
}

export default App