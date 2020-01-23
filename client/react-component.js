'use strict';

const e = React.createElement;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[
        {
          name:"Lee Ken"
        },
        {
          name:"John"
        }
      ]
    };
  }

  componentDidMount(){
    console.log("hi");
  }

  render() {
    return (
      <div>
        {{this.state.users.map((aUser)=>{
          return (
            <div>{aUser.name}</div>
          )
        })}
      </div>
    )
  }
}

const domContainer = document.getElementById("react-container");
ReactDOM.render(e(UserList), domContainer);
