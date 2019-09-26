import React, { Component } from 'react';
import CommonPage from './../../components/CommonPage';
import Campaign from '../../ethereum/campaign';

class CampaignDetails extends Component {
  state = {  }

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const details = await campaign.methods.getDetails().call();

    return {
      minimumContribution: details[0],
      balance: details[1],
      requestCount: details[2],
      contributorCount: details[3],
      manager: details[4]
    };
  }

  render() { 
    return ( 
    <CommonPage>
      <h3>Campaign Details</h3>
    </CommonPage>
    );
  }
}
 
export default CampaignDetails;