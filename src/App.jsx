import './App.css'
import { SelectedCardProvider } from './Context/Context'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/login/login';
import Register from './screens/register/register';
import TaskManager from './screens/taskManager/taskManager';


function App() {
  return (
    <SelectedCardProvider>
      <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/task' element={<TaskManager/>} />
          <Route path='/*' element={<>
            <p>
              The path you are looking for is not available
            </p>
          </>} />
        </Routes>
        </HashRouter>
      </>
    </SelectedCardProvider>
  )
}

export default App
