import React, { Component } from 'react';
import Item from './Item';

interface ListItem {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
}

interface ApiResponse{
  basePath: string,
  data: ListItem[],
}

interface ListState {
  list: ListItem[],
}

export default class List extends Component<any, ListState> {
  constructor(props: any) {
    super(props);
    this.state = { list: [] };
    this.getList = this.getList.bind(this);
  }

  async componentDidMount() {
    let api = 'https://cors-anywhere.herokuapp.com/';
    let url = 'mrsoft.by/tz20/list.json';

    await fetch(api + url)
      .then<ApiResponse>(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => this.setState({ list: json.data }))
      .catch(error => alert('Error HTTP: ' + error.message));

    setTimeout(()=>{ console.log(this.state.list[0].name);},1000);
  }

  async getList() {

  }

  render() {
    return (
      <div className="list-container">
        {
          this.state.list.map((item)=>
            <Item key={item.id} id={item.id} name={item.name} shortInfo={item.shortInfo} more={item.more}/>
          )
        }

      </div>
    )
  }
}