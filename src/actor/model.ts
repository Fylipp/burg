export type Address = string;

export type MessageSpawner = (address: Address, message: unknown) => void;
export type ActorSpawner = (actorFactory: ActorFactory) => Address;
export type Actor = (message: unknown, createMessage: MessageSpawner, createActor: ActorSpawner) => void;
export type ActorFactory = (address: Address) => Actor;
