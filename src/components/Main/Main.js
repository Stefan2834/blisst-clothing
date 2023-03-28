import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Main() {
    const [activeForm, setActiveForm] = useState(true)

  return (
    <>
    <div className='main'>
        <div className={activeForm ? 'main-container main-panel' : 'main-container'} >
            <div className='main-man'>
                <div className='main-acc-form'>
                    <div className='main-bg-man' />
                </div>
            </div>
            <div className='main-woman'>
                <div className='main-acc-form'>
                    <div className='main-bg-woman' />
                </div>
            </div>
            <div className='main-overlay-container'>
                <div className='main-overlay'>
                    <div className='main-overlay-left'>
                        <div className='main-overlay-title'>Barbati</div>
                        <div className='main-overlay-text'></div>
                        <div className='main-man-flex'>
                            <div className='main-man-cloth'>
                                <div className='main-man-cloth-text'>Tricouri</div>
                                <div className='main-man-cloth-more'><Link to='/main/cloth/man top'>Mai multe</Link></div>
                            </div>
                            <div className='main-man-cloth'>
                                <div className='main-man-cloth-text'>Pantaloni</div>
                                <div className='main-man-cloth-more'><Link to='/main/cloth/man bottom'>Mai multe</Link></div>
                            </div>
                            <div className='main-man-cloth'>
                                <div className='main-man-cloth-text'>Adidasi</div>
                                <div className='main-man-cloth-more'><Link to='/main/cloth/man foot'>Mai multe</Link></div>
                            </div>
                        </div>
                        <button className='main-acc-btn'>Vezi tot</button>
                        <button className='main-acc-btn-slide' onClick={() => {setActiveForm(false)}}>Pentru Femei</button>
                    </div>
                    <div className='main-overlay-right'>
                        <div className='main-overlay-title'>Femei</div>
                        <div className='main-overlay-text'></div>
                        <div className='main-woman-flex'>
                            <div className='main-woman-cloth'>
                                <div className='main-woman-cloth-text'>Tricouri</div>
                                <div className='main-woman-cloth-more'><Link to='/main/cloth/woman top'>Mai multe</Link></div>
                            </div>
                            <div className='main-woman-cloth'>
                                <div className='main-woman-cloth-text'>Pantaloni</div>
                                <div className='main-woman-cloth-more'><Link to='/main/cloth/woman bottom'>Mai multe</Link></div>
                            </div>
                            <div className='main-woman-cloth'>
                                <div className='main-woman-cloth-text'>Adidasi</div>
                                <div className='main-woman-cloth-more'><Link to='/main/cloth/woman foot'>Mai multe</Link></div> 
                            </div>
                        </div>
                        <button className='main-acc-btn'>Vezi tot</button>
                        <button className='main-acc-btn-slide' onClick={() => {setActiveForm(true)}}>Pentru Barbati</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
