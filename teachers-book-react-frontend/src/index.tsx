import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import Lists from './Lists/Lists';
import Pupils from './Pupils/Pupils';
import registerServiceWorker from './registerServiceWorker';
import Settings from './Settings/Settings';
import './styles/index.css';
import './styles/navigation.css';

ReactDOM.render(
  <Router key="routing">
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/pupils" component={Pupils} />
      <Route path="/settings" component={Settings} />
      <Route path="/lists" component={Lists} />
    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();