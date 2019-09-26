import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x7c7c27FaF08B1d3f5AbDf0614984218c1c957BCA');

export default instance;