# Technical Architecture

## System Context - prototype Funding Application System

Having identified an initial set of likely needs / stories in the
[Prototype Backlog](prototype-backlog.md), the following context seems to
describe the various actors and processes:

![System Context - prototype Funding Application System](System%20Context%20-%20prototype%20Funding%20Application%20System.png)


## Architectural Choices

### Backend / Persistence

Key requirements:

* Some form of persistence layer owing to the complex, many-staged nature
of demo / prototype data

* Development will be iterative and so the db framework needs to support
data migrations natively

* Likely to see one or more roles who just want simple db-table level access
as opposed to other roles who want more nuanced UI

Therefore it was decided to provide the backend with [Django](https://docs.djangoproject.com/)
and DRF ([Django REST Framework](https://www.django-rest-framework.org)).

Django provides:
* a good ORM with migrations "out of the box"

* a free "admin" interface to facilitate simple db-level edits

DRF provides:
* a helpful separation layer between the object layer and the presentational
layer

* freedom from the clumsy Django forms implementation (given that much of the
assumption under test here relies upon dynamic form components, the native
Django forms facility seems a poor match for this)

* quick bootstrapping tools for typical API operations

* a helpful query interface (obviating the need for Postman etc)

### UI

Separation of UI components based on the relative simplicity / complexity of
the various actors' interactions:

* Fund Definition Service - a barely disguised wrapper on the database itself -
Django Admin is a great answer for this although beware not to repeat this
choice in production. This is after all just a disposable prototype.

* Reporting Service - an aggregator for database objects with rudimentary layout
requirements, completely read-only - a native Django view is a great choice for this.

* Application UI - This is where we need to surface the dynamism of the variable form
layout and to be able to submit data requests of variable payload structure, therefore a
JS application seems a good fit and [ReactJS](https://reactjs.org) is light and
uncluttered in its design.

Following these choices we may arrive at the following:

## Containers - prototype Funding Application System

Some analysis of the needs and a review of the tools available has led to the
following choices for Containers and Services within this prototype:

![Containers - prototype Funding Application System](Containers%20-%20prototype%20Funding%20Application%20System.png)
