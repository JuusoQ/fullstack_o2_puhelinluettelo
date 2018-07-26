import React from 'react';
import personService from './services/persons';
import "./index.css"

const Message = ({message}) => {
    if(message === null) {
        return null
    } else {
        return(
            <div className="error">
            {message}
            </div>
        )
    }
}

const PersonList = ({handler, persons}) => {
    // tehtävä 2.10 - refaktorointi
    return (
        <div>
            <table>
                <tbody>
                    {persons.map(p => <Person key={p.id} name={p.name} number={p.number} id={p.id} removeHandler={handler}/>)}
                </tbody>
            </table>
        </div>
    )
}

const Person = (props) => {
    return(
        <tr key={props.id}>
            <td>{props.name}</td><td>{props.number}</td><td><button onClick={()=>{props.removeHandler(props.id)}}>Poista</button></td>
        </tr>
    )
}

const FilterForm = (props) => {
    return(
        <div>
            {props.selite} <input value={props.value} onChange={props.onChangeHandler} />
        </div>
    )
}


class App extends React.Component {
  constructor(props) {
      // tila juurikomponentissa, tehtävä 2.10
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '1234', id: 99 }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentWillMount() {
      personService
        .getAll()
        .then(persons => {
            console.log("promise käsitelty componentWillMount metodista")
            //this.setState({persons: response.data, newName:'',newNumber:'',filter:''})
            console.log(persons)
        
            this.setState({persons})
        })
  }


  

  addContact = (event) => {
    event.preventDefault()
    console.log("lisäyspainiketta painettu")
    console.log(event.target)
    console.log(event.target.id)
    
    
    const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
    }
    console.log(typeof this.state.persons.name)
    if (this.state.persons.map(p=>p.name).includes(personObject.name)===false) {
        //const persons = this.state.persons.concat(personObject)
        personService
            .create(personObject)
            .then(response => {
                personService
                .getAll()
                .then(persons => {
                    console.log("päivitetään sovelluksen tilaa kontaktin lisäämisen jälkeen")
                    console.log(persons)
        
                    this.setState({persons})
                    this.setState({message:"Lisäys onnistui"})
                })
                setTimeout(() => {
                    this.setState({message: null})
                  }, 1000)
            })
            .catch(error => {
                console.log("Lisäyksessä tapahtui virhe")
            })
        } else {
            console.log("Tehtävä 2.17 suoritus alkaa")
            const updateId = this.state.persons.filter(p => p.name === personObject.name)[0].id
            console.log('Else-haaran arvo id:lle on', updateId)
            personService
                .update(updateId, personObject)
                .then(updatedPerson => {
                    console.log(updatedPerson)
                        setTimeout(()=> {
                            this.setState({message:null})
                        },5000)
                })
                .then(response => {
                    personService
                        .getAll()
                        .then(persons => {
                            this.setState({persons})
                            this.setState({message:'Tiedot päivitettiin'})
                        })
                })
                .catch(error => {
                    console.log('Miten tähän päädyttiin?')
                    console.log(error)
                })
        } 
  }



  removePerson = (id) => {
        console.log("removePerson kutsuttu - tehtävä 2.16",id)
        personService
           .remove(id)
           .then(persons => {
               console.log(persons)
               //this.setState({persons})
               personService
                .getAll()
                .then(persons => {
                    console.log("promise käsitelty componentWillMount metodista")
                    //this.setState({persons: response.data, newName:'',newNumber:'',filter:''})
                    console.log(persons)
                    // tehtävä 2.18
                    this.setState({persons})
                    this.setState({message:"Poisto suoritettu"})
                })
                setTimeout(()=> {
                    this.setState({message:null})
                },5000)
           })
  }

  handleNameChange = (event) => {
      console.log(event.target.value)
      this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
      console.log(event.target.value)
      this.setState({newNumber: event.target.value})
  }

  handleFilter = (event) => {
      console.log(event.target.value)
      this.setState({filter: event.target.value})
  }

  render() {
    
    const personListToShow = this.state.persons.filter((a) => a.name.startsWith(this.state.filter))
    console.log(personListToShow)
    return (
        
    
      <div>
          <Message message={this.state.message}/>
          <FilterForm selite="Rajaus:" value={this.state.filter} onChangeHandler={this.handleFilter} />
          
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
            
          </div>
          <div>
            puhelinnumero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>

          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <PersonList persons={personListToShow} handler={this.removePerson} />
      </div>
    )
  }
}

export default App