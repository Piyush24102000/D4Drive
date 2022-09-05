// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract drive{
     struct data {
        string[] name;
        string[] description;
        string[] filetype;
        uint[] size;
        string[] viewfile;

    }
    mapping (address => data) files;
    function add(address _address,string memory _name,string memory _desc,string memory _filetype,uint _size,string memory _view) public{
        files[_address].name.push(_name);
        files[_address].description.push(_desc);
        files[_address].filetype.push(_filetype);
        files[_address].size.push(_size);
        files[_address].viewfile.push(_view);
    }
    
    function get(address _address) public view returns(string[] memory,string[] memory,string[] memory,uint[] memory,string[] memory){
        data memory d = files[_address];
        return(d.name,d.description,d.filetype,d.size,d.viewfile);
    }
}