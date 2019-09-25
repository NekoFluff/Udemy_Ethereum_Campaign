import React, { Component } from 'react'
import factory from '../ethereum/factory';

export default class CampaignIndex extends Component {
  async componentDidMount() {
    console.log(await factory.methods.getDeployedCampaigns().call());
  }

  render() {
    return (
      <div>
        This is the home page!
      </div>
    )
  }
}
