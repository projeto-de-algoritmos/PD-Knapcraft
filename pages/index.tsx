import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Ranking from '../src/components/Ranking';
import Widget from '../src/components/Widget';
import { RankingLine } from '../src/models/Ranking';
import { Theme } from '../src/models/Theme';
import { API } from '../assets/consts'


export default function Home({ rankingList }:RankingProps) {
  const [userName, setUsername] = useState<string>('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/game?username=${userName}`)
  }

  return (
    <Widget>
      <div className='title text-center'>Programação Dinamica: Minecraft</div>

      <form className='d-flex justify-content-around flex-column mb-5 mt-5' onSubmit={handleSubmit}>
        <input className='input-text' placeholder='Insira seu nome' onChange={e => setUsername(e.target.value)} value={userName}/>

        <button className='button-java-w m-10 disabled' type='submit' disabled={userName.trim().length === 0}>Jogar</button>
      </form>

      <Ranking rankingList={rankingList}/>
    </Widget>
  )
}

export async function getServerSideProps(context: any) {
  const response = await fetch(API + '/ranking');
  const rankingList = await response.json();

  return {
      props: {
          rankingList,
      }
  }
}

type RankingProps = {
  rankingList: RankingLine[];
  theme?: Theme
}
