import React, { Component } from 'react';
import Header from './Header.js';
import { Container } from 'semantic-ui-react';

class CommonPage extends Component {
  state = {  }

  constructor(props) {
    super(props);
  }

  render() { 
    return (     
    <Container>
      <Header/>
      {this.props.children}
      <h1>TODO: Footer</h1>
    </Container> 
    );
  }
}

export default CommonPage;
