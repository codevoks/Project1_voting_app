pragma solidity ^0.8.0;

contract Main {
    uint256 red = 0;
    uint256 blue = 0;
    uint256 deno;
    uint256 ind = 0;
    uint256 deadline = 0;
    string[] public arr;
    mapping(address => bool) admin;

    constructor(uint256 _deno) {
        deno = _deno;
        admin[msg.sender] = true;
    }

    modifier checkCycleDeadline() {
        require(block.timestamp <= deadline, "");
        _;
    }

    function startcycle(uint256 _time) public {
        require(admin[msg.sender], "");
        deadline = block.timestamp + _time;
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function deposit() public payable returns (uint256) {
        return address(this).balance;
    }

    function arr_length() public view returns (uint256) {
        return arr.length;
    }

    function deno_return() public view returns (uint256) {
        return deno;
    }

    function curr_length() public view returns (uint256) {
        return ind;
    }

    function vote(string calldata has) public payable checkCycleDeadline returns (uint256) {
        require(msg.value == deno, "");
        arr.push(has);
        return arr.length;
    }

    function countvote(string calldata vote_A, string calldata vote_B, uint256 i) public {
        require(admin[msg.sender], "");
        if (compare(arr[i - 1], vote_A)) red++;
        else if (compare(arr[i - 1], vote_B)) blue++;
    }

    function vote_compare(string calldata vote_A, string calldata vote_B, uint256 i, address payable voter) public {
        require(admin[msg.sender], "");
        if (red > blue) {
            if (compare(arr[i - 1], vote_B)) {
                voter.transfer(deno * (red + blue) / blue);
            } else if (blue > red) {
                if (compare(arr[i - 1], vote_A)) voter.transfer(deno * (red + blue) / red);
            }
        }
        ind = i;
    }

    function empty_balance() public {
        require(admin[msg.sender], "");
        payable(msg.sender).transfer(address(this).balance);
    }

    function make_admin(address new_admin) public {
        require(admin[msg.sender], "");
        admin[new_admin] = true;
    }
}