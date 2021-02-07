export type MessageSpawner<TAddress, TMessage> = (address: TAddress, message: TMessage) => void;
export type ActorSpawner<TAddress, TMessage> = (actorFactory: ActorFactory<TAddress, TMessage>) => TAddress;
export type Actor<TAddress, TMessage> = (message: TMessage, createMessage: MessageSpawner<TAddress, TMessage>, createActor: ActorSpawner<TAddress, TMessage>) => void;
export type ActorFactory<TAddress, TMessage> = (address: TAddress) => Actor<TAddress, TMessage>;
