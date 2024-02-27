import { faFilter } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Filter = () => {
    const [search, setSearch] = useState("");
    const [marca, setMarca] = useState([]);
    const [talla, setTalla] = useState({});
    const [price, setPrice] = useState({});


  return (
    <div>


        <button className='border-solid-black'>
      <FontFaceSet icon={faFilter}/>
        </button>
    </div>
  );
};

export default Filter;
