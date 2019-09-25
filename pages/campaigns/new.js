import React, { Component } from 'react';
import CommonPage from '../../components/CommonPage';
import { Form, Button, Input } from 'semantic-ui-react';

class NewCampaign extends Component {
  state = {
    minimumContribution: ''
  }

  render() {
    return (
      <CommonPage>
        <h3>New Campaign!</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label='wei' labelPosition='right' type='number' value={this.state.minimumContribution} onChange={(event) => {
              this.setState({ minimumContribution: event.target.value })
            }} />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </CommonPage>
    );
  }
}

export default NewCampaign;