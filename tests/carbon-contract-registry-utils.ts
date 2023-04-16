import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { ProjectCreated } from "../generated/CarbonContractRegistry/CarbonContractRegistry";

export function createProjectCreatedEvent(
  projectId: BigInt,
  projectAddress: Address,
  projectName: string
): ProjectCreated {
  let projectCreatedEvent = changetype<ProjectCreated>(newMockEvent());

  projectCreatedEvent.parameters = new Array();

  projectCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  );
  projectCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectAddress",
      ethereum.Value.fromAddress(projectAddress)
    )
  );
  projectCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectName",
      ethereum.Value.fromString(projectName)
    )
  );

  return projectCreatedEvent;
}
