import "bootstrap/dist/css/bootstrap.min.css";
import type { NextPage } from "next";
import ItemSlot from "../../src/components/ItemSlot";
import Widget from "../../src/components/Widget";
import { useEffect, useState } from "react";
import { Item } from "../../src/models/Item";
import { getBestValue } from "../../src/services/CraftService";
import { generateItems } from "../../src/utils/generateItems";

const Game: NextPage = () => {
  const [slotList, setSlotList] = useState<Array<Item>>([]);
  let level: number = 1;
  const items: Item[] = generateItems(level++);
  const bestResult: Item = getBestValue(items, 5 + level * 2);

  useEffect(() => {
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
  }, []);

  function clickItem(slotId: String, itemIndex: number) {
    if (
      slotList[itemIndex] === undefined ||
      slotList[itemIndex].id == "" ||
      itemIndex == 4
    )
      return;
    if (slotId.includes("crafting")) {
      for (let index = 0; index < 36; index++) {
        if (
          slotList[index + 9] === undefined ||
          slotList[index + 9].id === ""
        ) {
          slotList[index + 9] = slotList[itemIndex];
          slotList[itemIndex] = {
            id: "",
            imagem: "",
            peso: 0,
            quantidade: 0,
            valor: 0,
          };
          break;
        }
      }
    } else {
      for (let index = 0; index < 9; index++) {
        if (slotList[index] === undefined || slotList[index].id == "") {
          slotList[index] = slotList[itemIndex];
          slotList[itemIndex] = {
            id: "",
            imagem: "",
            peso: 0,
            quantidade: 0,
            valor: 0,
          };
          break;
        }
      }
    }

    setSlotList([...slotList]);
  }

  return (
    <Widget>
      <div className="inventory">
        <h1>Crafting</h1>
        <div className="slotSpace">
          <div className="d-flex align-items-center justify-content-around w-100">
            <div className="item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzUlEQVQ4y6WTsQ3CMBBF06RD0EAVGjZIRZc6ordSMwdDUCH3DEDnVTyP4Tv6x2EcHMDSVyzn3rtz4epwvVTMT6sEbldVYL4SEOrPfRhuQ/xOSnIgIKQ9trL/KElBFCPNvokSToK8SHbrWkBdpCWcRE8jEgi6U/cGaBn26VUw2aJ+SCigBMFPXZyCiHMuGGOeAhxoEYo0TNBaG2vxjYLNchR470WiO+uOGpYrYGGTSlKQMM/BiCAnYYqgXlrCrrPAnGQOOPmOCJU6/vWCmTu4+j2Qw1oKGgAAAABJRU5ErkJggg==" />
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
              <ItemSlot />
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
