import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "frida-beauty-shop-react-44995.firebaseapp.com",
  projectId: "frida-beauty-shop-react-44995",
  storageBucket: "frida-beauty-shop-react-44995.appspot.com",
  messagingSenderId: "289679192126",
  appId: "1:289679192126:web:7e712a085636a902f9616f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore() // Referencia base de datos

export const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach( async (prod) => {
        await addDoc(collection(db, "productos"), {// si existe productos lo consulta, si no, lo crea y lo consulta
            title: prod.title, 
            idCategoria: prod.idCategoria,
            stock: prod.stock,
            precio: prod.precio,
            img: prod.img,
        }) 
    })
}

export const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id }
    })
    return items
}

export const getProducto = async (id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id:producto.id}
    return item
}

export const updateProducto = async(id, info) => {
    await updateDoc(doc(db, "productos", id), info)
}

export const deleteProducto = async(id) => {
    await deleteDoc(doc(db, "productos"), id)
}

//Create and read orden de compra

export const createOrdenCompra = async (cliente, productos, precioTotal, fecha) => {
    const ordenCompra = await addDoc(collection(db, "ordenesCompra"),{
        datosCliente: cliente,
        productos: productos,
        precioTotal: precioTotal, 
        fecha: fecha
    })
    return ordenCompra
    
}

export const getOrdenCompra = async(id) =>{
    const oC = await getDoc(doc(db, "ordenesCompra", id))
    const ordenCompra = {...oC.data(), id: oC.id}
    return ordenCompra
}