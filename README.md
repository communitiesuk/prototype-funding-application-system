# FSD prototype Funding Application System

## Assumption(s) under test / Raisons d'être

That we can develop a flexible and future-ready workflow process by basing our application 
forms around generic, basic block-level components. These would enable Funding Delivery
Designers to describe complex application requirements using simple building blocks.

The aim then is to show that with properly organised workflow roles, even simple building
blocks can yield reporting outputs and dashboard features pretty much "for free".

We achieve this end by putting firm separation between all the component services and
objects, which leads to the desired "cleanliness of design" out of which naturally falls
sane and low-friction reporting capabilities. (If you want to see this separation in
diagrammatic form then check the [Technical Architecture doc](docs/technical-architecture.md).)

## Roles

This first-iteration prototype services three of the several roles in the real domain:

1. Funding Delivery Designer - Provide an interface for them to express different funds,
their purposes and their criteria of appliction / submission.

2. Fund Applicant - Provide an interface for them to locate appropriate funds and to apply
for these, completing all the stipulated criteria.

3. Compliance Reviewer - Provide an interface, or "Dashboard", for them to see in real time
the totals of the various criteria in all applications.

## Obvious omissions

No attempt is made to address Applicant Assistance, Application Approval, or Programme
Management activities. That would be a great place to start a second iteration.

## Why this prototype is deliberately obtuse in its references to the real world

The FSD project domain is complex and there is an enormous amount of contextual
complexity already available in research findings and Discovery activities.

While this is invaluable in terms of informing the accuracy of solutions, it
is not possible to start a complex software project by consulting complex domain
information.

What's required to start development is a very simple initial iteration which covers
as much of the surface of the problem areas as possible whilst deliberately avoiding depth.

Thus in this first iteration we have simply marked the actions of 3 roles of user. No
attempt is made to represent the real world in any truly authentic fashion.

The next iteration might be to include some steps for Assistance, Approval, and
 Programme Management but again at a similarly "dumb" level.

Only when the whole ground is mapped in this thin veneer should we consider enriching any
part of it.

Repeat for every level of complexity. Cover the whole ground first before going deeper
on any section.

## Artefacts

This repo can be inspected by developers of later phases in order to understand the
logical representations of some of the real-world situations. In many ways the
working code in here is a form of "living" documentation which when combined
with the granular version control log will show future developers assumptions and
lessons we learned on the way.

## Again, simplicity

It bears repeating: We have to start software simply. That simple software needs to
be based on a mass distillation of the complex problem domain, simplified far enough
to start building out a simple prototype such as this.

These simple prototypes will then form the basis of early iterations
of the software, iterations which when they grow in complexity will map
back painlessly into the complex solution domain demanded by the complex
problem domain.

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

You must complete ALL these steps in the stated order.

#### 1. Build Docker containers

Given that you have Docker installed OK, build the project like this:
```shell script
$ docker-compose build
```

This is a one-off step although you will have to repeat it if you fundamentally
change the project, e.g. alter the Python package requirements.

#### 2. Install front-end (npm) packages

For Docker reasons you _must_ install npm packages through the Docker Compose service. Do not install them
natively on your host. For reasons see [this Docker blog post](https://www.docker.com/blog/keep-nodejs-rockin-in-docker/).

Install npm packages like this:
```shell script
docker-compose run applicationui npm install
```

#### 3. Prepare the database

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

#### 4. Create a superuser

Because we have elected to leverage the Django Admin interface for the role of the Funding Delivery Designer, you
will need to set up a "superuser" so that Django will allow you access to the Admin interface.

Do it like this:

```shell script
$ docker-compose run webservices ./manage.py createsuperuser
```
and follow the instructions (it is a very short process).

The project is now ready.

#### 5. (OPTIONAL) Load demo data

There is a small amount of "life-like" demo data ready for import to assist in the setup of
a decent demo environment. It includes some realistic Criteria (which the Applicant then sees
as Outcomes to be completed) and some example Funds which use those Criteria.

If you want to load this into the db you prepped in the above steps, then it's:

```shell script
$ docker-compose run webservices ./manage.py loaddata demo_funds
```

### Start the dev server

```shell script
$ docker-compose up
```

This will start all the services.

### Interact!

You can interact with this system from a number of viewpoints:

#### Funding Delivery Designer

If you want to be a Funding Delivery Designer, go here: <http://localhost:8000/admin/funds_service/fund/>.

#### Fund Applicant

If you want to be a Fund Applicant, go here: <http://localhost:8080>.

BEWARE: Note that this is "tested" only in Safari and Chrome on Mac. In other browsers you may not be able
to run this part of the prototype. For example in FIREFOX submitted Applications "lose" their Output
values.

#### Compliance Reviewer

If you want to be a Compliance Reviewer, go here: <http://localhost:8000/applications_service/dashboards/applications/>.

#### API Client

Not terribly useful for demo purposes but if you want a closer look at the APIs themselves then go to:

* Applications Service API <http://localhost:8000/applications_service/api/applications/>

* Funds Service API <http://localhost:8000/funds_service/api/funds/>

Django REST framework helpfully detects your User-Agent type as a browser and wraps the API output in a
human-friendly layout. You could instead of course use cUrl or Postman etc.
