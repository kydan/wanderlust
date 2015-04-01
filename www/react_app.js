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
  render: function(){
    return (
          <form className="form-inline" role="form">
            <div className="form-group">
              <label className="sr-only" htmlFor="inputPhone">search</label>
              <input id="phone" name="where" type="search" placeholder="What phone do you have?" className="form-control input-md" required="" />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="inputCountry">search</label>
              <input id="country" name="where" type="search" placeholder="where are you going?" className="form-control input-md" required="" />
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

    var data = [
        {provider: "AT&T", voice_2g_data: "Yes", data_3g: "Yes", data_lte: "Yes"},
        {provider: "US Cellular", voice_2g_data: "Yes", data_3g: "No", data_lte: "Yes"},
        {provider: "Verizon", voice_2g_data: "No", data_3g: "No", data_lte: "No"},
        {provider: "T-Mobile", voice_2g_data: "Yes", data_3g: "No", data_lte: "No"},
    ];

var WanderApp = React.createClass({
  
  render: function () {
    
    return (
      <div>
        <PhoneForm />
        <ResultTable data={this.props.data}/>
      </div>
      );
  }
});

React.render(<WanderApp data={data}/>, document.getElementById('app'));