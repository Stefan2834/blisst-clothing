import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useDefault } from "../../contexts/DefaultContext";
import Suggestion from "./Layout/Suggestion";

export default function Profile() {
    const {
        currentUser,
        det, setDet, server, product
    } = useAuth()
    const { darkTheme, isPending, startTransition } = useDefault()
    const [infoChange, setInfoChange] = useState(false)
    const [preDet, setPreDet] = useState({})
    const [suggestion, setSuggestion] = useState({ daily: {}, discount: {} })
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
                        name: preDet.name
                    }); console.log(info.data)
                })
                .catch(err => {
                    setPreDet({
                        info: det.info,
                        tel: det.info,
                        email: det.email,
                        name: det.name
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
            name: det.name
        })
        setInfoChange(false);
    }
    useEffect(() => {
        startTransition(() => {
            setPreDet(det)
        })
    }, [])



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
                    <div className="prof-txt text-center">Salut, {det.name}!</div>
                    <div className={infoChange ? 'prof-det prof-det-slider' : 'prof-det'}>
                        <div className="prof-left-info">
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
                            <div className="prof-save" onClick={changeInfo}>Editeaza</div>
                        </div>


                        <form className="prof-left-save" onSubmit={saveInfo}>
                            <div className="prof-txt">
                                Informatii adresa:
                                <input type='text' value={preDet.info}
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
                                <input type='email' value={preDet.email}
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
                            <div className="prof-btn-flex">
                                <input type='submit' className="prof-save" value='Salveaza' />
                                <div className="prof-back" onClick={backInfo}>Inapoi</div>
                            </div>
                        </form>
                    </div>
                </div>
                <Suggestion type={'discount'} />
            </div>
        </>
    )
}