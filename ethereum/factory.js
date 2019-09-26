import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0xdC6717F2445Ab0EC7FE878FB63526e8089193233');

export default instance;