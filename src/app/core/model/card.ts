type holofoil = {
    low: number,
    mid: number,
    high: number,
    market: number,
    directLow: number|number,
}

type tcgplayer = {
    url: string,
    updatedAt: string,
    prices: {
        holofoil:holofoil,
        reverseHolofoil: holofoil,
    }
}


type setCard = {
    id: string,
    name: string,
    series: string,
    printedTotal: number,
    total: number,
    legalities: {[key:string]:string}
    ptcgoCode: string,
    releaseDate: string,
    updatedAt: string,
    images: { symbol: string, logo: string, }
}

type weakness = {
    type: string,
    value: string,
}

type attack = {
    name: string,
    cost: string[],
    convertedEnergyCost: number,
    damage: string,
    text: string,
}

type abilitie = {
    name: string,
    text: string,
    type: string,
}


export type card = {
    id: string,
    name: string,
    supertype: string,
    subtypes: string[],
    hp: string,
    types: string[],
    evolvesFrom: string,
    abilities: abilitie[],
    attacks: attack[],
    weaknesses: weakness[],
    retreatCost: string[],
    convertedRetreatCost: 1,
    set: setCard,
    number: string,
    artist: string,
    rarity: string,
    nationalPokedexNumbers: number[],
    legalities: {[key:string]:string},
    images: { small: string, large: string, },
    tcgplayer: {},
    cardmarket: {},
}

export type cards ={
    data: card[],
    page: number,
    pageSize: number,
    count: number,
    totalCount: number
}