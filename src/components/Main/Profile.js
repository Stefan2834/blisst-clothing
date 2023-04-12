import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDefault } from "../../contexts/DefaultContext";
import Suggestion from "./Layout/Suggestion";
import { counties } from "./Layout/Test";

export default function Profile() {
    const {
        currentUser, server, command
    } = useAuth()
    const { darkTheme, isPending, startTransition } = useDefault()
    const [infoChange, setInfoChange] = useState(false)
    const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '' })
    const [preDet, setPreDet] = useState({})
    const changeInfo = () => {
        setInfoChange(true)
    }
    const saveInfo = e => {
        e.preventDefault()
        startTransition(() => {
            axios.post(`${server}/user/infoUpdate`, {
                uid: currentUser.uid,
                det: preDet
            })
                .then(info => {
                    setDet({
                        info: preDet.info,
                        tel: preDet.tel,
                        email: preDet.email,
                        name: preDet.name,
                        type: preDet.type,
                        county: preDet.county
                    }); console.log(info.data)
                })
                .catch(err => {
                    setPreDet({
                        info: det.info,
                        tel: det.info,
                        email: det.email,
                        name: det.name,
                        type: det.type,
                        county: det.county
                    }); console.error(err)
                })
            setInfoChange(false);
        })
    }
    const backInfo = () => {
        setPreDet({
            info: det.info,
            tel: det.tel,
            email: det.email,
            name: det.name,
            type: det.type
        })
        setInfoChange(false);
    }

    useEffect(() => {
        axios.post(`${server}/user/info`, { uid: currentUser.uid })
            .then(info => { if(info.data.det){setDet(info.data.det); setPreDet(info.data.det) }})
            .catch(err => console.error(err.error))
    }, [])

    console.log(det.county)


    return (
        <>
            {isPending && (
                <div className="loading-bg">
                    <div className="loading-spin">Loading...</div>
                </div>
            )}
            <div className="prof">
                <Suggestion type={'daily'} />
                <div className="prof-center">
                    <div className="prof-photo">
                        <div className={infoChange ? 'prof-photo-slider prof-slide' : 'prof-photo-slider'}>
                            <div className={darkTheme ? "prof-photo-save-dark" : "prof-photo-save"}></div>
                            <div className={darkTheme ? "prof-photo-edit-dark" : "prof-photo-edit"}></div>
                        </div>
                    </div>
                    <div className="prof-txt text-center">Salut, <span className='text-orange-600'>{det.name}</span>!</div>
                    <div className={infoChange ? 'prof-det prof-det-slider' : 'prof-det'}>
                        <div className="prof-left-info">
                            <div className="prof-txt">Judet:<br />
                                <div className="prof-det-txt">
                                    {det.county || det.county === '' ? det.county : (<div className="prof-noset">Judet nesetat</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">Informatii adresa:<br />
                                <div className="prof-det-txt">
                                    {det.info !== '' ? det.info : (<div className="prof-noset">Adresa nesetata</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">Numar de telefon:<br />
                                <div className="prof-det-txt">
                                    {det.tel !== '' ? det.tel : (<div className="prof-noset">Numar de telefon nesetat</div>)}
                                </div>
                            </div>
                            <div className="prof-txt">Email de contact:<br />
                                <div className="prof-det-txt">
                                    {det.email}
                                </div>
                            </div>
                            <div className="prof-txt">Nume utilizator:<br />
                                <div className="prof-det-txt">
                                    {det.name}
                                </div>
                            </div>
                            <div className="prof-txt">
                                Tipul utilizatorului:
                                <div className="prof-det-txt">
                                    {det.type === 'woman' ? (
                                        <div className="prof-woman">Femeie</div>
                                    ) : (
                                        <div className="prof-man">Barbat</div>
                                    )}
                                </div>
                            </div>
                            <div className="prof-save" onClick={changeInfo}>Editeaza</div>
                        </div>


                        <form className="prof-left-save" onSubmit={saveInfo}>
                            <div className="prof-txt">
                                Judet:<br />
                                <select id="county-select" value={preDet.county}
                                    className='prof-det-txt'
                                    onChange={e => setPreDet({ ...preDet, county: e.target.value })}
                                >
                                    <option value="" className='check-option'>Judete</option>
                                    {counties.map((county) => (
                                        <option key={county} value={county} className='check-option'>
                                            {county}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="prof-txt">
                                Informatii adresa:
                                <input type='text' value={preDet.info} minLength={20}
                                    onChange={e => setPreDet({ ...preDet, info: e.target.value })}
                                    className='prof-input'
                                />
                            </div>
                            <div className="prof-txt">
                                Numar de telefon:
                                <input type='number' value={preDet.tel}
                                    onChange={e => setPreDet({ ...preDet, tel: e.target.value })}
                                    className='prof-input'
                                />
                            </div>
                            <div className="prof-txt">
                                Email de contact:
                                <input type='email' value={preDet.email} minLength={8}
                                    onChange={e => setPreDet({ ...preDet, email: e.target.value })}
                                    className='prof-input' required
                                />
                            </div>
                            <div className="prof-txt">
                                Nume utilizator:
                                <input type='text' value={preDet.name}
                                    onChange={e => setPreDet({ ...preDet, name: e.target.value })}
                                    className='prof-input' required minLength={3} maxLength={16}
                                />
                            </div>
                            <div className="prof-txt">
                                Tipul utilizatorului:
                                <div className="prof-type-slide">
                                    <div className="prof-type-select" onClick={() => setPreDet({ ...preDet, type: 'man' })}>Barbat</div>
                                    <div className="prof-type-select" onClick={() => setPreDet({ ...preDet, type: 'woman' })}>Femeie</div>
                                    <div className={preDet.type === 'man' ? 'prof-type-left' : 'prof-type-right'} />
                                </div>
                            </div>
                            <div className="prof-btn-flex">
                                <input type='submit' className="prof-save" value='Salveaza' />
                                <div className="prof-back" onClick={backInfo}>Inapoi</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="prof-right">
                    {command.length >= 1 ? (
                        <div className="prof-comm">
                            <div className="prof-comm-title">Ultima comanda: </div>
                            <div className="prof-comm-subtitle">Judet</div>
                            <div className="prof-comm-txt">{command[0].details.county}</div>
                            <div className="prof-comm-subtitle">Adresa</div>
                            <div className="prof-comm-txt">{command[0].details.info}</div>
                            <div className="prof-comm-subtitle">Telefon</div>
                            <div className="prof-comm-txt">{command[0].details.tel}</div>
                            <div className="prof-comm-subtitle">Email</div>
                            <div className="prof-comm-txt">{command[0].details.email}</div>
                            <div className="prof-comm-subtitle">Metoda de plata</div>
                            <div className="prof-comm-txt">{command[0].method}</div>
                            <div className="prof-comm-subtitle">Total</div>
                            <div className="prof-comm-txt">{command[0].price.total} Lei</div>
                            <div className="prof-comm-subtitle">Status</div>
                            <div className="prof-comm-txt">{command[0].status}</div>
                            <Link to='/main/command' className="prof-comm-btn">
                                Vezi mai multe detalii
                            </Link>
                        </div>
                    ) : (
                        <>
                        <Suggestion type={'discount'} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}