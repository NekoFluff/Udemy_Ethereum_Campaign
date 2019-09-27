import React, { Component } from 'react';
import CommonPage from './../../../components/CommonPage';
import NewRequestForm from '../../../components/NewRequestForm';
import { Link } from '../routes';

class NewRequest extends Component {
  state = {  }

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  render() { 
    return ( 
    <CommonPage>
      <Link route={`/campaigns/${this.props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a new request</h3>
      <NewRequestForm address={this.props.address}/>
    </CommonPage>
    );
  }
}
 
export default NewRequest;