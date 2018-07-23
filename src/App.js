import React, { Component } from 'react';
import './App.scss';
import Note from './components/Note';

class App extends Component {

  constructor() {
    super();
    this.state = {
      noteText: '',
      notes: [],
      date: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  //react 16 - dont need bind, when onChange is arrow function
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
  //react16 - dont need bind, when onChange is arrow function
  // onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addNote();
    }
  }

  addNote() {
    if (this.state.noteText.trim() === '') {
      this.setState({ error: 'empty input - write something!', noteText: ''});
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

    // es6
    // let { notes } = this.state;
    // notes.splice(index, 1);
    // this.setState({ notes });
  }
  
  //localStorage saving
  componentWillMount() { 
    let localNotes = localStorage.getItem('Notes');
    const localNotesParsed = JSON.parse(localNotes);
    console.log(localNotesParsed);
    this.setState({ notes: localNotesParsed });
   }

  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} text={val} deleteMethod={ () => this.deleteNote(key) }/>
    });
    localStorage.setItem("Notes",JSON.stringify(this.state.notes));

    return (
      <div className="container App">
        <header className="header">
          <span className="header__buckle">{`{`}</span> React todo list <span className="header__buckle">{`}`}</span>
        </header>
        <button className="btn" onClick={this.addNote.bind(this)}>ADD</button>
        <input type="text"
          placeholder="task"
          ref={((input) => { this.textInput = input })}
          className="textInput"
          value={this.state.noteText}
          // onChange={noteText => this.updateNoteText(noteText)}
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress.bind(this)}    
          name="noteText"
        />
        <div className="notes__container">
          {notes}
        </div>
        <p className="error">{this.state.error}</p>
      </div>
    );
  }
}

export default App;
