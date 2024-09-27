
import db from "../db.server";

export async function createPokemon() {

    const findPokemon = await db.pokemon.findMany();
    const pokemon = await db.pokemon.create({
        id: '2',
        name: 'pikachu',
        type: 'electric'
    })

    if(!findPokemon) {
        return pokemon;
    } else {
        throw new Error('Pokemon existed !!')
    }
} 