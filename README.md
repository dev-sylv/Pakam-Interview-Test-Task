# Pakam-Interview-Test-Task
Automated Deposit Notification System: A system that  sends mobile notifications and emails to users when an automated deposit is missed due to  insufficient funds in their primary money source (wallet)

STACKS USED: Node JS, Express & MongoDB (Typescript).

CODE WALKTHROUGHS:
-After cloning from github. Do npm i to get all packages installed while working on the project.
<br/>
-The index file holds the server created, and every other thing is connected to it like the main App config, database connection etc..
<br/>
-There is an env file where i have my mongodb connection string (live and local) and my port
<br/>
-In the main app config, my routes, middlewares and error handling were configured here.
<br/>
-The config folder holds my database connection(Mongodb for my database) and envVariables(where the info in my .env file can be easily accessed)
<br/>
-Models contains the details and sets up the logic buid up for this system where we have 3 models of users, wallet and history connected together
<br/>
-The middleware folder contains the error handler codes()
<br/>
- The utils contains the Asynchandler() and the main App error where we get to define some errors ourselves using the httpcodes etc..
<br/>
- The validation folder validates the user sign up and sign in using joi package, and moves further to authenticate the auth process with the email verification flow
<br/>
- The email auth has 2 functions in it; the first is for the account(email) verification when users signs up. The second is an email for the notification of insufficient balance when the users makes an automated deposit
 with the notification type of email.

  NB: The Verification_URL there should come from the frontend, the url of the page from the frontend. Got my Google ID, secret and refresh token from google console cloud for the email.
<br/>
- In my controllers, you can get all users in the system, get a single user details, Authenticate and Authorize a user(sign up, verify and sign in).
- You can make a deposit and if your wallet balance is insufficient, you get an email notification else your transaction goes through
- Also you can fund your wallet balance.
<br/>
- My routes contains the endpoint:
  (Depending on the port you set up for yourself, mine is 3500)
    <br/>
- Endpoints for Get all Users: "http://localhost:3500/api/users/all-users"
  <br/>
- Endpoints for Get One User: "http://localhost:3500/api/users/user/:userID"
-   <br/>
- Endpoints for Users Registration: "http://localhost:3500/api/users/registerusers"
-   <br/>
- Endpoints for Users Verification: "http://localhost:3500/api/users/verifyusers"
-   <br/>
- Endpoints for Users Login: "http://localhost:3500/api/users/loginuser"
-   <br/>
- Endpoints for Making automated deposits: "http://localhost:3500/api/users/depositmoney/:userID/:walletID"
-   <br/>
- Endpoints for Funding wallet: "http://localhost:3500/api/users/fundwallet/:userID/:walletID"
-   <br/>
<br/>

TO RUN CODES:
After Npm i, on the right directory/folder, run the "npm run dev" command
<br/>
This will start up the server and every thing connected.
The launch up postamn and text the endpoints there really
