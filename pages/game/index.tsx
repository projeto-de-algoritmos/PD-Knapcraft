import type { NextPage } from "next";
import ItemSlot from "../../src/components/ItemSlot";
import Widget from "../../src/components/Widget";
import { useEffect, useState, FormEvent } from "react";
import { Item } from "../../src/models/Item";
import { getBestValue } from "../../src/services/CraftService";
import { generateItems } from "../../src/utils/generateItems";
import { useRouter } from "next/router";
import arrow from "../../assets/images/arrow.png";
import { API } from '../../assets/consts';
import { Level } from '../../src/models/Level';
import Background from '../../src/components/Background';
import { Theme } from '../../src/models/Theme';

export default function Game({ theme }: GameProps) {
  const router = useRouter();
  const [level, setLevel] = useState<Level>({
    numero: 0, peso: 0, inventoryList: [], craftingList: [],
    bestResult: {
      id: 'result',
      imagem: "https://minecraftitemids.com/item/64/emerald.png",
      peso: 0,
      quantidade: 0,
      valor: 0,
    }
  });
  const [score, setScore] = useState<number>(0);
  const [footerList, setFooterList] = useState<Item[]>([]);
  const [levelScore, setLevelScore] = useState<any>({ pontuacao: 0, peso: 0 });

  useEffect(() => {
    nextLevel(1, 20);
    for (let index = 0; index < 9; index++) {
      footerList[index] = {
        id: "emerald".concat(index.toString()),
        imagem: "https://minecraftitemids.com/item/64/emerald.png",
        peso: 0,
        quantidade: 0,
        valor: 0,
      };
    }
  }, []);

  useEffect(() => {
    if (!score) return;
    const username = router.query.username?.toString() ?? "Anonimo";
    const data = {
      method: 'POST',
      body: JSON.stringify({ username, score })
    }
    fetch(API + '/ranking', data)
      .then(r => r.json())
      .then(j => console.log(j))
  }, [score]);

  function nextLevel(numero: number, peso: number) {
    const inventoryList = generateItems(numero);
    const bestValue = getBestValue(inventoryList, peso);
    const newLevel: Level = {
      numero,
      peso,
      inventoryList,
      craftingList: [],
      bestResult: {
        ...level.bestResult,
        peso: peso,
        quantidade: bestValue,
        valor: bestValue
      }
    }
    setLevel(newLevel);
    console.log("nextLevel", bestValue, inventoryList, newLevel);
  }

  function clickCraftItem(index: number) {
    const item = level.craftingList[index];
    if (!item) return;

    setLevel(l => {
      return {
        ...l,
        inventoryList: [...l.inventoryList, item],
        craftingList: l.craftingList.filter(i => i != item)
      }
    });
    setLevelScore({ pontuacao: levelScore.pontuacao - item.valor, peso: levelScore.peso - item.peso });
  }

  function clickInventoryItem(index: number) {
    const item = level.inventoryList[index];
    if (!item && level.craftingList.length < 9)
      return;

    setLevel(l => {
      return {
        ...l,
        inventoryList: l.inventoryList.filter(i => i != item),
        craftingList: [...l.craftingList, item],
      }
    });
    setLevelScore({ pontuacao: levelScore.pontuacao + item.valor, peso: levelScore.peso + item.peso });
  }

  function clickResult(e: FormEvent) {
    const isGameOver = levelScore.peso > level.peso || levelScore.pontuacao != level.bestResult.valor;

    if (isGameOver) {
      e.preventDefault();
      router.push({
        pathname: '/gameOver', query: { username: router.query.username, score }
      });
      return;
    }

    for (let index = 0; index < footerList.length; index++) {
      if (footerList[index].quantidade === 64)
        continue;

      if ((footerList[index].quantidade + levelScore.pontuacao) < 65 || index === 8) {
        footerList[index].quantidade += levelScore.pontuacao;
        break;
      }
      else {
        footerList[index + 1].quantidade = footerList[index].quantidade + levelScore.pontuacao - 64;
        footerList[index].quantidade = 64;
        break;
      }
    }

    setFooterList(footerList);
    setScore(score + levelScore.pontuacao);
    setLevelScore({ pontuacao: 0, peso: 0 });

    nextLevel(level.numero + 1, level.peso + 2);
  }

  return (
    <>
      <Background backgroundUri={theme.background} />
      <Widget>
        <div className="inventory">
          <h1>Crafting</h1>
          <div className="slotSpace">
            <div className="d-flex align-items-center justify-content-around w-100">
              <div className="rowSize">
                {Array(9)
                  .fill(1)
                  .map((value, index: number) => (
                    <ItemSlot
                      key={"crafting" + index}
                      onClick={() => clickCraftItem(index)}
                      item={level.craftingList[index]}
                      showTooltip={true}
                    />
                  ))}
              </div>
              <img src={arrow.src} />
              <div className="slot">
                <ItemSlot key={level.numero} item={level.bestResult} onClick={(e) => clickResult(e)} showTooltip={true} />
              </div>
            </div>
          </div>
          <h1>Inventory</h1>
          <div className="slotSpace">
            {Array(27)
              .fill(1)
              .map((value, index: number) => (
                <ItemSlot
                  key={"inventory" + index}
                  item={level.inventoryList[index]}
                  onClick={() => clickInventoryItem(index)}
                  showTooltip={true}
                />
              ))}
          </div>
          <div className="slotSpace">
            {Array(9)
              .fill(1)
              .map((value, index: number) => (
                <ItemSlot
                  key={'footer' + index}
                  item={footerList[index]}
                  showTooltip={false}
                />
              ))}
          </div>
        </div>
      </Widget>
    </>
  );
};

export async function getServerSideProps(context: any) {
  let theme = {
    background: 'https://wallpaperaccess.com/full/171177.jpg'
  };

  try {
    const themeResponse = await fetch(API + '/theme');
    theme = await themeResponse.json();
  } catch (ex) { };

  return {
    props: {
      theme
    }
  }
}

type GameProps = {
  theme: Theme
}