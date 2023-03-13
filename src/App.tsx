import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [lines, setLines] = useState<Array<any>>([[10, 5, 2], [5], [2], [3], [5]]);

  const addPersonToLine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let LeastItemsAmout = 1e9;
    let lineWithLeast: number[];

    //on parcout le tableau afin de trouver la somme la plus petite
    lines.map((line) => {
      /*reduce permet "d'accumuler" chaque valeur d'un tableau
      Dans le cas présent, il permet de sommer les valeurs de chaque ligne*/
      const totalInLine: number = line.reduce(
        (sum: any, value: any) => sum + value,
        0
      );
      
      //on récupère la ligne avec la somme la + petite
      if (totalInLine < LeastItemsAmout) {
        LeastItemsAmout = totalInLine;
        lineWithLeast = line;
      }
    });
    
    //on redéfinit notre tableau, en y ajoutant la nouvelle valeur
    setLines(lines.map((line) => {
      return line === lineWithLeast ? [...line, value] : line; 
    }))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      //on parcourt le tableau, à chaque ligne, on diminue la 1ère valeur de 1, et on  garde le reste, et on enlève la valeur du tableau si elle est égale à 0
      setLines(lines.map(line => 
        [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        ))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <main>
      <form onSubmit={addPersonToLine}>
        <input
          required
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />
        <button>Checkout</button>
      </form>
      <div className="queue">
        {lines.map((line, index) => {
          return (
            <div className="line" key={index}>
              {line.map((items: number) => (
                <div>
                  <p>{items}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
