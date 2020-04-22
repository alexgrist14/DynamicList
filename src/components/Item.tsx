import React, {Component} from 'react';

interface ItemProps {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
  getInfo: (name: string, shortInfo: string, more: string, bio: string, image: string) => void,
}

interface ApiResponse {
  id: number,
  bio: string,
  pic: string,
}

export default class Item extends Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount(): void {

  }

  async clickHandler() {
    let api = 'https://cors-anywhere.herokuapp.com/';
    let url = 'mrsoft.by/tz20';
    let moreUrl = api + url + this.props.more;
    let json = await fetch(moreUrl)
      .then<ApiResponse>(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });

    setTimeout(() => this.props.getInfo(this.props.name, this.props.shortInfo, this.props.more, json.bio, json.pic), 20);
  }

  render() {
    return (
      <div className="list-item" onClick={this.clickHandler}>
        <div className="item-content">
          <h2>{this.props.name}</h2>
          <p>{this.props.shortInfo}</p>
        </div>
      </div>
    );
  }
}
