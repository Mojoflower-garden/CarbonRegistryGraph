// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Project extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Project entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Project must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Project", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Project | null {
    return changetype<Project | null>(store.get("Project", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get projectId(): BigInt {
    let value = this.get("projectId");
    return value!.toBigInt();
  }

  set projectId(value: BigInt) {
    this.set("projectId", Value.fromBigInt(value));
  }

  get projectAddress(): Bytes {
    let value = this.get("projectAddress");
    return value!.toBytes();
  }

  set projectAddress(value: Bytes) {
    this.set("projectAddress", Value.fromBytes(value));
  }

  get projectName(): string {
    let value = this.get("projectName");
    return value!.toString();
  }

  set projectName(value: string) {
    this.set("projectName", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }

  get exPosts(): Array<Bytes> {
    let value = this.get("exPosts");
    return value!.toBytesArray();
  }

  get exAntes(): Array<Bytes> {
    let value = this.get("exAntes");
    return value!.toBytesArray();
  }

  get cancellations(): Array<Bytes> {
    let value = this.get("cancellations");
    return value!.toBytesArray();
  }

  get retirementCertificates(): Array<Bytes> {
    let value = this.get("retirementCertificates");
    return value!.toBytesArray();
  }
}

export class ExPost extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExPost entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ExPost must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExPost", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ExPost | null {
    return changetype<ExPost | null>(store.get("ExPost", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get cancelledAmount(): BigInt {
    let value = this.get("cancelledAmount");
    return value!.toBigInt();
  }

  set cancelledAmount(value: BigInt) {
    this.set("cancelledAmount", Value.fromBigInt(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    return value!.toBigInt();
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get serialization(): string {
    let value = this.get("serialization");
    return value!.toString();
  }

  set serialization(value: string) {
    this.set("serialization", Value.fromString(value));
  }

  get vintage(): string {
    let value = this.get("vintage");
    return value!.toString();
  }

  set vintage(value: string) {
    this.set("vintage", Value.fromString(value));
  }

  get estimatedAmount(): BigInt {
    let value = this.get("estimatedAmount");
    return value!.toBigInt();
  }

  set estimatedAmount(value: BigInt) {
    this.set("estimatedAmount", Value.fromBigInt(value));
  }

  get verificationPeriodStart(): BigInt {
    let value = this.get("verificationPeriodStart");
    return value!.toBigInt();
  }

  set verificationPeriodStart(value: BigInt) {
    this.set("verificationPeriodStart", Value.fromBigInt(value));
  }

  get verificationPeriodEnd(): BigInt {
    let value = this.get("verificationPeriodEnd");
    return value!.toBigInt();
  }

  set verificationPeriodEnd(value: BigInt) {
    this.set("verificationPeriodEnd", Value.fromBigInt(value));
  }

  get lastVerificationTimestamp(): BigInt {
    let value = this.get("lastVerificationTimestamp");
    return value!.toBigInt();
  }

  set lastVerificationTimestamp(value: BigInt) {
    this.set("lastVerificationTimestamp", Value.fromBigInt(value));
  }

  get retiredAmount(): BigInt {
    let value = this.get("retiredAmount");
    return value!.toBigInt();
  }

  set retiredAmount(value: BigInt) {
    this.set("retiredAmount", Value.fromBigInt(value));
  }

  get project(): Bytes {
    let value = this.get("project");
    return value!.toBytes();
  }

  set project(value: Bytes) {
    this.set("project", Value.fromBytes(value));
  }

  get exAnte(): Bytes | null {
    let value = this.get("exAnte");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  get retirementCertificates(): Array<Bytes> {
    let value = this.get("retirementCertificates");
    return value!.toBytesArray();
  }

  get cancellations(): Array<Bytes> {
    let value = this.get("cancellations");
    return value!.toBytesArray();
  }

  get holders(): Array<Bytes> {
    let value = this.get("holders");
    return value!.toBytesArray();
  }
}

export class ExAnte extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExAnte entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ExAnte must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExAnte", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ExAnte | null {
    return changetype<ExAnte | null>(store.get("ExAnte", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    return value!.toBigInt();
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get cancelledAmount(): BigInt {
    let value = this.get("cancelledAmount");
    return value!.toBigInt();
  }

  set cancelledAmount(value: BigInt) {
    this.set("cancelledAmount", Value.fromBigInt(value));
  }

  get serialization(): string {
    let value = this.get("serialization");
    return value!.toString();
  }

  set serialization(value: string) {
    this.set("serialization", Value.fromString(value));
  }

  get exPost(): Bytes {
    let value = this.get("exPost");
    return value!.toBytes();
  }

  set exPost(value: Bytes) {
    this.set("exPost", Value.fromBytes(value));
  }

  get holders(): Array<Bytes> {
    let value = this.get("holders");
    return value!.toBytesArray();
  }

  get project(): Bytes {
    let value = this.get("project");
    return value!.toBytes();
  }

  set project(value: Bytes) {
    this.set("project", Value.fromBytes(value));
  }

  get cancellations(): Array<Bytes> {
    let value = this.get("cancellations");
    return value!.toBytesArray();
  }
}

export class Cancellation extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Cancellation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Cancellation must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Cancellation", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Cancellation | null {
    return changetype<Cancellation | null>(
      store.get("Cancellation", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get exPost(): Bytes | null {
    let value = this.get("exPost");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set exPost(value: Bytes | null) {
    if (!value) {
      this.unset("exPost");
    } else {
      this.set("exPost", Value.fromBytes(<Bytes>value));
    }
  }

  get exAnte(): Bytes | null {
    let value = this.get("exAnte");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set exAnte(value: Bytes | null) {
    if (!value) {
      this.unset("exAnte");
    } else {
      this.set("exAnte", Value.fromBytes(<Bytes>value));
    }
  }

  get serialization(): string {
    let value = this.get("serialization");
    return value!.toString();
  }

  set serialization(value: string) {
    this.set("serialization", Value.fromString(value));
  }

  get cancelledBy(): Bytes {
    let value = this.get("cancelledBy");
    return value!.toBytes();
  }

  set cancelledBy(value: Bytes) {
    this.set("cancelledBy", Value.fromBytes(value));
  }

  get project(): Bytes {
    let value = this.get("project");
    return value!.toBytes();
  }

  set project(value: Bytes) {
    this.set("project", Value.fromBytes(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class RetirementCertificate extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save RetirementCertificate entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type RetirementCertificate must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RetirementCertificate", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): RetirementCertificate | null {
    return changetype<RetirementCertificate | null>(
      store.get("RetirementCertificate", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get retiree(): Bytes {
    let value = this.get("retiree");
    return value!.toBytes();
  }

  set retiree(value: Bytes) {
    this.set("retiree", Value.fromBytes(value));
  }

  get exPost(): Bytes {
    let value = this.get("exPost");
    return value!.toBytes();
  }

  set exPost(value: Bytes) {
    this.set("exPost", Value.fromBytes(value));
  }

  get serialization(): string {
    let value = this.get("serialization");
    return value!.toString();
  }

  set serialization(value: string) {
    this.set("serialization", Value.fromString(value));
  }

  get holder(): Bytes {
    let value = this.get("holder");
    return value!.toBytes();
  }

  set holder(value: Bytes) {
    this.set("holder", Value.fromBytes(value));
  }

  get project(): Bytes {
    let value = this.get("project");
    return value!.toBytes();
  }

  set project(value: Bytes) {
    this.set("project", Value.fromBytes(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class Holder extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Holder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Holder must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Holder", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Holder | null {
    return changetype<Holder | null>(store.get("Holder", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get retiredAmount(): BigInt {
    let value = this.get("retiredAmount");
    return value!.toBigInt();
  }

  set retiredAmount(value: BigInt) {
    this.set("retiredAmount", Value.fromBigInt(value));
  }

  get cancelledAmount(): BigInt {
    let value = this.get("cancelledAmount");
    return value!.toBigInt();
  }

  set cancelledAmount(value: BigInt) {
    this.set("cancelledAmount", Value.fromBigInt(value));
  }

  get cancellations(): Array<Bytes> {
    let value = this.get("cancellations");
    return value!.toBytesArray();
  }

  get exPostAmounts(): Array<Bytes> {
    let value = this.get("exPostAmounts");
    return value!.toBytesArray();
  }

  get exAnteAmounts(): Array<Bytes> {
    let value = this.get("exAnteAmounts");
    return value!.toBytesArray();
  }

  get retirementCertificates(): Array<Bytes> {
    let value = this.get("retirementCertificates");
    return value!.toBytesArray();
  }
}

export class ExPostHolder extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExPostHolder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ExPostHolder must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExPostHolder", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ExPostHolder | null {
    return changetype<ExPostHolder | null>(
      store.get("ExPostHolder", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get exPost(): Bytes {
    let value = this.get("exPost");
    return value!.toBytes();
  }

  set exPost(value: Bytes) {
    this.set("exPost", Value.fromBytes(value));
  }

  get holder(): Bytes {
    let value = this.get("holder");
    return value!.toBytes();
  }

  set holder(value: Bytes) {
    this.set("holder", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get retiredAmount(): BigInt {
    let value = this.get("retiredAmount");
    return value!.toBigInt();
  }

  set retiredAmount(value: BigInt) {
    this.set("retiredAmount", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class ExAnteHolder extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExAnteHolder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ExAnteHolder must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExAnteHolder", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ExAnteHolder | null {
    return changetype<ExAnteHolder | null>(
      store.get("ExAnteHolder", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get exAnte(): Bytes {
    let value = this.get("exAnte");
    return value!.toBytes();
  }

  set exAnte(value: Bytes) {
    this.set("exAnte", Value.fromBytes(value));
  }

  get holder(): Bytes {
    let value = this.get("holder");
    return value!.toBytes();
  }

  set holder(value: Bytes) {
    this.set("holder", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}
