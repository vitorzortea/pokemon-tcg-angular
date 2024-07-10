import { Raridades, SuperTipos, Tipos } from "./tipagem";

export type CartaAPI = {
    data:Carta;
}

export interface Carta {
    id: string;
    name: string;
    supertype: SuperTipos;
    subtypes?: string[];
    hp?: string;
    types: Tipos[];
    evolvesFrom?: string;
    attacks: Attack[];
    weaknesses: WeaknessOrResistance[];
    resistances: WeaknessOrResistance[];
    retreatCost: string[];
    convertedRetreatCost?: number;
    set?: CardSet;
    number?: string;
    artist?: string;
    rarity?: Raridades;
    flavorText?: string;
    nationalPokedexNumbers?: number[];
    legalities?: Legalities;
    images: CardImages;
    tcgplayer?: TcgPlayer;
    cardmarket?: CardMarket;
}
  
interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
 }
  
interface WeaknessOrResistance {
    type: string;
    value: string;
 }
  
interface CardSet {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: SetImages;
 }
  
interface Legalities {
    unlimited: string;
 }
  
interface SetImages {
    symbol: string;
    logo: string;
 }
  
interface CardImages {
    small: string;
    large: string;
 }
  
interface TcgPlayer {
    url: string;
    updatedAt: string;
    prices: Prices;
 }
  
interface Prices {
    holofoil: PriceDetails;
    reverseHolofoil: PriceDetails;
 }
  
interface PriceDetails {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number | null;
 }
  
interface CardMarket {
    url: string;
    updatedAt: string;
    prices: MarketPrices;
 }
  
interface MarketPrices {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
 }