import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from 'react-icons/fa';
import { useCart } from "@/contexts/CartContext";

const TopHeader = () => {
  const { calculateTotalCount } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const encodedTerm = searchTerm.replace(/\s/g, '%20'); // Reemplaza los espacios en blanco con %20
      router.push(`/store/search/${encodeURIComponent(encodedTerm)}`);
    }
  };
  

  const goToCheckout = () => {
    router.push("/store/checkout");
  };

  return (
    <div className="flex flex-col items-center bg-[#696868]">
      <div className="flex items-center p-2 px-[30px] w-full">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-slate-200 p-2 rounded-lg flex items-center justify-around w-60 ml-20">
            <input
              type='text'
              placeholder='Buscar...'
              className='bg-transparent focus:outline-none w-24 sm:w-30'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className='text-slate-600' />
            </button>
          </form>
        </div>

        <div className="flex-1">
          <Link href="/store">
            <img width={150} className="mx-auto" src="/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="flex-1 flex gap-4 justify-end mr-20">
          <Link href="/store/user/login">
            <FontAwesomeIcon
              className="text-white"
              icon={faUser}
            ></FontAwesomeIcon>
          </Link>
          <button
            className="relative"
            onClick={goToCheckout}
          >
            <span className="absolute top-[-18px] right-[-11px] rounded-full bg-white h-[16px] w-[16px] flex items-center justify-center text-sm font-bold text-black">
              {calculateTotalCount()}
            </span>
            <FontAwesomeIcon
              className="text-white"
              icon={faCartShopping}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>

      <div className="w-full border-t-2 flex justify-center border-white p-2">
        <ul className="flex gap-4 text-white text-lg">
          <Link href={"/store"}>
            <li className=" hover:underline">Inicio</li>
          </Link>
          <Link href={"/store/categories/65c963770675d5d5ad5f2082"}>
            <li className="hover:underline">Tenis</li>
          </Link>
          <Link href={"/store/categories/65d1cf4a6c6ca2453aa3b56f"}>
            <li className="hover:underline">Sandalias</li>
          </Link>
          <Link href={"/store/categories/65d1cf6e6c6ca2453aa3b571"}>
            <li className="hover:underline">Botas</li>
          </Link>
          <Link href={"/store/categories/65d1cf776c6ca2453aa3b573"}>
            <li className="hover:underline">Infantil</li>
          </Link>
          <Link href={"/store/contacto"}>
            <li className=" hover:underline">Contacto</li>
          </Link>
          <Link href={"/store/devoluciones"}>
            <li className=" hover:underline">
              Cambios y devoluciones
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default TopHeader;

