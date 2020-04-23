import React, {Component} from 'react';
import Item from './Item';

interface ListItem {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
  disabled: boolean,
}

interface ApiResponse {
  basePath: string,
  data: ListItem[],
}

interface ListState {
  list: ListItem[],
  deletedList: ListItem[],
}

interface Props {
  getInfo: (name: string, shortInfo: string, more: string, bio: string, image: string) => void,
}

export default class List extends Component<Props, ListState> {
  constructor(props: any) {
    super(props);
    this.state = {list: [], deletedList: []};
    this.deleteItem = this.deleteItem.bind(this);
    this.restoreItem = this.restoreItem.bind(this);
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
      .then(json => this.setState({list: json.data}))
      .catch(error => alert('Error HTTP: ' + error.message));
  }

  deleteItem(elem: any) {
    const deletedItemId = elem.target.parentNode.id;
    const deletedItem = this.state.list.filter(item => item.id === +deletedItemId);
    const item =
      {
        id: deletedItem[0].id,
        name: deletedItem[0].name,
        shortInfo: deletedItem[0].shortInfo,
        more: deletedItem[0].more,
        disabled: deletedItem[0].disabled
      };
    const deletedList = [...this.state.deletedList, item];
    const newList = this.state.list.filter(item => item.id !== +deletedItemId);

    this.setState({list: newList, deletedList: deletedList});
  }

  restoreItem(elem:any){
    const restoredItemId = elem.target.parentNode.id;
    const restoredItem = this.state.deletedList.filter(item => item.id === +restoredItemId);
    const item =
      {
        id: restoredItem[0].id,
        name: restoredItem[0].name,
        shortInfo: restoredItem[0].shortInfo,
        more: restoredItem[0].more,
        disabled: restoredItem[0].disabled
      };
    const restoredList = [...this.state.list, item];
    const newDeletedList = this.state.deletedList.filter(item => item.id !== +restoredItemId);

    this.setState({list: restoredList, deletedList: newDeletedList});
  }

  render() {
    return (
      <div className="list-container">
        {
          this.state.list.map((item) =>
            <Item key={item.id}
                  id={item.id}
                  name={item.name}
                  shortInfo={item.shortInfo}
                  more={item.more}
                  getInfo={this.props.getInfo}
                  deleteItem={this.deleteItem}
                  disabled={false}
                  restoreItem={this.restoreItem}/>
          )
        }
        {
          this.state.deletedList.map((deletedItem) =>
            <Item key={deletedItem.id}
                  id={deletedItem.id}
                  name={deletedItem.name}
                  shortInfo={deletedItem.shortInfo}
                  more={deletedItem.more}
                  getInfo={this.props.getInfo}
                  deleteItem={this.deleteItem}
                  disabled={true}
                  restoreItem={this.restoreItem}/>
          )
        }
      </div>
    )
  }
}