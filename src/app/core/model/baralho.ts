import { Carta } from "./carta"
import { SuperTipos, Tag, Tipos } from "./tipagem"

export type Baralho = {
    id: string
    nome:string,
    dataCriacao:Date,
    cartas:Carta[],
    tipos:Tag<Tipos>[],
    superTipos: Tag<SuperTipos>[],
    raridade:number,
}