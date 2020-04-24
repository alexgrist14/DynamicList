import React, {Component} from 'react';
import CloseButton from '../assets/close.png';

interface ItemProps {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
  getInfo: (name: string, shortInfo: string, more: string, bio: string, image: string) => void,
  deleteItem: (elem: any) => void,
  restoreItem: (elem: any) => void,
  disabled: boolean,
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

    this.props.getInfo(this.props.name, this.props.shortInfo, this.props.more, json.bio, json.pic);
  }

  render() {
    return (
      <div className={`list-item${this.props.disabled ? ' disabled-list-item' : ""}`} onClick={this.clickHandler}>
        <div className="item-content" id={this.props.id.toString()}>
          <h2>{this.props.name}</h2>
          <p>{this.props.shortInfo}</p>
          <img onClick={this.props.deleteItem} className={`delete-btn${this.props.disabled ? ' invisible-btn' : ''}`}
               src={CloseButton} alt="delete button"/>
          <span onClick={this.props.restoreItem}
                className={this.props.disabled ? 'restore-btn' : 'invisible-btn'}>R</span>
        </div>
      </div>
    );
  }
}
