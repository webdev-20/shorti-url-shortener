
<div align="center">
  <img src="https://raw.githubusercontent.com/webdev-20/shorti-url-shortener/2a16fa1e8d6a13c4e6aacd5ebd517ed1b6795001/client/public/images/shorti.svg">
  <h3 align="center">
      <a href="https://shorti.onrender.com" class="default">View Demo</a> · 
      <a href="https://github.com/webdev-20/shorti-url-shortener/issues" class="default">Report Bug</a> · 
      <a href="https://github.com/webdev-20/shorti-url-shortener/issues" class="default">Request Feature</a>
  </h3>
  <div>

  <a href="">[![Issues](https://img.shields.io/github/issues/webdev-20/shorti-url-shortener.svg?style=for-the-badge)](https://github.com/webdev-20/shorti-url-shortener/issues)</a>
  <a href="">[![contributors](https://img.shields.io/github/contributors/webdev-20/shorti-url-shortener.svg?style=for-the-badge)](https://github.com/webdev-20/shorti-url-shortener/contributors)</a>
  <a href="">[![Forked](https://img.shields.io/github/forks/webdev-20/shorti-url-shortener.svg?style=for-the-badge)](https://github.com/webdev-20/shorti-url-shortener)</a>

  </div>
</div>

<p align="center"; style="font-size:115%;">This project helps user to generate a short URL making it easy to share and use.
</p>

<a name = "readme-top"></a>

## Table of Contents
  
- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites:](#prerequisites)
  - [Run project locally](#run-project-locally)
- [Contributing](#contributing)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Live Site](#live-site)
- [License](#license)
- [Contacts](#contacts)

## About The Project

<blockquote> 
Users can shorten a link using this app which returns a short code that redirects to the original link. <br>

Currently user account functions are in development phase.
</blockquote> 

<p align="right">(<a href="#top">back to top</a>)</p>
  
  ## Built With
  <blockquote>

  **Client:** 

  <a href="">[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org])</a>

  <a href="">![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=CSS-Module&logoColor=white)</a>
</blockquote>
<blockquote>

**Server:** 

<a href="">[![Express](https://img.shields.io/badge/Express%20Js-yellow?style=for-the-badge&logo=expressJS)](https://expressjs.com/)</a>


<a href="">[![Mongo](https://img.shields.io/badge/MongoDB-success?style=for-the-badge&logo=mongodb&logoColor=white&style=flat)](https://www.mongodb.com/)

</blockquote>
<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

  > To set up the project locally, follow these simple steps below:

### Prerequisites:

  > Should have **Node.js** installed to get yarn package.

### Run project locally

1. Fork and Clone the repository

```bash
  git clone https://github.com/webdev-20/shorti-url-shortener.git
```

2. Go to the project directory

```bash
  cd shorti-url-shortener
```

3. Install dependencies in both client and server

```bash
  yarn install
```

4. Start the server

```bash
  yarn start (for both client and server)
  yarn client (for client only)
  yarn server (for server only)
```
 **Note:** Create and fill in server/.env and client/.env 

 More details [here](https://github.com/webdev-20/shorti-url-shortener/blob/main/CONTRIBUTE.md)

 <p align="right">(<a href="#top">back to top</a>)</p>
 
## Contributing

We welcome your contribution!

Please get the issue assigned to yourself before working on it, to avoid duplicate efforts.

Any Suggestions, please fork the repo and create a pull request.
Or create an issue with tag - **enhancement**

1. Fork the repository
2. Clone it and navigate to your local repository
3. Create your feature branch, example:- fix/header
4. Stage changes & commit
5. Create a pull request

See [contributing.md](https://github.com/webdev-20/shorti-url-shortener/blob/main/CONTRIBUTE.md) for ways to get started and more details.
<p align="right">(<a href="#top">back to top</a>)</p>

## API Documentation

Details of API endpoints can be viewed here
https://localhost:4002/api/docs

#### Generate `openAPI` file for swagger

```bash
cd server
```

```bash
npx swagger-jsdoc -d docs/definition.yaml src/routes/*.route.js "docs/*.yaml" -o docs/schemas/openapi.json
```

## Features

- [x] Url Shortening
- [x] Redirect to original Url using the short Url
- [x] Show a list of previously shortened Url 
  <br>

Visit the [open issues](https://github.com/webdev-20/shorti-url-shortener/issues) for a full list of proposed features. 

## Live Site

Visit our production site here - 
https://shorti.onrender.com/
<p align="right">(<a href="#top">back to top</a>)</p>

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contacts

[Cheryl M](https://github.com/cherylli) <br> **Discord ID**- Notcori#0144


Project Link: [https://github.com/webdev-20/shorti-url-shortener](https://github.com/webdev-20/shorti-url-shortener)

 
 
<p align="right">(<a href="#top">back to top</a>)</p>