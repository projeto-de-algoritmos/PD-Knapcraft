import "bootstrap/dist/css/bootstrap.min.css";
import type { NextPage } from "next";
import ItemSlot from "../../src/components/ItemSlot";
import Widget from "../../src/components/Widget";
import { useEffect, useState } from "react";
import { Item } from "../../src/models/Item";
import { getBestValue } from "../../src/services/CraftService";
import { generateItems } from "../../src/utils/generateItems";
import { useRouter } from "next/router";

const defaultItem: Item = {
  id: "",
  imagem: "",
  peso: 0,
  quantidade: 0,
  valor: 0,
};

const Game: NextPage = () => {
  const router = useRouter();
  const [score, setScore] = useState<number>(0);
  const [slotList, setSlotList] = useState<Array<Item>>([]);
  const [level, setLevel] = useState({ numero: 1, peso: 7 });
  const [items, setItems] = useState<Item[]>(generateItems(level.numero));
  const [levelScore, setLevelScore] = useState<any>({ pontuacao: 0, peso: 0 });
  const [bestResult, setBestResult] = useState<Item>({
    id: "emerald",
    imagem: "https://minecraftitemids.com/item/64/emerald.png",
    peso: 1,
    quantidade: 0,
    valor: 0,
  });

  useEffect(() => {
    const bestValue = getBestValue(items, level.peso);
    setItems(generateItems(level.numero));

    for (let index = 0; index < 9; index++)
      slotList[index] = defaultItem;


    slotList[4] = {
      id: "EnchantedBook",
      imagem: "https://minecraftitemids.com/item/32/enchanted_book.png",
      peso: 0,
      quantidade: 0,
      valor: 0,
    };

    for (let index = 0; index < items.length; index++) {
      slotList[index + 9] = {
        id: items[index].id,
        imagem: items[index].imagem,
        peso: items[index].peso,
        quantidade: items[index].quantidade,
        valor: items[index].valor,
      };
    }

    setBestResult((values: any) => (
      {
        ...values,
        quantidade: bestValue,
        valor: bestValue,
      }
    ));

  }, [level]);

  function clickItem(slotId: String, itemIndex: number) {
    if (slotList[itemIndex] === undefined || slotList[itemIndex].id == "" || itemIndex == 4)
      return;

    if (slotId.includes("crafting")) {
      for (let index = 9; index < 36; index++) {
        if (slotList[index] === undefined || slotList[index].id === "") {
          setLevelScore({ pontuacao: levelScore.pontuacao - slotList[itemIndex].valor, peso: levelScore.peso - slotList[itemIndex].peso });
          slotList[index] = slotList[itemIndex];
          slotList[itemIndex] = defaultItem;
          break;
        }
      }
    } else {
      for (let index = 0; index < 9; index++) {
        if (slotList[index] === undefined || slotList[index].id == "") {
          setLevelScore({ pontuacao: levelScore.pontuacao + slotList[itemIndex].valor, peso: levelScore.peso + slotList[itemIndex].peso });
          slotList[index] = slotList[itemIndex];
          slotList[itemIndex] = defaultItem;
          break;
        }
      }
    }

    setSlotList([...slotList]);
  }

  function clickResult() {
    if (levelScore.peso <= level.peso && levelScore.pontuacao == bestResult.valor) {
      setScore(score + levelScore.pontuacao);
      setLevelScore({ pontuacao: 0, peso: 0 });
      setLevel({ numero: level.numero + 1, peso: level.peso + 2 });
    }
    else {
      router.push({
        pathname: '/gameOver', query: {
          username: router.query.username, score: score
        }
      });
    }
  }

  return (
    <Widget>
      <div className="inventory">
        <h1>Crafting</h1>
        <div className="slotSpace">
          <div className="d-flex align-items-center justify-content-around w-100">
            <div className="item">
              <img src="https://minecraftitemids.com/item/32/knowledge_book.png" />
            </div>
            <div className="rowSize">
              {Array(9)
                .fill(1)
                .map((value, index: number) => (
                  <ItemSlot
                    id={"crafting" + index}
                    onClick={() => clickItem("crafting" + index, index)}
                    item={slotList[index]}
                  />
                ))}
            </div>
            <div className="slot">
              <ItemSlot id="result" item={bestResult} onClick={() => clickResult()} />
            </div>
          </div>
        </div>
        <h1>Inventory</h1>
        <div className="slotSpace">
          {Array(27)
            .fill(1)
            .map((value, index: number) => (
              <ItemSlot
                id={"inventory" + index}
                item={slotList[index + 9]}
                onClick={() => clickItem("inventory" + index, index + 9)}
              />
            ))}
        </div>
        <div className="slotSpace">
          {Array(9)
            .fill(1)
            .map((value, index: number) => (
              <ItemSlot
                id={"main" + index}
                item={slotList[index + 36]}
                onClick={() => clickItem("main" + index, index + 36)}
              />
            ))}
        </div>
      </div>
    </Widget>
  );
};

export default Game;
