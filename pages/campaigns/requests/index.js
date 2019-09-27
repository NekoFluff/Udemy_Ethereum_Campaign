import React, { Component } from 'react';
import CommonPage from './../../../components/CommonPage';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from './../../../components/RequestRow';
class RequestIndex extends Component {
  state = {  }

  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const contributorCount = await campaign.methods.contributorCount().call();

    const requests = await Promise.all(
      Array(Number(requestCount)).fill().map((_, index) => {
        return campaign.methods.requests(index).call();
      })
    )
    return { address, requests, requestCount, contributorCount };
  }

  renderRows = () => {
    return this.props.requests.map((request, index) => {
      return <RequestRow request={request} id={index} key={index} address={this.props.address} contributorCount={this.props.contributorCount}/>
    })
  }


  render() { 
    const { Header, Row, HeaderCell, Body } = Table;
    return ( 
      <CommonPage>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <h2>{this.props.requestCount} requests found</h2>
      </CommonPage>
    );
  }
}
 
export default RequestIndex;