import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

const Personajes: FunctionalComponent = () => {
  const [name, setName] = useState<string[]>([("")])
  const [name2, setName2] = useState<string>("")
  const [error, setError] = useState<boolean>(false);
  const [num, setNum] = useState<number>(1)
  const getCharacters = async (num: number) => {
    
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${num}&name=${name2}`)
    const data = await response.json()
    const nombres: string[] = data.results.map((o) => o.name)
    
    setName(nombres);
  }

  const handleClick1 = (e: Event) => {
    if (!num || num >= 41) {
      setError(true)
      setNum(num)
    } else {
      const a = num + 1
      setNum(a)
    }

    
  }
  const handleClick2 = (e: Event) => {
    if (!num || num <= 1) {
      setError(true)
      setNum(num)
    } else {
      const a = num - 1
      setNum(a)
    }
  }

  useEffect(() => getCharacters(num), [num])
  useEffect(() => {
    const timer = setTimeout(() => {
      getCharacters(num);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [name2]);

  return (
    <div>
      {setError(false)}
      <button type="Next" onClick={handleClick1}>Next</button>  
      <button type="Back" onClick={handleClick2}>Back</button>
      {error && <div>El limite es la página {num}</div>}
      <input type="text" name="nombre" placeholder="Nombre" value={name2} onInput={(e) => {
        setName2(e.currentTarget.value)
        setError(false)
      } 
        } />
      <h1>Ricky List</h1>
      <ul>
          {name.map((e) => 
            <li>{e} </li>
          )}
      </ul>
    </div>
  )
}

export default Personajes