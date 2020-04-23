import React, {Component} from 'react';

interface InfoProps {
  name:string,
  shortInfo: string,
  more: string,
  bio:string,
  image:string
}

class Info extends Component<InfoProps> {
  render() {
    return (
      <div className="info-container">
        <h2>{this.props.name}</h2>
        <p className="short-info">{this.props.shortInfo}</p>
        <p className="bio">{this.props.bio}</p>
        <img src={'https://mrsoft.by/tz20/'+this.props.image} alt="cat"/>
      </div>
    );
  }
}

export default Info;
