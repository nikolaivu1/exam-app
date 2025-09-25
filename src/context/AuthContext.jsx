import React, { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  function saveUser(u) {
    setUser(u)
    if (u) localStorage.setItem("user", JSON.stringify(u))
    else localStorage.removeItem("user")
  }

  async function login(username, password) {
    const res = await fetch(`http://localhost:4000/users?username=${username}&password=${password}`)
    const data = await res.json()
    if (data.length === 1) {
      const u = { id: data[0].id, username: data[0].username }
      saveUser(u)
      return { ok: true }
    }
    return { ok: false, error: "Invalid credentials" }
  }

  async function register(username, password) {
    const resCheck = await fetch(`http://localhost:4000/users?username=${username}`)
    if ((await resCheck.json()).length) {
      return { ok: false, error: "Username already exists" }
    }
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      const created = await res.json()
      saveUser(created)
      return { ok: true }
    }
    return { ok: false, error: "Registration failed" }
  }

  function logout() { saveUser(null) }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
