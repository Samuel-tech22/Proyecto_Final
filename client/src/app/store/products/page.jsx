import AllProducts from "@/components/AllProducts/AllProducts";
import Filter from "@/components/Filter/Filter";

export default function ProductsPage(){


    return (
        <div className="px-28 py-7">

        <Filter/>
        <div>
            <AllProducts title= "Productos"></AllProducts>
            
        </div>
        </div>
    );
}