# next-litebans

A web interface for [LiteBans](https://www.spigotmc.org/resources/litebans.3715/), built on top of:

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![Prisma](https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/) [![shadcn/ui](https://cdn.yosoyvillaa.dev/uploads/shadcn.svg)](https://ui.shadcn.com/)

## 👾 Demo

You can view a demo of the project [here](https://yosoyvillaa.dev/).

## 🚀 Deployment

### Prerequisites

- Node.js v20.x or higher
- Litebans working on MySQL, MariaDB or PostgreSQL

### Installation

1. Clone the repository with `git clone https://github.com/YoSoyVillaa/next-litebans.git`
2. Install the dependencies with `npm install`
3. If you are using PostgreSQL, check [PostgresSQL Configuration](#PostgresSQL-Configuration)
4. Copy the `.env.example` file to `.env` and fill in the required fields
5. Config the website ([configuration](#🛠️-Configuration))
6. Run `npm run setup:db:generate` to generate the Prisma client
7. Run `npm run build` to build the project
8. Run `npm run start` to start the server

### PostgresSQL Configuration

If you are using PostgreSQL, you need to delete all **models** in the `prisma/schema.prisma` and change the `provider` to `postgresql`, or replace the file content wuth:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then, run `npm run setup:db:pull` to pull the database schema.

## 🛠️ Configuration

You can configure any website option on `config/site.ts`, such as the page title, icon, and more.

### 🌍 Internacionalization

To configure the available languages, you can edit the `config/site.ts` file, modifying the `languages` object, then, you can edit existing translations in the `language/` folder, or create new ones copying the existing ones and changing the values.