<p align="center"><img src="https://miro.medium.com/max/984/1*IHI90aWzUnrcfHDuh08YTg.png" width="400"></p>

## Installation Instructions

Follow these steps to install the application:

- Create a db in PhpMyAdmin
- Duplicate '.env.example' and name it '.env'
- Open .env and set the DB_DATABASE to the db you created

Then cd into the application folder and run the following in your terminal (Git Bash)

- `composer install`
- `npm install`
- `php artisan key:generate`
- `php artisan passport:install`

Then migrate and seed the database:

- `php artisan migrate --seed`

And then initialise, add, and commit to Git:

- `git init`
- `git add .`
- `git commit -am "Initial commit"`

Set your own remote git repo and push your commits
