import React, { Component } from 'react';
import CloseButton from '../assets/close.png';
import { Cat, CatFullInfo } from '../models/cat.model';
import { CatApiMoreInfo, getMoreCatInfo } from '../utils/cat-management-utils';

interface ItemProps {
  catElement: Cat,
  updateInfo: (catInfo: CatFullInfo) => void,
  toggleItemDisable: (id: number) => void,
}

export default class Item extends Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
  }

  private updateInfo(): void {
    getMoreCatInfo(this.props.catElement.more)
      .then(this.createCatFullInfo)
      .then(this.props.updateInfo);
  }

  private createCatFullInfo = (moreInfo: CatApiMoreInfo): CatFullInfo => {
    return {
      name: this.props.catElement.name,
      shortInfo: this.props.catElement.shortInfo,
      more: this.props.catElement.more,
      bio: moreInfo.bio,
      image: moreInfo.pic,
    };
  }

  private toggleItemDisable = (event: React.MouseEvent): void => {
    event.stopPropagation();
    this.props.toggleItemDisable(this.props.catElement.id);
  }

  render() {
    const cat = this.props.catElement;

    return (
      <div className={ `list-item${ cat.disabled ? ' disabled-list-item' : '' }` } onClick={ this.updateInfo }>
        <div className="list-item-title">
          <h2>{ cat.name }</h2>
          <p>{ cat.shortInfo }</p>
          { cat.disabled &&
            <p>{cat.lastEditTime.toLocaleString()}</p>
          }
        </div>
          {
            cat.disabled
              ? <span onClick={ this.toggleItemDisable } className='restore-btn'>R</span>
              : <img onClick={ this.toggleItemDisable } className='delete-btn' src={ CloseButton } alt="delete button"/>
          }
      </div>
    );
  }
}
