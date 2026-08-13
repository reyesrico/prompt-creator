import { ArrowRight, Check, ChevronLeft, Square } from 'lucide-react'
import type { CopyKey, Translate } from '../i18n'
import { questions, type ProjectType } from '../prompt'

type QuestionViewProps = {
  answer: string
  brief: string
  projectType: ProjectType
  questionIndex: number
  t: Translate
  onAnswerChange: (answer: string) => void
  onBack: () => void
  onFinish: () => void
  onSubmit: () => void
}

export function QuestionView({
  answer, brief, projectType, questionIndex, t,
  onAnswerChange, onBack, onFinish, onSubmit,
}: QuestionViewProps) {
  return (
    <section className="question-view">
      <div className="progress-row">
        <span>{questionIndex + 1} / {questions.length}</span>
        <div className="progress-track"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="classification"><Check size={15} />{t('detected')}: <strong>{t(projectType)}</strong></div>
      <div className="active-brief"><span>{t('currentIdea')}</span><p>{brief}</p></div>
      <p className="section-kicker">{t('question')}</p>
      <h2>{t(`q${questionIndex + 1}` as CopyKey)}</h2>
      <textarea className="answer-input" value={answer} onChange={(event) => onAnswerChange(event.target.value)} placeholder={t('answer')} rows={5} autoFocus />
      <div className="question-actions">
        <button className="secondary-button" onClick={onBack}><ChevronLeft size={18} />{t('back')}</button>
        <div>
          <button className="quiet-button" onClick={onFinish}><Square size={14} />{t('stop')}</button>
          <button className="secondary-button" onClick={onSubmit}>{t('skip')}</button>
          <button className="primary-button" onClick={onSubmit} disabled={!answer.trim()}>{t('next')}<ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}