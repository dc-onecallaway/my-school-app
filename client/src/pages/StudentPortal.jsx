// src/pages/StudentPortal.jsx
import React, { useState, useEffect } from "react";
import "../styles/StudentPortal.css";

const StudentPortal = () => {
  const [activeTab, setActiveTab] = useState("c6");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Navbar Scroll Logic
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Scroll down -> Hide
      } else {
        setShowNavbar(true); // Scroll up -> Show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Data for Classes
  const classes = [
    {
      id: "c6",
      name: "Class 6 🐣",
      title: "Class 6 Foundation",
      icon: "🦄",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdlgixv5C2zN0k4Q29TgWj5WV4NGQDZmZesqRRazGVIw-2LGQ/viewform?embedded=true",
    },
    {
      id: "c7",
      name: "Class 7 🌱",
      title: "Class 7 Concepts",
      icon: "🚀",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
    {
      id: "c8",
      name: "Class 8 🌿",
      title: "Class 8 Brainstorm",
      icon: "💡",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
    {
      id: "c9",
      name: "Class 9 📘",
      title: "Class 9 Science & Math",
      icon: "⚛️",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
    {
      id: "c10",
      name: "Class 10 🔥",
      title: "Class 10 Board Prep",
      icon: "🏆",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
    {
      id: "c11",
      name: "Class 11 🧪",
      title: "Class 11 Streams",
      icon: "🧬",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
    {
      id: "c12",
      name: "Class 12 🎓",
      title: "Class 12 Finals",
      icon: "🎓",
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdc...LINK.../viewform?embedded=true",
    },
  ];

  const libraryLinks = [
    {
      name: "Class 6",
      link: "https://drive.google.com/drive/u/4/folders/16A-zNuYxfNeDF8boAV4szcXzHNflEsbh",
    },
    {
      name: "Class 7",
      link: "https://drive.google.com/drive/u/4/folders/1Wl6-XAO4XabKQ0dDvGDoyJSStt0n4so9",
    },
    {
      name: "Class 8",
      link: "https://drive.google.com/drive/u/4/folders/1ah6DOb6aDli2hNlyg4o70vB3uDO0B4Yn",
    },
    {
      name: "Class 9",
      link: "https://drive.google.com/drive/u/4/folders/1WIVjW4kZdU6_zj6JOMUqL6XmmJUCTkyj",
    },
    {
      name: "Class 10",
      link: "https://drive.google.com/drive/u/4/folders/1xPUvzrJu5yaXPrTNhwzKXguchn_Ld8Pk",
    },
    {
      name: "Class 11",
      link: "https://drive.google.com/drive/u/4/folders/1kJRewbfI5tRITpsnocbRPKiIHt3ajQHf",
    },
    {
      name: "Class 12",
      link: "https://drive.google.com/drive/u/4/folders/1eAvX87ytEZYtF3Xre5WPUPWMJcc5Wqle",
    },
  ];

  return (
    // WRAPPER DIV ensures styles don't leak to body
    <div className="portal-wrapper">
      {/* Background Circles */}
      <ul className="sp-circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      {/* Navbar */}
      <header
        className="sp-header"
        style={{ top: showNavbar ? "0" : "-100px" }}
      >
        <nav className="sp-nav">
          <a href="/" className="sp-logo">
            🚀 TUTORS <span>HUB</span>
          </a>
          <div className="sp-nav-links">
            <a href="/">Home</a>
            <a href="#class-section">Classes</a>
            <a href="#library">Library</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="sp-hero">
        <h1>Ready to Rock the Exam? 🎸</h1>
        <p>Classes 6 to 12 • Smart Tests • Instant Results</p>
        <button
          onClick={() =>
            document
              .getElementById("class-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="sp-btn-bounce"
        >
          Start Now 👇
        </button>
      </section>

      {/* Class Section */}
      <div id="class-section" className="sp-container">
        <div className="sp-tabs">
          {classes.map((cls) => (
            <button
              key={cls.id}
              className={`sp-tab-btn ${activeTab === cls.id ? "active" : ""}`}
              onClick={() => setActiveTab(cls.id)}
            >
              {cls.name}
            </button>
          ))}
        </div>

        {/* Dynamic Content Rendering */}
        {classes.map(
          (cls) =>
            activeTab === cls.id && (
              <div key={cls.id} className="sp-content-box">
                <div className="sp-card">
                  <span className="sp-card-icon">{cls.icon}</span>
                  <h2>{cls.title}</h2>
                  <p>Let's build a strong base! Attempt your test below.</p>

                  <div className="sp-app-window">
                    <div className="sp-window-bar">
                      <div className="sp-traffic-lights">
                        <div className="sp-light sp-red"></div>
                        <div className="sp-light sp-yellow"></div>
                        <div className="sp-light sp-green"></div>
                      </div>
                      <div className="sp-window-title">
                        Live Assessment - {cls.name}
                      </div>
                    </div>
                    <div className="sp-embed-frame">
                      <iframe
                        src={cls.formLink}
                        title={`test-${cls.id}`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>

      {/* Library Section */}
      <div id="library" className="sp-container">
        <div className="sp-card">
          <span className="sp-card-icon" style={{ fontSize: "3rem" }}>
            📚
          </span>
          <h2>Digital Library</h2>
          <p>Select a class to open the study materials.</p>

          <div className="sp-folder-grid">
            {libraryLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sp-folder-item"
              >
                <i className="fas fa-folder-open"></i>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="sp-footer">
        <p>Made with ❤️ for TUTORS HUB © 2026</p>
      </footer>
    </div>
  );
};

export default StudentPortal;
