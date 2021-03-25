import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperiencBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { GetServerSideProps } from 'next'
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengerProvider } from "../contexts/ChallengerContext";

import Head from 'next/head'
import styles from "../styles/pages/Home.module.css"

interface HomeProps {

  level: number,
  currentExperience: number,
  challengesCompleted: number
}


export default function Home(props: HomeProps) {
  return (
    <div className={styles.container}>
      <ChallengerProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <Head>
          <title>Inicio | Moveit</title>
        </Head>
        <ExperiencBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengerProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {

    props: {

      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}