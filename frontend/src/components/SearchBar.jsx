import { useState } from 'react'

function SearchIcon() {
  return (
    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  function handleSearch() {
    if (input.trim()) onSearch(input.trim())
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        placeholder="Enter a GitHub username..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoFocus
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>
    </div>
  )
}
