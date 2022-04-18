export default function ItemSlot(props: any) {
  return (
    <>
      <div id={props.id} className="slot" onClick={props.onClick}>
        <div className="item">
          <img
            src={
              typeof props.item !== "undefined"
                ? props.item.imagem
                : ""
            }
          />
          <div className="number">
            {typeof props.item !== "undefined" && props.item.quantidade > 0
              ? props.item.quantidade
              : ""}
          </div>
        </div>
      </div>
      {typeof props.item !== "undefined" && props.item.quantidade > 0
        ?
        <div className="item-info">
          <div>{`Item: ${props.item.id}`}</div>
          <div>{`Peso: ${props.item.peso}`}</div>
          <div>{`Valor: ${props.item.valor}`}</div>
        </div> : <></>
      }
    </>
  );
}
