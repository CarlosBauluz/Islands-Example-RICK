import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

const Formulario: FunctionalComponent = () => {

    const [name, setName] = useState<number>()
    const [error, setError] = useState<boolean>(false);

  const getCharacter = async ()=> { 
    
    const response = await fetch(`https://rickandmortyapi.com/api/character/${name}`)
    const data = await response.json()
    const nombres = data.name
    
    setName(nombres);
  }

   const handleClick = (e: Event) => {
    if(!name||name < 0 ||name > 826){
        setError(true);
   }}
   useEffect(getCharacter() )
  return (
    <div>
        <input type="text" name="name" placeholder="Name" value={name} 
        onInput={(e)=>{
            setError(false);
            const newValue = e.currentTarget.value;
            <a>{newValue}</a>
        }} />
        <button type="button" onClick={handleClick}>Enviar</button>
        {error && <div>No existe un personaje con ese ID asignado {name}</div>}
    </div>
  )
}

export default Formulario;