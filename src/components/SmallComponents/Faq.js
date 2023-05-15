import React from 'react'
import '../css/faq.css'
import { useState } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useEffect } from 'react'

export default function Faq() {
  const { t } = useDefault()
  const [expand, setExpand] = useState()
  const questions = [
    { quest: t('Faq.Que.1'), answer: t('Faq.Ans.1') },
    { quest: t('Faq.Que.2'), answer: t('Faq.Ans.2') },
    { quest: t('Faq.Que.3'), answer: t('Faq.Ans.3') },
    { quest: t('Faq.Que.4'), answer: t('Faq.Ans.4') },
    { quest: t('Faq.Que.5'), answer: t('Faq.Ans.5') },
    { quest: t('Faq.Que.6'), answer: t('Faq.Ans.6') },
    { quest: t('Faq.Que.7'), answer: t('Faq.Ans.7') },
    { quest: t('Faq.Que.8'), answer: t('Faq.Ans.8') },
    { quest: t('Faq.Que.9'), answer: t('Faq.Ans.9') },
    { quest: t('Faq.Que.10'), answer: t('Faq.Ans.10') },
    { quest: t('Faq.Que.11'), answer: t('Faq.Ans.11') },
    { quest: t('Faq.Que.12'), answer: t('Faq.Ans.12') },
  ]

  useEffect(() => {
    document.title = `Blisst — ${t('Faq.Întrebări frecvente')}` 
  })
  return (
    <div className='faq'>
      <div className='faq-container'>
        <div className='faq-title'>{t('Faq.Întrebări frecvente')}</div>
        {questions.map((question, index) => {
          return (
            <div className='faq-content'>
              <div className='faq-question' onClick={() => expand === index ? setExpand() : setExpand(index)}>
                <div className='faq-que-text'>{question.quest}</div>
                <div className={expand === index ? 'faq-que-plus-rotate' : 'faq-que-plus'} />
              </div>
              <div className={expand === index ? 'faq-overflow-open' : 'faq-overflow'}>{question.answer}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
