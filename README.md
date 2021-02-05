# Burg

Goal: To implement the fundamental concepts of the actor model.

## What is an actor?

An actor is an entity that can receive messages. In response to a message, an
actor can:

- send messages to other actors
- create new actors
- change their own internal state

An actor is uniquely identified by their address. Addresses can be obtained via
a message or when creating an actor.

## What is a message?

A message is an immutable unit of information that is sent from one actor to
another by means of an address. There are no guarantees concerning order or
time. Messages are only received once.
