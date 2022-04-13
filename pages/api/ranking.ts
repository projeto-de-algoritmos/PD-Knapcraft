import type { NextApiRequest, NextApiResponse } from 'next'
import { RankingLine } from '../../src/models/Ranking' 
import { selectAllRanking } from '../../src/services/RankingService'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankingLine[]>
) {
  try {
    res.status(200).json(await selectAllRanking());
  } catch (ex) {
    console.error(ex);
    res.status(200).json([]);
  }
}
