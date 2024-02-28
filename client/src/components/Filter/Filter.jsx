"use client"
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Filter = () => {
    const [search, setSearch] = useState("");
    const [marca, setMarca] = useState([]);
    const [talla, setTalla] = useState({});
    const [price, setPrice] = useState({});


  return (
    <div>
        <button className='border-solid-black'>
      <FontAwesomeIcon icon={faFilter}/>
      <span>Filter</span>
        </button>
        <div>          
        <select name="" id="" >
          <option value="">Moleca</option>
          <option value="">Nike</option>
          <option value="">Adidas</option>
          <option value="">Puma</option>
          <option value="">Converse</option>
          <option value="">Modare</option>
        </select>
        <select name="" id="">
          <option value="">34</option>
          <option value="">35</option>
          <option value="">36</option>
          <option value="">37</option>
          <option value="">38</option>
          <option value="">39</option>
          </select>
          <label htmlFor="">Price</label>
          <input type="text" name="" id="" placeholder='Precio Mínimo'/>
          <input type="text" name="" id="" placeholder='Precio Máximo'/>       
         </div>
    </div>
  );
};

export default Filter;
