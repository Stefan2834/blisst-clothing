import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useDefault } from '../../contexts/DefaultContext';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import passSvg from '../../svg-icon/key.svg'
import emailSvg from '../../svg-icon/email-security.svg'
import checkSvg from '../../svg-icon/check.svg'
import eyeTrue from '../../svg-icon/eye-check.svg'
import eyeFalse from '../../svg-icon/eye-off.svg'
import nameSvg from '../../svg-icon/me.svg'
import Cookies from 'js-cookie'

export default function Connect() {
    const signEmailRef = useRef();
    const signNameRef = useRef();
    const signPassRef = useRef();
    const signPassConfirmRef = useRef()
    const logEmailRef = useRef()
    const logPassRef = useRef()
    const [type, setType] = useState('man')
    const {
        server,
        setCurrentUser, product,
        getUserData, setAdmin,
        dispatchCart, dispatchCommand, dispatchFav
    } = useAuth();
    const {
        error, setError,
        activeForm, setActiveForm
    } = useDefault()

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passView, setPassView] = useState([false, false, false]);

    useEffect(() => {
        setLoading(true)
        setAdmin()
        document.title = 'Blisst — Conectare'
        dispatchCart({ type: 'deleteState' })
        dispatchFav({ type: 'deleteState' })
        dispatchCommand({ type: 'deleteState' })
        Cookies.remove('userData')
        setCurrentUser()
        setLoading(false)
    }, [])// daca ai accesat aceasta pagina, sterge cosul favoritele si comenziile urilizatorului, si deconecteaza-l


    const handleRadio = (e) => {
        setType(e.target.value);
    }
    async function handleSignUp(e) {
        e.preventDefault()
        if (signPassRef.current.value !== signPassConfirmRef.current.value) {
            setError('Parolele nu se potrivesc')
        } else {
            try {
                setLoading(true)
                setError('Loading...')
                const response = await axios.post(`${server}/connect/signUp`, {
                    email: signEmailRef.current.value,
                    password: signPassRef.current.value,
                });
                console.log(response.data)
                if (response.data.success) {
                    const writeData = await axios.post(`${server}/connect/write`, {
                        uid: response.data.user.user.uid,
                        email: signEmailRef.current.value,
                        password: signPassRef.current.value,
                        name: signNameRef.current.value,
                        type: type
                    })
                    if (writeData.data.success) {
                        Swal.fire(
                            'Validare cont!',
                            'Acceseaza link-ul de pe email, iar apoi conecteaza-te.',
                            'warning'
                        )
                        setError()
                    } else {
                        console.log(writeData.data.message)
                        setError(response.data.message)
                    }
                } else {
                    console.log(response.data)
                    setError(response.data.message)
                }
            } catch (err) {
                setError(`Failed to Signup: ${err}`)
            }
            setLoading(false);
        }
    }//creeaza un cont pt utilizator
    async function handleLogIn(e) {
        e.preventDefault()
        try {
            setLoading(true)
            setError('Se incarca...')
            const response = await axios.post(`${server}/connect/login`, {
                email: logEmailRef.current.value,
                password: logPassRef.current.value,
            }, {
                withCredentials: true
            });
            if (response.data.success === true) {
                console.log(response)
                const user = response.data.user
                Cookies.set('userData', JSON.stringify(user), { expires: 10 * 365 * 24 * 60 * 60 * 1000, path: '/' });
                await setCurrentUser(user)
                console.log(user);
                console.log('run')
                const admin = await axios.get(`${server}/connect/admin`)
                if(admin.data.success) {
                    console.log(admin)
                    setAdmin(admin.data.admin)
                }
                await getUserData(user.uid, product)
                navigate('/')
                setError()
            } else {
                setError(response.data.message)
            }
            setLoading(false)
        } catch (err) {
            console.log(err);
            setError(err);
        }
        setLoading(false)
    }//conecteaza utilizatorul
    return (

        <div className='acc-main'>
            <div className={!activeForm ? 'acc-slider-active' : 'acc-slider'}>
                <div className='acc-slider-left' onClick={() => setActiveForm(false)}>Inregistrare</div>
                <div className='acc-slider-right' onClick={() => setActiveForm(true)}>Conectare</div>
            </div>
            <div className='container'>
                <div className={activeForm ? 'container-overflow-active' : 'container-overflow'}>
                    <div className='sign-up'>
                        <form className='acc-form' onSubmit={handleSignUp}>
                            <div className='acc-form-title'>Creeaza un cont</div>
                            <label className='acc-label'><img className='acc-svg' src={nameSvg} alt='Img' />
                                <input ref={signNameRef} className='acc-input' type='text' placeholder=' ' minLength={3} maxLength={16} required />
                                <span className='place-holder'>Nume*</span>
                            </label>
                            <label className='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                                <input ref={signEmailRef} className='acc-input' type='email' placeholder=' ' required />
                                <span className='place-holder'>Email*</span>
                            </label>
                            <label className='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                                <input ref={signPassRef} className='acc-input' type={passView[0] ? 'text' : 'password'} placeholder=' ' minLength={6} maxLength={20} required />
                                <span className='place-holder'>Parola*</span>
                                <img className='acc-svg-eye'
                                    src={passView[0] ? eyeTrue : eyeFalse}
                                    alt='Img' onClick={() => { setPassView(c => [!c[0], c[1], c[2]]) }}
                                />
                            </label>
                            <label className='acc-label'><img className='acc-svg' src={checkSvg} alt='Img' />
                                <input ref={signPassConfirmRef} className='acc-input' type={passView[1] ? 'text' : 'password'} placeholder=' ' minLength={6} maxLength={20} required />
                                <span className='place-holder'>Confirma*</span>
                                <img className='acc-svg-eye'
                                    src={passView[1] ? eyeTrue : eyeFalse}
                                    alt='Img' onClick={() => { setPassView(c => [c[0], !c[1], c[2]]) }}
                                />
                            </label>
                            <div className='acc-type'>
                                <label>
                                    <input className='acc-type-input hidden'
                                        type='radio' value='man'
                                        name='radio-type'
                                        checked={type === 'man'}
                                        onChange={e => handleRadio(e)}
                                    />
                                    <div className='type-place-holder nav-left-photo1' />
                                </label>
                                <label>
                                    <input className='acc-type-input hidden'
                                        type='radio' value='woman'
                                        name='radio-type'
                                        checked={type === 'woman'}
                                        onChange={e => handleRadio(e)}
                                    />
                                    <div className='type-place-holder nav-left-photo2' />
                                </label>
                            </div>
                            {error && (
                                <div className=' text-red-600'>{error}</div>
                            )}
                            <button disabled={loading} type='submit' className='acc-submit'>Inregistreaza-te</button>
                        </form>
                    </div>
                    <div className='sign-in'>
                        <form className='acc-form' onSubmit={handleLogIn}>
                            <div className='acc-form-title'>Conectare</div>
                            <label className='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                                <input ref={logEmailRef} className='acc-input' type='email' placeholder=' ' required />
                                <span className='place-holder'>Email*</span>
                            </label>
                            <label className='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                                <input ref={logPassRef} className='acc-input' type={passView[2] ? 'text' : 'password'} placeholder=' ' minLength={6} maxLength={20} required />
                                <span className='place-holder'>Parola*</span>
                                <img className='acc-svg-eye'
                                    src={passView[2] ? eyeTrue : eyeFalse}
                                    alt='Img' onClick={() => { setPassView(c => [c[0], c[1], !c[2]]) }}
                                />
                            </label>
                            {error && (
                                <div className=' text-red-600'>{error}</div>
                            )}
                            <button disabled={loading} className='acc-submit' type='submit'>Conectare</button>
                            <div className='acc-form-text'><Link to='/main/error/forgotPassword'>mi-am uitat parola</Link></div>
                            <div className='acc-form-text'><Link to='/main/error/resendEmail'>nu am primit un email</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

