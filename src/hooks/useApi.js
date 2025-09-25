import { useAuth } from "../context/AuthContext"

export default function useApi() {
  const { user } = useAuth()

  async function request(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) }
    const res = await fetch(`http://localhost:4000${path}`, { ...options, headers })
    const data = await res.json()
    return { ok: res.ok, data }
  }

  return { request }
}
