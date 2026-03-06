import { useAuth } from './hooks/useAuth'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#00FF87'}}>Loading eNative...</div>

  return (
    <div style={{padding:'40px',textAlign:'center'}}>
      <h1 style={{fontFamily:'sans-serif',fontSize:'2rem',marginBottom:'16px'}}>
        <span style={{color:'#00FF87'}}>e</span>Native
      </h1>
      {user ? (
        <p style={{color:'#00FF87'}}>✓ Logged in as {user.email}</p>
      ) : (
        <p style={{color:'rgba(244,242,238,0.5)'}}>Welcome to eNative — Your Permanent Native ID</p>
      )}
    </div>
  )
}
