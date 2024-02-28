

const Search = ({handleSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
          const encodedTerm = searchTerm.replace(/\s/g, '%20'); // Reemplaza los espacios en blanco con %20
          router.push(`/store/search/${encodeURIComponent(encodedTerm)}`);
        }
      };

    useEffect(() => {
        handleSearch(title);
      }, [title]);
    

    return (
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
    )
}

export default Search;