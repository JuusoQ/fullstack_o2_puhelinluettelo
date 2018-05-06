import React from 'react';
import axios from 'axios'

const PersonList = ({persons}) => {
    // tehtävä 2.10 - refaktorointi
    return (
        <div>
            <table>
                <tbody>
                    {persons.map(p => <Person name={p.name} number={p.number} key={p.name}/>)}
                </tbody>
            </table>
        </div>
    )
}

const Person = (props) => {
    return(
        <tr>
            <td>{props.name}</td><td>{props.number}</td>
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
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '1234' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log("promise käsitelty componentWillMount metodista")
            this.setState({persons: response.data})
        })
  }


  addContact = (event) => {
    event.preventDefault()
    console.log("Painike painaa")
    console.log(event.target)

    const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
    }
    console.log(typeof this.state.persons.name)
    if (this.state.persons.map(p=>p.name).includes(personObject.name)===false) {
        const persons = this.state.persons.concat(personObject)
        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })
    }
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
        <PersonList persons={personListToShow} />
      </div>
    )
  }
}

export default App