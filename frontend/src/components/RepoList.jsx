// dieselben farben die GitHub selbst für sprachen verwendet
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Rust:       '#dea584',
  Go:         '#00ADD8',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Ruby:       '#701516',
  Swift:      '#F05138',
  Kotlin:     '#A97BFF',
  Shell:      '#89e051',
  Vue:        '#41b883',
  Svelte:     '#ff3e00',
  PHP:        '#4F5D95',
  Dart:       '#00B4AB',
}

function RepoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, flexShrink: 0 }}>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function RepoList({ repos }) {
  if (repos.length === 0) return null

  return (
    <section>
      <p className="repo-section-label">Repositories</p>
      <ul className="repo-list">
        {repos.map((repo, i) => {
          const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#8b949e') : undefined
          return (
            <li
              key={repo.name}
              className="repo-card"
              style={{
                '--lang-color': langColor,
                animationDelay: `${i * 0.04}s`, // karten nacheinander einblenden statt alle auf einmal
              }}
            >
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                <RepoIcon />
                {repo.name}
              </a>
              <p>{repo.description || 'No description provided.'}</p>
              <div className="repo-meta">
                {repo.language && (
                  <span className="repo-lang">
                    <span className="lang-dot" style={{ background: langColor }} />
                    {repo.language}
                  </span>
                )}
                <span className="repo-stars">
                  <StarIcon />
                  {repo.stargazers_count ?? repo.stars ?? 0}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
