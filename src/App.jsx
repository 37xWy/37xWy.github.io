import { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { featured } from './data';
import ProjectDetails from './ProjectDetails';
import './App.css';

const SLIDE_DURATION = 5000;
const FILTERS = ['All', 'AI & Vision', 'Automation', 'Systems', 'Full-Stack'];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  
  const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused || dragStartX !== null) { 
      clearInterval(intervalRef.current); 
      return; 
    }
    intervalRef.current = setInterval(() => setSlide(s => (s + 1) % featured.length), SLIDE_DURATION);
    return () => clearInterval(intervalRef.current);
  }, [paused, dragStartX]);

  const handleDragStart = (e) => {
    setPaused(true);
    setDragStartX(e.clientX || e.touches?.[0].clientX); 
  };
  const handleDragMove = (e) => {
    if (dragStartX === null) return;
    setDragOffset((e.clientX || e.touches?.[0].clientX) - dragStartX);
  };
  const handleDragEnd = () => {
    if (dragOffset > 75) {
      setSlide(s => (s === 0 ? featured.length - 1 : s - 1));
    } else if (dragOffset < -75) {
      setSlide(s => (s + 1) % featured.length);
    }
    setDragStartX(null);
    setDragOffset(0);
    setPaused(false);
  };

  const filtered = featured.filter(p => activeFilter === 'All' ? true : p.tags.includes(activeFilter));
  const cur = featured[slide];
  
  const dragStyle = dragStartX !== null ? { transform: `translateX(${dragOffset * 0.2}px)` } : {};

  return (
    <>
      <nav className="nav">
        <a href="#" className="nav-logo" onClick={(e) => { 
          e.preventDefault(); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          Home
        </a>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
          <a href="/docs/resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
          <a href="https://github.com/37xWy/" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">// portfolio</span>
          <h1 className="hero-name">Ng Wei Yang</h1>
          <p className="hero-sub">Computer Science (AI) · APU Year 2</p>
          <div className="hero-pills">
            <span>Python</span><span>OpenCV</span><span>Automation</span><span>Machine Learning</span>
          </div>
        </div>
        <div className="hero-collage-wrap">
          <div className="collage-fade"/>
          <img src="/images/collage.webp" alt="AI shapes" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>
      </header>

      <div className="divider-row">
        <div className="divider-line"/>
        <div className="avatar">
          <img src="/images/profile.webp" alt="Ng Wei Yang" className="avatar-img" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = 'NWY'; }} />
        </div>
        <div className="divider-line"/>
      </div>

      <section 
        className={`spotlight ${dragStartX !== null ? 'is-dragging' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setDragStartX(null); }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="slide-text" key={`t${slide}`} style={dragStyle}>
          <div className="slide-tags">{cur.tags.map(t => <span key={t} className="slide-tag">{t}</span>)}</div>
          <h2 className="slide-title">{cur.title}</h2>
          <p className="slide-stack">{cur.stack}</p>
          <p className="slide-desc">{cur.desc}</p>
          
          <div className="slide-btn-group">
            {cur.hasCaseStudy ? (
              <button onClick={() => navigate(`/project/${cur.id}`)} className="slide-btn btn-primary" style={{cursor: 'pointer', border: 'none'}}>
                Deep Dive →
              </button>
            ) : (
              <span className="slide-btn btn-primary" style={{opacity: 0.5, cursor: 'not-allowed'}}>Details (WIP)</span>
            )}
            
            {cur.liveLink && (
              <a href={cur.liveLink} className="slide-btn btn-secondary" target="_blank" rel="noreferrer">
                <ExternalLinkIcon /> Live Site
              </a>
            )}

            {cur.link ? (
              <a href={cur.link} className="slide-btn btn-secondary" target="_blank" rel="noreferrer"><GithubIcon /> Repo</a>
            ) : (
              <span className="slide-btn btn-secondary" style={{opacity: 0.5, cursor: 'not-allowed'}}><GithubIcon /> Local</span>
            )}
          </div>

          <div className="slide-dots">
            {featured.map((_, i) => (
              <button key={i} className={`dot${i===slide?' active':''}`}
                onClick={(e) => { e.stopPropagation(); setSlide(i); }} aria-label={`Slide ${i+1}`}/>
            ))}
          </div>
        </div>

        <div className="slide-img-wrap" style={{ ...dragStyle, position: 'relative', height: '350px' }}>
          <div className="slide-blend" style={{ zIndex: 10 }} />
          
          {featured.map((p, index) => {
            const isActive = index === slide;
            
            const baseLayerStyle = {
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: 'opacity 0.4s ease',
              zIndex: isActive ? 2 : 1,
              borderRadius: '16px',
              boxShadow: '0 20px 40px -10px rgba(108, 87, 214, 0.15)'
            };

            if (p.isTransparent && p.imagePath) {
              return (
                <div key={`img-${p.id}`} style={{ 
                  ...baseLayerStyle, 
                  background: `linear-gradient(135deg, ${p.from}, ${p.to})`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  padding: '2rem' 
                }}>
                  <img 
                    src={p.imagePath} 
                    alt={p.title} 
                    draggable="false"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                </div>
              );
            }

            if (p.imagePath) {
              return (
                <img 
                  key={`img-${p.id}`}
                  src={p.imagePath} 
                  alt={p.title} 
                  draggable="false"
                  style={{ ...baseLayerStyle, objectFit: 'cover' }}
                />
              );
            }

            return (
              <div key={`place-${p.id}`} style={{ 
                ...baseLayerStyle, 
                background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(28, 24, 64, 0.4)', fontWeight: 'bold'
              }}>
                <span>[ Upload {p.title} Image ]</span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-inner">
          <span className="section-label">// about_me</span>
          <p className="about-body">
            I am a Year 2 Computer Science student specialising in AI. My real passion lies in automation and computer vision. I enjoy building tools that make software smarter and workflows faster. Whether I'm developing Python scripts to automate menial tasks or working with OpenCV for university modules, I love writing code that acts autonomously.
          </p>
          <div className="interests">
            <span className="interests-label">Currently exploring / watching:</span>
            <div className="interest-chips">
              {["Anime", "Gacha Game Mechanics", "Sci-Fi Narratives", "Task Automation", "Computer Vision"].map(t=><span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="projects-header">
          <h2>All Projects</h2>
          <div className="filters">
            {FILTERS.map(f=><button key={f} className={activeFilter===f?'active':''} onClick={()=>setActiveFilter(f)}>{f}</button>)}
          </div>
        </div>
        <div className="projects-grid">
          {filtered.map((p,i)=>(
            <div key={p.id} className="card" style={{animationDelay:`${i*55}ms`}}>
              <div className="card-head"><span className="card-cat">{p.tags[0]}</span></div>
              <h3>{p.title}</h3>
              <p className="card-stack">{p.stack}</p>
              <p className="card-desc">{p.desc}</p>
              <div className="card-actions">
                {p.hasCaseStudy ? (
                   <Link to={`/project/${p.id}`} style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text)', textDecoration: 'none' }}>Read More →</Link>
                ) : (
                  <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-dim)' }}>Details (WIP)</span>
                )}
                {p.link && <a href={p.link} className="card-icon-link" target="_blank" rel="noreferrer"><GithubIcon /></a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>Built with React</span>
        <a href="https://github.com/37xWy/" target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);

  return (
    <HashRouter>
      <div className={`root${loaded ? ' loaded' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </HashRouter>
  );
}