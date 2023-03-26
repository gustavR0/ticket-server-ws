const TicketList = require('./ticket-list')

class Sockets {
  constructor (io) {
    this.io = io

    this.ticketList = new TicketList()
    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', (socket) => {
      // Escuchar evento: mensaje-to-server
      socket.on('solicitar-ticket', (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket()
        callback(nuevoTicket)
      })

      socket.on('next-ticket', ({ agente, escritorio }, callback) => {
        const suTicket = this.ticketList.asignarTicket(agente, escritorio)
        callback(suTicket)

        this.io.emit('ticket-asignado', this.ticketList.ultimosTickets)
      })
    })
  }
}

module.exports = Sockets
