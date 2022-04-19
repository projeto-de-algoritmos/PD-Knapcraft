import { Item } from './Item';

export type Level = {
    numero: number;
    peso: number;
    bestResult: Item;
    inventoryList: Item[];
    craftingList: Item[];
};