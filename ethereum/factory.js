import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0xAd21a9FfcF54AB24e0B8FAdaDfC8661BfB8FeE2A');

export default instance;