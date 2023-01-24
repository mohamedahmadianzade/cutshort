<div align="center">

  <h1>Cutshort Social App</h1>
  
  <p>
    Repository Design Pattern - NodeJs - Typescript - RBACs implementation - MongoDB (Mongoos ORM)
  </p>

</div>

<br />

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

### :dart: Security considerations:

- All service are protected via token authentication and there is no public api service. so please login to can access all service
- Authorization based on Role-based and each user has access to services via role permissions.
- Roles are not dynamic and in this version, there are just two fixed roles ( admin and user )
- Role can be assigned/deassign to other users by user with admin role privileges

<!-- Features -->

### :dart: Features

-Public api

- signIn
- signUp
- me      --> get current user information

- User

  - admin user can view/create all users

- Roles

  - roles all fixed in this version (Admin/user)
  - admin user can assign/deassign roles to all users

- Todo
  - if userID is in request, it will be filled by token userId
  - admin user can view/create/modify todos for all user
  - normal user can view/create/modify just his own todos
- Posts
  - if userID is in request, it will be filled by token userId
  - admin user can view/create/modify post for all user
  - normal user can view/create/modify just his own post
- Comments

<!-- Color Reference -->

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

PORT

MONGODB_HOST

MONGODB_PORT

MONGODB_DATABASE

QUERY_PAGESIZE

JWT_SECRET_KEY

JWT_EXPIRE

SALT

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

First, you need to create a new users to can access the api service, so for creating 2 users with different credentials and privileges, please run thie init.ts file using this command,

```bash
npx ts-node .\src\init.ts
```

It will create 2 users with 2 different roles : {admin , user}

admin user ==> username: admin password : admin

normal user ==> username: user password : user

admin user has access completely to all api service and data but normal user just can access the api service and data that is related to him.

By runnign this file, for each user, it will create

- 2 posts

- 2 comments

- 2 todoes

<!-- Installation -->

### :gear: Installation

```bash
  npm install
```

<!-- Running Tests -->

### :test_tube: Running Tests

To run tests, run the following command

```bash
  yarn test test
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/Louis3797/awesome-readme-template.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

<!-- License -->

## :warning: License

Distributed under the no License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

Seyed Mohamed Mahdi Ahmadian zadeh -

mohamed.ahmadian@hotmail.com
+989159103070
