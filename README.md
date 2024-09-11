# prueba_tecnica_royaltic
Technical test consisting on a Full Stack application with CRUD operations. It is composed by the next components

* Backend - Django rest framework
* Frontend - Angular 18
* Database - MySQL
* Docker - Containerization

## Brief description on each component

### Frontend

![Index Page](/frontend/public/index_page.png "Index Page")

![Admin Page](/frontend/public/admin_page.png "Admin Page")

Create components, pages, resolvers, routes, services, forms
For UI: bootstrap, Material Angular and reactive forms.

### Backend
![Api Docs](/frontend/public/api_doc.png "Api Docs")
Create the necessary endpoints for the test. Also there is a seed endpoint for faster testing
Create api docummentation to directly interact and test the API. (Check: localhost:8000/docs)
Use of serializers to automatically convert the models into json objects in order to send proper the responses
Code styling with black

## How to run

### Docker

Download the repo
```
git clone https://github.com/francisdayl/prueba_tecnica_royaltic.git
```
Make sure docker is running in your system, then

```
docker compose up
```

Frontend Server 

```
http://localhost:4200/
```

Backend Server 

```
http://localhost:8000/
```
Database Server 

```
http://localhost:3306/
```


### Individually

Note: First you have to setup your mysql database with the credentials in the .env file

## Frontend

```
npm install
```

```
ng serve
```
## Backend

```
pip install -r requirements.txt
```


```
python manage.py makemigrations
```

```
python manage.py migrate
```

```
python manage.py runserver
```