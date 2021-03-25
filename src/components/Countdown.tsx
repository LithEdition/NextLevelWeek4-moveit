import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {

    const { 
        minutes,
        seconds, 
        hasFineshed, 
        isActive,
        startCountdown,
        resetCountdown 
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFineshed ? (
                <button
                    disabled
                    className={styles.startCountdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        { isActive ? (
                            <button
                                type="button"
                                onClick={resetCountdown}
                                className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}
                            >
                                Abandonar ciclo
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={startCountdown}
                                className={styles.startCountdownButton}
                            >
                                Iniciar um ciclo
                            </button>
                            )}
                    </>
                )}
        </div>
    )
}