# MEAN-Boilerplate

This is a repo that can be downloaded to bootstrap a MEA(4)N Project. 

### Highlights 

1. Form authenticaiton with error feedback for users
2. Routes hardened against outside attacks
3. Users may register as student or teacher and access the profiles of their account
4. Students may contact, view & rate teachers - out of the box 

## Instructions to Use

1. Fork & Git Clone <Forked Repo>
###server package.json install
2. cd <Forked Repo>  
3. 'npm install' 
###angular (client) package.json install
4. cd client
5. npm install

## Database Boiletplate

1. Database is named 'mean-boilerplate' 
  1(a). Edit Database name in 'env' folder
2. Edit Collection names in 'models' folder
  2(a). Auth for students & teachers is available through 'authentication' route
  
### Check Database with Mongo shell 
  
1. Switch to Mongo Bin (Ensure MongoDB is downloaded)
2. Run command ./mongod --> this will start / run mongo database
<!-- Open a new tab in terminal-->
3. Run command ./mongo --> this will start mongo shell
 3(a). use <database name>
 3(b). show collections
 3(c). db.<collection name>.find()

## Routes

1. All Student/Teacher registrations & logins are handled from the 'Authentication' route

###

Open Source and free to use :smiley: + :hatching_chick: = :earth_americas:.... or something like that

