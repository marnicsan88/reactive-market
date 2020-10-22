import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {getFirestore} from '../firebase';
import Loading from '../components/loading/Loading';
import ItemListContainer from '../components/itemList/ItemListContainer'
import {useParams} from 'react-router-dom';
import "./css/styles.css"

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export default function Search(){
    const {idCategoria} = useParams();
    const {filtro} = useParams();
    const [categoria,setCategoria] = useState("");
    const [items,setItems] = useState([]);
    const [loading,isLoading] = useState(true);

    const getCategoryRef = () => {
        const db = getFirestore();
        const categoryDocRef = db.collection('categories').doc(idCategoria)
        categoryDocRef.get().then((doc) => {
            if(!doc.size){
                console.log("No Data");
            }
            setCategoria(doc.data().descripcion)
        }).catch(error => {
            console.log("ERROR ",error)
        })
        return categoryDocRef;
    }

    useEffect(() => {
        isLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("spells")
        let itemQuery = itemCollection;
        if(idCategoria){
            if(filtro){
                itemQuery = itemQuery.where("idCategoria","==", getCategoryRef()).where("nombre","==", filtro).limit(20)
            }else{
                itemQuery = itemQuery.where("idCategoria","==", getCategoryRef()).orderBy("nombre").limit(20)
            }
        }else if(filtro){
            itemQuery = itemQuery.where("nombre","==", filtro)
        }
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
    },[idCategoria,filtro]);

    return(
        <div className="bodyContainer">{
            loading ? <Loading msg="CARGANDO"/> : 
            <>
                <div style={{marginTop:"1.5rem",marginBottom:"2rem",marginLeft:"1.5rem"}}>
                    <h1 style={{display:"inline"}}>{categoria?(/([aeiou])$/g.test(categoria.substring(categoria.length-1))?`${categoria}s`:`${categoria}es`):"Resultados"}</h1>
                    {filtro?<h2 style={{display:"inline"}}>&nbsp;para <strong>{filtro}</strong></h2>:""}
                </div>
                <ItemListContainer items={items}/>
            </>
        }</div>
    )
}