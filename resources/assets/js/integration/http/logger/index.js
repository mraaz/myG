import axios from 'axios';

export function logToElasticsearch(type, context, message) {
  const environment = window.location.href.includes('localhost')
    ? 'development'
    : window.location.href.includes('myG.gg')
    ? 'production'
    : 'staging'
  const source = 'frontend';
  const browser = getBrowserInfo();
  const system = getSystemInfo();
  return axios.post('/api/logging', {
    environment,
    type,
    source,
    context,
    browser,
    system,
    message,
  }).then(response => response.data);
}

// https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
function getBrowserInfo() {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])){
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name:'IE',version:(tem[1] || '')};
  }
  if (M[1]=== 'Chrome'){
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
  }
  M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  return `${M[0]} - ${M[1]}`;
};

// https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
function getSystemInfo(){
  if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
  return "Unknown OS";
}
