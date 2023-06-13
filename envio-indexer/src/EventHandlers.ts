import {
  PoolyContract_registerNFTInitializedLoadEntities,
  PoolyContract_registerNFTInitializedHandler,
  PoolyContract_registerTransferLoadEntities,
  PoolyContract_registerTransferHandler,
  PoolyPfersContract_registerTransferLoadEntities,
  PoolyPfersContract_registerTransferHandler,
  ChuckBurgeronNFTContract_registerTransferLoadEntities,
  ChuckBurgeronNFTContract_registerTransferHandler,
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
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
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
      context.nftcollection.update(nftCollection);
    }
  } else {
    console.warn(
      "There was an issue with events emitted, unregistered NFT collection transfer"
    );
    return;
  }
  if (event.params.from !== zeroAddress) {
    let loadedUserFrom = context.user.userFrom();
    let userFromTokensOpt: Array<string> = loadedUserFrom?.tokens ?? [];
    let userFromTokens: Array<string> = [];
    if (typeof userFromTokensOpt !== "string") {
      userFromTokens.concat(userFromTokensOpt);
    }
    let index = userFromTokens.indexOf(token.id, 0);
    if (index > -1) {
      userFromTokens.splice(index, 1);
    }
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
      tokens: userFromTokens,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let loadedUserTo = context.user.userTo();
    let userToTokensOpt: Array<string> = loadedUserTo?.tokens ?? [];
    let userToTokens: Array<string> = [token.id];
    if (typeof userToTokensOpt !== "string") {
      userToTokens.concat(userToTokensOpt);
    }
    let userTo = {
      id: event.params.to,
      address: event.params.to,
      tokens: userToTokens,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

PoolyPfersContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
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
      context.nftcollection.update(nftCollection);
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
    let loadedUserFrom = context.user.userFrom();
    let userFromTokensOpt: Array<string> = loadedUserFrom?.tokens ?? [];
    let userFromTokens: Array<string> = [];
    if (typeof userFromTokensOpt !== "string") {
      userFromTokens.concat(userFromTokensOpt);
    }
    let index = userFromTokens.indexOf(token.id, 0);
    if (index > -1) {
      userFromTokens.splice(index, 1);
    }
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
      tokens: userFromTokens,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let loadedUserTo = context.user.userTo();
    let userToTokensOpt: Array<string> = loadedUserTo?.tokens ?? [];
    let userToTokens: Array<string> = [token.id];
    if (typeof userToTokensOpt !== "string") {
      userToTokens.concat(userToTokensOpt);
    }
    let userTo = {
      id: event.params.to,
      address: event.params.to,
      tokens: userToTokens,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});

ChuckBurgeronNFTContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
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
      context.nftcollection.update(nftCollection);
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
    let loadedUserFrom = context.user.userFrom();
    let userFromTokensOpt: Array<string> = loadedUserFrom?.tokens ?? [];
    let userFromTokens: Array<string> = [];
    if (typeof userFromTokensOpt !== "string") {
      userFromTokens.concat(userFromTokensOpt);
    }
    let index = userFromTokens.indexOf(token.id, 0);
    if (index > -1) {
      userFromTokens.splice(index, 1);
    }
    let userFrom = {
      id: event.params.from,
      address: event.params.from,
      tokens: userFromTokens,
    };
    context.user.insert(userFrom);
  }
  if (event.params.to !== zeroAddress) {
    let loadedUserTo = context.user.userTo();
    let userToTokensOpt: Array<string> = loadedUserTo?.tokens ?? [];
    let userToTokens: Array<string> = [token.id];
    if (typeof userToTokensOpt !== "string") {
      userToTokens.concat(userToTokensOpt);
    }
    let userTo = {
      id: event.params.to,
      address: event.params.to,
      tokens: userToTokens,
    };
    context.user.insert(userTo);
  }
  context.token.insert(token);
});
