# Technical Test Write Up

## General project structure

The project has been delivered using three docker images.

1. The back end server (provided by yourselves)
1. The client application - created using the the Vue Cli. The docker image for this application has been configured as a development environment, with live reloading, rather than a production build. If a production build had been required I would have used a docker multi stage build, resulting in only the minimum built assets being included in the resulting image.
1. A simple NGINX server set up to act as a proxy server, passing on requests to the api, and avoiding CORS issues.

Instructions for running the application with docker-compose are in the README file.

## Application Design

Due to the simple nature of the application I have not used vue-router or Vuex.

- Whilst in a larger application I would use vue-router to handle the routing, and use route guards to prevent unauthorised access to pages - it simply didn't make sense in an application with only one page. I have therefor just use a v-if/ v-else structure to show either the login component, or the portfolio component depending on login status.
- Whilst Vuex is fantastic it would be overkill in an application with so few pages. All application level state is just stored in App.vue, and passed down via props as required. If the application grew, then this would be swapped out for vuex.

Due to having issues with the sass loader not working inside the docker live reloading environment, I instead used scoped style sections inside the single page components. The scoped nature brings some of the benefits of scss nested rules. Also in terms of css I have assumed that a modern browser will be used, and flex box will be available. The application also uses media breakpoints to adjust the screen layout at smaller screen sizes.

## General application flow

On launching the application the user will not be logged in. On entering their credentials ( For testing purposes the valid account name is pre-filled ), the loginSvc is used to make a request to `/api/login`.

On a successful attempt the App component starts loading data, and shows the Portfolio components in place of the Login component. Promise.all is used to combine responses to the the fundsSvc.getFundsWithHistory(), and portfoliosSvc.getPortfolioWithAccounts(name) calls

- The portfolioSvc.getPortfolioWithAccounts(name) call makes a single GET request to `/api/portfolios/<<name>>`
- The fundsSvc.getFundsWithHistory() first makes a call to `/api/funds`, and then a call to `/api/funds/<<isin>>` for each fund.

Whilst fetching all the data in one hit like this is convenient - in a larger scale app some data would loaded on demand instead e.g. a funds history would only be loaded when the show trend button is clicked.

If the data fails to load, then the user will be presented with a retry button which when clicked would emit a custom event back up the chain to the App components, where another data load attempt would be triggered.

Once the data is loaded, all the details are displayed for the portfolio, account and funds. On clicking a button the user can see a chart of each funds history.

Other buttons will put the fund in a 'buy' or 'sell' mode. If the user attempts to make a trade, once its validated successfully, a post request will be made via the portfolioSvc.placeTrade(portfolioName, accountName, trade) to `/api/portfolios/<<portfolioName>>/accounts/<<accountName>>/trades` with the trades details.

When a user clicks the SiteHeader component's logout link, a custom event is emitted up to the App component, where the user details' are removed from the state.

## Third party components

- [vue-css-donut-chart](https://www.npmjs.com/package/vue-css-donut-chart) - A simple to use component for generating donut-charts. These have been used to visualise a fund as a percentage of the portfolio.
- [vue-spinner](https://www.npmjs.com/package/vue-spinner) - A nice animated spinner displayed when the funds details are being loaded along with the portfolios details. **An artificial delay** has been added in the fundsSvc service to allow time to witness the spinner.
- [vue-toasted](https://www.npmjs.com/package/vue-toasted) - Allows the application to easily display success, and error messages in a noticeable manner.
- [vuetrend](https://cinwell.com/vue-trend/?ref=madewithvuejs.com) - A simplistic line chart like control I used to visualise a funds history. Whilst pretty this would likely be too simplistic for proper use.

## Outstanding Issues & Limitations

### Linting issues

There are several outstanding linting issues that are unresolved. I imagine that these are something to do with my current setup. In particular I have been getting lots of warnings like:

- Cannot find module '@/components/xxx' inside components.
- Property ... does not exist on type 'CombinedVueInstance ...

Whilst I abhor to have outstanding warnings in a project - I have simply run out of time to fix these issues, what with this being my first attempt at Vue with Typescript. The application is running perfectly despite these issues.

### Limitations

- The project has no test coverage. Whilst I am used to working in an environment with high test coverage, there has simply been insufficient time to write them, and hit the tight deadline. Normally at the very least I would have unit tests covering key business logic.

- When buying or selling funds, the requests are posted off, and responses are being returned successfully. The trades are not being merged into the displayed funds details however. This is largely due to a lack of domain knowledge on how these should be handled. For instance these trades are in a pending state, so should they be included at this stage, or kept separate? This however means that whilst an individual sale may not be for more units than are held, multiple sales may exceed the holding when combined.
