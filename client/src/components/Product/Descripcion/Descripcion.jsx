import AlertAviso from "@/components/Controles/Alerts/aviso";
import { useCart } from "@/contexts/CartContext";
import { faRefresh, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Descripcion = ({ initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const [talla, setTalla] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const { cart, addToCart, removeFromCart, calculateTotal } = useCart();

  function format(num) {
    return (
      "Gs. " +
      Number.parseInt(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  }

  function add() {
    if (talla) {
      // Busca el stock disponible para la talla seleccionada
      const selectedStock = product.stocks.find(
        (stock) => stock.talla === talla
      );

      if (selectedStock && selectedStock.stock > 0) {
        const detail = {
          _id: product._id,
          price: product.price,
          title: product.title,
        };

        // Resta 1 del stock del producto
        const updatedStock = product.stocks.map((stock) => {
          if (stock.talla === talla) {
            return { ...stock, stock: stock.stock - 1 };
          }
          return stock;
        });

        addToCart(detail, talla, Number.parseInt(cantidad));
        setCantidad(1);
        // Actualiza el estado del producto con el nuevo stock
        setProduct((prevProduct) => ({
          ...prevProduct,
          stocks: updatedStock,
        }));
        setTalla(undefined);
      } else {
        alert(
          "Lo sentimos, no hay suficiente stock disponible para esta talla."
        );
      }
    } else {
      setShowAlert(true);
    }
  }

  useEffect(() => {
    if (cantidad === 0) {
      setCantidad(1);
    }
  }, [cantidad]);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  

  return product._id ? (
    <div className="flex flex-col">
      {showAlert && (
        <AlertAviso
          title={"Aviso"}
          flotante={true}
          closable={true}
          handleClose={() => {
            setShowAlert(false);
          }}
          descripcion={"Por favor, seleccione una talla."}
        />
      )}

      <div className="flex flex-col ">
        <p className="text-3xl font-bold">{product.title}</p>
        <p className="text-xl font-semibold">{format(product.price)}</p>
      </div>
      <div className="flex gap-1">
        {product?.colors?.map((color, index) => {
          return (
            <span
              key={index}
              className="bg-gray-50 border-[2px] border-solid border-gray-600 px-1 text-sm flex items-center justify-center"
            >
              {color.toUpperCase()}
            </span>
          );
        })}
      </div>
      <div className="mt-2">
        <b>Talla:</b> {talla || "Seleccionar talla..."}
      </div>
      <div className="flex gap-2 mt-2">
        {product?.stocks?.map((stock, index) =>
          stock.stock > 0 ? (
            <span
              key={stock._id}
              onClick={() => {
                setTalla(stock.talla);
              }}
              className={`
              cursor-pointer
              rounder-md
               hover:scale-105
               bg-transparent
               border-[2px] 
               border-solid 
               border-[#333333] 
               px-1 
               text-sm 
               flex 
               items-center 
               justify-center ${
                talla === stock.talla ? "bg-sky-400 text-white" : ""
              } `}
            >
              {stock.talla}
            </span>
          ) : null
        )}
      </div>
      <div className="mt-4 flex w-[50%]">
        <div className="flex">
          <button
            className="bg-gray-100 px-2"
            onClick={(e) => {
              if (cantidad > 0) setCantidad(cantidad - 1);
            }}
          >
            -
          </button>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => {
              const newCantidad = parseInt(e.target.value);
              if (!isNaN(newCantidad)) {
                // Verifica si es un número válido
                setCantidad(newCantidad);
              } else {
                // Si el valor no es un número válido, podrías mostrar un mensaje de error o hacer alguna otra acción
                console.error("La cantidad ingresada no es válida");
              }
            }}
            className="bg-gray-100 px-2 w-[70px] text-center"
          />
          <button
            className="bg-gray-100 px-2"
            onClick={(e) => {
              setCantidad(cantidad + 1);
            }}
          >
            +
          </button>
        </div>

        <button
          className="bg-[#333333] text-white py-2 px-4"
          onClick={() => add()}
        >
          <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
          Agregar al carrito
        </button>
      </div>
      <div className="mt-2">
        {product.stocks.reduce((total, stock) => total + stock.stock, 0)} en
        Stock
      </div>
      <div className="mt-4">
        <p className="font-bold text-xl mb-2">Descripción</p>
        {product.description}
      </div>
      <div>
        <div className="flex flex-col text-lg pt-3">
          <span className="text-[#003366] font-bold ">HORMA GRANDE</span>
        </div>
        <div className="py-4">
          <span className="text-lg  font-bold pb-4">
            CONSULTE TABLA DE MEDIDAS
          </span>
          <div>
            <span>34___</span>
            <span>22,5 CM</span>
          </div>
          <div>
            <span>35___</span>
            <span>23,5 CM</span>
          </div>
          <div>
            <span>36___</span>
            <span>24,0 CM</span>
          </div>
          <div>
            <span>37___</span>
            <span>25,0 CM</span>
          </div>
          <div>
            <span>38___</span>
            <span>25,5 CM</span>
          </div>
          <div>
            <span>39___</span>
            <span>26,0 CM</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <FontAwesomeIcon className="animate-spin" width={32} icon={faRefresh} />
    </div>
  );
};

export default Descripcion;
