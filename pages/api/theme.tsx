import type { NextApiRequest, NextApiResponse } from 'next'
import { Theme } from '../../src/models/Theme';
import theme from '../../assets/theme.json'
import { randint } from '../../src/utils/random';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Theme>
) {
  const background = theme.backgrounds[randint(0, theme.backgrounds.length-1)];
  res.status(200).json({background})
}