import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { featured } from './data';

export default function ProjectDetails() {
  const { id } = useParams(); 
  const project = featured.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project || !project.caseStudyData) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center' }}>
        <h2>Project documentation not found or still in progress.</h2>
        <Link to="/" style={{ color: '#7b6cf0', fontWeight: 'bold' }}>Return Home</Link>
      </div>
    );
  }

  const data = project.caseStudyData;

  return (
    <div className="case-study-page fade-in">
      <nav className="nav">
        <Link to="/" className="back-nav-btn" style={{ textDecoration: 'none' }}>
          ← Back to Portfolio
        </Link>
      </nav>

      <div className="cs-header">
        <div className="cs-header-content">
          <div className="slide-tags">
            {project.tags.map(t => <span key={t} className="slide-tag">{t}</span>)}
          </div>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-stack">{project.stack}</p>
        </div>
      </div>

      <div className="cs-showcase">
        {data.mediaType === 'video' ? (
          <video 
            src={data.mediaUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="cs-media-large" 
          />
        ) : (
          <img src={data.mediaUrl} alt={`${project.title} Demo`} className="cs-media-large" />
        )}
      </div>

      <div className="cs-body-stacked">
        <section className="cs-section">
          <h3>Overview</h3>
          <p>{data.overview}</p>
        </section>
        <section className="cs-section">
          <h3>The Challenge</h3>
          <p>{data.challenge}</p>
        </section>
        <section className="cs-section">
          <h3>The Solution</h3>
          <p>{data.solution}</p>
        </section>
      </div>
    </div>
  );
}