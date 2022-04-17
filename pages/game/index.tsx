import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemSlot from "../../src/components/ItemSlot";
import Widget from "../../src/components/Widget";
import { useEffect, useRef, useState } from "react";
import { Item } from "../../src/models/Item";

const Game: NextPage = () => {
  const refs: any = [];
  let num: number = 0;
  const [slotList, setSlotList] = useState<Array<Item>>([]);

  function clickItem(id: String, index2: number) {
    if (id.includes("crafting")) {
      for (let index = 0; index < 36; index++) {
        if (slotList[index] === undefined || slotList[index].id == "") {
          slotList[index + 8] = slotList[index2];
          slotList[index2] = {
            id: "",
            image: "",
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
          slotList[index] = slotList[index2];
          slotList[index2] = {
            id: "",
            image: "",
            peso: 0,
            quantidade: 0,
            valor: 0,
          };
          break;
        }
      }
    }
    const newSlotList: Array<Item> = [...slotList];
    setSlotList(newSlotList);
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
                    reference={(componentRef: any) =>
                      (refs[num++] = componentRef)
                    }
                    onClick={() => clickItem("crafting" + index, index)}
                    item={slotList[index]}
                  />
                ))}
            </div>
            <div className="slot"></div>
          </div>
        </div>
        <h1>Inventory</h1>
        <div className="slotSpace">
          {Array(27)
            .fill(1)
            .map((value, index: number) => (
              <ItemSlot
                id={"inventory" + index}
                reference={(componentRef: any) => (refs[num++] = componentRef)}
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
                reference={(componentRef: any) => (refs[num++] = componentRef)}
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
