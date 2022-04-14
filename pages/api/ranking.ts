import type { NextApiRequest, NextApiResponse } from 'next'
import { RankingLine } from '../../src/models/Ranking'
import { selectAllRanking, createRankingLine, updateRankingLine, cleanUsername, containsUsername } from '../../src/services/RankingService'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await create(req, res);
  } else {
    await list(req, res);
  }

}

async function list(
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

async function create(
  req: NextApiRequest,
  res: NextApiResponse<RankingLine | ErrorResponse>
) {
  const { username, score } = req.body;

  try {
    let rankingLine = null;

    if (await containsUsername(username)) {
      rankingLine = await updateRankingLine({ username, score });
    } else {
      rankingLine = await createRankingLine({ username, score });
    }
    res.status(200).json(rankingLine);
  } catch (ex) {
    res.status(500).send({ error: "failed to create the ranking line" })
  }
}

type ErrorResponse = {
  error: string
}