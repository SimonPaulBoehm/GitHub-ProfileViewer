import { useState } from 'react'

// leer in dev, weil der vite proxy das übernimmt — in production wird VITE_API_URL gesetzt
const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function useGitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(username) {
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setProfile(null)
    setRepos([])

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${API_BASE}/github/user/${username}`),
        fetch(`${API_BASE}/github/repos/${username}`)
      ])

      if (!profileRes.ok) {
        const err = await profileRes.json()
        throw new Error(err.error)
      }

      const profileData = await profileRes.json()
      const reposData = await reposRes.json()

      setProfile(profileData)
      setRepos(reposData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { profile, repos, loading, error, search }
}