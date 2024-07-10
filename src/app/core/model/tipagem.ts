export type Tipos = "Bug" | "Dragon" | "Fairy" | "Fire" | "Grass" | "Lightning" | "Psychic" | "Steel" | "Water" | "Colorless" | "Darkness" | "Fighting" | "Rock" | "Flying" | "Ice" | "Ground" | "Ghost" | "Poison" | "Metal";
export type SuperTipos =  "Energy" | "Pokémon" | "Trainer";
export type Raridades =  "Common" | "Uncommon" | "Rare" | "Rare Holo" | "Rare Holo GX" | "Rare Holo EX" | "Rare Holo V" | "Promo" | "Rare Ultra";
export type Tag<T> = {
    label:T
    count:number,
    cor?:string,
}
export type ObjetoString = {[key:string]:string}
export type ObjetoNumber = {[key:string]:number}
export type ObjetoDinamico = {[key:string]:any}

export type ICONES = 'baralho' | 'baralhoPlus' | 'carta' | 'github' | 'linkedin' | 'youtube' | 'whats' | 'edit' | 'shared' | 'delete' | 'leftLeft' | 'left' | 'right' | 'rightRight' | 'plusCircle' | 'minusCircle' | 'view' | 'save' | 'searchUpdate' | 'noFile' | 'default';
