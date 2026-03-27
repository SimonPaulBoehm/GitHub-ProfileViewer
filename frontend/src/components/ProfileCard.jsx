function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function ProfileCard({ profile }) {
  return (
    <div className="profile">
      <div className="profile-avatar-wrap">
        <img src={profile.avatar_url} alt={profile.login} />
      </div>
      <div className="profile-info">
        <h2 className="profile-name">{profile.name || profile.login}</h2>
        <p className="username">@{profile.login}</p>
        {profile.bio && <p className="bio">{profile.bio}</p>}
        <div className="stats">
          <span className="stat-pill">
            <strong>{profile.public_repos}</strong> repos
          </span>
          <span className="stat-pill">
            <strong>{profile.followers}</strong> followers
          </span>
          <span className="stat-pill">
            <strong>{profile.following}</strong> following
          </span>
        </div>
        <a className="gh-link" href={profile.html_url} target="_blank" rel="noreferrer">
          View on GitHub <ExternalLinkIcon />
        </a>
      </div>
    </div>
  )
}
