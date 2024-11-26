const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron/main');
const sqlite3 = require("sqlite3")

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'My buddy app',
    width: 1920,
    height: 1080,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/build/index.html'),
    protocol: 'file',
  });

  mainWindow.loadURL('http://localhost:3000');

}

let db;

app.whenReady().then(async () => {
  try {
    createMainWindow();
    await connection();
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
});
 

function createTable(db) {
  const tableName = "Entidad"
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
    [tableName],
    (err, row) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        if (!row) {        
          console.log(`La tabla "${tableName}" no existe. Creando tablas...`);
          const createTables = `
            CREATE TABLE IF NOT EXISTS Entidad (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Sede (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              IdEntidad INTEGER NOT NULL,
              FOREIGN KEY (IdEntidad) REFERENCES Entidad(ID)
            );

            CREATE TABLE IF NOT EXISTS Grupo (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              IdSede INTEGER NOT NULL,
              FOREIGN KEY (IdSede) REFERENCES Sede(ID)
            );

            CREATE TABLE IF NOT EXISTS Brigada (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              Fecha TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Estudiante (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              Edad INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Info (
              IdEstudiante INTEGER NOT NULL,
              IdGrupo INTEGER NOT NULL,
              IdBrigada INTEGER NOT NULL,
              Tarifa REAL NOT NULL,
              Despiojado TEXT CHECK(Despiojado IN ('Si', 'No')) NOT NULL,
              TienePiojos TEXT CHECK(TienePiojos IN ('Si', 'No')) NOT NULL,
              Razon TEXT CHECK(Razon IN ('Ausente', 'No Autorizado', 'Retirado')),
              PRIMARY KEY (IdEstudiante, IdGrupo, IdBrigada),
              FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(ID),
              FOREIGN KEY (IdGrupo) REFERENCES Grupo(ID),
              FOREIGN KEY (IdBrigada) REFERENCES Brigada(ID)
            );
          `;

          db.exec(createTables, (err) => {
            if (err) {
              console.error('Error al crear las tablas:', err.message);
            } else {
              console.log('Tablas creadas correctamente.');
            }
          });
        } else {
          console.log(`La tabla "${tableName}" ya existe.`);
        }
      }
    }
  );
}

async function connection() {
  try {
    const dbPath = path.join(process.cwd(), 'app.db');

    // Crear una nueva conexión a la base de datos
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error al conectar a la base de datos', err.message);
      } else {
        console.log('Conectado a la base de datos existente.');
      }
    });

    createTable(db);

    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
    throw error;
  }
}


async function insertEntity(name) {
  const query = `INSERT INTO Entidad (Name) VALUES (?);`;
  db.run(query, [name], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
    } else {
      console.log('Consulta ejecutada correctamente');
    }
  });
}

ipcMain.handle('get-data', async (event, table) => {
  const query = `SELECT * FROM ${table}`;
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err.message);
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('create-data', async (event, name) => {
  console.log('Mensaje recibido en el proceso principal:', name);
  try {
    await insertEntity(name);
  } catch (error) {
    console.error("Error al crear info:", error);
    throw error;
  }
  // Aquí puedes realizar acciones con el mensaje recibido
});