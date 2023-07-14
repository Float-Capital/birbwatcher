import {
  PoolyContract_NFTInitialized_loader,
  PoolyContract_NFTInitialized_handler,
  PoolyContract_Transfer_loader,
  PoolyContract_Transfer_handler,
  PoolyPfersContract_Transfer_loader,
  PoolyPfersContract_Transfer_handler,
  ChuckBurgeronNFTContract_Transfer_loader,
  ChuckBurgeronNFTContract_Transfer_handler,
  PoolyWinsNFTContract_Transfer_loader,
  PoolyWinsNFTContract_Transfer_handler,
  PooltogetherCoinbaseContract_Transfer_loader,
  PooltogetherCoinbaseContract_Transfer_handler,
  PoolPartyContract_Transfer_loader,
  PoolPartyContract_Transfer_handler,
} from "../generated/src/_handlers.gen";

import { nftcollectionEntity, tokenEntity } from "../generated/src/Types.gen";

const zeroAddress = "0x0000000000000000000000000000000000000000";

PoolyContract_NFTInitialized_loader(({ event, context }) => {});

PoolyContract_NFTInitialized_handler(({ event, context }) => {
  let nftCollection: nftcollectionEntity = {
    id: event.srcAddress,
    contractAddress: event.srcAddress,
    name: event.params.name,
    symbol: event.params.symbol,
    maxSupply: event.params.maxNFT,
    currentSupply: 0,
  };
  context.nftcollection.set(nftCollection);
});

PoolyContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    console.warn(
      "There was an issue with events emitted, uned NFT collection transfer"
    );
    return;
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});

PoolyPfersContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyPfersContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    // create the collection if this is the first transfer
    let nftCollection: nftcollectionEntity = {
      id: event.srcAddress,
      contractAddress: event.srcAddress,
      name: "pooly - pfers", // https://etherscan.io/token/0xbcc664b1e6848caba2eb2f3de6e21f81b9276dd8
      symbol: "pfers",
      maxSupply: BigInt(6372),
      currentSupply: 0,
    };
    context.nftcollection.set(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});

PoolyWinsNFTContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyWinsNFTContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    // create the collection if this is the first transfer
    let nftCollection: nftcollectionEntity = {
      id: event.srcAddress,
      contractAddress: event.srcAddress,
      name: "Pooly Wins", // https://etherscan.io/address/0xfccc94f2b99ec71ff04e6ce9f0ea9797f4f0536b
      symbol: "PLY",
      maxSupply: BigInt(0),
      currentSupply: 0,
    };
    context.nftcollection.set(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});

ChuckBurgeronNFTContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

ChuckBurgeronNFTContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    // create the collection if this is the first transfer
    let nftCollection: nftcollectionEntity = {
      id: event.srcAddress,
      contractAddress: event.srcAddress,
      name: "SkiFree Pooly", // https://etherscan.io/nft/0x9af7b3cfca8a0d0fed9a8c9b77f6088cb1bbf791/563
      symbol: "OOOBCB",
      maxSupply: BigInt(0),
      currentSupply: 0,
    };
    context.nftcollection.set(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});

PooltogetherCoinbaseContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PooltogetherCoinbaseContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    // create the collection if this is the first transfer
    let nftCollection: nftcollectionEntity = {
      id: event.srcAddress,
      contractAddress: event.srcAddress,
      name: "Making Pooltogether accessible to the with coinbase", // https://optimistic.etherscan.io/token/0xc10baad4d7a0c3574d50fa606666eb7de176c7e6
      symbol: "MAKINGPOOLTOGETHERACCESSIBLETOTHEMASSESWITHCOINBASE", // a bit odd but it seems to be the symbol
      maxSupply: BigInt(0), // not capped afaik
      currentSupply: 0,
    };
    context.nftcollection.set(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});

PoolPartyContract_Transfer_loader(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolPartyContract_Transfer_handler(({ event, context }) => {
  let nftCollectionUpdated = context.nftcollection.nftCollectionUpdated();
  let token = {
    id: event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    tokenId: event.params.tokenId,
    collection: event.srcAddress,
    owner: event.params.to,
  };
  if (nftCollectionUpdated) {
    let existingToken = context.token.existingTransferredToken();
    if (!existingToken) {
      let currentSupply = Number(nftCollectionUpdated.currentSupply) + 1;
      let nftCollection: nftcollectionEntity = {
        ...nftCollectionUpdated,
        currentSupply,
      };
      context.nftcollection.set(nftCollection);
    }
  } else {
    // create the collection if this is the first transfer
    let nftCollection: nftcollectionEntity = {
      id: event.srcAddress,
      contractAddress: event.srcAddress,
      name: "Pool Party Season 1", // https://optimistic.etherscan.io/token/0xc10baad4d7a0c3574d50fa606666eb7de176c7e6
      symbol: "POOL", // a bit odd as the erc20 is also POOL, however this is the symbol
      maxSupply: BigInt(0), // not capped afaik
      currentSupply: 0,
    };
    context.nftcollection.set(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.set(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.set(userTo);
  }
  context.token.set(token);
});
