<!--
Hey, thanks for using the awesome-readme-template template.
If you have any enhancements, then fork this project and create a pull request
or just open an issue with the label "enhancement".

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Cutshort Social App</h1>
  
  <p>
    Simple social app
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

<details>

<!-- Features -->

### :dart: Features

- Todo
  - admin user can view/create/modify todos for all user
  - normal user can view/create/modify just his own todos
- Feature 2
- Feature 3

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
