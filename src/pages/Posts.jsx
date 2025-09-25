import { useEffect, useState } from "react"
import useApi from "../hooks/useApi"

export default function Posts() {
  const { request } = useApi()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  async function loadPosts() {
    const res = await request("/posts")
    if (res.ok) setPosts(res.data)
  }

  useEffect(() => { loadPosts() }, [])

  async function addPost(e) {
    e.preventDefault()
    if (!title || !body) return
    await request("/posts", { method: "POST", body: JSON.stringify({ title, body }) })
    setTitle(""); setBody("")
    loadPosts()
  }

  async function deletePost(id) {
    await request(`/posts/${id}`, { method: "DELETE" })
    loadPosts()
  }

  return (
    <div className="page">
      <div className="recipe-box">
        <h2>🍳 Share Your Recipe</h2>
      <form onSubmit={addPost}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body" />
        <button>Add Post</button>
      </form>
      {posts.map(p => (
        <div key={p.id} style={{border:"1px solid #ddd", padding:"10px", margin:"5px 0"}}>
          <h4>{p.title}</h4>
          <p>{p.body}</p>
          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))}
     </div>
    </div>
  )
}
