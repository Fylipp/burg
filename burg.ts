import {v4 as uuid} from 'https://deno.land/std@0.86.0/uuid/mod.ts';
import {ActorSpawner, Address, MessageSpawner} from './src/actor/model.ts';
import {ClassActor, classActorFactory} from "./src/actor/extension.ts";
import {createDefaultStage} from "./src/stage/impl.ts";

console.log(
  ' ___               \n' +
  '| _ )_  _ _ _ __ _ \n' +
  '| _ \\ || | \'_/ _` |\n' +
  '|___/\\_,_|_| \\__, |\n' +
  '             |___/ ');
console.log();

function createUuidAddress(): Address {
  return uuid.generate();
}

class EntryActor implements ClassActor {
  constructor(private readonly address: Address) {
  }

  consume(message: unknown, createMessage: MessageSpawner, createActor: ActorSpawner) {
    console.log('I am', this.address, 'and I received', message);

    const newMessage = [...(message as Address[]), this.address];
    setTimeout(() => {
      const childAddress = createActor(classActorFactory((address) => new EntryActor(address)));
      createMessage(childAddress, newMessage);
    }, 1000);
  }
}

const createEntryActor = classActorFactory((address) => new EntryActor(address));

createDefaultStage(createEntryActor, createUuidAddress, []);
