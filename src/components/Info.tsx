import React, {Component} from 'react';
import { CatFullInfo } from '../models/cat.model'

export default class Info extends Component<CatFullInfo> {
  render() {
    return (
      <div className="info-container">
        <h2>{this.props.name}</h2>
        <p className="short-info">{this.props.shortInfo}</p>
        <p className="bio">{this.props.bio}</p>
        <img src={'https://mrsoft.by/tz20/' + this.props.image} alt="cat"/>
      </div>
    );
  }
}
