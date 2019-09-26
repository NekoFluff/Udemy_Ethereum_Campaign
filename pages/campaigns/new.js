import React, { Component } from 'react';
import CommonPage from '../../components/CommonPage';
import factory from '../../ethereum/factory';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from './../../ethereum/web3';
import { Link, Router } from '../../routes';

class NewCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  
  onSubmit = async (event) => {
    
    try {
      // Start the loading circle and reset the error message
      this.setState({ loading: true, errorMessage: '' })

      // Retrieve user accounts and create a new campaign using the CampaignFactory
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });

      
  };

  render() {
    return (
      <CommonPage>
        <h3>New Campaign!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label='wei' labelPosition='right' type='number' value={this.state.minimumContribution} onChange={(event) => {
              this.setState({ minimumContribution: event.target.value })
            }} />
          </Form.Field>

          <Message error header='Something went wrong' content={this.state.errorMessage}/>
          <Button primary loading={this.state.loading}>Create!</Button>
        </Form>
      </CommonPage>
    );
  }
}

export default NewCampaign;