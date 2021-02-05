import {Stage} from "./model.ts";
import {Actor, ActorFactory, ActorSpawner, Address, MessageSpawner} from "../actor/model.ts";

export const createDefaultStage: Stage = (createEntryActor, createAddress, initialMessage) => {
  const actors: { [address: string]: Actor } = {}; // Cannot use address type here because of TypeScript limitations

  let createMessage: MessageSpawner;
  let createActor: ActorSpawner;

  createMessage = (address: Address, message: unknown) => {
    const recipient = actors[address];

    if (!recipient) {
      console.error('Cannot deliver message because recipient could not be found');
      return;
    }

    recipient(message, createMessage, createActor);
  }

  createActor = (actorFactory: ActorFactory): Address => {
    const newAddress = createAddress();
    actors[newAddress] = actorFactory(newAddress);
    return newAddress;
  }

  const entryAddress = createActor(createEntryActor);
  createMessage(entryAddress, initialMessage);
};
