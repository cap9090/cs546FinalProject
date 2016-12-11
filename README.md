# cs546FinalProject

Christian Prajzner, Joseph Miles, Stephen Horn, Mingwei Xu, Carly Bean
CS546 Final Project readme
Financial planner application

To run the financial planner application, please follow the below steps:

1. Run MongoDB if it is not already running.
2. Run seed.js in our supplied package of code (in the tasks folder) to populate customer accounts, products, and financial problems into the database.
3. Using the supplied package.json, run the application via app.js
4. Once the console displays a message that the server is running, please go to "localhost:3000" in your web browser.
5. Once here, the login page will be displayed.  Our seed.js script has created two accounts with the following credentials:
 - username: admin@stevens.edu  password: abc123
 - username: janedoe@stevens.edu  password: 123

- The "Remember me" checkbox will store the supplied username in local storage so that it will be presented again upon next login.
 
6. As an alternate to logging in with an existing account, you can also click the "New User? Sign up!" link to create a new account with your own credentials and financial information.
7. Once logged in, all options available to the user are shown on the customers/home page.  You can:
 - update the financial information on the account (these are the same fields that are populated when you create a new account). This will change how the financial calculations determine what financial problems you have and offer appropriate products to help.
 - enter a financial goal. The purpose is to choose a financial goal you wish to achieve, and based on your input and the existing financial information on your account, relevant financial products will be offered to you. Choose your goal by selecting the appropriate goal tab, entering your information in the supplied fields, and clicking "Submit".
 - view details about any of our existing products by clicking on the links under "Our Products". These descriptions can also be viewed after entering a financial goal, when the list of relevant products is presented.

8. The top bar with "Our Products", "My Profile", and "Goals", as well as the blue buttons displayed under the "What would you like to do?" prompt, will scroll the page to the relevant section so you can enter your profile information/goals.
9. To sign in with a new account, click "Logout" in the top right and you will be returned to the login page.