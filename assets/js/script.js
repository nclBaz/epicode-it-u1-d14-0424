// ********************************* EPIC CALENDAR **************************************

// --------------------- PARTE I, LA PARTE "STATICA" ------------------------------
// I seguenti task dovranno essere eseguiti all'avvio dell'applicazione per poter creare tutta la struttura del calendario

// 1. Dobbiamo prima di tutto capire quanti giorni ha il mese corrente (tenendo conto di anni bisestili ecc ecc) ✅

// 2. Una volta che abbiamo capito quanti giorni ha il mese corrente, possiamo usare questa informazione per andare a creare quel numero di celle nel calendario ✅

// 3. Il nome del mese corrente dovrebbe essere visualizzato nel titolo della pagina e il giorno corrente dovrebbe essere colorato diversamente dagli altri ✅

// --------------------- PARTE II, LA PARTE "DINAMICA" ------------------------------
// Nella seconda parte andremo invece a definire quelli che saranno i comportamenti dell'applicazione. Pertanto dovremo andare a creare del codice che risponda a determinati eventi tipo click su una cella del calendario o creazione di un nuovo appuntamento

// 4. Quando clicchiamo su una cella, essa dovrà essere in qualche maniera evidenziata; in più la sezione 'meeting day' dovrà riportare il numero del giorno selezionato ✅

// 5. Alla pressione del tasto 'save meeting' dobbiamo leggere orario e nome dell'appuntamento e salvarli nell'elenco degli appuntamenti del giorno selezionato ✅

// 6. Quando clicco su un giorno specifico dovrò poter vedere tutti gli appuntamenti per quella giornata ✅
const appointments = []

const daysInThisMonth = () => {
  const now = new Date() // Thu May 16 2024 09:36:34 GMT+0200 (Ora legale dell’Europa centrale)
  const getYear = now.getFullYear() // 2024
  const getMonth = now.getMonth() // 4 (perchè i mesi partono da zero, essendo noi in maggio allora il mese sarà il numero 4)

  // Per ottenere l'ultimo giorno del mese corrente andiamo al mese successivo per poi chiedere il giorno 0 che è l'ultimo del mese precedente

  const lastDayOfThisMonth = new Date(getYear, getMonth + 1, 0)
  console.log(lastDayOfThisMonth.getDate())
  return lastDayOfThisMonth.getDate()
}

const createDays = days => {
  // 1. Cerchiamo un riferimento al div 'calendar'
  const calendar = document.getElementById("calendar")

  // 2. Devo creare un certo numero di celle, 'certo numero' è un valore che viene passato come parametro
  for (let i = 0; i < days; i++) {
    appointments.push([])
    // 2.1 Ad ogni iterazione dovrò creare un div, la cella
    const dayCell = document.createElement("div") // <div></div>

    // 2.2 Dobbiamo aggiungere una classe 'day' al div
    dayCell.classList.add("day")

    // 2.3 All'interno del div dovrà esserci un h3 con il numero del giorno corrente
    const dayCellContent = document.createElement("h3") // <h3></h3>
    dayCellContent.innerText = i + 1 // <h3>15</h3>

    // 2.3 bis Devo controllare se la cella che stiamo creando è quella del giorno corrente, se lo è allora aggiungo la classe 'color-epic' a tale giorno
    const now = new Date()
    const today = now.getDate()
    if (today === i + 1) dayCellContent.classList.add("color-epic")

    // 2.4 Devo appendere l'h3 appena creato alla cella
    dayCell.appendChild(dayCellContent) // <div><h3>15</h3></div>

    // 2.5 Su OGNI Cella del calendario dobbiamo aggiungere un 'onclick', un evento che scateni una funzione quando la cella venga cliccata e che si occupi di aggiungere una classe 'selected' a tale cella
    dayCell.onclick = event => {
      // 2.5.1
      // Dobbiamo non solo aggiungere la classe selected all'elemento cliccato ma anche rimuovere la classe dagli altri
      const previouslySelected = document.querySelector(".selected") // torna l'unico nodo che sarà già selezionato
      if (previouslySelected) previouslySelected.classList.remove("selected") // All'inizio non esiste nessun elemento con classe .selected, quindi è CRUCIALE fare if(previouslySelected) altrimenti starei provando ad utilizzare .classList su qualcosa che è NULL, ricevendo errori in console

      // 2.5.2 Aggiungiamo quindi la classe selected all'elemento cliccato
      event.currentTarget.classList.add("selected")

      // 2.5.3 Andiamo a riportare il numero del giorno selezionato all'interno dello span 'newMeetingDay'
      const daySpan = document.getElementById("newMeetingDay")
      daySpan.innerText = i + 1
      daySpan.classList.add("hasDay")

      // 2.5.4 Mostro gli appuntamenti solo se ci sono per la giornata corrente
      if (appointments[i].length > 0) showMeetings(i)
      else {
        // 2.5.5 Se non ci sono appuntamenti per la giornata, nascondi l'intera sezione
        const meetingsDiv = document.getElementById("appointments")
        meetingsDiv.style.display = "none"
      }
    }

    // 2.6 Aggiungo la cella così creata al calendario
    calendar.appendChild(dayCell)
    /* <div id="calendar">
          <div>
            <h3>15</h3>
          </div>
       </div>
    */
  } // for
}

const printCurrentMonthInH1 = () => {
  // 1. Selezioniamo l'h1
  const title = document.querySelector("h1")
  // 2. Scopro il mese corrente
  const now = new Date()
  const currentMonthIndex = now.getMonth() // 4
  // 3. Vado a selezionare da un elenco di nomi di mesi il mese giusto
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
  const currentMonth = months[currentMonthIndex] // "Maggio"

  // 4. Vado a posizionare quel nome nell'h1
  title.innerText = currentMonth
}

const showMeetings = dayIndex => {
  // 1. Andare a leggere dall'array appointments gli appuntamenti del giorno corrente (ottenuto tramite dayIndex)
  const dayMeetings = appointments[dayIndex] // ci torna un array di meeting

  // 2. Selezioniamo l'elemento <ul>
  const meetingsUl = document.getElementById("appointmentsList")
  // 2.1 Svuoto l'<ul> per poter aggiungere alla lista solo ed esclusivamente gli appuntamenti di oggi
  meetingsUl.innerHTML = ""
  // 3. Per ogni meeting trovato dobbiamo creare un <li> e appenderlo all' <ul>
  dayMeetings.forEach(meeting => {
    const newLi = document.createElement("li")
    newLi.innerText = meeting
    meetingsUl.appendChild(newLi) // aggiungiamo gli <li> all' <ul>
  })

  // 4. Andiamo a selezionare il div che conterrà gli appuntamenti e lo mostriamo (al momento è nascosto)
  const meetingsDiv = document.getElementById("appointments")
  meetingsDiv.style.display = "block"
}

const saveMeeting = event => {
  event.preventDefault() // senza di questo la pagina refresha ad ogni click <-- NO BUONO

  // 1. Selezioniamo i dati inseriti all'interno degli input
  const meetingTime = document.getElementById("newMeetingTime")
  const meetingName = document.getElementById("newMeetingName")

  // 2. Salvo i dati che compongono il nuovo appuntamento in una struttura dedicata
  const meeting = meetingTime.value + " --- " + meetingName.value
  console.log(meeting)

  // [["10.00 --- spesa", "12.00 --- dentista"], [], [], ["09.30 --- meeting lavoro"], [], [],...]

  const selectedDay = document.getElementById("newMeetingDay").innerText // "20"
  const appointmentsIndex = selectedDay - 1
  console.log("Index: ", appointmentsIndex)
  const selectedDayAppointments = appointments[appointmentsIndex] // selectedDayAppointments è un array
  selectedDayAppointments.push(meeting)
  console.log(appointments)

  showMeetings(appointmentsIndex)

  // 3. Ripulisco il form
  meetingTime.value = ""
  meetingName.value = ""
}

// CreateDays dovrebbe venir invocata al caricamento completato della pagina
window.addEventListener("DOMContentLoaded", () => {
  // Tutto ciò che metto qua dentro verrà eseguito solo ed esclusivamente una volta che il DOM iniziale verrà caricato completamente
  const days = daysInThisMonth()
  createDays(days)
  printCurrentMonthInH1()

  // Seleziono il form e ci aggancio all'evento 'submit' la funzione 'saveMeeting' che si occuperà di creare i nuovi meeting
  const form = document.querySelector("form")
  form.onsubmit = saveMeeting
})
