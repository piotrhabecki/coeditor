# CoEditor - Share code with people in the room

<div align="center">


![icons8-backend-development](https://user-images.githubusercontent.com/12681598/197064007-b32804a7-dad9-418a-9ef1-6baface042fc.gif)

<sub><sup><a target="_blank" href="https://icons8.com/icon/Zh3EQfzwFUbT/backend-development">Backend Development</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></sup></sub>

</div>

## About the app

This app is a cooperative editor that uses Redis and WebSockets to communicate between application clients. Share and create code with your team members.

I've used <a target="_blank" href="https://pusher.com/">Pusher</a> as WebSocket supporting technology because Vercel is not supported long-lasting connections.

<a target="_blank" href="https://redis.com/">Redis</a> technology is used for data replication between clients that arrives to the rooms or connect to the room.

The application allows you to write code and every other person connected to the room can see the code and modify it in real-time. 

There is a slight delay between clients so the app does not spam the pusher API with the request.

The application has also integrated chat so you can share messages, links, etc with your colleagues along the codding.

The Javascript code can be compiled on the server with help of <a target="_blank" href="https://github.com/patriksimek/vm2">VM2 library</a>

The syntax highlight is provided by <a target="_blank" href="https://microsoft.github.io/monaco-editor/">Monaco Editor</a>

The application is written fully in React and styled with CSS with the Next.js library.

## Live demo and manual

<div align="center">

<h3><a target="_blank" href="https://coeditor.vercel.app/">Live demo</a><h3>

</div>

![coeditor](https://user-images.githubusercontent.com/12681598/197068071-012056e4-7244-4e16-8132-b5ae45473198.gif)

* On the landing page you have two options: create a room or join the room
* If you have room ID you can join the room by giving the room ID and your username
* If you are the host you can just create a room by giving your name and clicking on create button
* When you are on the page you can copy the room ID by clicking on it on the toolbar.

* You can build and run Javascript code on the server (With some limitations 😏 )
* You can't build and run other languages but the syntax highlight is provided.
* Whenever you're changing something on Your UI, the other person sees the changes.
* When the last person leaves the room - the room is deleted from Redis.


## How to run it on your machine

If you want to run the code you have to:

* Checkout the repository
* npm install
* Create Redis account and get the API key
* Create a Pusher account and get an API key
* update API keys in the settings of the project
* npm run dev

## About the author

I am a test engineer who is learning new skills in frontend development. If you want to know more about me or contact me then please visit:

<div align="center">
https://www.testquest.pl/
</div>

### If you like it
If you like the application, or you're using the demo or maybe it helped you with something then buy me a coffee 😉
<div align="center">

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/piotrhabecZ)  
</div>
