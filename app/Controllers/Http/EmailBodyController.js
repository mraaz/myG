'use strict'

class EmailBodyController {
  async welcome_body_no_codes(pin, alias) {
    const body = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
            <style type="text/css">
              /* Google font import Lato */
    
              @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap');
    
              /* Outlook link fix */
              #outlook a {
                padding: 0;
              }
    
              /* Hotmail background & line height fixes */
              .ExternalClass {
                width: 100% !important;
              }
    
              .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
    
            /* Image borders & formatting */
            img {
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }
    
              a img {
                border: none;
              }
    
              /* Re-style iPhone automatic links (eg. phone numbers) */
              .appleLinksGrey a {
                color: #919191 !important;
                text-decoration: none !important;
              }
    
              /* Hotmail symbol fix for mobile devices */
              .ExternalClass img[class^="Emoji"] {
                width: 10px !important;
                height: 10px !important;
                display: inline !important;
              }
    
              /* Button hover colour change */
              .CTA:hover {
                background-color: #5fdbc4 !important;
              }
    
              @media screen and (max-width: 640px) {
                .mobilefullwidth {
                  width: 100% !important;
                  height: auto !important;
                }
    
                .logo {
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                }
    
                .h1 {
                  font-size: 36px !important;
                  line-height: 48px !important;
                  padding-right: 30px !important;
                  padding-left: 30px !important;
                  padding-top: 30px !important;
                }
    
                .h2 {
                  font-size: 18px !important;
                  line-height: 27px !important;
                  padding-right: 30px !important;
                  padding-left: 30px !important;
                }
    
                .p {
                  font-size: 16px !important;
                  line-height: 28px !important;
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                  padding-bottom: 30px !important;
                }
    
                .CTA_wrap {
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                  padding-bottom: 30px !important;
                }
    
                .footer {
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                }
    
                .number_wrap {
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                }
    
                .unsubscribe {
                  padding-left: 30px !important;
                  padding-right: 30px !important;
                }
              }
            </style>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
    
          <body
            style="padding:0; margin:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:100%; background-color:#e8e8e8; font-family: 'Lato', sans-serif; font-size:16px; color:#919191"
          >
            <!--[if mso]>
              <style type="text/css">
                body,
                table,
                td {
                  font-family: Arial, Helvetica, sans-serif !important;
                }
              </style>
            <![endif]-->
    
            <!-- // FULL EMAIL -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <!-- // LEFT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
                <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
                <!-- LEFT SPACER CELL // -->
    
                <!-- // MAIN CONTENT CELL -->
                <td align="center" width="600" bgcolor="#FFFFFF">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <!-- Top -->
                      <tr>
                        <td>
                          <img
                            src="https://myG.gg/welcome-email/Welcome-to-myG_3_01.jpg"
                            align="left"
                            style="display:block; margin:0px;"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          height="39"
                          width="600"
                          align="left"
                          style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_02.jpg')"
                        >
                          <p
                            style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 20px;color: rgba(255, 255, 255, 1);margin: 0;text-align: center;"
                          >
                            Welcome ${alias} to myG!
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          height="71"
                          width="600"
                          align="left"
                          style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_03.jpg')"
                        >
                          <p
                            style="width: 352px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:10px;text-align: center;"
                          >
                            Glad to have you onboard mate! Have a look around, try to find some friends, use the Find match feature to get better games.
                          <br />Also if you wish, update your email <a style="text-decoration:none;color: #FFFFFF" href="https://myG.gg/mySettings"><b>settings</b> here</a>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="https://myG.gg/welcome-email/Welcome-to-myG_3_04.jpg"
                            align="left"
                            style="display:block; margin:0px;"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          height="62"
                          width="600"
                          align="left"
                          style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_05.jpg')"
                        >
                          <p
                            style="width: 280px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:5px;text-align: center;"
                          >
                            myG has end to end encryption for all chats (groups + 1:1).
                            Your chat password is below and it is the only way to gain access to your
                            <b>Chat History</b>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          height="117"
                          width="600"
                          align="left"
                          style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_06.jpg');background-repeat: no-repeat;"
                        >
                          <p
                            style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 16px;color: #000000;margin: 0 auto;padding-top: 26px;text-align: center;"
                          >
                            <b>${pin}</b>
                          </p>
                        </td>
                      </tr>
                      <td
                        height="33"
                        width="600"
                        align="left"
                        style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_07.jpg');background-repeat: no-repeat;"
                      >
                      </td>
                    </tbody>
                  </table>
    
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td
                        height="136"
                        width="600"
                        align="center"
                        style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_13.jpg');background-repeat: no-repeat;vertical-align: top;"
                      >
                        <p
                          style="width: 468px;text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 24px 0px 0px 34px;"
                        >
                          myG's vision is to improve gamers performance, knowledge and
                          experience and we're going to do that by becoming a kick ass
                          gaming platform, allowing gamers to connect, share and
                          improve.
                        </p>
                      </td>
                    </tr>
                  </table>
    
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td
                        height="273"
                        width="267"
                        align="left"
                        style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_14.jpg');background-repeat: no-repeat;"
                      >
                        <p
                          style="text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 24px;color: #000000;margin: 0px 0px 0px 24px;"
                        >
                          #TIP 1
                        </p>
                        <p
                          style="text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 10px 0px 0px 24px;line-height: 16px;"
                        >
                          Everytime you log off, your chat password is cleared and when you log
                          back in, you will need to RE-ENTER this chat password. Failure to do so
                          will disable chat and if a new chat password is generated, you will lose
                          all your previous chat history. This is a true End to End
                          encryption chat, meaning myG doesn't have any visibility of
                          your messages or your chat password. Therefore we cannot retrieve
                          messages or chat password if they are lost.
                        </p>
                      </td>
                      <td>
                        <img
                          src="https://myG.gg/welcome-email/Welcome-to-myG_3_15.jpg"
                          align="left"
                          style="display:block; margin:0px;"
                        />
                      </td>
                    </tr>
                  </table>
    
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td
                        height="118"
                        width="600"
                        align="left"
                        style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_16.jpg');background-repeat: no-repeat; vertical-align:middle;"
                      >
                        <a style="text-decoration:none" href="https://myG.gg">
                          <p
                            style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 12px;color: #000000;margin: 14px 0px 0px 0px;"
                          >
                            Update your Profile, create/join games, <br />reach out to
                            other gamers!
                          </p>
                        </a>
                      </td>
                    </tr>
                  </table>
    
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    
                    <tr>
                      <td
                        height="54"
                        width="600"
                        align="left"
                        style="margin:0px;background-color: #fff; vertical-align:top;"
                      >
                      <a style="text-decoration:none" href="https://github.com/mraaz/myG.gg">
                        <p
                          style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 0 auto;"
                        >
                          If you wish to report bugs or make feature requests you
                          <b>can do this here.</b>
                        </p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        height="172"
                        width="600"
                        align="left"
                        style="margin:0px;padding: 20px 0px 0px 30px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_18.jpg');background-color: #1e2327;background-repeat: no-repeat; vertical-align:top; line-height: 18px;"
                      >
                        <a style="text-decoration:none" href="https://myG.gg">
                          <p
                            style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-size:16px;font-weight: 700;color: rgba(255, 255, 255, 1)"
                          >
                            For more information, please visit <b>myG</b>.
                          </p>
                        </a>
                        <p
                          style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);"
                        >
                          Please do not reply to this email as this address is not
                          monitored.<br />
                          This email was sent by: myG LLC, Brisbane, Australia, 4000.<br />
                          Manage all email preferences within <a href="https://myg.gg/?at=notifications&submenu=6" style="color:white;text-decoration: none;"> <b>myG Settings</b> </a>
                          <br /><a href="https://myg.gg/terms" style="color:white;"><b>Terms of Use</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://myg.gg/privacy_policy" style="color:white;">Privacy Policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="mailto:levelup@myG.gg?subject=Email - Contact us" style="color:white;">Contact Us</a></b> <br />
                          © 2021 myG LLC. All Rights Reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
    
                <!-- // MAIN CONTENT CELL -->
    
                <!-- // RIGHT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
                <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
                <!-- RIGHT SPACER CELL // -->
              </tr>
            </table>
    
            <!-- FULL EMAIL // -->
          </body>
        </html>
    
        `
    return body
  }
  async welcome_body(pin, alias, code_1, code_2, code_3) {
    const body = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style type="text/css">
          /* Google font import Lato */

          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap');

          /* Outlook link fix */
          #outlook a {
            padding: 0;
          }

          /* Hotmail background & line height fixes */
          .ExternalClass {
            width: 100% !important;
          }

          .ExternalClass,
    	.ExternalClass p,
    	.ExternalClass span,
    	.ExternalClass font,

    	/* Image borders & formatting */
    	img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          a img {
            border: none;
          }

          /* Re-style iPhone automatic links (eg. phone numbers) */
          .appleLinksGrey a {
            color: #919191 !important;
            text-decoration: none !important;
          }

          /* Hotmail symbol fix for mobile devices */
          .ExternalClass img[class^="Emoji"] {
            width: 10px !important;
            height: 10px !important;
            display: inline !important;
          }

          /* Button hover colour change */
          .CTA:hover {
            background-color: #5fdbc4 !important;
          }

          @media screen and (max-width: 640px) {
            .mobilefullwidth {
              width: 100% !important;
              height: auto !important;
            }

            .logo {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .h1 {
              font-size: 36px !important;
              line-height: 48px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
              padding-top: 30px !important;
            }

            .h2 {
              font-size: 18px !important;
              line-height: 27px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
            }

            .p {
              font-size: 16px !important;
              line-height: 28px !important;
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .CTA_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .footer {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .number_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .unsubscribe {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }
          }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        style="padding:0; margin:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:100%; background-color:#e8e8e8; font-family: 'Lato', sans-serif; font-size:16px; color:#919191"
      >
        <!--[if mso]>
          <style type="text/css">
            body,
            table,
            td {
              font-family: Arial, Helvetica, sans-serif !important;
            }
          </style>
        <![endif]-->

        <!-- // FULL EMAIL -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <!-- // LEFT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- LEFT SPACER CELL // -->

            <!-- // MAIN CONTENT CELL -->
            <td align="center" width="600" bgcolor="#FFFFFF">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <!-- Top -->
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_01.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="39"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_02.jpg')"
                    >
                      <p
                        style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 20px;color: rgba(255, 255, 255, 1);margin: 0;text-align: center;"
                      >
                        Welcome ${alias} to myG!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="71"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_03.jpg')"
                    >
                      <p
                        style="width: 352px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:10px;text-align: center;"
                      >
                        Glad to have you onboard mate! Have a look around, try to find some friends, use the Find match feature to get better games.
                      <br />Also if you wish, update your email <a style="text-decoration:none;color: #FFFFFF" href="https://myG.gg/mySettings"><b>settings</b> here</a>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_04.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="62"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_05.jpg')"
                    >
                      <p
                        style="width: 280px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:5px;text-align: center;"
                      >
                        myG has end to end encryption for all chats (groups + 1:1).
                        Your chat password is below and it is the only way to gain access to your
                        <b>Chat History</b>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="117"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_06.jpg');background-repeat: no-repeat;"
                    >
                      <p
                        style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 16px;color: #000000;margin: 0 auto;padding-top: 26px;text-align: center;"
                      >
                        <b>${pin}</b>
                      </p>
                    </td>
                  </tr>
                  <td
                    height="33"
                    width="600"
                    align="left"
                    style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_07.jpg');background-repeat: no-repeat;"
                  >
                    <p
                      style="font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 20px;color: #000000;margin: 0 auto;padding-top: 5px;text-align: center;"
                    >
                      <b>Wait! There's more</b>
                    </p>
                  </td>
                  <tr>
                    <td
                      height="29"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_08.jpg');background-repeat: no-repeat;"
                    >
                      <p
                        style="font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 0 auto;padding-top: 5px;text-align: center;"
                      >
                        You also get three invite codes for your friends. They
                        expire in 14 days!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_09.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="600px" border="0" cellspacing="0" cellpadding="0" align="left">
                <tr>
                  <td
                    height="76"
                    width="210"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_10.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 300;font-size: 10px;color: rgba(231, 187, 48, 1);margin: 14px 0px 10px 50px;"
                    >
                      <b>${code_1}</b>
                    </p>
                  </td>
                  <td
                    height="76"
                    width="190"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_11.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 300;font-size: 10px;color: rgba(231, 187, 48, 1);margin: 14px 0px 0px 32px;"
                    >
                      <b>${code_2}</b>
                    </p>
                  </td>
                  <td
                    height="76"
                    width="200"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_12.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 300;font-size: 10px;color: rgba(231, 187, 48, 1);margin: 14px 0px 0px 34px;"
                    >
                      <b>${code_3}</b>
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="136"
                    width="600"
                    align="center"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_13.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="width: 468px;text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 24px 0px 0px 34px;"
                    >
                      myG's vision is to improve gamers performance, knowledge and
                      experience and we're going to do that by becoming a kick ass
                      gaming platform, allowing gamers to connect, share and
                      improve.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="273"
                    width="267"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_14.jpg');background-repeat: no-repeat;"
                  >
                    <p
                      style="text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 24px;color: #000000;margin: 0px 0px 0px 24px;"
                    >
                      #TIP 1
                    </p>
                    <p
                      style="text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 10px 0px 0px 24px;line-height: 16px;"
                    >
                      Everytime you log off, your chat password is cleared and when you log
                      back in, you will need to RE-ENTER this chat password. Failure to do so
                      will disable chat and if a new chat password is generated, you will lose
                      all your previous chat history. This is a true End to End
                      encryption chat, meaning myG doesn't have any visibility of
                      your messages or your chat password. Therefore we cannot retrieve
                      messages or chat password if they are lost.
                    </p>
                  </td>
                  <td>
                    <img
                      src="https://myG.gg/welcome-email/Welcome-to-myG_3_15.jpg"
                      align="left"
                      style="display:block; margin:0px;"
                    />
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="118"
                    width="600"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_16.jpg');background-repeat: no-repeat; vertical-align:middle;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 12px;color: #000000;margin: 14px 0px 0px 0px;"
                      >
                        Update your Profile, create/join games, <br />reach out to
                        other gamers!
                      </p>
                    </a>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">

                <tr>
                  <td
                    height="54"
                    width="600"
                    align="left"
                    style="margin:0px;background-color: #fff; vertical-align:top;"
                  >
                  <a style="text-decoration:none" href="https://github.com/mraaz/myG.gg">
                    <p
                      style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 0 auto;"
                    >
                      If you wish to report bugs or make feature requests you
                      <b>can do this here.</b>
                    </p>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    height="172"
                    width="600"
                    align="left"
                    style="margin:0px;padding: 20px 0px 0px 30px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_18.jpg');background-color: #1e2327;background-repeat: no-repeat; vertical-align:top; line-height: 18px;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-size:16px;font-weight: 700;color: rgba(255, 255, 255, 1)"
                      >
                        For more information, please visit <b>myG</b>.
                      </p>
                    </a>
                    <p
                      style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);"
                    >
                      Please do not reply to this email as this address is not
                      monitored.<br />
                      This email was sent by: myG LLC, Brisbane, Australia, 4000.<br />
                      Manage all email preferences within <a href="https://myg.gg/?at=notifications&submenu=6" style="color:white;text-decoration: none;"> <b>myG Settings</b> </a>
                      <br /><a href="https://myg.gg/terms" style="color:white;"><b>Terms of Use</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://myg.gg/privacy_policy" style="color:white;">Privacy Policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="mailto:levelup@myG.gg?subject=Email - Contact us" style="color:white;">Contact Us</a></b> <br />
                      © 2021 myG LLC. All Rights Reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>

            <!-- // MAIN CONTENT CELL -->

            <!-- // RIGHT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- RIGHT SPACER CELL // -->
          </tr>
        </table>

        <!-- FULL EMAIL // -->
      </body>
    </html>

    `
    return body
  }

  async summary_body(alias, no_of_approvals, no_of_alerts, no_of_chats) {
    const body = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style type="text/css">
          /* Google font import Lato */

          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap');

          /* Outlook link fix */
          #outlook a {
            padding: 0;
          }

          /* Hotmail background & line height fixes */
          .ExternalClass {
            width: 100% !important;
          }

          .ExternalClass,
    	.ExternalClass p,
    	.ExternalClass span,
    	.ExternalClass font,

    	/* Image borders & formatting */
    	img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          a img {
            border: none;
          }

          /* Re-style iPhone automatic links (eg. phone numbers) */
          .appleLinksGrey a {
            color: #919191 !important;
            text-decoration: none !important;
          }

          /* Hotmail symbol fix for mobile devices */
          .ExternalClass img[class^="Emoji"] {
            width: 10px !important;
            height: 10px !important;
            display: inline !important;
          }

          /* Button hover colour change */
          .CTA:hover {
            background-color: #5fdbc4 !important;
          }

          @media screen and (max-width: 640px) {
            .mobilefullwidth {
              width: 100% !important;
              height: auto !important;
            }

            .logo {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .h1 {
              font-size: 36px !important;
              line-height: 48px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
              padding-top: 30px !important;
            }

            .h2 {
              font-size: 18px !important;
              line-height: 27px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
            }

            .p {
              font-size: 16px !important;
              line-height: 28px !important;
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .CTA_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .footer {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .number_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .unsubscribe {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }
          }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        style="padding:0; margin:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:100%; background-color:#e8e8e8; font-family: 'Lato', sans-serif; font-size:16px; color:#919191"
      >
        <!--[if mso]>
          <style type="text/css">
            body,
            table,
            td {
              font-family: Arial, Helvetica, sans-serif !important;
            }
          </style>
        <![endif]-->

        <!-- // FULL EMAIL -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <!-- // LEFT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- LEFT SPACER CELL // -->

            <!-- // MAIN CONTENT CELL -->
            <td align="center" width="600" bgcolor="#FFFFFF">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <!-- Top -->
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_01.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="39"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_02.jpg')"
                    >
                      <p
                        style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 20px;color: rgba(255, 255, 255, 1);margin: 0;text-align: center;"
                      >
                        ${alias} here is what you've missed in myG
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="71"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_03.jpg')"
                    >
                      <p
                        style="width: 352px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:10px;text-align: center;"
                      >
                        <a style="text-decoration:none; color: #FFFFFF" href="https://myG.gg/?at=notifications&submenu=1"> Number of unread Approvals: ${no_of_approvals}<br /> </a>
                        <a style="text-decoration:none; color: #FFFFFF" href="https://myG.gg/?at=notifications&submenu=2"> Number of unread Alerts: ${no_of_alerts}<br /> </a>
                        <a style="text-decoration:none; color: #FFFFFF" href="https://myG.gg/?at=notifications&submenu=3"> Number of unread Chats: ${no_of_chats}<br /> </a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_04.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="62"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_05.jpg')"
                    >
                      <p
                        style="width: 280px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:5px;text-align: center;"
                      >
                        myG sends out daily or weekly summary emails. You can always update your email preferences in the
                        <a style="text-decoration:none; color: #FFFFFF" href="https://myg.gg/?at=notifications&submenu=6"> <b>settings</b>. </a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                  </tr>
                  <td
                    height="33"
                    width="600"
                    align="left"
                    style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_07.jpg');background-repeat: no-repeat;"
                  >
                    <p
                      style="font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 20px;color: #000000;margin: 0 auto;padding-top: 5px;text-align: center;"
                    >
                    </p>
                  </td>
                </tbody>
              </table>

              <table width="600px" border="0" cellspacing="0" cellpadding="0" align="left">
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="136"
                    width="600"
                    align="center"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_13.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="width: 468px;text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 24px 0px 0px 34px;"
                    >
                      myG's vision is to improve gamers performance, knowledge and
                      experience and we're going to do that by becoming a kick ass
                      gaming platform, allowing gamers to connect, share and
                      improve.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>

                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="118"
                    width="600"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_16.jpg');background-repeat: no-repeat; vertical-align:middle;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 12px;color: #000000;margin: 14px 0px 0px 0px;"
                      >
                        Update your Profile, create/join games, <br />reach out to
                        other gamers!
                      </p>
                    </a>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">

                <tr>
                  <td
                    height="54"
                    width="600"
                    align="left"
                    style="margin:0px;background-color: #fff; vertical-align:top;"
                  >
                  <a style="text-decoration:none" href="https://github.com/mraaz/myG.gg">
                    <p
                      style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 0 auto;"
                    >
                      If you wish to report bugs or make feature requests you
                      <b>can do this here.</b>
                    </p>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    height="172"
                    width="600"
                    align="left"
                    style="margin:0px;padding: 20px 0px 0px 30px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_18.jpg');background-color: #1e2327;background-repeat: no-repeat; vertical-align:top; line-height: 18px;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-size:16px;font-weight: 700;color: rgba(255, 255, 255, 1)"
                      >
                        For more information, please visit <b>myG</b>.
                      </p>
                    </a>
                    <p
                      style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);"
                    >
                      Please do not reply to this email as this address is not
                      monitored.<br />
                      This email was sent by: myG LLC, Brisbane, Australia, 4000.<br />
                      Manage all email preferences within <a href="https://myg.gg/?at=notifications&submenu=6" style="color:white;text-decoration: none;"> <b>myG Settings</b> </a>
                      <br /><a href="https://myg.gg/terms" style="color:white;"><b>Terms of Use</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://myg.gg/privacy_policy" style="color:white;">Privacy Policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="mailto:levelup@myG.gg?subject=Email - Contact us" style="color:white;">Contact Us</a></b> <br />
                      © 2021 myG LLC. All Rights Reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>

            <!-- // MAIN CONTENT CELL -->

            <!-- // RIGHT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- RIGHT SPACER CELL // -->
          </tr>
        </table>

        <!-- FULL EMAIL // -->
      </body>
    </html>
    `

    return body
  }

  async encryption_body(pin) {
    const body = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style type="text/css">
          /* Google font import Lato */

          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap');

          /* Outlook link fix */
          #outlook a {
            padding: 0;
          }

          /* Hotmail background & line height fixes */
          .ExternalClass {
            width: 100% !important;
          }

          .ExternalClass,
    	.ExternalClass p,
    	.ExternalClass span,
    	.ExternalClass font,

    	/* Image borders & formatting */
    	img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          a img {
            border: none;
          }

          /* Re-style iPhone automatic links (eg. phone numbers) */
          .appleLinksGrey a {
            color: #919191 !important;
            text-decoration: none !important;
          }

          /* Hotmail symbol fix for mobile devices */
          .ExternalClass img[class^="Emoji"] {
            width: 10px !important;
            height: 10px !important;
            display: inline !important;
          }

          /* Button hover colour change */
          .CTA:hover {
            background-color: #5fdbc4 !important;
          }

          @media screen and (max-width: 640px) {
            .mobilefullwidth {
              width: 100% !important;
              height: auto !important;
            }

            .logo {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .h1 {
              font-size: 36px !important;
              line-height: 48px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
              padding-top: 30px !important;
            }

            .h2 {
              font-size: 18px !important;
              line-height: 27px !important;
              padding-right: 30px !important;
              padding-left: 30px !important;
            }

            .p {
              font-size: 16px !important;
              line-height: 28px !important;
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .CTA_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
              padding-bottom: 30px !important;
            }

            .footer {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .number_wrap {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }

            .unsubscribe {
              padding-left: 30px !important;
              padding-right: 30px !important;
            }
          }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        style="padding:0; margin:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:100%; background-color:#e8e8e8; font-family: 'Lato', sans-serif; font-size:16px; color:#919191"
      >
        <!--[if mso]>
          <style type="text/css">
            body,
            table,
            td {
              font-family: Arial, Helvetica, sans-serif !important;
            }
          </style>
        <![endif]-->

        <!-- // FULL EMAIL -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <!-- // LEFT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- LEFT SPACER CELL // -->

            <!-- // MAIN CONTENT CELL -->
            <td align="center" width="600" bgcolor="#FFFFFF">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <!-- Top -->
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_01.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="39"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_02.jpg')"
                    >
                      <p
                        style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 20px;color: rgba(255, 255, 255, 1);margin: 0;text-align: center;"
                      >
                        Chat password reset for myG
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="71"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_03.jpg')"
                    >
                      <p
                        style="width: 352px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:10px;text-align: center;"
                      >
                        Everytime you log off, your password is cleared and when you log back in, you will need to RE-ENTER this password. Failure to do so will disable chat and if a new password is generated, you will LOSE all your previous chat history.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://myG.gg/welcome-email/Welcome-to-myG_3_04.jpg"
                        align="left"
                        style="display:block; margin:0px;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="62"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_05.jpg')"
                    >
                      <p
                        style="width: 280px;font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);margin: 0 auto; padding-top:5px;text-align: center;"
                      >
                        myG has end to end encryption for all chats (groups + 1:1).
                        Your chat password is below and it is the only way to gain access to your
                        <b>Chat History</b>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="117"
                      width="600"
                      align="left"
                      style="display:block; margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_06.jpg');background-repeat: no-repeat;"
                    >
                      <p
                        style="font-family: 'Montserrat Alternates', sans-serif;font-style: normal;font-weight: 700;font-size: 16px;color: #000000;margin: 0 auto;padding-top: 26px;text-align: center;"
                      >
                        <b>${pin}</b>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="600px" border="0" cellspacing="0" cellpadding="0" align="left">
                <tr>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="136"
                    width="600"
                    align="center"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_13.jpg');background-repeat: no-repeat;vertical-align: top;"
                  >
                    <p
                      style="width: 468px;text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 24px 0px 0px 34px;"
                    >
                      myG's vision is to improve gamers performance, knowledge and
                      experience and we're going to do that by becoming a kick ass
                      gaming platform, allowing gamers to connect, share and
                      improve.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">

              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td
                    height="118"
                    width="600"
                    align="left"
                    style="margin:0px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_16.jpg');background-repeat: no-repeat; vertical-align:middle;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 700;font-size: 12px;color: #000000;margin: 14px 0px 0px 0px;"
                      >
                        Update your Profile, create/join games, <br />reach out to
                        other gamers!
                      </p>
                    </a>
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">

                <tr>
                  <td
                    height="54"
                    width="600"
                    align="left"
                    style="margin:0px;background-color: #fff; vertical-align:top;"
                  >
                  <a style="text-decoration:none" href="https://github.com/mraaz/myG.gg">
                    <p
                      style="text-align: center;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: #000000;margin: 0 auto;"
                    >
                      If you wish to report bugs or make feature requests you
                      <b>can do this here.</b>
                    </p>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    height="172"
                    width="600"
                    align="left"
                    style="margin:0px;padding: 20px 0px 0px 30px;background-image:url('https://myG.gg/welcome-email/Welcome-to-myG_3_18.jpg');background-color: #1e2327;background-repeat: no-repeat; vertical-align:top; line-height: 18px;"
                  >
                    <a style="text-decoration:none" href="https://myG.gg">
                      <p
                        style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-size:16px;font-weight: 700;color: rgba(255, 255, 255, 1)"
                      >
                        For more information, please visit <b>myG</b>.
                      </p>
                    </a>
                    <p
                      style="width:500px;text-align: left;font-family: 'Montserrat', sans-serif;font-style: normal;font-weight: 400;font-size: 12px;color: rgba(255, 255, 255, 1);"
                    >
                      Please do not reply to this email as this address is not
                      monitored.<br />
                      This email was sent by: myG LLC, Brisbane, Australia, 4000.<br />
                      Manage all email preferences within <a href="https://myg.gg/?at=notifications&submenu=6" style="color:white;text-decoration: none;"> <b>myG Settings</b> </a>
                      <br /><a href="https://myg.gg/terms" style="color:white;"><b>Terms of Use</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://myg.gg/privacy_policy" style="color:white;">Privacy Policy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="mailto:levelup@myG.gg?subject=Email - Contact us" style="color:white;">Contact Us</a></b> <br />
                      © 2021 myG LLC. All Rights Reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>

            <!-- // MAIN CONTENT CELL -->

            <!-- // RIGHT SPACER CELL *** MUST HAVE A BACKGROUND COLOUR -->
            <td bgcolor="#EBEBEB" style="font-size:0px">&zwnj;</td>
            <!-- RIGHT SPACER CELL // -->
          </tr>
        </table>

        <!-- FULL EMAIL // -->
      </body>
    </html>
    `
    return body
  }
}

module.exports = EmailBodyController
