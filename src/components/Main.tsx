import React, { Component } from 'react';
import List from './List';
import Info from './Info';
import { CatFullInfo } from '../models/cat.model';

interface MainState {
  catInfo: CatFullInfo,
}

export default class Main extends Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = { catInfo: {} as CatFullInfo };
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(catInfo: CatFullInfo) {
    this.setState({ catInfo });
  }

  render() {
    const image = this.state.catInfo.image;
    return (
      <div className="content">
        <List updateInfo={ this.updateInfo }/>
        { image &&
        <Info name={ this.state.catInfo.name }
              shortInfo={ this.state.catInfo.shortInfo }
              more={ this.state.catInfo.more }
              bio={ this.state.catInfo.bio }
              image={ this.state.catInfo.image }
        />
        }
      </div>
    )
  }
}
