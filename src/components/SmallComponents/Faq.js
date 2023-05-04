import React from 'react'
import '../css/faq.css'
import { useState } from 'react'

export default function Faq() {
  const [expand, setExpand] = useState()
  const questions = [
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
    { quest: 'Intrebare intrebare intrebare', answer: 'raspuns raspiuns raspun raspuns' },
  ]
  return (
    <div className='faq'>
      <div className='faq-container'>
        <div className='faq-title'>Intrebari frecvente</div>
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
