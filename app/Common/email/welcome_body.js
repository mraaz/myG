function welcome_body(pin, alias, code_1, code_2, code_3) {
  const body = `<p>Hi mate,<br /><br /> This will most likely be the first and last email from myG. That's because email is turned off by default. Ofcourse you can update this in the <a title="mySettings" href="https://myG.gg/mySettings" target="_blank" rel="noopener">Settings</a>.<br /><br /> myG's vision is to improve gamers performance, knowledge and experience and we're going to do that by becoming a kick ass gaming platform, allowing gamers to connect, share and improve.<br /><br />This key will be used to access your chat history.<br /><strong>${pin}</strong><br /> Everytime you log off, you key is cleared and when you log back in, you will need to RE-ENTER this key. Failure to do so will disable chat and if a new key is generated, you will LOSE all your previous chat history. <br /> This is a true End to End encryption chat, meaning myG doesn't have any visibility of your messages or your key. Therefore we cannot retrieve messages or key if they are lost <br /><br />Update your <a title="Profile" href="https://myG.gg/profile" target="_blank" rel="noopener">Profile</a>, create/join games, reach out to other gamers!</p>
<p><br />P.S If you wish to report bugs or make feature requests you can <a href="https://github.com/mraaz/myG_RoadMap" target="_blank" rel="noopener">here</a>.&nbsp;</p>
<p>&nbsp;</p>
<p>P.P.S Wait there's more, you also get three invite codes for your friends. They expire in 14 days!</p>
<p>Code 1: ${code_1}</p>
<p>Code 2: ${code_2}</p>
<p>Code 3:&nbsp;${code_3}</p>
<p><br /><br />GLHF<br /><br />Raaz<br /><br /><img src="https://myG.gg/logos/myGame_Logo_black_text.png" alt="myG Logo" width="119" height="67" /></p>`

  return body
}
