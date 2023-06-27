import React from 'react'
import '../css/faq.css'
import { useState } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Faq() {
  const { t, darkTheme, lang } = useDefault()
  const [expand, setExpand] = useState()
  const questions = [
    { quest: t('Faq.Que.1'), answer: t('Faq.Ans.1') },
    { quest: t('Faq.Que.2'), answer: t('Faq.Ans.2') },
    { quest: t('Faq.Que.3'), answer: t('Faq.Ans.3') },
    { quest: t('Faq.Que.4'), answer: (<>{t('Faq.Ans.4')} {<Link to='/main/orders' className="font-semibold text-lg">Click</Link>}</>) },
    { quest: t('Faq.Que.5'), answer: t('Faq.Ans.5') },
    { quest: t('Faq.Que.6'), answer: t('Faq.Ans.6') },
    { quest: t('Faq.Que.7'), answer: t('Faq.Ans.7') },
    { quest: t('Faq.Que.8'), answer: t('Faq.Ans.8') },
    { quest: t('Faq.Que.9'), answer: (<>{t('Faq.Ans.9')} {<Link to='/main/help' className="font-semibold text-lg">Click</Link>}</>) },
  ]

  useEffect(() => {
    document.title = `Blisst — ${t('Faq.Întrebări frecvente')}`
  }, [lang])
  return (
    <div className='faq'>
      <div className='faq-container'>
        <div className='faq-title'>{t('Faq.Întrebări frecvente')}</div>
        {questions.map((question, index) => {
          return (
            <div className='faq-content'>
              <div className='faq-question' onClick={() => expand === index ? setExpand() : setExpand(index)}>
                <div className='faq-que-text'>{question.quest}</div>
                {darkTheme ? (
                  <div className={expand === index ? 'faq-rotate faq-que-plus-dark' : 'faq-que-plus-dark'} />
                ) : (
                  <div className={expand === index ? 'faq-rotate faq-que-plus' : 'faq-que-plus'} />
                )}
              </div>
              <div className={expand === index ? 'faq-overflow-open' : 'faq-overflow'}>{question.answer}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
