import React, { Component } from 'react'
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

export default class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(campaigns[0]);
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        This is the home page!
        <hr/>
        { this.renderCampaigns() }
        <hr/>
        Hello
      </div>
    );
  }
}
