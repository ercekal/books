This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The repo can be cloned from `https://github.com/ercekal/books`.

In order to install the node modules you should run `yarn`.
Also you might need to build the sass environment by running `npm rebuild node-sass`.

After running `yarn start` the server would be accessible from `http://localhost:3000/`.

The `App` contains 3 components: <br/>

- The `List` component makes the related API calls on page load, on pagination click and on searching a keyword <br/>
- The `Seach` components lets the search inputs and makes the search when button is clicked or `Enter` is pressed <br/>
- The `Pagination` components handles the pagination by letting the user to navigate to preferred page

When a url contains query strings for `page` and `search` it would make the search based on the keywords and go to the specific page.

For the API call, I used `async & await`, `try & catch` and normal `.then` in separate functions.


