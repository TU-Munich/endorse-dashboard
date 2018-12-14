import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import WebFont from 'webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCompass, faPhone, faHandshake, faUser, faUpload, faCloudUploadAlt, faChartLine, faInfo, faSignOutAlt, faLaptop} from '@fortawesome/free-solid-svg-icons'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

library.add(faHome, faCompass, faPhone, faHandshake,faUser, faUpload, faCloudUploadAlt, faChartLine, faInfo, faSignOutAlt, faLaptop);

WebFont.load({
  google: {
    families: ['Quicksand:400, 500, 700, 900', 'Material Icons'],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();