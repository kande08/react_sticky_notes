var Note = React.createClass({
  getInitialState: function() {
    return {notes: this.props.notes};
  },

  getDefaultState: function() {
    return {notes: []};
  },

  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd});
  },

  addNoteName: function(e) {
    this.setState({ noteName: e.currentTarget.value });
  },

  addNoteDescription: function(e) {
    this.setState({ noteDescription: e.currentTarget.value });
  },

  submitNote: function(e) {
    e.preventDefault();
    var self = this
    $.ajax({
      url: '/notes',
      type: 'POST',
      data: {note: {name: this.state.noteName, description: this.state.noteDescription}},
      success: function(data) {
        var notes = self.state.notes;
        notes.push(data);
        self.setState({ notes: notes, showAdd: false, noteName: null, noteDescription: null });
      },
      error: function(data) {
        alert('submit note did not work');
      }
    });
  },

  addNoteForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitNote}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='Add Note' type='text' onChange={this.addNoteName} />
                  <textarea placeholder='Description' type='text' className='materialize-textarea' onChange={this.addNoteDescription} />
                  <button className='btn waves-effect' type='submit'>Save</button>
                </div>
              </form>
            </div>);
    }
  },

  deleteNote: function(noteId) {
    console.log(noteId)
    var self = this;
    $.ajax({
      url: '/notes/' + noteId,
      type: 'DELETE',
      success: function(data) {
        var notes = []
        for(var i = 0; i < self.state.notes.length; i++){
          if (self.state.notes[i].id != noteId){
            notes.push(self.state.notes[i])
          }
        }
        self.setState({ notes: notes });
      },
    })

  },

  displayNotes: function() {
    var notes = [];
    var self = this;
    this.state.notes.forEach(function(note) {
      notes.push(<li>
                  <div className="row container">
                    <div className="card green col s3">
                      <div className="card-content white-text">
                        <h5>{note.name}</h5>
                        <br />
                        {note.description}
                        <a className='btn waves-effect' onClick={() => self.deleteNote(note.id)}>Delete</a>
                      </div>
                    </div>
                  </div>
                </li>);
    })
    return notes;
  },

  render: function() {
    return(<div>
            <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Note</a>
            {this.addNoteForm()}
            <h1 className="center-align">Sticky Notes</h1>
            <div>
              <div>
                <ul>{this.displayNotes()}</ul>
              </div>
            </div>
          </div>);
  }
});
