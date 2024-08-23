# ScalifyChat

## Project Introduction
- **ScalifyChat** is a scalable realtime communication system designed to handle high concurrency and ensure reliable message delivery across distributed servers. 

## Version 1 Design and Implementation(Redis & socket.io)
### Design Diagram
![V1 Diagram](https://github.com/Reneechang17/ScalifyChat/blob/main/static/ScalifyChat-v1%20diagram.jpg)

### Challenge?
- Version 1 addresses the challenge of cross-server communication in a distributed chat system. 
- Specifically, the problem arises when users are connected to different servers, making it difficult to ensure that messages are consistently delivered across all servers.

### Solution
- Redis Pub/Sub: Redis is used as a central message broker to facilitate cross-server communication. When a user sends a message, it is published to a Redis channel. All servers in the system are subscribed to this channel, ensuring that all messages are distributed to users connected to different servers in real time.
- Socket.IO: Socket.IO is used to establish low-latency, bidirectional communication between the servers and clients. This ensures that messages are delivered with minimal delay.
- Redis Insight: Use for monitor.

![Server Communication](https://github.com/Reneechang17/ScalifyChat/blob/main/static/Server%20Communication.jpg)
![Redis Insight](https://github.com/Reneechang17/ScalifyChat/blob/main/static/Redis%20Insight.jpg)

## Version 2 Design and Implementation(Kafka & Postgres)
### Design Diagram
![V2 Diagram](https://github.com/Reneechang17/ScalifyChat/blob/main/static/ScalifyChat-v2%20diagram.jpg)
### Challenge?
- Version 2 builds on the foundation laid in Version 1 by addressing the need for message durability, error handling, and further scalability. 
- The primary challenge here is to ensure that messages are not lost in the event of server failures and to efficiently manage high volumes of messages.

### Solution
- Kafka Integration: Messages published by the servers are now sent to Kafka, which stores them reliably and allows them to be consumed later, ensuring that no messages are lost even if a server goes down.
- Pause and Resume Mechanism: The Kafka consumer is equipped with a pause and resume mechanism to handle errors during message processing. If an error occurs, the consumer is paused to prevent further errors and automatically resumes after a set period, allowing the system to recover gracefully.
- PostgreSQL for Persistence: Messages processed by Kafka consumers are stored in a PostgreSQL database for long-term storage, enabling message history and retrieval capabilities.

![Msg stored in Kafka](https://github.com/Reneechang17/ScalifyChat/blob/main/static/Msg%20in%20Kafka.jpg)
![Msg stored in Prisma Studio](https://github.com/Reneechang17/ScalifyChat/blob/main/static/Msg%20in%20Prisma%20studio.jpg)

## Future works??
- Advanced Load Balancing: Implement advanced load balancing strategies to further distribute the message load across multiple Kafka partitions and servers.
- User Presence and Notifications: Add features such as user presence indicators and notifications for missed messages, enhancing the user experience.
- Security Enhancements: Implement additional security measures, such as end-to-end encryption for messages and authentication mechanisms to safeguard user data and communications.


# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
