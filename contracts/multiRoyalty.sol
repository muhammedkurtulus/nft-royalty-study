// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiRoyalty is ERC1155, ERC2981, Ownable {
    string private _baseURI;
    string public name = "test1302";
    string public symbol = "tst";

    // GOLD = 0;
    // SILVER = 1;
    // SWORD = 2;
    // SHIELD = 3;
    // CROWN = 4;
    uint256[] public supplies = [5000, 10000, 200, 200, 1];

    // track the number of item minted per category
    mapping(uint256 => uint256) public itemMinted;

    /// @dev Constructor can call only once upon deployment,
    ///         Fee numerator for collection only works if it is honor by exchange
    constructor()
        ERC1155(
            "ipfs://QmSEr45V3L1wkgb1tBufyCxf3iAe7q8K7G5dAQFWMuAkMm/{id}.json"
        )
    {}

    /// @dev Allow any user to mint token
    /// @param id the id of the collection
    /// @param amount the number of items to be mint per specific collection
    function mint(address to, uint256 id, uint256 amount) external {
        // check id must not greater than the 3
        require(id < supplies.length, "invalid token id");
        // check itemMinted per category not greater than the supply/cap provided
        require(itemMinted[id] + amount <= supplies[id], "supply exceeded");

        itemMinted[id] = amount;
        _mint(to, id, amount, "");
    }

    // === Only Owner functions ===

    /// @dev Set new base URI, kindly take a look on https://eips.ethereum.org/EIPS/eip-1155 for the format
    /// @param newuri The new URI to set
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /// @dev Set the royalty for all collection
    /// @param _feeNumerator The fee for collection
    function setDefaultRoyalty(
        address _receiver,
        uint96 _feeNumerator
    ) public onlyOwner {
        _setDefaultRoyalty(_receiver, _feeNumerator);
    }

    /// @dev Set royalty fee for specific token
    /// @param _tokenId The tokenId where to add the royalty
    /// @param _receiver The royalty receiver
    /// @param _feeNumerator the fee for specific tokenId
    function setTokenRoyalty(
        uint256 _tokenId,
        address _receiver,
        uint96 _feeNumerator
    ) public onlyOwner {
        _setTokenRoyalty(_tokenId, _receiver, _feeNumerator);
    }

    /// @dev Allow owner to delete the default royalty for all collection
    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
    }

    /// @dev Reset specific royalty
    /// @param tokenId The token id where to reset the royalty
    function resetTokenRoyalty(uint256 tokenId) external onlyOwner {
        _resetTokenRoyalty(tokenId);
    }

    // === override interface ===

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, ERC2981) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
