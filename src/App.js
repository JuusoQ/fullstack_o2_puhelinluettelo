import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addContact = (event) => {
      event.preventDefault()
      console.log("Painike painaa")
      console.log(event.target)

      const personObject = {
          name: this.state.newName
      }

      const persons = this.state.persons.concat(personObject)

      this.setState({
          persons: persons,
          newName: ''
      })
  }

  handleContactChange = (event) => {
      console.log(event.target.value)
      this.setState({newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleContactChange}/>
            Debug: {this.state.newName}
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
            {this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App