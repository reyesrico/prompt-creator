import { useEffect, useRef, useState } from 'react'
import {
  Check, ChevronDown, CircleHelp, Globe2, Menu, Moon, Sparkles, Sun,
} from 'lucide-react'
import { languageNames, type Language, type Translate } from '../i18n'

export type Theme = 'light' | 'dark'

type AppHeaderProps = {
  language: Language
  theme: Theme
  t: Translate
  onLanguageChange: (language: Language) => void
  onThemeToggle: () => void
  onHome: () => void
  onOpenDialog: (dialog: 'how' | 'about') => void
}

export function AppHeader({
  language, theme, t, onLanguageChange, onThemeToggle, onHome, onOpenDialog,
}: AppHeaderProps) {
  const pickerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="Prompt Creator home">
        <span className="brand-mark"><Sparkles size={19} /></span>
        <span>Prompt Creator</span>
      </button>
      <nav className="nav-actions" aria-label="Primary navigation">
        <button className="text-button desktop-only" onClick={() => onOpenDialog('how')}><CircleHelp size={17} />{t('how')}</button>
        <button className="text-button desktop-only" onClick={() => onOpenDialog('about')}>{t('about')}</button>
        <div className="language-picker" ref={pickerRef}>
          <button className="language-trigger" onClick={() => setOpen((current) => !current)} aria-label="Language" aria-haspopup="listbox" aria-expanded={open}>
            <Globe2 size={17} /><span>{languageNames[language]}</span><ChevronDown size={15} />
          </button>
          {open && (
            <div className="language-menu" role="listbox" aria-label="Language options">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  className={language === code ? 'selected' : ''}
                  role="option"
                  aria-selected={language === code}
                  onClick={() => {
                    onLanguageChange(code as Language)
                    setOpen(false)
                  }}
                >
                  <span>{name}</span>{language === code && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="theme-toggle" onClick={onThemeToggle} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'} title={theme === 'light' ? 'Dark theme' : 'Light theme'}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button className="icon-button mobile-only" onClick={() => onOpenDialog('how')} aria-label={t('how')}><Menu size={20} /></button>
      </nav>
    </header>
  )
}