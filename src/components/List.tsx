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

interface Props {
  getInfo: (name:string,shortInfo: string,more:string,bio:string,image:string) =>void,
}

export default class List extends Component<Props, ListState> {
  constructor(props: any) {
    super(props);
    this.state = { list: [] };
  }

  async componentDidMount() {
    let api = 'https://cors-anywhere.herokuapp.com/';
    let url = 'mrsoft.by/tz20/list.json';

    fetch(api + url)
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

  render() {
    return (
      <div className="list-container">
        {
          this.state.list.map((item)=>
            <Item key={item.id}
                  id={item.id}
                  name={item.name}
                  shortInfo={item.shortInfo}
                  more={item.more}
                  getInfo={this.props.getInfo}
            />
          )
        }
      </div>
    )
  }
}