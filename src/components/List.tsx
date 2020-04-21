import React, {Component} from 'react';

interface ListItem{
  id: number,
  name: string,
  shortInfo: string,
  more: string,
}

interface ListState {
  list:ListItem[],
}

export default class List extends Component<any, ListState> {
  constructor(props: any) {
    super(props);
    this.state = {list: []};
    this.getList = this.getList.bind(this);
  }

  async componentDidMount() {
    let api = "https://cors-anywhere.herokuapp.com/";
    let url = "mrsoft.by/tz20/list.json";
    let response = await fetch(api + url);
    let json = {};

    if (response.ok) {
      json = await response.json();
      this.setState({list: json});
    } else {
      alert("Error HTTP: " + response.status);
    }
    console.log(this.state.list.data[0].name);
  }

  async getList() {


  }

  render() {
    return (
        <div className="list-container">
          {
            this.
          }
        </div>
    )
  }
}