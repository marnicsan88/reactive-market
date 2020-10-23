import React, {useState, useEffect} from 'react'

export const CategoryContext = React.createContext("");

//Componente React que retorna un Provider con su valor englobando a todos los elemntos hijos que lo van consumir
export const CategoryProvider = (props) => {
    const[category, setCategory] = useState("");
    const [itemFilter,setItemFilter] = useState("");
    const [filterDestination,setFilterDestination] = useState("");

    useEffect(() => {
        setFilterDestination(category + itemFilter)
    },[category,itemFilter]);

    //el value definido en value va a ser accesible por todos los elementos envueltos por el 
    //contexto, en este caso: los children
    return(
        <CategoryContext.Provider value={{category, setCategory, itemFilter, setItemFilter, filterDestination}}>
            {props.children}
        </CategoryContext.Provider>
    )
}
