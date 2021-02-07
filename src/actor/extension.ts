import {ActorFactory, ActorSpawner, MessageSpawner} from './model.ts';

export interface ClassActor<TAddress, TMessage> {
  consume(message: TMessage, createMessage: MessageSpawner<TAddress, TMessage>, createActor: ActorSpawner<TAddress, TMessage>): void;
}

export function classActorFactory<TAddress, TMessage>(classFactory: (address: TAddress) => ClassActor<TAddress, TMessage>): ActorFactory<TAddress, TMessage> {
  return (address) => {
    const actorInstance = classFactory(address);
    return (message: TMessage, createMessage: MessageSpawner<TAddress, TMessage>, createActor: ActorSpawner<TAddress, TMessage>) =>
      actorInstance.consume(message, createMessage, createActor);
  };
}
