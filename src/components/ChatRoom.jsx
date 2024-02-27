// import './global';
// import React, { useEffect, useState } from 'react'
// import {over} from 'stompjs';
// import SockJS from 'sockjs-client';

// var stompClient =null;
// const ChatRoom = () => {
//     const [privateChats, setPrivateChats] = useState(new Map());     
//     const [publicChats, setPublicChats] = useState([]); 
//     const [tab,setTab] =useState("CHATROOM");
//     const [userData, setUserData] = useState({
//         username: '',
//         receivername: '',
//         connected: false,
//         message: ''
//       });
//     useEffect(() => {
//       console.log(userData);
//     }, [userData]);

//     const connect =()=>{
//         let Sock = new SockJS('http://localhost:8080/ws');
//         stompClient = over(Sock);
//         stompClient.connect({},onConnected, onError);
//     }

//     const onConnected = () => {
//         setUserData({...userData,"connected": true});
//         stompClient.subscribe('/chatroom/public', onMessageReceived);
//         stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
//         userJoin();
//     }

//     const userJoin=()=>{
//           var chatMessage = {
//             senderName: userData.username,
//             status:"JOIN"
//           };
//           stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//     }

//     const onMessageReceived = (payload)=>{
//         var payloadData = JSON.parse(payload.body);
//         switch(payloadData.status){
//             case "JOIN":
//                 if(!privateChats.get(payloadData.senderName)){
//                     privateChats.set(payloadData.senderName,[]);
//                     setPrivateChats(new Map(privateChats));
//                 }
//                 break;
//             case "MESSAGE":
//                 publicChats.push(payloadData);
//                 setPublicChats([...publicChats]);
//                 break;
//         }
//     }
    
//     const onPrivateMessage = (payload)=>{
//         console.log(payload);
//         var payloadData = JSON.parse(payload.body);
//         if(privateChats.get(payloadData.senderName)){
//             privateChats.get(payloadData.senderName).push(payloadData);
//             setPrivateChats(new Map(privateChats));
//         }else{
//             let list =[];
//             list.push(payloadData);
//             privateChats.set(payloadData.senderName,list);
//             setPrivateChats(new Map(privateChats));
//         }
//     }

//     const onError = (err) => {
//         console.log(err);
        
//     }

//     const handleMessage =(event)=>{
//         const {value}=event.target;
//         setUserData({...userData,"message": value});
//     }
//     const sendValue=()=>{
//             if (stompClient) {
//               var chatMessage = {
//                 senderName: userData.username,
//                 message: userData.message,
//                 status:"MESSAGE"
//               };
//               console.log(chatMessage);
//               stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//               setUserData({...userData,"message": ""});
//             }
//     }

//     const sendPrivateValue=()=>{
//         if (stompClient) {
//           var chatMessage = {
//             senderName: userData.username,
//             receiverName:tab,
//             message: userData.message,
//             status:"MESSAGE"
//           };
          
//           if(userData.username !== tab){
//             privateChats.get(tab).push(chatMessage);
//             setPrivateChats(new Map(privateChats));
//           }
//           stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//           setUserData({...userData,"message": ""});
//         }
//     }

//     const handleUsername=(event)=>{
//         const {value}=event.target;
//         setUserData({...userData,"username": value});
//     }

//     const registerUser=()=>{
//         connect();
//     }
//     return (
//     <div className="container">
//         {userData.connected?
//         <div className="chat-box">
//             <div className="member-list">
//                 <ul>
//                     <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
//                     {[...privateChats.keys()].map((name,index)=>(
//                         <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
//                     ))}
//                 </ul>
//             </div>
//             {tab==="CHATROOM" && <div className="chat-content">
//                 <ul className="chat-messages">
//                     {publicChats.map((chat,index)=>(
//                         <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                             {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
//                             <div className="message-data">{chat.message}</div>
//                             {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="send-message">
//                     <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
//                     <button type="button" className="send-button" onClick={sendValue}>send</button>
//                 </div>
//             </div>}
//             {tab!=="CHATROOM" && <div className="chat-content">
//                 <ul className="chat-messages">
//                     {[...privateChats.get(tab)].map((chat,index)=>(
//                         <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                             {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
//                             <div className="message-data">{chat.message}</div>
//                             {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="send-message">
//                     <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
//                     <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
//                 </div>
//             </div>}
//         </div>
//         :
//         <div className="register">
//             <input
//                 id="user-name"
//                 placeholder="Enter your name"
//                 name="userName"
//                 value={userData.username}
//                 onChange={handleUsername}
//                 margin="normal"
//               />
//               <button type="button" onClick={registerUser}>
//                     connect
//               </button> 
//         </div>}
//     </div>
//     )
// }

// export default ChatRoom


// import React, { useEffect, useState } from 'react';
// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';

// var stompClient = null;

// const ChatRoom = () => {
//     const [publicChats, setPublicChats] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [userData, setUserData] = useState({
//         username: '',
//         connected: false,
//         message: ''
//     });

//     const connect = (event) => {
//         event.preventDefault();
//         let Sock = new SockJS('http://localhost:8080/ws');
//         stompClient = over(Sock);
//         stompClient.connect({}, onConnected, onError);
//     }

//     const onConnected = () => {
//         setUserData({...userData, "connected": true});
//         stompClient.subscribe('/chatroom/public', onMessageReceived);
//         userJoin();
//     }

//     const userJoin = () => {
//         var chatMessage = {
//           senderName: userData.username,
//           status: "JOIN"
//         };
//         stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//     }

//     const onMessageReceived = (payload) => {
//         var payloadData = JSON.parse(payload.body);
//         if(payloadData.status === "JOIN") {
//             setUsers([...users, payloadData.senderName]);
//             publicChats.push({message: `${payloadData.senderName} joined the chat!`, status: 'JOIN'});
//             setPublicChats([...publicChats]);
//         } else if(payloadData.status === "MESSAGE") {
//             publicChats.push(payloadData);
//             setPublicChats([...publicChats]);
//         }
//     }
    
//     const onError = (err) => {
//         console.log(err);
//     }

//     const handleMessage = (event) => {
//         const {value} = event.target;
//         setUserData({...userData, "message": value});
//     }

//     const sendMessage = () => {
//         if (stompClient) {
//             var chatMessage = {
//                 senderName: userData.username,
//                 message: userData.message,
//                 status: "MESSAGE"
//             };
//             stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//             setUserData({...userData, "message": ""});
//         }
//     }

//     const handleUsername = (event) => {
//         const {value} = event.target;
//         setUserData({...userData, "username": value});
//     }

//     const handleEnterKey = (event, action) => {
//         if(event.key === 'Enter') {
//             action();
//         }
//     }

//     return (
//         <div className="container">
//             <h2>Telusko Chat App</h2>
//             {userData.connected ? (
//                 <div className="chat-box">
//                     <div className="member-list">
//                         <ul>
//                             {users.map((user, index) => (
//                                 <li key={index}>{user}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="chat-content">
//                         <ul className="chat-messages">
//                             {publicChats.map((chat, index) => (
//                                 <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                                     <div className="message-data">
//                                         {chat.status === 'JOIN' ? chat.message : `${chat.senderName}: ${chat.message}`}
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                         <div className="send-message">
//                             <input
//                                 type="text"
//                                 className="input-message"
//                                 placeholder="Enter your message"
//                                 value={userData.message}
//                                 onChange={handleMessage}
//                                 onKeyDown={(e) => handleEnterKey(e, sendMessage)}
//                             /> 
//                             <button type="button" className="send-button" onClick={sendMessage}>Send</button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="register">
//                     <input
//                         id="user-name"
//                         placeholder="Enter your name"
//                         name="userName"
//                         value={userData.username}
//                         onChange={handleUsername}
//                         onKeyDown={(e) => handleEnterKey(e, () => connect(e))}
//                     />
//                     <button type="button" onClick={connect}>
//                         Connect
//                     </button> 
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ChatRoom;

// import './global';





import React, { useState, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [users, setUsers] = useState(new Set()); // Use a Set to ensure unique users
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
        message: ''
    });

    useEffect(() => {
        const handleEnter = (event) => {
            if (event.keyCode === 13) { // keyCode 13 is the Enter key
                if (!userData.connected) {
                    connect(event);
                } else {
                    sendValue();
                }
            }
        };
        document.addEventListener("keydown", handleEnter);  

        return () => {
            document.removeEventListener("keydown", handleEnter);
        };
    }, [userData, publicChats, users]); // Include dependencies that, when changed, should re-add the event listener

    const connect = (event) => {
        event.preventDefault();
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);//websocket connenection
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };        
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.status === "JOIN") {
            setUsers(new Set(users).add(payloadData.senderName)); // Correctly update the users set
            setPublicChats(publicChats => [...publicChats, { message: `${payloadData.senderName} joined the chat!`, status: 'JOIN' , senderName: 'System' }]);
        } else if (payloadData.status === "MESSAGE") {
            setPublicChats(publicChats => [...publicChats, payloadData]);
        }
    };

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message, 
                status: "MESSAGE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    return (
        <div className="container">
            <h1 className='key1'>Telusko Chat App</h1>
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            {Array.from(users).map((user, index) => (
                                <li className="member" key={index}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="Enter your message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>Send</button>
                        </div>
                    </div>
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={connect}>
                        Connect
                    </button>
                </div>}
        </div>
    );
}

export default ChatRoom;
