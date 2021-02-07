import {ActorFactory} from "../actor/model.ts";

export type AddressFactory<TAddress> = () => TAddress;
export type Stage<TAddress, TMessage> = (createEntryActor: ActorFactory<TAddress, TMessage>, createAddress: AddressFactory<TAddress>, initialMessage: TMessage) => void;
