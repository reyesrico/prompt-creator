import { ArrowRight, GitFork, Mail, X } from 'lucide-react'
import type { Translate } from '../i18n'

export type Dialog = 'how' | 'about'

type AppDialogsProps = {
  dialog: Dialog | null
  t: Translate
  onClose: () => void
  onExample: () => void
}

export function AppDialogs({ dialog, t, onClose, onExample }: AppDialogsProps) {
  if (!dialog) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="dialog-close" onClick={onClose} aria-label={t('close')}><X size={20} /></button>
        {dialog === 'how' ? <>
          <p className="section-kicker">Prompt Creator</p><h2 id="dialog-title">{t('useTitle')}</h2>
          <ol><li><span>1</span>{t('use1')}</li><li><span>2</span>{t('use2')}</li><li><span>3</span>{t('use3')}</li></ol>
          <div className="example-box"><strong>{t('exampleTitle')}</strong><p>{t('exampleText')}</p><button className="secondary-button" onClick={onExample}>{t('example')}<ArrowRight size={16} /></button></div>
        </> : <>
          <p className="section-kicker">Prompt Creator</p><h2 id="dialog-title">{t('created')}</h2>
          <p className="dialog-copy">{t('aboutDescription')}</p>
          <a className="primary-button link-button" href="https://github.com/reyesrico" target="_blank" rel="noreferrer"><GitFork size={17} />{t('contact')}</a>
          <a className="secondary-button link-button" href="https://github.com/reyesrico/prompt-creator/issues" target="_blank" rel="noreferrer"><Mail size={17} />{t('openIssue')}</a>
        </>}
      </section>
    </div>
  )
}