import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleProjectCreated } from "../src/carbon-contract-registry";
import { createProjectCreatedEvent } from "./carbon-contract-registry-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  let createProjectEvent = createProjectCreatedEvent(
    BigInt.zero(),
    Address.fromString("0x0000000000000000000000000000000000000001"),
    "Test Project"
  );

  test("Create Project", () => {
    handleProjectCreated(createProjectEvent);
    // assert.entityCount("AdminChanged", 1);

    // // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    // assert.fieldEquals(
    //   "AdminChanged",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
    //   "previousAdmin",
    //   "0x0000000000000000000000000000000000000001"
    // );
    // assert.fieldEquals(
    //   "AdminChanged",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
    //   "newAdmin",
    //   "0x0000000000000000000000000000000000000001"
    // );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
