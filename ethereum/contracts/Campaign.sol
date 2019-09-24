pragma solidity ^0.5.10;

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

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvers;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    uint public contributorCount;
    mapping(address => bool) public contributors;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address sender) public {
        manager = sender;
        minimumContribution = minimum;
        contributorCount = 0;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution, 'Minimum contribution not met.');
        require(!contributors[msg.sender]);
        
        contributors[msg.sender] = true;
        contributorCount++;
    }
    
    function createRequest(string memory description, uint requestValue, address payable recipient) public restricted {
        require(contributors[msg.sender]);
        require(address(this).balance >= requestValue, "Not enough money has been contributed for the request.");
        
        Request memory req = Request({
            description: description,
            value: requestValue,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(req);
    }
    
    function approveRequest(uint requestIndex) public {
        Request storage req = requests[requestIndex];
        require(contributors[msg.sender]);
        require(!req.approvers[msg.sender]);
        
        req.approvalCount++;
        req.approvers[msg.sender] = true;
    }
    
    function finalizeRequest(uint index) public {
        Request storage req = requests[index];
        require(req.approvalCount > (contributorCount / 2));
        require(!req.complete);
        
        req.recipient.transfer(req.value);
        req.complete = true;
    }   
}