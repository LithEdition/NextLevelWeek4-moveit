import { useContext } from 'react'
import { ChallengerContext } from '../contexts/ChallengerContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperiencBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengerContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span
                    className={styles.currentExperience}
                    style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}