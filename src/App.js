import React, { Component } from 'react';
import './App.css';
import Note from './components/Note';

class App extends Component {

  constructor() {
    super();
    this.state = {
      noteText: '',
      notes: [],
      error: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  //react 16 - dont need bind, because onChange is arrow function
    // state = {
    //   noteText: '',
    //   notes: [],
    //   error: ''
    // }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //react16
  // onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addNote();
    }
  }

  addNote() {
    if (this.state.noteText.trim() === '') {
      this.setState({ error: 'pusty ciąg - wpisz coś', noteText: ''});
      return;
    } else {
      let notesArr = this.state.notes;
      notesArr.push(this.state.noteText);
      this.setState({ noteText: '', error: '' });
      this.setState({ notes: notesArr });
      this.textInput.focus();
    }
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
          placeholder="dodaj zadanie"
          ref={((input) => { this.textInput = input })}
          className="textInput"
          value={this.state.noteText}
          // onChange={noteText => this.updateNoteText(noteText)}
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress.bind(this)}    
          name="noteText"
        />
        {notes}
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default App;
