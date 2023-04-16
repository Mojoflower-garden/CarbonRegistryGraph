import { ProjectCreated as ProjectCreatedEvent } from "../generated/CarbonContractRegistry/CarbonContractRegistry";
import { Project } from "../generated/schema";
import { Project as ProjectTemplate } from "../generated/templates";

export function handleProjectCreated(event: ProjectCreatedEvent): void {
  let entity = new Project(event.params.projectAddress);
  entity.projectId = event.params.projectId;
  entity.projectAddress = event.params.projectAddress;
  entity.projectName = event.params.projectName;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  ProjectTemplate.create(event.params.projectAddress);

  entity.save();
}
