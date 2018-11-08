# Graph QL Experiment

### Usage
`cd server && npm i`

Go to [localhost:4000/graphql](http://localhost:4000/graphql) to mess around.

Try the following queries:

```
books{
    name
}
```

```
authors{
    name
    books{
        name
    }
}
```