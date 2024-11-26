import React from 'react';

const Work: React.FC = () => {
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
        <label className="block text-sm/6 font-medium text-gray-900">Price</label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="0.00" />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label className="sr-only">Currency</label>
            <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
        <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" id="menu-item-3">Sign out</button>
      </div>

    </div>
  );
};

export { Work };
