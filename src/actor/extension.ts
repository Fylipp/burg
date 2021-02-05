import {ActorFactory, ActorSpawner, Address, MessageSpawner} from "./model.ts";

export interface ClassActor {
  consume(message: unknown, createMessage: MessageSpawner, createActor: ActorSpawner): void;
}

export function classActorFactory(classFactory: (address: Address) => ClassActor): ActorFactory {
  return (address) => {
    const actorInstance = classFactory(address);
    return (message: unknown, createMessage: MessageSpawner, createActor: ActorSpawner) =>
      actorInstance.consume(message, createMessage, createActor);
  };
}
