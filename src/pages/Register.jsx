import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    const res = await auth.register(username, password)
    if (res.ok) navigate("/")
    else setError(res.error)
  }

  return (
    <div className="page">
    <form onSubmit={submit}>
      <h3>Register</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Register</button>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
      </div>
  )
}
