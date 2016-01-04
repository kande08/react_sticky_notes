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

  addNoteForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitNote}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='Add Note' type='text' onChange={this.addNoteName} />
                  <button className='btn waves-effect' type='submit'>Save</button>
                </div>
              </form>
            </div>);
    }
  },

  render: function() {
    return(<div>
            <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Note</a>
            {this.addNoteForm()}
            <h1 className="center-align">Sticky Notes</h1>
            <div className='card green'>
              <div className='card-content white-text'>


              </div>
            </div>
          </div>);
  }
});
