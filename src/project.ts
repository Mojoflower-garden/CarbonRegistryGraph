import {
  ExPostCreated as ExPostCreatedEvent,
  ExPostVerifiedAndMinted as ExPostVerifiedAndMintedEvent,
  TransferSingle as TransferSingleEvent,
} from "../generated/templates/Project/Project";
import { ExPost, Project, Holder, ExPostHolder } from "../generated/schema";
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
  const exPostEntityId = getHexExPostId(event.params.id, event.address);
  let exPostEntity = ExPost.load(exPostEntityId);
  if (!exPostEntity) return;

  let holder = Holder.load(Bytes.fromHexString(event.params.to.toHexString()));
  if (holder === null) {
    holder = new Holder(Bytes.fromHexString(event.params.to.toHexString()));
    holder.address = event.params.to;
  }
  if (event.params.from.toHexString() !== ADDRESS_ZERO) {
    let holderSender = Holder.load(
      Bytes.fromHexString(event.params.from.toHexString())
    );
    if (holderSender === null) {
      holderSender = new Holder(
        Bytes.fromHexString(event.params.from.toHexString())
      );
      holderSender.address = event.params.from;
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

  let exPostHolder = ExPostHolder.load(
    getPostHolderEntityId(holder.id, exPostEntity.id)
  );
  if (exPostHolder === null) {
    exPostHolder = new ExPostHolder(
      getPostHolderEntityId(holder.id, exPostEntity.id)
    );
    exPostHolder.exPost = exPostEntityId;
    exPostHolder.holder = holder.id;
    exPostHolder.amount = BigInt.zero();
  }
  exPostHolder.amount = exPostHolder.amount.plus(event.params.value);
  exPostHolder.save();
  holder.save();
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
