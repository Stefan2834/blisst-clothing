import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDefault } from "../../contexts/DefaultContext";
import Suggestion from "../SmallComponents/Suggestion";
import { counties } from "../SmallComponents/Test";

export default function Profile() {
    const {
        currentUser, server, command, det, setDet, admin
    } = useAuth()
    const { darkTheme, isPending, startTransition } = useDefault()
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
                        color: preDet.color
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
            color: det.color
        })
        setInfoChange(false);
    }//nu salva informatiile introduse
    useEffect(() => {
        document.title = 'Blisst — Profilul meu'
        setPreDet(det)
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
                    <div className="prof-txt text-center">Salut, {admin && 'Domnule'} <span className='principal'>{det.name}</span>!</div>
                    <div className={infoChange ? 'prof-det prof-det-slider' : 'prof-det'}>
                        <div className="prof-left-info">
                            <div className="prof-txt">Judet:<br />
                                <div className="prof-det-txt">
                                    {det.county !== '' ? det.county : (<div className="prof-noset">Judet nesetat</div>)}
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
                            <div className="prof-txt">Culoare preferata:<br />
                                <div className="prof-det-square" style={{ backgroundColor: det.color }} />
                            </div>
                            <div className="prof-save" onClick={changeInfo}>Editeaza</div>
                        </div>


                        <form className="prof-left-save" onSubmit={saveInfo}>
                            <div className="prof-txt">
                                Judet:<br />
                                <select value={preDet.county}
                                    className='prof-det-txt outline-0'
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
                                <input type='text' value={preDet.info} minLength={20} maxLength={150}
                                    onChange={e => setPreDet({ ...preDet, info: e.target.value })}
                                    className='prof-input'
                                />
                            </div>
                            <div className="prof-txt">
                                Numar de telefon:
                                <input type='number' value={preDet.tel}
                                    onChange={e => setPreDet({ ...preDet, tel: e.target.value })}
                                    className='prof-input' minLength={8} maxLength={16}
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
                                Culoare preferata:
                                <div className="flex">
                                    <div className="prof-det-square"
                                        style={{ backgroundColor: "red" }}
                                        onClick={() => setPreDet({ ...preDet, color: "red" })}
                                    />
                                    <div className="prof-det-square"
                                        style={{ backgroundColor: "#79cbca" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#79cbca" })}
                                    />
                                    <div className="prof-det-square"
                                        style={{ backgroundColor: "#ea580c" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#ea580c" })}
                                    />
                                    <div className="prof-det-square"
                                        style={{ backgroundColor: "green" }}
                                        onClick={() => setPreDet({ ...preDet, color: "green" })}
                                    />
                                    <div className="prof-det-square"
                                        style={{ backgroundColor: "#e684ae" }}
                                        onClick={() => setPreDet({ ...preDet, color: "#e684ae" })}
                                    />
                                </div>
                            </div>
                            <div className="prof-btn-flex">
                                <input type='submit' className="prof-save" value='Salveaza' />
                                <div className="prof-back" onClick={backInfo}>Inapoi</div>
                            </div>
                        </form>
                    </div>
                </div>
                {command.length >= 1 ? (
                    <div className="prof-right">
                        <div className="prof-comm">
                            <div className="prof-comm-title">Ultima comanda: </div>
                            <div className="prof-comm-subtitle">Judet</div>
                            <div className="prof-comm-txt">{command[command.length - 1].details.county}</div>
                            <div className="prof-comm-subtitle">Adresa</div>
                            <div className="prof-comm-txt">{command[command.length - 1].details.info}</div>
                            <div className="prof-comm-subtitle">Telefon</div>
                            <div className="prof-comm-txt">{command[command.length - 1].details.tel}</div>
                            <div className="prof-comm-subtitle">Email</div>
                            <div className="prof-comm-txt">{command[command.length - 1].details.email}</div>
                            <div className="prof-comm-subtitle">Metoda de plata</div>
                            <div className="prof-comm-txt">{command[command.length - 1].method}</div>
                            <div className="prof-comm-subtitle">Total</div>
                            <div className="prof-comm-txt">{command[command.length - 1].price.total} Lei</div>
                            <div className="prof-comm-subtitle">Status</div>
                            <div className="prof-comm-txt">{command[command.length - 1].status}</div>
                            <Link to='/main/command' className="prof-comm-btn">
                                Vezi mai multe detalii
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