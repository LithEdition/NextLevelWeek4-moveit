import { useContext } from 'react'
import { ChallengerContext } from '../contexts/ChallengerContext'
import styles from '../styles/components/Profile.module.css'

export function Profile () {

    const { level } = useContext(ChallengerContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66684565?s=400&u=51a23e4b97486f511baad93cb338c1667e5742ed&v=4" alt="LithEdition"/>
            <div>
                <strong>LithEdition</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level { level }
                </p>
            </div>
        </div>
    )
}