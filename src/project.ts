import {
  ExPostCreated as ExPostCreatedEvent,
  ExPostVerifiedAndMinted as ExPostVerifiedAndMintedEvent,
  TransferSingle as TransferSingleEvent,
} from "../generated/templates/Project/Project";
import { ExPost, Project, Holder, ExPostHolder } from "../generated/schema";
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts";

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
  let exPostHolder = ExPostHolder.load(
    getPostHolderEntityId(event.params.to, event.params.id)
  );
  if (exPostHolder === null) {
    exPostHolder = new ExPostHolder(
      getPostHolderEntityId(event.params.to, event.params.id)
    );
    exPostHolder.exPost = exPostEntityId;
    exPostHolder.holder = holder.id;
    exPostHolder.amount = BigInt.zero();
  }
  exPostHolder.amount = exPostHolder.amount.plus(event.params.value);
  exPostHolder.save();
  holder.save();
}

function getPostHolderEntityId(
  holderAddress: Address,
  exPostId: BigInt
): Bytes {
  return Bytes.fromHexString(
    holderAddress
      .toHexString()
      .concat("-")
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
