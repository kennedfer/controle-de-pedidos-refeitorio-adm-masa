export function Order({order}){
    const {type, quantity} = order;

    return <div className="flex gap-2 border p-2">
        <span>{type}</span>
        <span>{quantity}</span>
        <button className="ml-auto">
            reprovar
        </button>
        <button>
            aprovar
        </button>
    </div>
}