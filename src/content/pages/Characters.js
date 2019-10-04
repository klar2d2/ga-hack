import React, {Component} from 'react'
import axios from 'axios'

import CharacterCreation from './CharacterCreation';
import CharacterModal from './CharacterModal';

class Character extends Component {
  state = {
    classes: [],
    races: [],
    user: this.props.user
  }
  componentDidMount() {
    this.getDnd()
    console.log(this.props)
  }

  getDnd = () => {
    axios.get('http://www.dnd5eapi.co/api/classes')
    .then(response => {
      this.setState({ class: response.data })
    })
    .catch(err => {
      console.log('err', err)
    })
    axios.get('http://www.dnd5eapi.co/api/races')
    .then(response => {
      this.setState({ race: response.data})
    })
    .catch(err => {
      console.log('err', err)
    })
  }

  render() {
    return (
        <div>
          <h1>Create a Character</h1>
          <hr />
          <CharacterCreation classes={this.state.classes} classes={this.state.races} user={this.props.user}/>
          <CharacterModal />
        </div>
    )
  }
}

export default Character
