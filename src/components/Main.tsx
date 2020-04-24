import React, {Component} from 'react';
import List from './List';
import Info from "./Info";

interface MainState {
  name: string,
  shortInfo: string,
  more: string,
  bio: string,
  image: string
}

export default class Main extends Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {name: "", shortInfo: "", more: "", bio: "", image: ""};
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo(nam: string, sInfo: string, mr: string, bi: string, img: string) {
    this.setState({name: nam, shortInfo: sInfo, more: mr, bio: bi, image: img});
  }

  render() {
    const image = this.state.image;
    return (
      <div className="content">
        <List getInfo={this.getInfo}/>
        {image !== "" &&
        <Info
            name={this.state.name}
            shortInfo={this.state.shortInfo}
            more={this.state.more}
            bio={this.state.bio}
            image={this.state.image}
        />
        }
      </div>
    )
  }
}
