import React, {useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import '../../styles/cardsStyles.css';


function Liste() {
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

        <section className="pokemon-list">
            <h1>Liste des pokemon</h1>
            <div className="pokemon-container">
                {data.map((pokemon, index) => (
                    <div key={index} className="pokemon-card">
                    <Pokemon name={pokemon.name} url={pokemon.url}/>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Liste;