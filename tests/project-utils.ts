import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { ExPostCreated } from "../generated/templates/Project/Project";

export function createExPostCreatedEvent(
  tokenId: BigInt,
  estimatedAmount: BigInt,
  verificationPeriodStart: BigInt,
  verificationPeriodEnd: BigInt,
  serialization: string
): ExPostCreated {
  let exPostCreatedEvent = changetype<ExPostCreated>(newMockEvent());

  exPostCreatedEvent.parameters = new Array();

  exPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  exPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "estimatedAmount",
      ethereum.Value.fromUnsignedBigInt(estimatedAmount)
    )
  );
  exPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "verificationPeriodStart",
      ethereum.Value.fromUnsignedBigInt(verificationPeriodStart)
    )
  );
  exPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "verificationPeriodEnd",
      ethereum.Value.fromUnsignedBigInt(verificationPeriodEnd)
    )
  );
  exPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "serialization",
      ethereum.Value.fromString(serialization)
    )
  );

  return exPostCreatedEvent;
}
