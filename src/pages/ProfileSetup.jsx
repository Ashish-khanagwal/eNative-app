import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import BadgeIcon from '../components/BadgeIcon'

export default function ProfileSetup() {
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSetup = async () => {
    if (!displayName.trim()) return setError('Please enter a display name')
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const enumber = 'eN' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2,5).toUpperCase()
      const { error } = await supabase.from('profiles').upsert({
        user_id: user.id,
        full_name: displayName.trim(),
        enumber,
        is_verified: false,
        updated_at: new Date().toISOString()
      })
      if (error) throw error
      navigate('/contacts')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#050507',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:"'Exo 2',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700;800&family=Exo+2:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');`}</style>

      <div style={{width:'100%',maxWidth:'400px'}}>
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'14px',background:'linear-gradient(135deg,#c084fc,#60d8fa)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Rajdhani,sans-serif',fontWeight:'800',fontSize:'22px',color:'#fff',margin:'0 auto 16px',boxShadow:'0 0 32px rgba(192,132,252,0.25)'}}>en</div>
          <div style={{fontFamily:'Rajdhani,sans-serif',fontWeight:'800',fontSize:'1.4rem',color:'rgba(255,255,255,0.93)',marginBottom:'6px'}}>Set up your Native ID</div>
          <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'10px',letterSpacing:'0.2em',color:'rgba(255,255,255,0.25)'}}>ONE TIME ONLY · PERMANENT</div>
        </div>

        {/* Founder Badge Preview */}
        <div style={{background:'#08090d',border:'1px solid rgba(192,132,252,0.15)',borderRadius:'16px',padding:'20px',marginBottom:'24px',display:'flex',alignItems:'center',gap:'14px'}}>
          <BadgeIcon type="founder" size={20} />
          <div>
            <div style={{fontFamily:'Rajdhani,sans-serif',fontWeight:'700',fontSize:'0.95rem',color:'#c084fc',marginBottom:'2px'}}>Founder eNative</div>
            <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.1em'}}>SLOT #1 OF 1,000 · PERMANENT ID</div>
          </div>
        </div>

        {/* Display Name */}
        <div style={{marginBottom:'12px'}}>
          <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'9px',letterSpacing:'0.2em',color:'rgba(255,255,255,0.3)',marginBottom:'8px'}}>DISPLAY NAME</div>
          <input
            placeholder="How should we call you?"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            style={{width:'100%',padding:'14px 16px',background:'#0c0d12',border:'1px solid #1a1a24',borderRadius:'12px',color:'rgba(255,255,255,0.93)',fontFamily:"'Exo 2',sans-serif",fontSize:'0.9rem',outline:'none'}}
          />
        </div>

        {error && <div style={{color:'#ff5f7e',fontSize:'0.78rem',marginBottom:'12px',textAlign:'center'}}>{error}</div>}

        <button onClick={handleSetup} disabled={loading} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,#c084fc,#60d8fa)',border:'none',borderRadius:'12px',color:'#050507',fontFamily:'Rajdhani,sans-serif',fontWeight:'700',fontSize:'1rem',letterSpacing:'0.08em',cursor:'pointer',opacity:loading?0.6:1}}>
          {loading ? 'SETTING UP...' : 'CLAIM MY ENATIVE ID'}
        </button>

        <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'9px',letterSpacing:'0.1em',color:'rgba(255,255,255,0.15)',textAlign:'center',marginTop:'16px',lineHeight:'1.8'}}>
          Your eNumber will be generated automatically.<br/>This cannot be changed after setup.
        </div>
      </div>
    </div>
  )
}
