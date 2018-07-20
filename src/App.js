import React, { Component } from 'react';
import './App.css';
import Note from './components/Note';

class App extends Component {

  constructor() {
    super();
    this.state = {
      noteText: '',
      notes: [],
    }
    this.onChange = this.onChange.bind(this);
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addNote();
    }
  }

  addNote() {
    if (this.state.noteText === '') {return}

    let notesArr = this.state.notes;
    notesArr.push(this.state.noteText);
    this.setState({ noteText: '' });
    this.textInput.focus();
  }

  deleteNote(index) {
    let notesArr = this.state.notes;
    notesArr.splice(index, 1);
    this.setState({ notes: notesArr });
  }

  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} text={val} deleteMethod={ () => this.deleteNote(key) }/>
    })

    return (
      <div className="container">
        <div className="header">React todo list</div>
        <button className="btn" onClick={this.addNote.bind(this)}>DODAJ</button>
        <input type="text"
          ref={((input) => { this.textInput = input })}
          className="textInput"
          value={this.state.noteText}
          // onChange={noteText => this.updateNoteText(noteText)}
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress.bind(this)}    
          name="noteText"
        />
        {notes}
      </div>
    );
  }
}

export default App;
