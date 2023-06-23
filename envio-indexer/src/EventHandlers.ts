import {
  PoolyContract_registerNFTInitializedLoadEntities,
  PoolyContract_registerNFTInitializedHandler,
  PoolyContract_registerTransferLoadEntities,
  PoolyContract_registerTransferHandler,
  PoolyPfersContract_registerTransferLoadEntities,
  PoolyPfersContract_registerTransferHandler,
  ChuckBurgeronNFTContract_registerTransferLoadEntities,
  ChuckBurgeronNFTContract_registerTransferHandler,
  PoolyWinsNFTContract_registerTransferLoadEntities,
  PoolyWinsNFTContract_registerTransferHandler,
  PooltogetherCoinbaseContract_registerTransferLoadEntities,
  PooltogetherCoinbaseContract_registerTransferHandler,
  PoolPartyContract_registerTransferLoadEntities,
  PoolPartyContract_registerTransferHandler,
} from "../generated/src/Handlers.gen";

import { nftcollectionEntity, tokenEntity } from "../generated/src/Types.gen";

const zeroAddress = "0x0000000000000000000000000000000000000000";

PoolyContract_registerNFTInitializedLoadEntities(({ event, context }) => {});

PoolyContract_registerNFTInitializedHandler(({ event, context }) => {
  let nftCollection: nftcollectionEntity = {
    id: event.srcAddress,
    contractAddress: event.srcAddress,
    name: event.params.name,
    symbol: event.params.symbol,
    maxSupply: event.params.maxNFT,
    currentSupply: 0,
  };
  context.nftcollection.insert(nftCollection);
});

PoolyContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
    }
  } else {
    console.warn(
      "There was an issue with events emitted, unregistered NFT collection transfer"
    );
    return;
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

PoolyPfersContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyPfersContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
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
    context.nftcollection.insert(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

PoolyWinsNFTContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyWinsNFTContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
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
    context.nftcollection.insert(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

ChuckBurgeronNFTContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

ChuckBurgeronNFTContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
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
    context.nftcollection.insert(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

PooltogetherCoinbaseContract_registerTransferLoadEntities(
  ({ event, context }) => {
    context.user.userFromLoad(event.params.from);
    context.user.userToLoad(event.params.to);
    context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
    context.token.existingTransferredTokenLoad(
      event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
      { loaders: undefined }
    );
  }
);

PooltogetherCoinbaseContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
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
    context.nftcollection.insert(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

PoolPartyContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from);
  context.user.userToLoad(event.params.to);
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolPartyContract_registerTransferHandler(({ event, context }) => {
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
      context.nftcollection.insert(nftCollection);
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
    context.nftcollection.insert(nftCollection);
  }
  if (event.params.from !== zeroAddress) {
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let userTo = {
      id: event.params.to,
      address: event.params.to,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});
