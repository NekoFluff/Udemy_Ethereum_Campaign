const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // console.log(compiledCampaign.abi);
  // console.log(compiledCampaign.evm.bytecode.object);

  factory = await new web3.eth.Contract(compiledFactory.abi)
  .deploy({ 
    data: '0x' + compiledFactory.evm.bytecode.object, 
    arguments: []
  }) 
  .send({ from: accounts[0], gas: 3000000 }); // remove 'gas' 
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(compiledCampaign.abi, campaignAddress)
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })
})