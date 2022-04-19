import style from './style.module.css';
import { RankingLine } from '../../models/Ranking';
import { Table } from 'react-bootstrap';
import { toTitle } from '../../utils/string';

export default function Ranking({ rankingList }: RankingProps) {
    rankingList = rankingList.sort((a, b) => b.score - a.score);

    return (
        <div className='d-flex w-50 flex-column header p-2'>
            <h2 className='header'>Ranking</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {rankingList.map((r, i) => <RankingLine index={i + 1} rankingLine={r} key={`${i}_${r.username}`} />)}
                </tbody>
            </Table>

        </div>
    )
}

function RankingLine({ index, rankingLine }: RankingLineProps) {
    return (
        <tr>
            <td>{index}</td>
            <td>{toTitle(rankingLine.username)}</td>
            <td>{rankingLine.score}</td>
        </tr>
    )
}

type RankingProps = {
    rankingList: RankingLine[];
}

type RankingLineProps = {
    index: number,
    rankingLine: RankingLine;
}