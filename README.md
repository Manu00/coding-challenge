# B42 Backend Coding Challenge
---

Use `docker-compose up` to sart the `mongodb(27017)` `app(4000)` and `mongo-express(8081)` stack.

[http://localhost:4000/graphql!]: http://localhost:4000/graphql
*Attention you have to use  http://localhost:4000/graphql because of how the cookies work.*

### Benutzung:
Create a user:
```
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    name
    email
  }
}

{
  "input": {
    "name":  "John Snow",
    "email": "john@mail.com",
    "password": "password"
  }
}
```

Login with user:
```
mutation login($input: LoginInput!) {
  login(input: $input)
}

{
  "input": {
    "email": "john@mail.com",
    "password": "password"
  }
}
```

Get user info:
```
query {
  me{
    _id
    email
    name
  }
}
```

Authenticated user can create a workout:
```
mutation createWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    _id
    user
    workoutId
    title
    exercises
  }
}

{
  "input": {
    "title": "Weekend Workout",
    "exercises": ["1", "2x2", "3x5"]
  }
}
```

Authenticated user can delete his/her workout:
```
mutation deleteWorkout($input: DeleteWorkoutInput!) {
  deleteWorkout(input: $input) {
    _id
  }
}
```

Fetch data of one workout:
```
query workout($input: GetWorkoutInput!){
    workout(input: $input) {
    _id
    user
    title
    exercises
    workoutId
  }
}

{
  "input": {
    "workoutId": "workout_9584709049"
  }
}
```

Fetch data of all workout:
```
query workouts{
  workouts{
    _id
    user
    title
    workoutId
    exercises
  }
}
```

Fetch data of his/her workout:
```
query finishedWorkout($input: GetFinishedWorkoutInput!) {
  finishedWorkout(input: $input) {
    _id
    user
    workoutId
    finishedAt
    rating
  }
}

{
  "input": {
    "workoutId": "workout_9584709049"
  }
}
```

Fetch data of all his/her workouts:
```
query finishedWorkouts{
  finishedWorkouts{
    _id
    workoutId
    user
    rating
  }
}
```

User can finish and rate a workout:
```
mutation finishWorkout($input: FinishedWorkoutInput!) {
  finishWorkout(input: $input) {
    _id
    workoutId
    user
    finishedAt
    rating
  }
}

{
  "input": {
    "workoutId": "workout_9584709049",
    "rating": 4
  }
}
```

`Not Working` User can upload a profile-picture:
```
mutation uploadPP($input: PPInput!) {
  uploadPP(input: $input) {
    _id
    email
    name
  }
}

{
  "input": {
    "file": "image-data"
  }
}
```

#### ACHTUNG!
Bitte beachte hier wurde kein Wert auf Sicherheit gelegt, Passwörter sind in Klartext im Code.

## What technologies are used
- Node.js
- MongoDB
- Express
- Docker + Docker Compose
- GraphQL with Apollo Server
