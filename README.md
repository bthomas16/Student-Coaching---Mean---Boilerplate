# MEAN-Boilerplate

This is a repo that can be downloaded to bootstrap a MEA(4)N Project. 

### Highlights 

1. Form authenticaiton with error feedback for users & jwt for token authentication
2. Routes hardened against outside attacks
3. Users may register as student or teacher and access the profiles of their account
4. Students may contact, view & rate teachers - out of the box (coming soon)

## Instructions to Use

1. Fork & Git Clone *Forked Repo*
server package.json install
2. cd *Forked Repo*  
3. 'npm install' 
##### angular (client) package.json install
4. cd client
5. npm install

### Development Full Stack Build
##### From the root folder
command: nodemon
##### from the client folder
command: ng server

Production Full Stack Build
##### From the root folder
1. npm run build
2. heroku create
##### copy url
3. git push heroku master
##### heroku logs --tail (check build history)
4. git add .
5. git commit -m 'first full commit'
6. git push heroku master
7. heroku open

## Database Boiletplate

1. Database is named 'mean-boilerplate' 
  1(a). Edit Database name in 'env' folder
2. Edit Collection names in 'models' folder
  2(a). Auth for students & teachers is available through 'authentication' route
3. Production database is set up as MongoDB free sandbox (edit in '.env' folder) 

**** To build production
  
### Check Database with Mongo shell 
  
1. Switch to Mongo Bin (Ensure MongoDB is downloaded)
2. Run command ./mongod --> this will start / run mongo database (must be open during development)
### Open a new tab in terminal
3. Run command ./mongo --> this will start mongo shell (to check current development database)
 3(a). use <database name>
 3(b). show collections
 3(c). db.<collection name>.find()

## API

1. All User (student & teacher) registrations & logins are handled from the 'Authentication' route
2. All get requests from the teacher database are handled in the 'API' api

## Lincense

### Open Source and free to use :smiley: + :hatching_chick: = :earth_americas: .... or something like that

