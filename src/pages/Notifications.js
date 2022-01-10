import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect } from 'react';
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";

const Notifications = () => {
  const [stompClient, setStompClient] = useState(null);
  const [msgToSend, setSendMessage] = useState("Enter your message here!");
  const [msgReceived, setReceivedMessage] = useState(['']);


  useEffect(() => {
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);

    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);

    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      // stompClient.subscribe('/topic/greetings', (data) => {
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
    // stompClient.send("/app/hello", {}, JSON.stringify({'name': msgToSend}));
    stompClient.send("/app/notify", {}, JSON.stringify({ 'name': msgToSend }));
  }

  // disconnect from Stomp
  function disconnect() {
    stompClient.disconnect();
  }

  // connect with Stomp
  function connect() {

    console.log(stompClient);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      // stompClient.subscribe('/topic/greetings', (data) => {
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
  }
  
    return (
        <div className='chat-room-container'>
          <h1>Disscution chat room(in development)</h1>
          <textarea value={msgReceived} /> <br/>
          <input onChange={(event) => setSendMessage(event.target.value)}/>
          <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default Notifications