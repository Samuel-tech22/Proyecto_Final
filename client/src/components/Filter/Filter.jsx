"use client"
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Filter = () => {
    const [marca, setMarca] = useState([]);
    const [talla, setTalla] = useState({});
    const [price, setPrice] = useState({});
    


  return (
    <div>


        <button className='border-solid-black'>
      <FontAwesomeIcon icon={faFilter}/>
      <span>Filtar</span>
        </button>
        <div>
          <h1>Filtrar</h1>
          <label htmlFor="marca">Marca</label>
          <select name="marca" id="marca">
            <option value={marca}>Nike</option>
            <option value={marca}>Moleca</option>
            <option value={marca}>Beira Rio</option>
            <option value={marca}>Adidas</option>
            <option value={marca}>Puma</option>
            <option value={marca}>Modare</option>
          </select>
          <label htmlFor="talla">Talla</label>
          <select name="talla" id="talla">
            <option value={talla}>34</option>
            <option value={talla}>35</option>
            <option value={talla}>36</option>
            <option value={talla}>37</option>
            <option value={talla}>38</option>
            <option value={talla}>39</option>
          </select>
          <label htmlFor="price">Precio</label>
          <input type="number" placeholder="Precio mínimo" value={price} />
          <input type="number" placeholder="Precio máximo" value={price}/>
        </div>
    </div>
  );
};

export default Filter;
