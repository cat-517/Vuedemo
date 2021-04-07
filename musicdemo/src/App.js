import './App.css';
import Index from './pages/index'
import Play from './pages/play'
import SongList from './pages/songList'
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* 一级路由的出口和重定向 */}
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/play" component={Play}></Route>
        <Route path="/songlist" component={SongList}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
