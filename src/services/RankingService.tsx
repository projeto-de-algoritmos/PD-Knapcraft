import dotenv from 'dotenv';
import { RankingLine } from '../models/Ranking';
import { API } from '../../assets/consts';
const { Client } = require('pg');


dotenv.config();

function getClient() {
    return new Client({ ssl: { rejectUnauthorized: false } });
}

export async function containsUsername(username: string) {
    return (await selectAllRanking()).find(r => r.username == cleanUsername(username))
}

export function cleanUsername(username: string) {
    return username.trim().replace(/[ ]+/ig, ' ').toUpperCase();
}

export async function selectAllRanking(): Promise<RankingLine[]> {
    const client = getClient();
    const query = 'SELECT * FROM public.ranking;';

    client.connect();
    const result = await client.query(query);
    client.end();

    return result.rows;
}

export async function createRankingLine(rankingLine: RankingLine): Promise<RankingLine> {
    7
    const client = getClient();
    const query = 'INSERT INTO public.ranking(username, score) VALUES($1, $2);';
    rankingLine.username = cleanUsername(rankingLine.username);

    client.connect();
    await client.query(query, [rankingLine.username, rankingLine.score]);
    client.end();

    return rankingLine;
}

export async function updateRankingLine(rankingLine: RankingLine): Promise<RankingLine> {
    const client = getClient();
    const query = 'UPDATE public.ranking SET username=$1, score=$2 WHERE username=$1;';
    rankingLine.username = cleanUsername(rankingLine.username);

    client.connect();
    await client.query(query, [rankingLine.username, rankingLine.score]);
    client.end();

    return rankingLine;
}