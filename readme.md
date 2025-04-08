Episode 5-
-multiple route handlers
-next()
-errors with next and res.send()
-syntax of multiple route handlers->app.use("/user",r1,[r3,r4],r5)
-middleware
-diff btw app.use and app.all

Epiosde 6-
-create a cluster on mongodb atlas
-install mongoose library
-connect applicaton to db url
-call database function in app before server calling
-create a userSchema and usermodle
-create a POST /signup api to push data to DB
-push documents using api on postman
-always wrap databse realted in a try catch block

Episode 7-
-diff btw json obj and javascript obj
-add express.json middleware to app (req.body)
-maky dynamic api to change data from end user
-create a DELETE user api
-update admin data using PATCH api using userid
-diff btw put and delete
-update user with emailid
-explore mongoose documentation

Epiose 8-
-explore all schema types
-add required,minlength,maxlength all the mandatory schema types
-add default and timestamps to userschema
-add validate to get a valid dataa
-checks all the test cases 

Epiosde 9-
-validate the req in utils
-install bcrypt to hash the password
-create passwordHash using bcrypt.hash and save user hash password
-create Login API
-valide the password and email using bcrypt.compare
-send the resposnse login successful if valid else throw error

Epiosode 10-
-install cookie-parser
-create a dummy cookie
-creat a GET/profile api to check it gives back cookie or not
-install jsonwebtoken
-in LOGIN api,after validation of email and password create a jwt token and send it to suer in cookies
-read cookies inside your PROFILE api and find logged in user
-create userAuth middleware and add in profile and sendconncetion API
-add expiry to jwt and cookie of 7 days
