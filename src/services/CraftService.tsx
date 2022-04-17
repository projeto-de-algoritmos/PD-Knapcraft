import { Item } from "../models/Item";

export function getBestValue(items: Item[], weight: number): any {
    const m: number[][] = [new Array(weight+1),];
    
    m[0].fill(0);

    for (let i = 1; i <= items.length; i++) {
        m[i] = new Array(weight+1);
        m[i][0] = 0;

        for (let w = 1; w <= weight; w++) {
            m[i][w] = select(m, items[i-1], i, w);
        }
    }

    return m[items.length][weight];
}

function select(m: number[][], item: Item, i: number, w: number): number{
    if (item.peso > w) {
        return m[i-1][w];
    }

    const a = item.valor + m[i-1][w-item.peso];
    const b = m[i-1][w];
    return Math.max(a, b);
}


// export function test(){
//     function createItem(id, valor, peso): Item{
//         return {
//             id,
//             peso,
//             valor,
//             quantidade: 1,
//             image: ''
//         };
//     }
    
//     const items = [
//         createItem('1', 1, 1),
//         createItem('2', 6, 2),
//         createItem('3', 18, 5),
//         createItem('4', 22, 6),
//         createItem('5', 26, 7),
//     ]
    
//     const W = 11;
//     console.log(items)
//     console.log(getBestValue(items, W));
// }
