import React, { useState, useEffect } from "react";

function Pokemon({ name, url }) {
    const [image, setImageUrl] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const id = url.split('/').filter(Boolean).pop();
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        setImageUrl(image);
    }, [url]);

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            {error ? (
                <p>Error loading image</p>
            ) : (
                <img 
                    src={image} 
                    alt={name}
                    onError={() => setError(true)}
                    style={{ width: '100px', height: '100px' }}
                />
            )}
            <p>{name}</p>
        </div>
    );
}

export default Pokemon;