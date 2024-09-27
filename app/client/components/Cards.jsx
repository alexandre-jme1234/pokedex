import React, {useEffect, useState } from "react";
import Pokemon from "./Pokemon";


function Cards() {
    const [data, setData] = useState([]);


    useEffect( () => {
       const fetchData = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const result = await res.json();
            setData(result.results)
            console.log(result, 'result fetch');
            
        } catch (error) {
            console.error(error);
        }
       }

       fetchData();

    }, [])


    return (

        <section>
            <h1>Liste des pokemon</h1>
            <div>
                {data.map((pokemon, index) => (
                    <Pokemon name={pokemon.name} url={pokemon.url}/>
                ))}
            </div>
        </section>
    )
}

export default Cards;