import {
  ExPostCreated as ExPostCreatedEvent,
  ExPostVerifiedAndMinted as ExPostVerifiedAndMintedEvent,
  TransferSingle as TransferSingleEvent,
  RetiredVintage as RetiredVintageEvent,
  ExAnteMinted as ExAnteMintedEvent,
  CancelledCredits as CancelledCreditsEvent,
} from "../generated/templates/Project/Project";
import {
  ExPost,
  Project,
  Holder,
  ExPostHolder,
  RetirementCertificate,
  ExAnte,
  ExAnteHolder,
  Cancellation,
} from "../generated/schema";
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export function handleExPostCreated(event: ExPostCreatedEvent): void {
  let project = Project.load(event.address);
  if (project == null) return;
  const exPostEntityId = getHexExPostId(event.params.tokenId, event.address);
  let exPostEntity = ExPost.load(exPostEntityId);

  if (exPostEntity == null) {
    exPostEntity = new ExPost(exPostEntityId);
  }
  exPostEntity.tokenId = event.params.tokenId;
  exPostEntity.supply = BigInt.zero();
  exPostEntity.serialization = event.params.serialization;
  exPostEntity.vintage = event.params.serialization.toString().slice(-4);
  exPostEntity.estimatedAmount = event.params.estimatedAmount;
  exPostEntity.verificationPeriodStart = event.params.verificationPeriodStart;
  exPostEntity.verificationPeriodEnd = event.params.verificationPeriodEnd;
  exPostEntity.lastVerificationTimestamp = BigInt.zero();
  exPostEntity.retiredAmount = BigInt.zero();
  exPostEntity.cancelledAmount = BigInt.zero();
  exPostEntity.project = project.id;

  exPostEntity.save();
}

export function handleExPostVerifiedAndMinted(
  event: ExPostVerifiedAndMintedEvent
): void {
  const exPostEntityId = getHexExPostId(event.params.tokenId, event.address);
  let exPostEntity = ExPost.load(exPostEntityId);
  if (!exPostEntity) return;
  exPostEntity.supply = exPostEntity.supply.plus(event.params.amount);
  exPostEntity.lastVerificationTimestamp = event.params.verificationPeriodEnd;
  exPostEntity.save();
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  const tokenEntityId = getHexExPostId(event.params.id, event.address);
  let exPostEntity = ExPost.load(tokenEntityId);
  if (exPostEntity) {
    // This token is exPost credit
    if (event.params.from != Address.fromHexString(ADDRESS_ZERO)) {
      let holderSender = Holder.load(
        Bytes.fromHexString(event.params.from.toHexString())
      );
      if (holderSender === null) {
        holderSender = new Holder(
          Bytes.fromHexString(event.params.from.toHexString())
        );
        holderSender.address = event.params.from;
        holderSender.retiredAmount = BigInt.zero();
        holderSender.cancelledAmount = BigInt.zero();
      }
      let exPostHolderSender = ExPostHolder.load(
        getPostHolderEntityId(holderSender.id, exPostEntity.id)
      );
      if (exPostHolderSender !== null) {
        exPostHolderSender.amount = exPostHolderSender.amount.minus(
          event.params.value
        );
        exPostHolderSender.save();
      }
      holderSender.save();
    }

    if (event.params.to != Address.fromHexString(ADDRESS_ZERO)) {
      let holder = Holder.load(
        Bytes.fromHexString(event.params.to.toHexString())
      );
      if (holder === null) {
        holder = new Holder(Bytes.fromHexString(event.params.to.toHexString()));
        holder.address = event.params.to;
        holder.retiredAmount = BigInt.zero();
        holder.cancelledAmount = BigInt.zero();
      }
      let exPostHolder = ExPostHolder.load(
        getPostHolderEntityId(holder.id, exPostEntity.id)
      );
      if (exPostHolder === null) {
        exPostHolder = new ExPostHolder(
          getPostHolderEntityId(holder.id, exPostEntity.id)
        );
        exPostHolder.exPost = tokenEntityId;
        exPostHolder.holder = holder.id;
        exPostHolder.amount = BigInt.zero();
        exPostHolder.retiredAmount = BigInt.zero();
      }
      exPostHolder.amount = exPostHolder.amount.plus(event.params.value);
      exPostHolder.save();
      holder.save();
    } else {
      // BURN!
      exPostEntity.supply = exPostEntity.supply.minus(event.params.value);
      exPostEntity.save();
    }
  } else {
    // This token is exAnte credit
    let exAnteEntity = ExAnte.load(tokenEntityId);
    if (exAnteEntity) {
      if (event.params.from != Address.fromHexString(ADDRESS_ZERO)) {
        let holderSender = Holder.load(
          Bytes.fromHexString(event.params.from.toHexString())
        );
        if (holderSender === null) {
          holderSender = new Holder(
            Bytes.fromHexString(event.params.from.toHexString())
          );
          holderSender.address = event.params.from;
          holderSender.retiredAmount = BigInt.zero();
          holderSender.cancelledAmount = BigInt.zero();
        }

        let exAnteHolderSender = ExAnteHolder.load(
          getPostHolderEntityId(holderSender.id, exAnteEntity.id)
        );
        if (exAnteHolderSender !== null) {
          exAnteHolderSender.amount = exAnteHolderSender.amount.minus(
            event.params.value
          );
          exAnteHolderSender.save();
        }
        holderSender.save();
      }

      if (event.params.to != Address.fromHexString(ADDRESS_ZERO)) {
        let holder = Holder.load(
          Bytes.fromHexString(event.params.to.toHexString())
        );
        if (holder === null) {
          holder = new Holder(
            Bytes.fromHexString(event.params.to.toHexString())
          );
          holder.address = event.params.to;
          holder.retiredAmount = BigInt.zero();
          holder.cancelledAmount = BigInt.zero();
        }

        let exAnteHolder = ExAnteHolder.load(
          getPostHolderEntityId(holder.id, exAnteEntity.id)
        );
        if (exAnteHolder === null) {
          exAnteHolder = new ExAnteHolder(
            getPostHolderEntityId(holder.id, exAnteEntity.id)
          );
          exAnteHolder.exAnte = tokenEntityId;
          exAnteHolder.holder = holder.id;
          exAnteHolder.amount = BigInt.zero();
        }
        exAnteHolder.amount = exAnteHolder.amount.plus(event.params.value);
        exAnteHolder.save();
        holder.save();
      } else {
        // BURN!
        exAnteEntity.supply = exAnteEntity.supply.minus(event.params.value);
        exAnteEntity.save();
      }
    }
  }
}

export function handleRetirement(event: RetiredVintageEvent): void {
  const exPostEntityId = getHexExPostId(event.params.tokenId, event.address);
  let exPostEntity = ExPost.load(exPostEntityId);
  if (!exPostEntity) return;

  exPostEntity.retiredAmount = exPostEntity.retiredAmount.plus(
    event.params.amount
  );
  exPostEntity.save();

  let holder = Holder.load(
    Bytes.fromHexString(event.params.account.toHexString())
  );
  if (holder === null) {
    holder = new Holder(
      Bytes.fromHexString(event.params.account.toHexString())
    );
    holder.address = event.params.account;
    holder.cancelledAmount = BigInt.zero();
  }
  holder.retiredAmount = holder.retiredAmount.plus(event.params.amount);
  let exPostHolder = ExPostHolder.load(
    getPostHolderEntityId(holder.id, exPostEntity.id)
  );
  if (exPostHolder !== null) {
    exPostHolder.retiredAmount = exPostHolder.retiredAmount.plus(
      event.params.amount
    );
    exPostHolder.save();
  }
  const retirementNftId = getHexExPostId(
    event.params.nftTokenId,
    event.address
  );
  let retirementEntity = new RetirementCertificate(retirementNftId);

  retirementEntity.tokenId = event.params.nftTokenId;
  retirementEntity.amount = event.params.amount;
  retirementEntity.retiree = holder.id;
  retirementEntity.exPost = exPostEntityId;
  retirementEntity.project = exPostEntity.project;
  retirementEntity.holder = holder.id;
  retirementEntity.createdAt = event.block.timestamp;

  holder.save();
  retirementEntity.save();
  exPostEntity.save();
}

export function handleCancelledCredits(event: CancelledCreditsEvent): void {
  const exPostEntityId = getHexExPostId(event.params.tokenId, event.address);
  let exPostEntity = ExPost.load(exPostEntityId);
  if (!exPostEntity) return;

  exPostEntity.cancelledAmount = exPostEntity.cancelledAmount.plus(
    event.params.amount
  );
  exPostEntity.save();

  let holder = Holder.load(
    Bytes.fromHexString(event.params.account.toHexString())
  );
  if (holder === null) {
    holder = new Holder(
      Bytes.fromHexString(event.params.account.toHexString())
    );
    holder.address = event.params.account;
    holder.retiredAmount = BigInt.zero();
  }
  holder.cancelledAmount = holder.cancelledAmount.plus(event.params.amount);

  let cancellationEntity = new Cancellation(event.transaction.hash);

  cancellationEntity.amount = event.params.amount;
  cancellationEntity.cancelledBy = holder.id;
  cancellationEntity.exPost = exPostEntityId;
  cancellationEntity.project = exPostEntity.project;
  cancellationEntity.createdAt = event.block.timestamp;

  cancellationEntity.save();
  holder.save();
  exPostEntity.save();
}

export function handleExAnteMinted(event: ExAnteMintedEvent): void {
  let exAnteEntity = ExAnte.load(
    getHexExPostId(event.params.exAnteTokenId, event.address)
  );
  let exPostEntity = ExPost.load(
    getHexExPostId(event.params.exPostTokenId, event.address)
  );
  if (exPostEntity === null) return;
  if (exAnteEntity === null) {
    exAnteEntity = new ExAnte(
      getHexExPostId(event.params.exAnteTokenId, event.address)
    );
    exAnteEntity.tokenId = event.params.exAnteTokenId;
    exAnteEntity.supply = event.params.amount;
    exAnteEntity.exPost = exPostEntity.id;
    exAnteEntity.project = exPostEntity.project;
  } else {
    exAnteEntity.supply = exAnteEntity.supply.plus(event.params.amount);
  }
  exAnteEntity.save();
}

function getPostHolderEntityId(holderId: Bytes, exPostId: Bytes): Bytes {
  return Bytes.fromHexString(
    holderId
      .toHexString()
      .concat("--")
      .concat(exPostId.toHexString())
  );
}

function getHexExPostId(exPostId: BigInt, contractAddress: Bytes): Bytes {
  return contractAddress.concat(
    Bytes.fromByteArray(Bytes.fromBigInt(exPostId))
  );
}

// emit ExPostVerifiedAndMinted(
//   tokenId,
//   amountVerified,
//   amountToAnteHolders,
//   verificationPeriodStart,
//   verificationPeriodEnd,
//   monitoringReport
// );
