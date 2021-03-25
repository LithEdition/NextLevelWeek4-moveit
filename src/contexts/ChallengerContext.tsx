import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import newChallenger from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {

    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengerContextData {

    level: number
    currentExperience: number
    challengesCompleted: number
    activeChallenger: Challenge
    experienceToNextLevel: number
    levelUp: () => void
    startNewChallenger: () => void
    resetChallenger: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
}

interface ChallengerProviderProps {

    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number
} 

export const ChallengerContext = createContext({} as ChallengerContextData)

export function ChallengerProvider(
    { 
        children, 
        ...rest
    }: ChallengerProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenger, setActiveChallenger] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
         
        Notification.requestPermission()
    }, [])

    useEffect(() => {

        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {

        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function startNewChallenger() {

        const randomChallenger = Math.floor(Math.random() * newChallenger.length)
        const challenges = newChallenger[randomChallenger]

        setActiveChallenger(challenges)

        new Audio('/notification.mp3').play()
        
        if (Notification.permission === 'granted') {

            new Notification('Novo desafio', {

                body: `Valendo ${challenges.amount}xp!`
            })
        }
    }

    function resetChallenger() {

        setActiveChallenger(null)
    }

    function completeChallenge() {

        if(!activeChallenger) {
            
            return
        }

        const { amount } = activeChallenger

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenger(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    function closeLevelUpModal() {

        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengerContext.Provider 
        value={{
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenger,
            activeChallenger,
            resetChallenger,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengerContext.Provider>
    )
}