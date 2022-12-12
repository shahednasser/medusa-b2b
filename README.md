# Medusa B2B Tutorial

This repository is the codebase of tutorial "How to Create B2B Store with Medusa".

[Medusa Documentation](https://docs.medusajs.com/) | [Medusa Website](https://medusajs.com/) | [Medusa Repository](https://github.com/medusajs/medusa)

## Medusa Version

This tutorial uses Medusa v1.6.5. It is not guaranteed that it will work with future releases.

## Prerequisites

- [Node.js at least v14](https://docs.medusajs.com/tutorial/set-up-your-development-environment#nodejs)
- [PostgreSQL](https://docs.medusajs.com/tutorial/set-up-your-development-environment#postgresql)
- [Medusa CLI Tool](https://docs.medusajs.com/cli/reference)
- [MinIO](https://docs.medusajs.com/add-plugins/minio/#set-up-minio)

## Project Structure

This project includes three directories:

1. `b2b-admin`: The Medusa admin dashboard.
2. `b2b-server`: The Medusa server.
3. `b2b-storefront`: The Medusa Next.js storefront.

## How to Install

### Using Medusa CLI Tool

If you're only interested in the Medusa server, you can install it using the Medusa CLI tool.

Check out the instructions in the [B2B Server README](https://github.com/shahednasser/b2b-server/blob/master/README.md)

### Using GitHub Cloning

1. Clone this repository:

```bash
git clone --recurse-submodules https://github.com/shahednasser/medusa-b2b.git
cd medusa-b2b
```

2\. Install the dependencies for each of the directories:

```bash
cd b2b-admin
npm install
cd ../b2b-server
npm install
cd ../b2b-storefront
npm install
```

3\. Rename the template environment variables of Medusa server:

```bash
cd b2b-server
mv .env.template .env
```

And enter the necessary environment variables in the file.

4\. Rename the template environment variables of Medusa storefront:

```bash
cd b2b-storefront
mv .env.template .env
```

And enter the necessary environment variables in the file.

5\. Start Medusa Server:

```bash
cd b2b-server
npm start
```

You can then start the Medusa admin while the server is running with the following command:

```bash
cd b2b-admin
npm start
```

And you can then start the Medusa storefront while the server is running with the following command:

```bash
cd b2b-storefront
npm run dev
```

## Other Resources

- [Medusa Documentation](https://docs.medusajs.com/)
