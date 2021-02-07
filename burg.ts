import {v4 as uuid} from 'https://deno.land/std@0.86.0/uuid/mod.ts';
import {ActorSpawner, MessageSpawner} from './src/actor/model.ts';
import {classActorFactory} from './src/actor/extension.ts';
import {createDefaultStage, DefaultStageClassActor} from './src/stage/impl.ts';

console.log(
  ' ___               \n' +
  '| _ )_  _ _ _ __ _ \n' +
  '| _ \\ || | \'_/ _` |\n' +
  '|___/\\_,_|_| \\__, |\n' +
  '             |___/ ');
console.log();

class EntryActor implements DefaultStageClassActor {
  constructor(private readonly address: string) {
  }

  consume(message: { counter: number }, createMessage: MessageSpawner<string, object>, createActor: ActorSpawner<string, object>) {
    console.log('I am', this.address, 'and I received the counter value', message.counter);

    const newMessage = {counter: message.counter + 1}
    setTimeout(() => {
      const childAddress = createActor(classActorFactory((address) => new EntryActor(address)));
      createMessage(childAddress, newMessage);
    }, 1000);
  }
}

const createEntryActor = classActorFactory<string, object>((address) => new EntryActor(address));

createDefaultStage(createEntryActor, () => uuid.generate(), {counter: 0});
