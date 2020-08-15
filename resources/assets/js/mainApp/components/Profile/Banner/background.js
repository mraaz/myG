import React from 'react';
import { ignoreFunctions } from '../../../../common/render'

export default class Background extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return(
      <div id="background clickable" style={{
        backgroundImage: `url('${this.props.background || 'https://www.dream-wallpaper.com/free-wallpaper/animal-wallpaper/cat-widescreen-1-wallpaper/1366x768/free-wallpaper-10.jpg'}')`,
      }}/>
    );
  }
}
