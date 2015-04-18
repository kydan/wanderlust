var WelcomeMsg = React.createClass({
  render: function(){
    return (
      <div className="jumbotron">
          <h1>Hello Wanderlust</h1>
          <p className="lead">Want to stay connected while traveling? Lets be honest, paying for international roaming is not for the faint of heart. Instead, Wanderlust helps you find out which cell providers are compatible with your device where you plan to travel.</p>
      </div>
    );
  }
});

var PhoneForm = React.createClass({
  
  getInitialState: function(){
    return ( {
      phonePlaceholder: "What phone do you have?",
      countryPlaceholder: "Where are you going?"
    } )
  },
  
  handleSubmit: function(e) {
    // preventing the submit event from bubbling up
    e.preventDefault();
    // looking up the refs for country and phone in the browser dom
    var phone = React.findDOMNode(this.refs.phone).value.trim();
    var country = React.findDOMNode(this.refs.country).value.trim();
    if (!phone || !country) {
      return;
    }
    // Calling our parent click handler with the 
    this.props.clickHandler(phone, country);
  },
  
  render: function(){
    return (
          <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sr-only" htmlFor="inputPhone">search</label>
              <input id="phone" ref="phone" name="phone" type="search" placeholder={this.state.phonePlaceholder} className="form-control input-md" required="" />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="inputCountry">search</label>
              <input id="country" ref="country" name="country" type="search" placeholder={this.state.countryPlaceholder} className="form-control input-md" required="" />
            </div>
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-search" style={{verticalAlign: 'middle' }}></span>
            </button>
          </form>
    )
  }
});

var ResultTable = React.createClass({
  
  render: function(){
    var providerResults= this.props.data.map(function(item){
      return(
        <tr>
          <td>{item.provider}</td>
          <td className="success" >{item.voice_2g_data}</td>
          <td className="danger">{item.data_3g}</td>
          <td className="success">{item.data_lte}</td>
        </tr>
      )
    });
    
    return (
          <div className="container">
          <table className="table table-bordered">
            <thead>
              <th>Provider Name</th>
              <th>Voice & 2G Data</th>
              <th>3G Data</th>
              <th>LTE Data</th>
          </thead>
          <tbody>
            {providerResults} 
          </tbody>
          </table>
        </div>
    )
  }
});

var WanderApp = React.createClass({
  
  getInitialState: function() {
    return {data: []};
  },
  
  phoneFormHandleSubmit: function(phone, country) {
    var queryUrl = this.props.url + '/reports';
    $.ajax({
      url: queryUrl,
      data: 'country='+country+'&phone='+phone,
      dataType: 'json',
      success: function(returnData) {
        this.setState({data: returnData.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  render: function () {
    
    var resultsTable = '';
    if (this.state.data.length > 0) {
      resultsTable = <ResultTable data={this.state.data}/>;
    }
    return (
      <div>
        <PhoneForm clickHandler={this.phoneFormHandleSubmit}/>
        {resultsTable} 
      </div>
      );
  }
});

React.render(<WanderApp url="https://private-8cf6d-wanderlust.apiary-mock.com"/>, document.getElementById('app'));