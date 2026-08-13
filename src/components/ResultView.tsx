import { Check, Copy, Download, Pencil, Plus, Send, ShieldCheck, X } from 'lucide-react'
import type { Translate } from '../i18n'

type ResultViewProps = {
  adding: boolean
  copied: boolean
  editing: boolean
  errors: string[]
  extra: string
  prompt: string
  t: Translate
  onAdd: () => void
  onAddingChange: (adding: boolean) => void
  onCopy: () => void
  onDownload: () => void
  onEditingChange: (editing: boolean) => void
  onExtraChange: (extra: string) => void
  onPromptChange: (prompt: string) => void
  onReset: () => void
}

export function ResultView({
  adding, copied, editing, errors, extra, prompt, t,
  onAdd, onAddingChange, onCopy, onDownload, onEditingChange,
  onExtraChange, onPromptChange, onReset,
}: ResultViewProps) {
  return (
    <section className="result-view">
      <div className="result-heading">
        <div><p className="section-kicker"><Check size={14} /> {t('ready')}</p><h1>{t('prompt')}</h1></div>
        <div className="segmented" aria-label="Prompt view">
          <button className={!editing ? 'active' : ''} onClick={() => onEditingChange(false)}>{t('preview')}</button>
          <button className={editing ? 'active' : ''} onClick={() => onEditingChange(true)}><Pencil size={14} />{t('edit')}</button>
        </div>
      </div>
      <div className="prompt-shell">
        {editing
          ? <textarea className="prompt-editor" value={prompt} onChange={(event) => onPromptChange(event.target.value)} spellCheck="false" />
          : <pre className="prompt-preview">{prompt}</pre>}
      </div>
      <div className={`validation ${errors.length ? 'error' : ''}`}>
        {errors.length ? <X size={17} /> : <ShieldCheck size={17} />}
        <span>{errors.length ? `${t('invalid')}: ${errors.join(' ')}` : t('ready')}</span>
      </div>
      {adding && (
        <div className="add-detail">
          <textarea value={extra} onChange={(event) => onExtraChange(event.target.value)} placeholder={t('addPlaceholder')} rows={3} autoFocus />
          <div><button className="quiet-button" onClick={() => onAddingChange(false)}>{t('cancel')}</button><button className="primary-button" onClick={onAdd} disabled={!extra.trim()}><Send size={16} />{t('add')}</button></div>
        </div>
      )}
      <div className="result-actions">
        <div><button className="secondary-button" onClick={() => onAddingChange(true)}><Plus size={17} />{t('more')}</button><button className="quiet-button" onClick={onReset}>{t('restart')}</button></div>
        <div><button className="secondary-button" onClick={onCopy}><Copy size={17} />{copied ? t('copied') : t('copy')}</button><button className="primary-button" onClick={onDownload} disabled={!!errors.length}><Download size={17} />{t('download')}</button></div>
      </div>
    </section>
  )
}