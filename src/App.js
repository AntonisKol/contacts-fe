import './App.css';
import Contacts from  './pages/Contacts'
import Auth from  './pages/Auth'
import GetContact from './pages/GetContact'
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom'
 
function App() {
  
 return (
  <>
  <NavBar/>
  <Switch>
    <Route path="/auth">
      <Auth />
    </Route>
    <Route path="/contacts">
      <Contacts />
    </Route>
    <Route path="/get-contact">
      <GetContact />
    </Route>
    <Route path="/">
      <Auth />
    </Route>
  </Switch>
  </>
  );
}
export default App;

