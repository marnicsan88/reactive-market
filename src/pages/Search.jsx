import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {getFirestore} from '../firebase';
import Loading from '../components/loading/Loading';
import ItemListContainer from '../components/itemList/ItemListContainer'
import "./css/styles.css"

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export default function Search(){
    const [items,setItems] = useState([]);
    const [loading,isLoading] = useState(true);
    const catName = useQuery().get("catName")
    const catFilter = useQuery().get("categoryId")
    const itemName = useQuery().get("itemName")

    const getCategoryRef = (categoryId) => {
        const db = getFirestore();
        const categoryDocRef = db.collection('categories').doc(categoryId);
        return categoryDocRef;
    }

    useEffect(() => {
        isLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("spells")
        let itemQuery = itemCollection;
        if(catFilter && catFilter !== "-1" && itemName){
            itemQuery = itemQuery.where("idCategoria","==", getCategoryRef(catFilter)).where("nombre","==", itemName).limit(20)
        }else if(catFilter && catFilter !== "-1" && !itemName){
            itemQuery = itemQuery.where("idCategoria","==", getCategoryRef(catFilter)).orderBy("nombre").limit(20)
        }else if(itemName)
            itemQuery = itemQuery.where("nombre","==", itemName)
        itemQuery.get().then((querySnapshot) => {
            if(!querySnapshot.size){
                console.log("No Data");
            }
            setItems(querySnapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            }))
        }).catch(error => {
            console.log("ERROR ",error)
        }).finally(
            () => {isLoading(false);
        });
    },[catFilter,itemName]);


    return(
        <div className="bodyContainer">
            <>
                <h1 className="titulo">{catName?(/([aeiou])$/g.test(catName.substring(catName.length-1))?`${catName}s`:`${catName}es`):"Resultados"}</h1>
                {itemName?<h2 style={{display:"inline"}}>&nbsp;para <strong>{itemName}</strong></h2>:""}
            </>
            {loading?<Loading msg="CARGANDO"/>:<ItemListContainer items={items}/>}
        </div>
    )
}