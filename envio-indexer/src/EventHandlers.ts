import {
  PoolySupporterContract_registerNFTInitializedLoadEntities,
  PoolySupporterContract_registerNFTInitializedHandler,
  PoolySupporterContract_registerTransferLoadEntities,
  PoolySupporterContract_registerTransferHandler,
  PoolyLawyerContract_registerNFTInitializedLoadEntities,
  PoolyLawyerContract_registerNFTInitializedHandler,
  PoolyLawyerContract_registerTransferLoadEntities,
  PoolyLawyerContract_registerTransferHandler,
  PoolyJudgeContract_registerNFTInitializedLoadEntities,
  PoolyJudgeContract_registerNFTInitializedHandler,
  PoolyJudgeContract_registerTransferLoadEntities,
  PoolyJudgeContract_registerTransferHandler,
} from "../generated/src/Handlers.gen";

import { nftcollectionEntity, tokenEntity } from "../generated/src/Types.gen";

const zeroAddress = "0x0000000000000000000000000000000000000000";

PoolySupporterContract_registerNFTInitializedLoadEntities(
  ({ event, context }) => {}
);

PoolySupporterContract_registerNFTInitializedHandler(({ event, context }) => {
  let nftCollection: nftcollectionEntity = {
    id: "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed", // not emitted in the event :thinking:
    contractAddress: "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed", // not emitted in the event :thinking:
    name: event.params.name,
    symbol: event.params.symbol,
    maxSupply: event.params.maxNFT,
    currentSupply: 0,
  };
  context.nftcollection.insert(nftCollection);
});

PoolySupporterContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolySupporterContract_registerTransferHandler(({ event, context }) => {
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
    console.log(
      "Issue with events emitted, unregistered NFT collection transfer"
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

PoolyLawyerContract_registerNFTInitializedLoadEntities(
  ({ event, context }) => {}
);

PoolyLawyerContract_registerNFTInitializedHandler(({ event, context }) => {
  let nftCollection: nftcollectionEntity = {
    id: "0x3545192b340F50d77403DC0A64cf2b32F03d00A9", // not emitted in the event :thinking:
    contractAddress: "0x3545192b340F50d77403DC0A64cf2b32F03d00A9", // not emitted in the event :thinking:
    name: event.params.name,
    symbol: event.params.symbol,
    maxSupply: event.params.maxNFT,
    currentSupply: 0,
  };
  context.nftcollection.insert(nftCollection);
});

PoolyLawyerContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyLawyerContract_registerTransferHandler(({ event, context }) => {
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
    console.log(
      "Issue with events emitted, unregistered NFT collection transfer"
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

PoolyJudgeContract_registerNFTInitializedLoadEntities(
  ({ event, context }) => {}
);

PoolyJudgeContract_registerNFTInitializedHandler(({ event, context }) => {
  let nftCollection: nftcollectionEntity = {
    id: "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523", // not emitted in the event :thinking:
    contractAddress: "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523", // not emitted in the event :thinking:
    name: event.params.name,
    symbol: event.params.symbol,
    maxSupply: event.params.maxNFT,
    currentSupply: 0,
  };
  context.nftcollection.insert(nftCollection);
});

PoolyJudgeContract_registerTransferLoadEntities(({ event, context }) => {
  context.user.userFromLoad(event.params.from, { loaders: undefined });
  context.user.userToLoad(event.params.to, { loaders: undefined });
  context.nftcollection.nftCollectionUpdatedLoad(event.srcAddress);
  context.token.existingTransferredTokenLoad(
    event.srcAddress.concat("-").concat(event.params.tokenId.toString()),
    { loaders: undefined }
  );
});

PoolyJudgeContract_registerTransferHandler(({ event, context }) => {
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
    console.log(
      "Issue with events emitted, unregistered NFT collection transfer"
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
