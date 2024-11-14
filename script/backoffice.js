// classe per la creazione dei concerti
class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

const EPITICKET_URL = 'https://striveschool-api.herokuapp.com/api/agenda'

// GESTIAMO L'INVIO DEL FORM PER LA CREAZIONE DI UN NUOVO EVENTO

const form = document.getElementById('concert-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  // ora recupero i valori dei 4 campi del form e ci faccio un oggetto
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')
  const createdConcert = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )
  console.log("CONCERTO CREATO E PRONTO PER L'INVIO", createdConcert)
  fetch(EPITICKET_URL, {
    method: 'POST', // inserisco POST per CREARE una nuova risorsa
    body: JSON.stringify(createdConcert), // allego il nuovo concerto come stringa
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'xxxxxxxxx' // nell'endpoint che stiamo utilizzando non serve
    },
  })
    .then((response) => {
      if (response.ok) {
        // l'oggetto è stato salvato correttamente nel DB!
        alert('EVENTO SALVATO!')
        // svuotiamo il form!
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        timeInput.value = ''
      } else {
        // molto probabilmente qualcosa non va bene nel tuo oggetto
        throw new Error('Errore nel salvataggio del concerto')
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

// OPERAZIONI DEL PERSISTENT STORAGE (interazioni con i DB)
// READ (metodo GET) -> si utilizza l'endpoint principale
// READ (metodo GET) -> si può anche utilizzare un endpoint specifico
// CREATE (metodo POST) -> si utilizza l'endpoint principale
