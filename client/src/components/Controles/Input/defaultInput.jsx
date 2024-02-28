const DefaultInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      {
        label && 

        <label htmlFor={label}>{label}</label>
      }
      
      <input
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
export default DefaultInput;