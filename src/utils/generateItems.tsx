import { Item } from "../models/Item";
import { randint } from "./random";

export type Material = {
  nome: string;
  valor: number;
};

export type Forma = {
  nome: string;
  valor: number;
  peso: number;
};

export function generateItems(level: number): Item[] {
  let items: Item[] = [];
  const material: Material[] = [
    { nome: "iron", valor: 3 },
    { nome: "diamond", valor: 4 },
    { nome: "netherite", valor: 5 },
  ];
  const forma: Forma[] = [
    { nome: "ore", peso: 20, valor: 1 },
    { nome: "block", peso: 20, valor: 8 },
    { nome: "chestplate", peso: 9, valor: 7 },
    { nome: "leggings", peso: 8, valor: 6 },
    { nome: "boots", peso: 8, valor: 3 },
    { nome: "helmet", peso: 8, valor: 4 },
    { nome: "sword", peso: 7, valor: 2 },
    { nome: "axe", peso: 5, valor: 2 },
    { nome: "hoe", peso: 5, valor: 2 },
    { nome: "shovel", peso: 6, valor: 2 },
    { nome: "pickaxe", peso: 7, valor: 2 },
  ];

  let selectedMaterial: Material = { nome: "", valor: 0 };
  let selectedForma: Forma = { nome: "", peso: 0, valor: 0 };

  for (let index = 0; index < level + 2 && index < 27; index++) {
    selectedMaterial = material[randint(0, material.length - 1)];
    selectedForma = forma[randint(0, forma.length - 1)];

    items.push({
      id: selectedMaterial.nome.concat(selectedForma.nome),
      imagem: `https://minecraftitemids.com/item/64/${selectedMaterial.nome}_${selectedForma.nome}.png`,
      peso: selectedForma.peso,
      quantidade: 1,
      valor: selectedForma.valor * selectedMaterial.valor,
    });
  }
  return items;
}
