import axios from 'axios';
import authHeader from '../authHeader';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect } from 'react';
import './Notifications.css'
import ScrollToBottom from 'react-scroll-to-bottom'
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";


const Notifications = () => {
  const [stompClient, setStompClient] = useState(null);
  const [msgToSend, setSendMessage] = useState("");
  const [msgReceived, setReceivedMessage] = useState(['']);
  const [user, setUser] = useState({});
  const [messageHistory, setMessageHistory] = useState([]);

  var today = new Date();
  var time = "[" + today.getHours() + ":" + today.getMinutes() + "]";


  const getUser = () => {
    axios
      .get("http://localhost:8080/user/account", { headers: authHeader(), })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data);
          alert("Something went wrong");
        } else {
          setUser(res.data);
        }
      });
  }

  useEffect(() => {
    getUser();

    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);

    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);

    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe('/topic/notifications', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      stompClient.subscribe('/topic/broadcast', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);

  // send the data using Stomp
  function sendMessage() {
    if (msgToSend === "") {
      window.alert("Please enter a message first.");
    } else {
      stompClient.send("/app/notify", {}, JSON.stringify({ 'name': time + " " + user.username + ": " + msgToSend }));
      document.getElementById("message-text").value = "";
      setSendMessage("");
    }
  }

  // connect with Stomp
  function connect() {

    console.log(stompClient);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe('/topic/notifications', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      stompClient.subscribe('/topic/broadcast', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });
  }

  // display the received data
  function onMessageReceived(data) {
    const result = JSON.parse(data.body);
    // alert(result.content);
    setReceivedMessage(result.content);

    setMessageHistory((list) => [...list, result.content]);
  }

  return (
    <div className='chat-room-container'>
      <h1>Discussion chat room</h1>

      <div className='chat-box'>
        <ScrollToBottom className="chat-scroll">
          <p className='chat-welcome'>Welcome, {user.username}!</p>
          {messageHistory.map((message) => {
            return <p>{message}</p>
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-input'>
        <input id="message-text" onChange={(event) => setSendMessage(event.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Notifications