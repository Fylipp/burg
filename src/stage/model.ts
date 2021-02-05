import {ActorFactory, Address} from "../actor/model.ts";

export type AddressFactory = () => Address;
export type Stage = (createEntryActor: ActorFactory, createAddress: AddressFactory, initialMessage: unknown) => void;
