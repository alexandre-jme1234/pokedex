import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from '../../redux/pokemonSlice';
import '../../styles/cardsStyles.css';

function Pokemon({ name, url }) {

    const dispatch = useDispatch();
    const { pokemon, loading, error } = useSelector((state) => state.pokemon);

    const [image, setImageUrl] = useState('');
    const [errorImg, setErrorImg] = useState(false);

    useEffect(() => {
        dispatch(fetchPokemon('pikachu')); // Exemple d'appel API pour récupérer Pikachu
      }, [dispatch]);

    useEffect(() => {
        const id = url.split('/').filter(Boolean).pop();
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        // Créer un nouvel objet Image pour gérer le chargement
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            setImageUrl(imageUrl); 
            setErrorImg(false); 
        };

        img.onerror = () => {
            setErrorImg(true); 
        };

        // Cleanup function pour éviter des fuites de mémoire
        return () => {
            setImageUrl('');
            setErrorImg(false);
        };
    }, [url]);

    const clickName = () => {
        console.log('dispatching name :', name)
        dispatch(fetchPokemon(name));
    }


    async function getPokemon(nameAPI) {
        try { 
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameAPI}`);

            if(!response.ok) {
                throw new Error(`Erreur : ${response.status}`); 
            }

            const pokemon = await response.json();

            const type = pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ');
            const hp = pokemon.stats.find(stat => stat.stat.name === "hp").base_stat;
            const imageUrl = pokemon.sprites.front_default;

            console.log('pokemon', pokemon)
            console.log('type', type);
            console.log('hp', hp);
            console.log('imageUrL', imageUrl)
        } catch (err) {
            console.error(err)
        }
};

    return (
        <div style={{ textAlign: 'center', margin: '20px' }} className="pokemon-content" onClick={clickName}>
            {errorImg ? ( 
                <p>Error loading image</p>
            ) : (
                <img 
                    src={image} 
                    alt={name}
                    style={{ width: '100px', height: '100px' }}
                />
            )}
            <p>{name}</p>
        </div>
    );
}

export default Pokemon;