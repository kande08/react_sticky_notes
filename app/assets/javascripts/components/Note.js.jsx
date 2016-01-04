var Note = React.createClass({
  getInitialState: function() {
    return {notes: this.props.notes};
  },

  getDefaultState: function() {
    return {notes: []};
  },

  render: function() {
    return(<div>
            <h1>My First Sticky Note</h1>
          </div>);
  }
});
