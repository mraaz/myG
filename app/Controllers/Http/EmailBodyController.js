'use strict'

class EmailBodyController {
  async welcome_body(pin, alias, code_1, code_2, code_3) {
    const body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to myG</title>
        <style id="applicationStylesheet" type="text/css">
          .mediaViewInfo {
            --web-view-name: Welcome to myG;
            --web-view-id: Welcome_to_myG;
            --web-scale-on-resize: true;
            --web-center-horizontally: true;
            --web-enable-deep-linking: true;
          }
          :root {
            --web-view-ids: Welcome_to_myG;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: none;
          }
          #Welcome_to_myG {
            position: absolute;
            width: 800px;
            height: 1751px;
            background-color: rgba(255, 255, 255, 1);
            overflow: hidden;
            --web-view-name: Welcome to myG;
            --web-view-id: Welcome_to_myG;
            --web-scale-on-resize: true;
            --web-center-horizontally: true;
            --web-enable-deep-linking: true;
          }
          #Group_827 {
            position: absolute;
            width: 800.103px;
            height: 549px;
            left: 0px;
            top: 0px;
            overflow: visible;
          }
          #btn_Network {
            position: absolute;
            width: 310px;
            height: 310px;
            left: 236px;
            top: 504px;
            overflow: visible;
          }
          #Group_828 {
            position: absolute;
            width: 613px;
            height: 136px;
            left: 94px;
            top: 697px;
            overflow: visible;
          }
          #Group_831 {
            position: absolute;
            width: 722px;
            height: 519px;
            left: 192px;
            top: 916px;
            overflow: visible;
          }
          #If_you_wish_to_report_bugs_or_ {
            left: 174px;
            top: 1458px;
            position: absolute;
            overflow: visible;
            width: 453px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -4px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: rgba(23, 26, 28, 1);
          }
          #Welcome_to_myG_n {
            left: 277px;
            top: 198px;
            position: absolute;
            overflow: visible;
            width: 248px;
            white-space: nowrap;
            text-align: left;
            font-family: Montserrat Alternates;
            font-style: normal;
            font-weight: bold;
            font-size: 26px;
            color: rgba(255, 255, 255, 1);
          }
          #This_will_most_likely_be_the_f {
            left: 166px;
            top: 259px;
            position: absolute;
            overflow: visible;
            width: 469px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -2px;
            text-align: center;
            font-family: Montserrat Alternates;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
          }
          #Your_key_is_below_and_it_will_ {
            left: 264px;
            top: 378px;
            position: absolute;
            overflow: visible;
            width: 273px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -2px;
            text-align: center;
            font-family: Montserrat Alternates;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
          }
          #You_also_get_three_invite_code {
            left: 221px;
            top: 636px;
            position: absolute;
            overflow: visible;
            width: 359px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -5px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            color: rgba(23, 26, 28, 1);
          }
          #Code_1 {
            left: 144px;
            top: 732px;
            position: absolute;
            overflow: visible;
            width: 71px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -1px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
          }
          #Code_2 {
            left: 362.5px;
            top: 732px;
            position: absolute;
            overflow: visible;
            width: 75px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -1px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
          }
          #Code_3 {
            left: 584.5px;
            top: 732px;
            position: absolute;
            overflow: visible;
            width: 75px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -1px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
          }
          #Wait_Theres_more {
            left: 262px;
            top: 583px;
            position: absolute;
            overflow: visible;
            width: 277px;
            white-space: nowrap;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            color: rgba(23, 26, 28, 1);
          }
          #TIP_1 {
            left: 94px;
            top: 1034px;
            position: absolute;
            overflow: visible;
            width: 296px;
            white-space: nowrap;
            text-align: left;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            color: rgba(23, 26, 28, 1);
          }
          #GoodIZ1FEQb {
            left: 127px;
            top: 773px;
            position: absolute;
            overflow: visible;
            width: 71px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -5px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 10px;
            color: rgba(231, 187, 48, 1);
          }
          #GoodIZ1FEQb_x {
            left: 347.5px;
            top: 773px;
            position: absolute;
            overflow: visible;
            width: 71px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -5px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 10px;
            color: rgba(231, 187, 48, 1);
          }
          #GoodIZ1FEQb_y {
            left: 569.5px;
            top: 773px;
            position: absolute;
            overflow: visible;
            width: 71px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -5px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 10px;
            color: rgba(231, 187, 48, 1);
          }
          #Everytime_you_log_off_you_key_ {
            left: 94px;
            top: 1078px;
            position: absolute;
            overflow: visible;
            width: 262px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -4px;
            text-align: left;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: rgba(23, 26, 28, 1);
          }
          #Group_660 {
            position: absolute;
            width: 464px;
            height: 55px;
            left: 168px;
            top: 883px;
            overflow: visible;
          }
          #myGs_vision_is_to_improve_game {
            left: 0px;
            top: 0px;
            position: absolute;
            overflow: visible;
            width: 465px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -4px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: rgba(23, 26, 28, 1);
          }
          #Update_your_Profile_createjoin {
            left: 275px;
            top: 1371px;
            position: absolute;
            overflow: visible;
            width: 251px;
            white-space: nowrap;
            line-height: 20px;
            margin-top: -4px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            color: rgba(23, 26, 28, 1);
          }
          #Group_830 {
            position: absolute;
            width: 800px;
            height: 230px;
            left: 0px;
            top: 1521px;
            overflow: visible;
          }
          #newpassword {
            top: 448px;
            position: absolute;
            overflow: visible;
            width: 100%;
            white-space: nowrap;
            text-align: center;
            font-family: Montserrat Alternates;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            color: rgba(23, 26, 28, 1);
          }
        </style>
      </head>
      <body>
        <div id="Welcome_to_myG">
          <img
            id="Group_827"
            src="https://myg-marketing.s3.amazonaws.com/welcome-email/Group_827.jpg"
          />

          <img
            id="btn_Network"
            src="https://myg-marketing.s3.amazonaws.com/welcome-email/btn_Network.png"
          />

          <img
            id="Group_828"
            src="https://myg-marketing.s3.amazonaws.com/welcome-email/Group_828.png"
          />

          <img
            id="Group_831"
            src="https://myg-marketing.s3.amazonaws.com/welcome-email/Group_831.jpg"
          />

          <div id="If_you_wish_to_report_bugs_or_">
            <span>If you wish to report bugs or make feature requests you </span
            ><span
              style="font-style:normal;font-weight:bold;color:rgba(0,0,0,1);text-decoration:underline;"
              >do it here</span
            ><span>. </span>
          </div>
          <div id="Welcome_to_myG_n">
            <span>Welcome to myG!</span>
          </div>
          <div id="This_will_most_likely_be_the_f">
            <span
              >This will most likely be the first and last email from myG.
              <br />That's because email is turned off by default. <br />Of course
              you can update this in the </span
            ><span style="font-style:normal;font-weight:bold;">Settings</span
            ><span>.</span>
          </div>
          <div id="Your_key_is_below_and_it_will_">
            <span>Your key is below and it will be<br />used to access your</span
            ><span style="font-style:normal;font-weight:bold;"> Chat History</span>
          </div>
          <div id="You_also_get_three_invite_code">
            <span>You also </span
            ><span style="font-style:normal;font-weight:bold;"
              >get three invite codes for your friends</span
            ><span>. They expire in 14 days!</span>
          </div>
          <div id="Code_1">
            <span>Code #1</span>
          </div>
          <div id="Code_2">
            <span>Code #2</span>
          </div>
          <div id="Code_3">
            <span>Code #3</span>
          </div>
          <div id="Wait_Theres_more">
            <span>Wait! There's more</span>
          </div>
          <div id="TIP_1">
            <span>TIP #1</span>
          </div>
          <div id="GoodIZ1FEQb">
            <span>GoodIZ1FEQb</span>
          </div>
          <div id="GoodIZ1FEQb_x">
            <span>GoodIZ1FEQb</span>
          </div>
          <div id="GoodIZ1FEQb_y">
            <span>GoodIZ1FEQb</span>
          </div>
          <div id="Everytime_you_log_off_you_key_">
            <span
              >Everytime you log off, you key is cleared <br />and when you log back
              in, you will need <br />to RE-ENTER this key. Failure to do so will
              <br />disable chat and if a new key is generated, <br />you will lose
              all your previous chat history.<br /><br />This is a true End to End
              encryption chat, <br />meaning myG doesn't have any visibility
              <br />of your messages or your key. Therefore <br />we cannot retrieve
              messages or key if <br />they are lost.</span
            >
          </div>
          <div id="Group_660">
            <div id="myGs_vision_is_to_improve_game">
              <span
                >myG's vision is to improve gamers performance, knowledge and
                experience <br />and we're going to do that by becoming a kick ass
                gaming platform, <br />allowing gamers to connect, share and
                improve.</span
              >
            </div>
          </div>
          <div id="Update_your_Profile_createjoin">
            <span
              >Update your Profile, create/join games, <br />reach out to other
              gamers!</span
            >
          </div>
          <img
            id="Group_830"
            src="https://myg-marketing.s3.amazonaws.com/welcome-email/Group_830.png"
          />

          <div id="newpassword">
            <span>newpassword</span>
          </div>
        </div>
      </body>
    </html>


    `
    return body
  }
}

module.exports = EmailBodyController
