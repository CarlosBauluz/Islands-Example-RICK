import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

const Personajes: FunctionalComponent = () => { 
  const [name, setName] = useState<string[]>([("")])
  //const [name2, setName2] = useState<string>("")
  const [error, setError] = useState<boolean>(false);
  const [num = 1, setNum] = useState<number>()
  const getCharacters = async (num: string)=> { 
    
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${num}`)
    const data = await response.json()
    const nombres:string[] = data.results.map((o) => o.name)
    
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
      const a = num -1
      setNum(a)
    }
  }

  useEffect(() => getCharacters(num), [num] )
  return (
    <div>
      {setError(false)}
      <button type="Next" onClick={handleClick1}>Next</button>  
      <button type="Back" onClick={handleClick2}>Back</button>
      {error && <div>El limite es la página {num}</div>}
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