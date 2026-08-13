import { ArrowRight, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react'
import type { Translate } from '../i18n'

type StartViewProps = {
  brief: string
  t: Translate
  onBriefChange: (brief: string) => void
  onBegin: () => void
  onExample: () => void
}

export function StartView({ brief, t, onBriefChange, onBegin, onExample }: StartViewProps) {
  return (
    <section className="start-view">
      <div className="eyebrow"><Lightbulb size={15} />{t('useTitle')}</div>
      <h1>{t('tagline')}</h1>
      <p className="lede">{t('intro')}</p>
      <div className="composer">
        <textarea value={brief} onChange={(event) => onBriefChange(event.target.value)} placeholder={t('placeholder')} rows={5} autoFocus />
        <div className="composer-footer">
          <span>{brief.trim().length ? `${brief.trim().split(/\s+/).length} ${t('words')}` : t('privateNote')}</span>
          <button className="primary-button" disabled={!brief.trim()} onClick={onBegin}>{t('start')}<ArrowRight size={18} /></button>
        </div>
      </div>
      <button className="example-link" onClick={onExample}><Sparkles size={16} />{t('example')}</button>
      <div className="privacy-line"><ShieldCheck size={17} /><strong>{t('private')}</strong><span>{t('privateNote')}</span></div>
    </section>
  )
}