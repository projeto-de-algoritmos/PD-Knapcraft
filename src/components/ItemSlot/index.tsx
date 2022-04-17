export default function ItemSlot(props: any) {
  return (
    <>
      <div id={props.id} className="slot" onClick={props.onClick}>
        <div className="item">
          <img
            src={
              typeof props.item !== "undefined" && props.item.imagem !== ""
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
      <div className="item-info">
        {typeof props.item !== "undefined" && props.item.quantidade > 0
          ? `Item: ${props.item.id} Peso: ${props.item.peso} Valor: ${props.item.valor}`
          : ""}
      </div>
    </>
  );
}
