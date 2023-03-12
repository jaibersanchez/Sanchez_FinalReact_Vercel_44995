import { Link } from "react-router-dom"
import React from "react"
export const Categorias = React.memo(() => {
    return (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <button className="btn btn-dark">Categorías</button>
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={'/category/Cuidado capilar'}>Capilar</Link></li>
            <li><Link className="dropdown-item" to={'/category/Maquillaje'}>Maquillaje</Link></li>
            <li><Link className="dropdown-item" to={'/category/Cuidado facial'}>Cuidado facial</Link></li>
          </ul>
        </li>
    )
})


