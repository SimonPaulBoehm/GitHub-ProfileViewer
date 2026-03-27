import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'
import { useGitHub } from './useGitHub.js'
import './App.css'

export default function App() {
  const { profile, repos, loading, error, search } = useGitHub()

  return (
    <main className="container">
      <header className="app-header">
        <h1 className="app-title">
          <span>GitHub</span> Profile Viewer
        </h1>
        <p className="app-subtitle">Search any GitHub user</p>
      </header>

      <SearchBar onSearch={search} loading={loading} />

      {loading && <p className="loading">Fetching profile...</p>}
      {error && <p className="error">{error}</p>}
      {profile && <ProfileCard profile={profile} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </main>
  )
}
