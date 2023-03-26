const Ticket = require('./ticket')

class TicketList {
  constructor () {
    this.ultimoNumero = 0
    this.pendientes = []
    this.asignados = []
  }

  get siguitenteNumero () {
    this.ultimoNumero++
    return this.ultimoNumero
  }

  // 3 ticketes para las tarjetas y 10 en historial
  get ultimosTickets () {
    return this.asignados.slice(0, 13)
  }

  crearTicket () {
    const nuevoTicket = new Ticket(this.siguitenteNumero)
    this.pendientes.push(nuevoTicket)
    return nuevoTicket
  }

  asignarTicket (agente, escritorio) {
    if (this.pendientes.length === 0) {
      return null
    }

    const siguienteTicket = this.pendientes.shift()
    siguienteTicket.agente = agente
    siguienteTicket.escritorio = escritorio
    this.asignados.unshift(siguienteTicket)
    return siguienteTicket
  }
}

module.exports = TicketList
