import React, { useEffect, useState } from "react";
import "./index.css";

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:8000";

function Header({ profile }) {
  return (
    <div className="header">
      <div>
        <h1 style={{ margin: 0 }}>{profile?.name || "Your Name"}</h1>
        <div className="small">
          {profile?.role || "Your Role"} • {profile?.location || "Your City"}
        </div>
      </div>
      <div>
        {profile?.socials?.github && (
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}{" "}
        {profile?.socials?.linkedin && (
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{p.title}</h3>
      <p className="small">{p.description}</p>
      <div style={{ marginBottom: 12 }}>
        {Array.isArray(p.tags) &&
          p.tags.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
      </div>
      {p.link && (
        <a className="cta" href={p.link} target="_blank" rel="noreferrer">
          View Project →
        </a>
      )}
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/profile`)
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});

    fetch(`${API_BASE}/api/projects`)
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <Header profile={profile} />
      <h2 style={{ marginTop: 24 }}>Projects</h2>
      <div className="grid">
        {projects.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
    </div>
  );
}

