pragma solidity ^0.5.10;

import './Campaign.sol';

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        Campaign newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }
    
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}