import { useContext } from 'react'
import { ChallengerContext } from '../contexts/ChallengerContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges () {

    const { challengesCompleted } = useContext(ChallengerContext)

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{ challengesCompleted }</span>
        </div>
    )
}