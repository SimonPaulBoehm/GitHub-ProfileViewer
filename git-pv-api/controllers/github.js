exports.getProfile = async (req, res) => {
  const { username } = req.params

  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    // GitHub gibt 404 zurück wenn der User nicht existiert
    if (!response.ok) {
      return res.status(404).json({ error: `User "${username}" not found` })
    }

    const data = await response.json()

    // Hier schränke ich die auswahl der Daten auf die für mich relevanten ein, damit ich nicht alle Daten die von Github
    // bereitgestellt werden auswerten muss, bzw an das Frontend weiterleiten muss
    res.json({
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

exports.getRepos = async (req, res) => {
  const { username } = req.params

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    )

    if (!response.ok) {
      return res.status(404).json({ error: `User "${username}" not found` })
    }

    const data = await response.json()

    // Nach Stars sortieren und die Top 10 zurückgeben
    const sorted = data
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        html_url: repo.html_url,
      }))

    res.json(sorted)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repos' })
  }
}