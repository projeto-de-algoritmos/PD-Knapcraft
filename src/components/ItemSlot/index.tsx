export default function ItemSlot(props: any) {
  return (
    <div
      ref={props.reference}
      id={props.id}
      className="slot"
      onClick={props.onClick}
    >
      <div className="item">
        <img src={typeof props.item !== "undefined" ? props.item.image : ""} />
        <div className="number">
          {typeof props.item !== "undefined" && props.item.quantidade > 0
            ? props.item.quantidade
            : ""}
        </div>
      </div>
    </div>
  );
}
