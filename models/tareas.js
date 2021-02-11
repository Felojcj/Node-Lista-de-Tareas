const Tarea = require('./tarea')
require('colors')

class Tareas {

  _listado = {}

  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach(key => listado.push(this._listado[key]))

    return listado
  }

  constructor() {
    this._listado = {}
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  cargarTareasFromArr(tareas = []) {
    tareas.forEach( tarea => this._listado[tarea.id] = tarea)
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)

    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    console.log()
    this.listadoArr.forEach((el, i) => {
      const { desc, completadoEn } = el
      let numeracion = `${i +1}.`.green,
        state = completadoEn ? `${'Completada'}`.green : `${'Pendiente'}`.red

      console.log(`${numeracion} ${desc} :: ${state}`)
    })
  }

  listarPendientesCompletadas(completadas = true) {
    console.log()
    let contador = 0

    this.listadoArr.forEach(el => {
      const { desc, completadoEn } = el,
        state = completadoEn ? `${completadoEn}`.green : `${'Pendiente'}`.red

      if (completadas) {
        if (completadoEn) {
          const numeracion = (contador += 1).toString() + '.'
          console.log(`${numeracion.green} ${desc} :: ${state}`)
        }
      } else {
        if (!completadoEn) {
          const numeracion = (contador += 1).toString() + '.'
          console.log(`${numeracion.green} ${desc} :: ${state}`)
        }
      }
    })
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) tarea.completadoEn = null
    })
  }
}

module.exports = Tareas