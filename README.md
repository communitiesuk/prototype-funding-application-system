# FSD prototype Funding Application System

## Assumption(s) under test / Raisons d'être

That we can develop a flexible and future-ready workflow process by basing our application 
forms around reusable block-level components which MHCLG pick from at time of Fund Formulation.
Such blocks would then underpin all processes of:

* Approval
* Reporting
* Assurance

The FSD project domain is complex and there is an enormous amount of contextual
complexity already available in research findings and Discovery activities.

While this is invaluable in terms of informing the accuracy of solutions, it
is not possible to start a complex software project by consulting complex domain
information.

What's required is for some form of technical strategist (in this case a TA)
to ingest and understand this complex problem domain and then be able to
simplify those complexities far enough to start building out simple
prototypes. These simple prototypes will then form the basis of early iterations
of the software, iterations which when they grow in complexity will map
back painlessly into the complex solution domain demanded by the complex
problem domain.

Hence this prototype.

## CAVEAT
This will be prototype code. It's untested. Do not deploy it into the public.

The contained approach does not constitute a vote of confidence for any
of the contained frameworks or languages in the quest for a suitable
long-term solution. This repo is entirely disposable.

## Premises

The prototype build is timeboxed. The build will work from a prioritised backlog and when the time
is up, the build will stop.

## Features

The features of this prototype are listed and managed during development in the
[Prototype Backlog](docs/prototype-backlog.md).

The technical design and decisions are detailed in the [Technical Architecture](docs/technical-architecture.md)
document.

## Working with the project

To work with this project the only install you need is the most recent
version of [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Set up the project

#### Build

Given that you have Docker installed OK, build the project like this:
```shell script
$ docker-compose build
```

This is a one-off step although you will have to repeat it if you fundamentally
change the project, e.g. alter the Python package requirements.

#### Prepare the database

If you're going to run the dev server and interact you will need a database set up locally to enable this.
Set up the database as follows:

```shell script
$ docker-compose run webservices ./manage.py migrate
```

If you change the database structure you'll need to prepare migrations and rerun that previous step like this:

```shell script
$ docker-compose run webservices ./manage.py makemigrations
$ docker-compose run webservices ./manage.py migrate
```

See the [Django migration docs](https://docs.djangoproject.com/en/3.1/topics/migrations/) for more detail.

#### Creating a superuser

Because we have elected to leverage the Django Admin interface for the role of the Funding Delivery Designer, you
will need to set up a "superuser" so that Django will allow you access to the Admin interface.

Do it like this:

```shell script
$ docker-compose run webservices ./manage.py createsuperuser
```
and follow the instructions (it is a very short process).

The project is now ready.

### Start the dev server

```shell script
$ docker-compose up
```

This will start all the services.

### Interact!

Currently you can view the system from two angles, acting as one of two roles:

If you want to be a Funding Delivery Designer, go here: <http://localhost:8000/admin/funds_service/fund/>.

If you want to be an API client consuming the Funds Service, go here:
<http://localhost:8000/funds_service/api/funds/>
