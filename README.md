# Course-Chat
> Allow users enrolled in the same courses to chat with each other since Quarantine is in full effect and students don't have the opportunity to make study groups.
## Contents
* [Features](#Features)
* [Demo](#Demo)
* [Technologies](#Technologies)
* [Link](#Link)
* [Login Credentials](#Login%20credentials)
# 
## Features
* Login/Signup and Authenticate using JWT.
* Allow users to add current classes and then retreive a list of classmates. 
* Users can send messages to their classmates
* Messages are persisted to DB (however I have this disabled) 
* Messages are sent in real time and user is notified if Message is seen
* User receives notification for each message
* Navbar shows how many unread messages there are
* Data is cached in browser localStorage/Redux and set back to initial state upon logout

## Demo
<img alt="demo gif" src = "coursechatapp.gif"/>
## Technologies
React<br/>
Express<br/>
NodeJS<br/>
MongoDB<br/>
Socket.io<br/>
## Link
[Link to website deployed using Heroku](https://coursechat2.herokuapp.com/)<br/>
## Login credentials
Two users incase you want to test chatting feature out!<br/>
Login credentials:<br/>
username:**test1**<br/>
password:**Test123**
Login credentials:<br/>
username:**test2**<br/>
password:**Test123**
## License

Developed in 2020. This application is under the MIT license.
Made by [Akhil Khanna](https://github.com/akhil1213) :snowflake:
