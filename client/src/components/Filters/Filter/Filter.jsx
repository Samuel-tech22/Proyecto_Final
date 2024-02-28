"use client"
import DefaultInput from '@/components/Controles/Input/defaultInput';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const Filter = ( {handleFilter} ) => {
    const [marca, setMarca] = useState("");
    const [talla, setTalla] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => {
    handleFilter(marca, talla, minPrice, maxPrice);
  }, [marca, talla, minPrice, maxPrice]);

  return (
    <div>
        <button className='border-solid-black'>
      <FontAwesomeIcon icon={faFilter}/>
      <span>Filter</span>
        </button>
        <div>          
        <select name="marca" id="marca" onChange={(e) => setMarca(e.target.value)} value={marca} >
          <option value="">Todas las marcas</option>
          <option value="Moleca">Moleca</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Converse">Converse</option>
          <option value="Modare">Modare</option>
        </select>
        <select name="talla" id="talla" onChange={(e) => setTalla(e.target.value)} value={talla}>
          <option value="">Todas las Tallas</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
        </select>
          <label htmlFor="minPrice">Precio Mínimo</label>
          <input type="text" name="minPrice" id="minPrice" placeholder='Precio Mínimo' onChange={(e) => setMinPrice(e.target.value)} value={minPrice}/>
          <DefaultInput label={"Precio Mínimo"} type={"text"} onChange={(e) => setMinPrice(e.target.value)} value={minPrice} placeholder={"Precio Mínimo"} />
          <label htmlFor="maxPrice">Precio Máximo</label>
          <input type="text" name="maxPrice" id="maxPrice" placeholder='Precio Máximo' onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice}/>       
         </div>
    </div>
  );
};

export default Filter;
