import { card } from "./card"

export type baralho = {
    id: string
    name: string
    criatedAt: string
    cor: string
    cartas: card[],
    tipos: {label:string, count:number}[],
    superTipo: {label:string, count:number}[],
    raridades: number,
}


export type baralhos = {
    items: [],
    count: number
}