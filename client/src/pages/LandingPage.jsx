import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- 1. SET BACKGROUND IMAGE DYNAMICALLY ---
  useEffect(() => {
    // Save original background to restore later if needed
    const originalBackground = document.body.style.backgroundImage;
    const originalSize = document.body.style.backgroundSize;

    // Apply Landing Page Background
    document.body.style.backgroundImage =
      "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/1000194755.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      // Cleanup: Reset background when leaving this page
      document.body.style.backgroundImage = originalBackground;
      document.body.style.backgroundSize = originalSize;
    };
  }, []);

  // --- 2. HANDLE SCROLL ANIMATIONS ---
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const reveals = document.querySelectorAll(".reveal");
      const popups = document.querySelectorAll(".pop-up");

      reveals.forEach((r) => {
        if (r.getBoundingClientRect().top < windowHeight - 100)
          r.classList.add("active");
      });
      popups.forEach((p) => {
        if (p.getBoundingClientRect().top < windowHeight - 100)
          p.classList.add("active");
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3. HANDLE ADMISSION FORM ---
  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const googleScriptURL =
      "https://script.google.com/macros/s/AKfycbyhYSsFto4TaHS1-kExxSdXjbLxzVDTXirbEI3n6IjXFLOjnttXgC6uC2eFBunLGKoP/exec";

    const vals = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      school: formData.get("school"),
      course: formData.get("course"),
      mode: formData.get("mode"),
      address: formData.get("address"),
      message: formData.get("message"),
    };

    const msg = `*NEW ADMISSION REGISTRATION*%0A%0A👤 Name: ${vals.name}%0A📞 Phone: ${vals.phone}%0A🏫 School: ${vals.school}%0A📚 Course: ${vals.course}%0A💻 Mode: ${vals.mode}%0A🏠 Address: ${vals.address}%0A📝 Query: ${vals.message}`;

    fetch(googleScriptURL, { method: "POST", body: formData })
      .then(() => {
        setLoading(false);
        window.open(`https://wa.me/917011705235?text=${msg}`, "_blank");
        form.reset();
      })
      .catch(() => {
        setLoading(false);
        window.open(`https://wa.me/917011705235?text=${msg}`, "_blank");
      });
  };

  // --- 4. HANDLE FACULTY FORM ---
  const handleFacultySubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.facName.value;
    const sub = e.target.elements.facSubject.value;
    const phone = e.target.elements.facPhone.value;
    const msg = `*NEW FACULTY APPLICATION*%0A%0A👤 Name: ${name}%0A📚 Subject: ${sub}%0A📞 Contact: ${phone}`;
    window.open(`https://wa.me/917011705235?text=${msg}`, "_blank");
    e.target.reset();
  };

  return (
    <div>
      {/* LOADING OVERLAY */}
      <div id="loading-overlay" style={{ display: loading ? "flex" : "none" }}>
        <div className="spinner"></div>
        <h3>Sending Registration...</h3>
        <p>Please wait, do not close the window.</p>
      </div>

      {/* HEADER */}
      <header>
        <a href="#home" className="logo-area">
          <div className="logo-emblem">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="logo-text">
            TUTORS HUB <span className="sub">The Second School</span>
          </div>
        </a>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
          <ul onClick={() => setIsMenuOpen(false)}>
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#courses" className="nav-link">
                School
              </a>
            </li>
            <li>
              <a href="#competitive" className="nav-link">
                Competitive
              </a>
            </li>
            <li>
              <a href="#sports" className="nav-link">
                Sports
              </a>
            </li>
            <li>
              <a href="#results" className="nav-link">
                Results
              </a>
            </li>
            <li>
              <a href="#careers" className="nav-link">
                Careers
              </a>
            </li>
            <li>
              {/* MERGED: Using React Router Link for SPA navigation */}
              <Link to="/login" className="btn-login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
            <li>
              <a href="#admission" className="btn-nav">
                Apply Now
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <i className="fas fa-book-open hero-bg-icon i1"></i>
        <i className="fas fa-atom hero-bg-icon i2"></i>
        <div className="reveal">
          <h1>
            <span>
              We Don't Just Teach, <br /> We Build Toppers
              <br />
            </span>
            Excellence Starts Here.
          </h1>
          <p>
            Premium Coaching. Uncompromising Standards. Covering: Class 6-12 •
            CUET • CA Foundation. The perfect synergy of structured discipline
            and cutting-edge education.
          </p>
          <a href="#admission" className="btn-hero">
            Book Free Demo Class{" "}
            <i
              className="fas fa-arrow-right"
              style={{ marginLeft: "10px" }}
            ></i>
          </a>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip reveal">
        <div className="stat-box">
          <h3>12+</h3>
          <p>Years Excellence</p>
        </div>
        <div className="stat-box">
          <h3>5k+</h3>
          <p>Alumni Network</p>
        </div>
        <div className="stat-box">
          <h3>98%</h3>
          <p>Board Success</p>
        </div>
        <div className="stat-box">
          <h3>50+</h3>
          <p>Expert Mentors</p>
        </div>
      </div>

      {/* DIRECTOR SECTION */}
      <section className="director-sec" id="about">
        <div className="director-img reveal">
          <div className="blob-graphic"></div>
          {/* Ensure this image exists in your public folder */}
          <img src="/DIRECTOR.jpg" alt="Director" />
        </div>
        <div className="director-content reveal">
          <h4 style={{ color: "var(--primary-hover)", fontWeight: 700 }}>
            DIRECTOR'S DESK
          </h4>
          <h2>Committed to Holistic Academic Excellence</h2>
          <p>
            "At Tutors Hub, we believe that education is not just about learning
            facts, but about igniting a lifelong passion for discovery. Our
            mission is to bridge the gap between potential and performance,
            providing a platform where every student is seen, heard, and guided
            toward their unique definition of success."
          </p>
          <div className="sign">- Mr. Ashish Chauhan</div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses">
        <div className="section-title reveal">
          <h2>School Integrated Programs</h2>
          <div className="bar"></div>
        </div>
        <div className="courses-grid">
          <div className="course-card reveal">
            <i className="fas fa-rocket c-icon"></i>
            <h3>Junior Wing (6th-8th)</h3>
            <p>Strong base building for School Exams & Olympiads.</p>
            <div style={{ marginTop: "15px" }}>
              <span className="tag board">CBSE</span>
              <span className="tag board">ICSE</span>
              <span className="tag board">UP Board</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span className="tag">Maths</span>
              <span className="tag">Science</span>
              <span className="tag">English</span>
            </div>
          </div>

          <div className="course-card reveal">
            <i className="fas fa-microscope c-icon"></i>
            <h3>High School (9th-10th)</h3>
            <p>
              Rigorous preparation for Board Exams with focus on Science &
              Maths.
            </p>
            <div style={{ marginTop: "15px" }}>
              <span className="tag board">CBSE</span>
              <span className="tag board">ICSE</span>
              <span className="tag board">UP Board</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span className="tag">PCMB</span>
              <span className="tag">SST</span>
              <span className="tag">Comp. Sc.</span>
            </div>
          </div>

          <div className="course-card reveal">
            <i className="fas fa-chart-pie c-icon"></i>
            <h3>Intermediate Commerce</h3>
            <p>Expert guidance for 11th & 12th Commerce Stream.</p>
            <div style={{ marginTop: "15px" }}>
              <span className="tag board">CBSE</span>
              <span className="tag board">ISC</span>
              <span className="tag board">UP Board</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span className="tag">Accounts</span>
              <span className="tag">Economics</span>
              <span className="tag">BST</span>
            </div>
          </div>

          <div className="course-card reveal">
            <i className="fas fa-flask c-icon"></i>
            <h3>Intermediate Science</h3>
            <p>Concept-driven learning for 11th & 12th Science Stream.</p>
            <div style={{ marginTop: "15px" }}>
              <span className="tag board">CBSE</span>
              <span className="tag board">ISC</span>
              <span className="tag board">UP Board</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span className="tag">Physics</span>
              <span className="tag">Chemistry</span>
              <span className="tag">Maths/Bio</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITIVE WING */}
      <section className="competitive-sec" id="competitive">
        <i className="fas fa-book floating-book fb1"></i>
        <i className="fas fa-book-reader floating-book fb2"></i>
        <div className="section-title reveal" style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--white)" }}>
            Competitive & Professional Wing
          </h2>
          <div className="bar"></div>
          <p style={{ color: "#ccc" }}>
            Specialized batches for higher education entrance exams
          </p>
        </div>
        <div className="comp-grid">
          <div className="comp-card reveal">
            <h3>
              <i className="fas fa-university"></i> CUET Prep
            </h3>
            <p>Secure admission in India's top Central Universities.</p>
            <ul>
              <li>General Test</li>
              <li>Domain Specific</li>
              <li>Mock Tests</li>
            </ul>
          </div>
          <div className="comp-card reveal">
            <h3>
              <i className="fas fa-calculator"></i> CA Foundation
            </h3>
            <p>The first step towards becoming a Chartered Accountant.</p>
            <ul>
              <li>Complete Syllabus</li>
              <li>RTP & MTP Solving</li>
              <li>Law & Accounts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HALL OF FAME */}
      <section className="results-sec" id="results">
        <div className="section-title reveal">
          <h2>Hall of Fame 🏆</h2>
          <div className="bar"></div>
        </div>
        <div className="courses-grid">
          <div className="rank-card pop-up">
            <div className="topper-img-box">
              <img src="/KHUSHI.png" alt="Topper" />
            </div>
            <div className="rank-score">97%</div>
            <h3>Khushi Kumari</h3>
            <div className="rank-sub">
              Class 10 <br />
              MATHS 100/100
            </div>
          </div>
          <div className="rank-card pop-up">
            <div className="topper-img-box">
              <img src="/DEEPAK.jpg" alt="Topper" />
            </div>
            <div className="rank-score">99%</div>
            <h3>Deepak Chauhan</h3>
            <div className="rank-sub">
              Class 12 <br />
              MATHS 100/100
              <br />
              PHYSICS 98/100
            </div>
          </div>
          <div className="rank-card pop-up">
            <div className="topper-img-box">
              <img src="/DIYA.jpg" alt="Topper" />
            </div>
            <div className="rank-score">90%</div>
            <h3>Diya</h3>
            <div className="rank-sub">
              Class 10 <br />
              MATHS 92/100
              <br />
              SCIENCE 90/100
            </div>
          </div>
        </div>
      </section>

      {/* CELEBRATION */}
      <section className="celebrate-sec reveal">
        <div className="celebrate-content">
          <h2>Celebrating Success!</h2>
          <p>
            Our students consistently prove that hard work and the right
            guidance lead to outstanding results. Join us and be the next
            champion!
          </p>
        </div>
        <div className="celebrate-animation">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_touohxv0.json"
            background="transparent"
            speed="1"
            style={{ width: "100%", height: "auto" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </section>

      {/* SPORTS */}
      <section className="tt-sec" id="sports">
        <div className="section-title reveal" style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "white" }}>Beyond Academics: Sports Academy</h2>
          <div className="bar"></div>
        </div>
        <div className="tt-wrapper">
          <div
            className="tt-text reveal"
            style={{ flex: 1, minWidth: "300px" }}
          >
            <h2>
              Professional <br />
              Table Tennis Coaching 🏓
            </h2>
            <p>
              We believe in the holistic development of our students. Join our
              Table Tennis academy to sharpen your focus, agility, and physical
              fitness.
            </p>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="tt-badge">
                <i className="fas fa-check"></i> Physical Fitness
              </span>
              <span className="tt-badge">
                <i class="fas fa-check"></i> Mental Agility
              </span>
            </div>
          </div>
          <div className="tt-animation-box reveal">
            <div className="tt-net"></div>
            <div className="tt-ball"></div>
            <div className="tt-paddle pad-left"></div>
            <div className="tt-paddle pad-right"></div>
          </div>
        </div>
      </section>

      {/* ADMISSION FORM */}
      <section className="form-sec" id="admission">
        <i className="fas fa-shapes form-bg-graphic fg1"></i>
        <div
          className="section-title reveal"
          style={{ color: "var(--dark)", zIndex: 2, position: "relative" }}
        >
          <h2>Join the League of Toppers</h2>
          <p>Admissions Open for Session 2026-27. Limited Seats.</p>
        </div>
        <div className="form-container-split reveal">
          <div className="form-graphic-col">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-4488157-3723276.png"
              alt="Admission"
            />
          </div>
          <div className="form-box">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              Student Registration
            </h3>
            <form onSubmit={handleAdmissionSubmit}>
              <div className="form-grid">
                <div className="inp-group full">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Student Full Name *"
                  />
                </div>
                <div className="inp-group">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="WhatsApp or Phone Number *"
                  />
                </div>
                <div className="inp-group">
                  <input
                    type="text"
                    name="school"
                    required
                    placeholder="Current School Name *"
                  />
                </div>
                <div className="inp-group">
                  <select name="course" required defaultValue="">
                    <option value="" disabled>
                      Select Course *
                    </option>
                    <option>Class 6-8 (Junior Wing)</option>
                    <option>Class 9-10 (High School)</option>
                    <option>Class 11-12 (Commerce)</option>
                    <option>Class 11-12 (Science)</option>
                    <option>CA Foundation</option>
                    <option>CUET</option>
                    <option>Table Tennis Coaching</option>
                  </select>
                </div>
                <div className="inp-group full">
                  <select name="mode" required defaultValue="">
                    <option value="" disabled>
                      Preferred Mode *
                    </option>
                    <option>🏫 Offline (Campus Visit)</option>
                    <option>💻 Online (Live Classes)</option>
                  </select>
                </div>
                <div className="inp-group full">
                  <textarea
                    name="address"
                    rows="2"
                    required
                    placeholder="Complete Home Address *"
                  ></textarea>
                </div>
                <div className="inp-group full">
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Any specific query? (Optional)"
                  ></textarea>
                </div>
                <div className="full">
                  <button type="submit" className="btn-submit">
                    Register & Send Enquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="career-sec" id="careers">
        <div className="career-container reveal">
          <div className="career-info">
            <h2>Join Our Elite Faculty</h2>
            <p>Tutors Hub is looking for experienced educators.</p>
            <ul>
              <li>
                <i className="fas fa-check-circle"></i> High Remuneration
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Flexible Hours
              </li>
            </ul>
          </div>
          <div className="career-form-box">
            <h3>Apply as Teacher</h3>
            <form onSubmit={handleFacultySubmit}>
              <input
                type="text"
                name="facName"
                className="c-inp"
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="facSubject"
                className="c-inp"
                placeholder="Subject"
                required
              />
              <input
                type="tel"
                name="facPhone"
                className="c-inp"
                placeholder="Phone"
                required
              />
              <button type="submit" className="btn-career">
                Send Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <section className="yt-direct-sec reveal" id="youtube-join">
        <div className="yt-container">
          <div className="yt-graphic-col">
            <i className="fab fa-youtube yt-giant-icon"></i>
            <div className="yt-theme-blob"></div>
          </div>
          <div className="yt-content-col">
            <h2>Join Our Digital Classroom!</h2>
            <p className="yt-lead">
              Subscribe to our official YouTube channel for free masterclasses.
            </p>
            <div className="yt-btn-wrapper">
              <a
                href="https://www.youtube.com/@Tutorshub_Ashish"
                target="_blank"
                rel="noreferrer"
                className="btn-yt-pulse"
              >
                <i className="fab fa-youtube"></i> Subscribe Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className="social-sec" id="connect">
        <div className="reveal">
          <h2 className="social-title">Stay Connected</h2>
          <div className="social-wrapper">
            <a
              href="https://www.instagram.com/eco_no_mix"
              target="_blank"
              rel="noreferrer"
              className="social-card insta-card"
            >
              <div className="icon-box">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="text-box">
                <h3>Instagram</h3>
                <span>@TutorsHub</span>
              </div>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="social-card fb-card"
            >
              <div className="icon-box">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="text-box">
                <h3>Facebook</h3>
                <span>Tutors Hub Academy</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div style={{ textAlign: "center" }}>
          <p>&copy; 2026 Tutors Hub. All Rights Reserved.</p>
        </div>
      </footer>

      {/* FLOAT BUTTONS */}
      <div className="float-container">
        <a href="https://wa.me/917011705235" className="float-btn wa-btn">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="tel:+917011705235" className="float-btn call-btn">
          <i className="fas fa-phone"></i>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
