import './App.css';
import Verification from './Components/Verification';
import Chat from './Components/Chat';
import HomeLanding from './Components/HomeLanding';
import SideBar from './Components/SideBar';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useAuth} from './hooks/use-auth';




function App() {
  const auth = useAuth()

  const [showModal, setShowModal] = useState(false)

  return (  
    <>
    
    {
      !auth.user?<Verification/>:
    <div className="App grid place-items-center bg-gray min-h-screen ">
        <section className = 'app-container h-92vh w-90vw md:w-95vw lg:w-92vw bg-white flex rounded-xl shadow-lg'>
        <SideBar auth = {auth} showModal = {showModal} setShowModal = {setShowModal} />
            <Switch>
            <Route path = '/rooms/:id'>
                <Chat/>
            </Route>
            <Route path = '/'>
                <HomeLanding/>
            </Route>
              </Switch>
        </section>
        
    </div>}
    {/* <Home showHero = {showHero} setShowHero = {setShowHero} /> */}
    </>
  );
}

export default App;
