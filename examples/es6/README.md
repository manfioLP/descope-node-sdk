# Example Node ES6 app

## Running example

You can run the application using Docker.

### Docker

build the image:

```
docker build . --tag node-example
```

run the image:

```
docker run -d -e DESCOPE_PROJECT_ID=${PROJECT_ID} -p 443:443 node-example
```
