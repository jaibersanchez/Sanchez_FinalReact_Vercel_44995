import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useCarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import { createOrdenCompra, updateProducto, getProducto } from "../../utils/firebase";

export const Checkout = () => {
    const {carrito, emptyCart, totalPrice} = useCarritoContext()
    let navigate = useNavigate()
    const datosForm = useRef()
    const consultarForm = (e) => {
        e.preventDefault ()
        console.log(datosForm.current) 
        const data = new FormData(datosForm.current)
        const cliente = Object.fromEntries(data)
               
        const aux = [...carrito]

        aux.forEach(prodCarrito => { //Descontar stock de BDD
            getProducto(prodCarrito.id).then(prodBDD => {
                
            })
        })

        if (cliente.email === cliente.returnEmail) {
            
            createOrdenCompra(cliente, aux, totalPrice(), new Date(). toISOString()).then(ordenCompra => {
                toast.success(`Muchas gracias por su compra, su orden de compra con id ${ordenCompra.id}, por un total de $ COP ${new Intl.NumberFormat('de-DE').format (totalPrice())} fue realizada exitosamente, vuelve pronto`)
                e.target.reset()
                emptyCart()
                navigate("/")
            })

        } else {
            toast.error(`Los correos no son compatibles, por favor ingresar de nuevo el correo para finalizar tu compra`)    
        }

    }

    return (
        
        <>
        {carrito.length === 0
        ?
        <>
            <h2>Para finalizar la compra debes tener productos en el carrito</h2>
            <Link className="nav-link" to={"/"}><button className="btn btn-primary">Continuar comprando</button></Link>
        </>
        :
        <div className="container contForm">
            <form onSubmit ={consultarForm} ref={datosForm}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                    <input type="text" className="form-control" name="nombre" required/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="returnEmail" className="form-label">Confirmar Email</label>
                    <input type="email" className="form-control" name="returnEmail" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">Documento</label>
                    <input type="number" className="form-control" name="dni" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Número telefónico</label>
                    <input type="number" className="form-control" name="celular" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion" required/>
                </div>
                <button type="submit" className="btn btn-primary">Finalizar compra</button>
            </form>
        </div>
        }
        </>
    )
}

