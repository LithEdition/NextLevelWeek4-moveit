import { useContext } from 'react'
import { ChallengerContext } from '../contexts/ChallengerContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox () {

    const { activeChallenger, resetChallenger, completeChallenge } = useContext(ChallengerContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded() {

        completeChallenge()
        resetCountdown()
    }

    function handleChallengeFailed() {

        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenger ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenger.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenger.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenger.description}</p>
                    </main>
                    <footer>
                        <button 
                            onClick={handleChallengeFailed}
                            className={styles.challengeFailedButton}
                            type="button"
                            >
                                Falhei
                        </button>
                        <button 
                            className={styles.challengeSucceededButton}
                            type="button"
                            onClick={handleChallengeSucceeded}
                            >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios
                </p>
            </div>
            ) }
        </div>
    )
}