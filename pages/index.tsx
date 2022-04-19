import { useRouter } from 'next/router';
import { FormEvent, useState, useEffect } from 'react';
import Ranking from '../src/components/Ranking';
import Widget from '../src/components/Widget';
import { RankingLine } from '../src/models/Ranking';
import { Theme } from '../src/models/Theme';
import { API } from '../assets/consts'


export default function Home({ rankingList }: RankingProps) {
  const [username, setUsername] = useState<string>('');
  const router = useRouter();
  const localStorageUsername = 'username';

  useEffect(() => {
    const name = localStorage.getItem(localStorageUsername);
    if (name && name.trim().length > 0) {
      setUsername(name);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem(localStorageUsername, username);
    router.push({
      pathname: `/game`,
      query: { username }
    });
  }

  return (
    <Widget>
      <div className='title text-center text-light'>Programação Dinamica: Minecraft</div>

      <form className='d-flex justify-content-around flex-column mb-5 mt-5' onSubmit={handleSubmit}>
        <input className='input-text' placeholder='Insira seu nome' onChange={e => setUsername(e.target.value)} value={username} />

        <button className='button-java-w m-10 disabled' type='submit' disabled={username.trim().length === 0}>Jogar</button>
      </form>

      <Ranking rankingList={rankingList} />
    </Widget>
  )
}

export async function getServerSideProps(context: any) {
  let rankingList;

  try {
    const response = await fetch(API + '/ranking');
    rankingList = await response.json();
  } catch (ex) {
    rankingList = [];
  }

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
