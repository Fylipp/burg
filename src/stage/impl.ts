import {Stage} from "./model.ts";
import {Actor, ActorSpawner, MessageSpawner} from "../actor/model.ts";
import {ClassActor} from "../actor/extension.ts";

export const createDefaultStage: Stage<string, object> = (createEntryActor, createAddress, initialMessage) => {
  const actors: { [address: string]: Actor<string, object> } = {};

  let createMessage: MessageSpawner<string, object>;
  let createActor: ActorSpawner<string, object>;

  createMessage = (address, message) => {
    const recipient = actors[address];

    if (!recipient) {
      console.error('Cannot deliver message because recipient could not be found');
      return;
    }

    recipient(message, createMessage, createActor);
  }

  createActor = (actorFactory) => {
    const newAddress = createAddress();
    actors[newAddress] = actorFactory(newAddress);
    return newAddress;
  }

  const entryAddress = createActor(createEntryActor);
  createMessage(entryAddress, initialMessage);
};

export type DefaultStageClassActor = ClassActor<string, object>;
