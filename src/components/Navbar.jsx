import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav style={{padding: "20px", borderBottom: "1px solid #ddd" }}>
      <src:index className="css"></src:index>
      <Link to="/">Home</Link> | <Link to="/posts">Posts</Link> |
      {!user && <Link to="/login"> Login </Link>}
      {!user && <Link to="/register"> Register </Link>}
      {user && <span> Hi, {user.username} </span>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  )
}
