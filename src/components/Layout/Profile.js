import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDefault } from "../../contexts/DefaultContext";
import Suggestion from "../SmallComponents/Suggestion";
import { counties } from "../../contexts/Import";

export default function Profile() {
    const {
        currentUser, server, order, det, setDet, admin
    } = useAuth()
    const { darkTheme, isPending, startTransition, lang, t } = useDefault()
    const [infoChange, setInfoChange] = useState(false)
    const [preDet, setPreDet] = useState({})
    const changeInfo = () => {
        setInfoChange(true)
    }// daca utilizatorul apasa Editeaza, muta pagina pe partea de editare, utilizant animatii

    const saveInfo = e => {
        e.preventDefault()
        startTransition(() => {
            axios.post(`${server}/user/infoUpdate`, {
                uid: currentUser.uid,
                det: preDet
            })
                .then(info => {
                    document.documentElement.style.setProperty("--principal", preDet.color)
                    setDet({
                        info: preDet.info,
                        tel: preDet.tel,
                        email: preDet.email,
                        name: preDet.name,
                        type: preDet.type,
                        county: preDet.county,
                        color: preDet.color,
                        newsLetter: det.newsLetter
                    });
                })
                .catch(err => {
                    setPreDet({
                        info: det.info,
                        tel: det.info,
                        email: det.email,
                        name: det.name,
                        type: det.type,
                        county: det.county,
                        color: det.color
                    }); console.error(err)
                })
            setInfoChange(false);
        })
    }//salveaza informatiile
    const backInfo = () => {
        setPreDet({
            info: det.info,
            tel: det.tel,
            email: det.email,
            name: det.name,
            type: det.type,
            color: det.color,
            county: det.county,
        })
        setInfoChange(false);
    }//nu salva informatiile introduse
    useEffect(() => {
        setPreDet(det)
    }, [])
    
    useEffect(() => {
        document.title = `Blisst — ${t('Profile.Profilul meu')}`
    }, [lang])



    return (
        <>
            {isPending && (
                <div className="loading-bg">
                    <div className="loading-spin">{t('Main.Se încarcă')}...</div>
                </div>
            )}
            <div className="prof">
                <Suggestion type={'daily'} />
                <div className="prof-center">
                    {admin ? (
                        <div className="prof-photo">
                            <div className={infoChange ? 'prof-photo-slider prof-slide' : 'prof-photo-slider'}>
                                <div className={darkTheme ? "prof-photo-admin-dark" : "prof-photo-admin"}></div>
                                <div className={darkTheme ? "prof-photo-edit-dark" : "prof-photo-edit"}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="prof-photo">
                            <div className={infoChange ? 'prof-photo-slider prof-slide' : 'prof-photo-slider'}>
                                <div className={darkTheme ? "prof-photo-save-dark" : "prof-photo-save"}></div>
                                <div className={darkTheme ? "prof-photo-edit-dark" : "prof-photo-edit"}></div>
                            </div>
                        </div>
                    )}
                    {/*verifica daca utilizatorul este admin, si daca da, schimba-i poza */}
                    {admin ? (
                        <div className="prof-txt text-center">{t('Profile.Salut')}, {det.type === 'man' ? t('Profile.Domnule') : t('Profile.Doamna')} <span className='principal'>{det.name}</span>!</div>
                    ) : (
                        <div className="prof-txt text-center">{t('Profile.Salut')}, <span className='principal'>{det.name}</span>!</div>
                    )}
                    <div className={infoChange ? 'prof-det prof-det-slider' : 'prof-det'}>
                        <div className="prof-left-info">
                            <div className="prof-txt">{t('Profile.Județ')}:<br />
                                <div className="prof-det-txt">
                                    {det.county !== '' ? det.county : (<div className="prof-noset">{t('Profile.Județ nesetat')}</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">{t('Profile.Informații adresă')}:<br />
                                <div className="prof-det-txt">
                                    {det.info !== '' ? det.info : (<div className="prof-noset">{t('Profile.Adresă nesetată')}</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">{t('Profile.Număr de telefon')}:<br />
                                <div className="prof-det-txt">
                                    {det.tel !== '' ? det.tel : (<div className="prof-noset">{t('Profile.Număr de telefon nesetat')}</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">{t('Profile.Email de contact')}:<br />
                                <div className="prof-det-txt">
                                    {det.email}
                                </div>
                            </div>
                            <div className="prof-txt">{t('Profile.Nume utilizator')}:<br />
                                <div className="prof-det-txt">
                                    {det.name}
                                </div>
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Tipul utilizatorului')}:
                                <div className="prof-det-txt">
                                    {det.type === 'woman' ? (
                                        <div className="prof-woman">{t('Profile.Femeie')}</div>
                                    ) : (
                                        <div className="prof-man">{t('Profile.Bărbat')}</div>
                                    )}
                                </div>
                            </div>
                            <div className="prof-txt">{t('Profile.Culoare preferată')}:<br />
                                <div className="prof-det-square" style={{ backgroundColor: det.color }} />
                            </div>
                            <div className="prof-save" onClick={changeInfo}>{t('Profile.Editează')}</div>
                        </div>


                        <form className="prof-left-save" onSubmit={saveInfo}>
                            <div className="prof-txt">
                               {t('Profile.Județ')}:<br />
                                <select value={preDet.county}
                                    className='prof-det-txt outline-0'
                                    onChange={e => setPreDet({ ...preDet, county: e.target.value })}
                                >
                                    <option value="" className='check-option'>{t('Profile.Județe')}</option>
                                    {counties.map((county) => (
                                        <option key={county} value={county} className='check-option'>
                                            {county}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Informații adresă')}:
                                <input type='text' value={preDet.info} minLength={20} maxLength={150}
                                    onChange={e => setPreDet({ ...preDet, info: e.target.value })}
                                    className='prof-input'
                                />
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Număr de telefon')}:
                                <input type='number' value={preDet.tel}
                                    onChange={e => setPreDet({ ...preDet, tel: e.target.value })}
                                    className='prof-input' minLength={8} maxLength={16}
                                />
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Email de contact')}:
                                <input type='email' value={preDet.email} minLength={8}
                                    onChange={e => setPreDet({ ...preDet, email: e.target.value })}
                                    className='prof-input' required
                                />
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Nume utilizator')}:
                                <input type='text' value={preDet.name}
                                    onChange={e => setPreDet({ ...preDet, name: e.target.value })}
                                    className='prof-input' required minLength={3} maxLength={16}
                                />
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Tipul utilizatorului')}:
                                <div className="prof-type-slide">
                                    <div className={preDet.type === 'man' ? "prof-type-active nav-left-photo1" : "nav-left-photo1 prof-type-select"}
                                        onClick={() => setPreDet({ ...preDet, type: 'man' })}
                                    ></div>
                                    <div className={preDet.type === 'woman' ? "prof-type-active nav-left-photo2" : "nav-left-photo2 prof-type-select"}
                                        onClick={() => setPreDet({ ...preDet, type: 'woman' })}
                                    ></div>
                                    <div className={preDet.type === 'man' ? 'prof-type-left' : 'prof-type-right'} />
                                </div>
                            </div>
                            <div className="prof-txt">
                                {t('Profile.Culoare preferată')}:
                                <div className="flex">
                                    <div className={preDet.color === "#FFB30B" ? "prof-det-square-selected" : "prof-det-square"}
                                        style={{ backgroundColor: "#FFB30B" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#FFB30B" })}
                                    />
                                    <div className={preDet.color === "#FB5607" ? "prof-det-square-selected" : "prof-det-square"}
                                        style={{ backgroundColor: "#FB5607" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#FB5607" })}
                                    />
                                    <div className={preDet.color === "#FF0063" ? "prof-det-square-selected" : "prof-det-square"}
                                        style={{ backgroundColor: "#FF0063" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#FF0063" })}
                                    />
                                    <div className={preDet.color === "#8338EC" ? "prof-det-square-selected" : "prof-det-square"}
                                        style={{ backgroundColor: "#8338EC" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#8338EC" })}
                                    />
                                    <div className={preDet.color === "#2289FF" ? "prof-det-square-selected" : "prof-det-square"}
                                        style={{ backgroundColor: "#2289FF" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#2289FF" })}
                                    />
                                </div>
                            </div>
                            <div className="prof-btn-flex">
                                <input type='submit' className="prof-save" value={t('Profile.Salvează')} />
                                <div className="prof-back" onClick={backInfo}>{t('Profile.Înapoi')}</div>
                            </div>
                        </form>
                    </div>
                </div>
                {order ? (
                    <div className="prof-right">
                        <div className="prof-comm">
                            <div className="prof-comm-title">{t('Profile.Ultima comandă')}: </div>
                            <div className="prof-comm-subtitle">{t('Profile.Județ')}</div> 
                            <div className="prof-comm-txt">{order.details.county}</div>
                            <div className="prof-comm-subtitle">{t('Profile.Adresă')}</div> 
                            <div className="prof-comm-txt">{order.details.info}</div>
                            <div className="prof-comm-subtitle">{t('Profile.Telefon')}</div> 
                            <div className="prof-comm-txt">{order.details.tel}</div>
                            <div className="prof-comm-subtitle">{t('Profile.Email')}</div> 
                            <div className="prof-comm-txt">{order.details.email}</div>
                            <div className="prof-comm-subtitle">{t('Profile.Metodă de plată')}</div> 
                            <div className="prof-comm-txt">{t(`Profile.${order.method}`)}</div>
                            <div className="prof-comm-subtitle">{t('Profile.Total')}</div> 
                            <div className="prof-comm-txt">{order.price.total} Lei</div>
                            <div className="prof-comm-subtitle">{t('Profile.Status')}</div> 
                            <div className="prof-comm-txt">{t(`Profile.${order.status}`)}</div>
                            <Link to='/main/orders' className="prof-comm-btn">
                                {t('Profile.Vezi mai multe detalii')}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Suggestion type={'discount'} />
                    </>
                )}
                {/*afiseaza ultima comanda, daca exista, daca nu afiseaza produsul cu cea mai mare reducere */}
            </div>
        </>
    )
}