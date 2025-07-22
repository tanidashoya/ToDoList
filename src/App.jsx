import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Memo from './pages/Memo.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {

//returnの中はbodyの中に入る
  return (
    <>
      <BrowserRouter>
      {/* どのページでもヘッダーを表示 */}
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/memo" element={<Memo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
