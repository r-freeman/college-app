![vuejs laravel fullstack](https://miro.medium.com/max/984/1*IHI90aWzUnrcfHDuh08YTg.png)

## College App

Full stack application built with [Laravel 6](https://laravel.com/), [Vue.js](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/). Authentication with [Laravel Passport](https://laravel.com/docs/6.x/passport). The application features a dashboard interface demonstrating CRUD of three entities using RESTful API architecture.

## Demo

The application is hosted on a [Heroku dyno](http://ancient-stream-40225.herokuapp.com/#/), log in with these credentials to demo it.

```bash
sam@bloggs.com
secret 
```

## Screenshots

![dashboard](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_.png)

![courses](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-1.png)

![enrolments](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-2.png)

![lecturers](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-3.png)

![view course](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-4.png)

![edit course](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-5.png)

![delete course](https://gentile-garden.s3.amazonaws.com/uploads/2020/04/ancient-stream-40225.herokuapp.com_-6.png)

# Installation instructions

Use the terminal and follow these steps to install the application locally.

## Setting up the Laravel 6 backend

### Clone the master branch

```bash
git clone https://github.com/r-freeman/college-app.git && cd college-app/
```

### Install composer dependencies

```bash
composer install
```

### Create .env environment variable file

```bash
cp .env.example .env
```

### Generate application key

```bash 
php artisan key:generate
```

### Set up the database

Create a new database in phpMyAdmin and update DB_DATABASE in .env

```bash
DB_DATABASE=laravel
```

### Run database migrations and seeders

```bash
php artisan migrate:fresh --seed
```

### Create Passport encryption keys

```bash
php artisan passport:install
```

### Start the web server

```bash
php artisan serve
```

## Setting up the Vue.js frontend

### Install NPM dependencies

```bash
npm install
```

### Run the development server

```bash
npm run watch
```

### Build development assets

```bash
npm run dev
```

### Build production assets

```bash
npm run prod
```
