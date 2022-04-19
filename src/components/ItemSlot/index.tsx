import { Item } from "../../models/Item";
import { MouseEventHandler } from "react";

export default function ItemSlot({ item, onClick, showTooltip }: ItemSlotProps) {
  if (!item || item.quantidade === 0) {
    return <div className="slot"></div>;
  }

  return (
    <>
      <div className="slot" onClick={onClick}>
        <div className="item">
          <img src={item.imagem} />
          <div className="number">
            {item.quantidade}
          </div>
        </div>
      </div>
      {showTooltip && item.quantidade > 0 &&
        <div className="item-info">
          <div>{`Item: ${item.id}`}</div>
          <div>{`Peso: ${item.peso}`}</div>
          <div>{`Valor: ${item.valor}`}</div>
        </div>
      }
    </>
  );
}

type ItemSlotProps = {
  item?: Item;
  onClick?: MouseEventHandler<HTMLDivElement>,
  showTooltip: boolean;
}