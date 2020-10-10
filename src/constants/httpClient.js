const getHechizos = () => {
    fetch('https://5f6a9065d808b90016bc1301.mockapi.io/spellmarketapi/v1/spell/')
    .then(res => {
        return res.json();
    })
}

const getHechizo = (idItem) => {
    fetch(`https://5f6a9065d808b90016bc1301.mockapi.io/spellmarketapi/v1/spell/${idItem}`)
    .then(res => res.json())
}

export{
    getHechizos,
    getHechizo
}