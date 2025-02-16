# Integrum ESG interview - Card App 🎴🃏

## Notes from me and thoughts
Firstly, sorry it took me so long to get around to putting all the pieces together for this. It's been a busy few weeks.

So, as instructed I have:
* Added a toggle for dark mode
* Added a 'scheduled for' date field
* Added some backend tests for the two endpoints that were directly affected by adding the scheduled for field

What I struggled with:
* When working on the backend tests, I spent a few hours attempting to set up tests to run not directly on the 'live' database. Usually, when using sqlite I just use the in-memory database when running tests but Prisma doesn't have support for this and only recommends mocking the PrismaClient. But given that I was writing integration tests to see if the data gets added to the database when the API was called, mocking felt futile. I tried using a couple of libraries (mainly @quramy/jest-prisma-node) to run the tests in a transaction but this seems to be designed to work for unit testing Prisma queries directly instead of integration testing. Prisma's testing documentation recommends spinning up a docker environment for this type of integration testing but at this point I'm already very late delivering this so I don't want to delay my submission any later!

What I would add if I had more time:
* Testing for all endpoints as I came across a bug in the existing code when changing the created at date from the default value and I might come across more when testing the others.
* Better labelling on the frontend for the 'scheduled for' date field and the 'created at' date field because there is no description on the front-end
* Docker environment for testing as mentioned in the previous section
* Sorting the all entries page with the closest 'scheduled_for' dates first

Overall I didn't measure my time spent on it properly as it was just whenever I found a couple of hours here and there but I'd estimate spending around 6-10 hours on it?

I can't think of anything else worth mentioning off the top of my head but thanks, it was fun to play around with and yes it was better than an algo test!


# Features

- Mutiple Routes for each action.
- Local Backend Database
- You can View, Create, Update, Delete simple cards.

# Stack

## Front End

- React ⚛
- React Router DOM 🔀
- Tailwind CSS 🐦

## Back End

- Fastify 🚀
- Prisma ORM 🅿
- SQLite ▪

# Deploy

Git hooks are used to automatically format committed files. To setup the hooks run:

```bash
npm i
```

The front end works in port 3000 and the backend works in the port 3001.

## Back End

```bash
npm install

npm run prisma-setup

npm start
```

To have the backend restart when changes have been made to `.ts`, `.prisma` and `.sql` files:

Replace `npm start` with `npm run dev`

To run the tests:

```bash
npm run test
```

## Front End

```bash
npm install

npm start
```

To deploy a final build with static files:

```bash
npm run build

cd ./dist

npx serve -p 3000 -s
```
