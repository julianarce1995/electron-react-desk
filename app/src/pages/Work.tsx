import React, { useEffect, useState } from 'react';

interface DataTable {
  id: number;
  Name: string;
}

const Work: React.FC = () => {
  const [entidad, setEntidad] = useState('');
  const [table, setTable] = useState('');
  const [dataTable, setDataTable] = useState<DataTable[]>([]);

  const handleEntityChange = (event: any) => {
    setEntidad(event.target.value); // Actualiza el estado con el valor del input
  };
  const handleTableChange = (event: any) => {
    setTable(event.target.value); // Actualiza el estado con el valor del input
  };
  async function insertData() {
     try {
       await (window as any).connection.createData(entidad);
     } catch (error) {
       console.log(error, "errorsito");
     }
    console.log("hola");
  }

  async function getData() {
    try {
      const data = await (window as any).connection.getData(table);
      console.log(data);
      setDataTable(data)
    } catch (error) {
      console.log(error, 'errorsote');
    }
    console.log('hola');
  }

  useEffect(() => {
    console.log(dataTable, "fasdferwerwerwerwe");
    
  }, [dataTable])
  /*
  const ipcRenderer = (window as any).ipcRenderer;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const setup = async () => {
    setLoading(true);
    const resp = await axios.get('http://127.0.0.1:8000/api/task');
    setTasks(tasks.concat(resp.data));
    setLoading(false);
  };
  useEffect(() => {
    setup();
    ipcRenderer.on('task:added', (event: any, data: any) => {
      setup();
    });
  }, []);
  */
  return (
    <div>
      {/*
      {!loading ? (
        <ul>
          {tasks &&
            tasks.map((task) => {
              return <li key={task.id}>{task.description}</li>;
            })}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
      <TodoForm /> 
      */}
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">
          Entidad.
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="entidad"
            id="entidad"
            value={entidad}
            onChange={handleEntityChange}
            className="flex rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
            placeholder="ejemplo: confama"
          />
        </div>
        <button
          onClick={() => insertData()}
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          role="menuitem"
          id="menu-item-3"
        >
          Insertar Entidad
        </button>
      </div>
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">
          Tabla.
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="table"
            id="table"
            value={table}
            onChange={handleTableChange}
            className="flex rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
            placeholder="ejemplo: Entidad"
          />
        </div>
        <button
          onClick={() => getData()}
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          role="menuitem"
          id="menu-item-3"
        >
          Obetener Datos x Tabla
        </button>
        <div>{dataTable.map((item, index) => {
          return (
            <label className="block text-sm/6 font-medium text-gray-900" key={index}>
              {item.Name}
            </label>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export { Work };
