require('colors')

const { guardarDB, leerDB } = require('./helpers/guardar-archivo')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {

  let option = ''
  const tareas = new Tareas(),
    tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB)
  }

  do {
    option = await inquirerMenu()
    
    switch (option) {
      case '1':
        // Crear Opcion
        const desc = await leerInput('Descripcion:')
        tareas.crearTarea(desc)
        break;
        
      case '2':
        tareas.listadoCompleto()
        break;

      case '3':
        tareas.listarPendientesCompletadas(true)
        break;

      case '4':
        tareas.listarPendientesCompletadas(false)
        break;

      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break;

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr)
        if (!id === '0') {
          const ok = await confirmar('¿Esta seguro?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('\nTarea Borrada')
          }
        }
        break;
      }

    guardarDB(tareas.listadoArr)

    if (option !== '0') await pausa()
  } while (option !== '0')
}

main()
