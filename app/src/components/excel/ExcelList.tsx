import React, { useState, ChangeEvent } from 'react';

// Definir los tipos de los datos que se manejarán
interface DataItem {
  EDAD: number;
  IDENTIFICACION: string;
  NOMBRE: string;
  PROFESOR: string;
  SEDE: string;
  SEXO: string;
  TARIFA: string;
  TELEFONO: string;
}

const App: React.FC = () => {
  // El estado ahora tiene un tipo específico: un arreglo de objetos DataItem
  const [data, setData] = useState<DataItem[]>([]);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file: any = e.target.files?.[0];
    if (file) {
      try {
        const resultado = await (window as any).electron.readExcel(file.path)
        setData(resultado)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>EDAD</th>
                <th>IDENTIFICACION</th>
                <th>NOMBRE</th>
                <th>PROFESOR</th>
                <th>SEDE</th>
                <th>SEXO</th>
                <th>TARIFA</th>
                <th>TELEFONO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.EDAD}</td>
                  <td>{item.IDENTIFICACION}</td>
                  <td>{item.NOMBRE}</td>
                  <td>{item.PROFESOR}</td>
                  <td>{item.SEDE}</td>
                  <td>{item.SEXO}</td>
                  <td>{item.TARIFA}</td>
                  <td>{item.TELEFONO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
