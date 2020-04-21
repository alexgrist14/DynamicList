import React, {Component} from 'react';

interface ItemProps{
  id: number,
  name: string,
  shortInfo: string,
  more: string,
}

export default class Item extends Component<ItemProps> {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>{this.props.shortInfo}</p>
      </div>
    );
  }
}
