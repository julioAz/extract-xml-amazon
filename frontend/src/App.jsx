import './App.css'
import LinkForm from './LinkForm'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '40px'
    }} className="App">
      <img
       style={{
        maxWidth: '600px',
        margin: '24px auto'
       }}
       src="/src/assets/logo.png" alt="" />
      <h1 
        className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        Extrador de XML Heinz
      </h1>
      <LinkForm />
    </div>
  )
}

export default App
