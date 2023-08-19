import React from 'react';

const ChatInterface = (props) => {
  // console.log(props.chatdata, '77');
  
  // Use the map function to generate an array of JSX elements
  const chatElements = Object.keys(props.chatdata).map((key, index) => (
    <div key={index}>
      <li class="message left">
			<img class="logo" src="https://cdn5.vectorstock.com/i/1000x1000/49/69/head-man-face-avatar-character-vector-27624969.jpg" alt=""/>
			<p>{key}</p>
		</li>
		<li class="message right">
			<img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsc0bw_Znj--W3fdZ8Ua1nxPaPqpHCN2Ik3hwrnjam_fpxTjNScEJd4KsH-sekmm5nvfw&usqp=CAU" alt=""/>
			<p>{props.chatdata[key]}</p>
		</li>
    </div>
  ));

  return (
    <div class="chat-container">
	<ul class="chat">
      {chatElements}
    </ul>
    </div>
  );
}

export default ChatInterface;
