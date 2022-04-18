import "bootstrap/dist/css/bootstrap.min.css";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const GameOver: NextPage = () => {
    const router = useRouter();

    return (
        <div className="d-flex justify-content-center vh-100 gameOver">
            <div className="d-flex flex-column w-50">
                <h1 className="text-light text-center">Game over!</h1>
                <h2 className="text-light m-5 text-center">Score:
                    <div className="text-warning">{router.query.score}</div>
                </h2>
                <button className="button-java" onClick={() => router.push("/")}>Voltar ao inicio</button>
                <button className="button-java" onClick={() => location.href = 'https://github.com/projeto-de-algoritmos/PD-dupla20'}>Repositório</button>
            </div>
        </div>

    );
};

export default GameOver;