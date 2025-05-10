import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Code2, Users, Trophy, BookOpen, CheckCircle2, Globe2, Laptop, GraduationCap, Clock, BrainCircuit, Target, Rocket, Star, Coffee, Zap, MessageSquare, Award, Briefcase, LineChart, TestTube } from "lucide-react";
import "./landing.css";

const Landing = () => {
  const location = useLocation();

//   Scroll to section based on URL hash
  useEffect(() => {
    const sectionId = location.hash.replace("#", "");
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div id="hero" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Master Coding with Industry Experts</h1>
          <p className="hero-description">
            Transform your career with our comprehensive coding bootcamps and courses. 
            Learn from experienced developers and join thousands of successful graduates.
          </p>
          <div className="hero-highlights">
            <div className="highlight-item">
              <Clock className="highlight-icon" />
              <span>12-Week Program</span>
            </div>
            <div className="highlight-item">
              <GraduationCap className="highlight-icon" />
              <span>Job Guarantee</span>
            </div>
            <div className="highlight-item">
              <Laptop className="highlight-icon" />
              <span>Live Classes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <Users className="stat-icon" />
            <h3 className="stat-number">10,000+</h3>
            <p className="stat-label">Students Trained</p>
          </div>
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <h3 className="stat-number">95%</h3>
            <p className="stat-label">Placement Rate</p>
          </div>
          <div className="stat-card">
            <Globe2 className="stat-icon" />
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Partner Companies</p>
          </div>
          <div className="stat-card">
            <Award className="stat-icon" />
            <h3 className="stat-number">4.8/5</h3>
            <p className="stat-label">Student Rating</p>
          </div>
        </div>
      </div>

      {/* Course Tracks Section */}
      <div id="tracks" className="tracks-section">
        <h2 className="section-title">Learning Tracks</h2>
        <div className="tracks-grid">
          <div className="track-card">
            <BrainCircuit className="track-icon" />
            <h3>Full Stack Development</h3>
            <p>Master both front-end and back-end technologies</p>
            <ul className="track-features">
              <li>React & Node.js</li>
              <li>Database Design</li>
              <li>API Development</li>
              <li>Cloud Deployment</li>
              <li>Testing & DevOps</li>
            </ul>
          </div>
          <div className="track-card">
            <LineChart className="track-icon" />
            <h3>Data Science</h3>
            <p>Transform data into actionable insights</p>
            <ul className="track-features">
              <li>Machine Learning</li>
              <li>Statistical Analysis</li>
              <li>Python & R Programming</li>
              <li>Deep Learning</li>
              <li>Big Data Analytics</li>
            </ul>
          </div>
          <div className="track-card">
            <TestTube className="track-icon" />
            <h3>Automation Testing</h3>
            <p>Master modern testing frameworks and tools</p>
            <ul className="track-features">
              <li>Selenium & Cypress</li>
              <li>API Testing</li>
              <li>Performance Testing</li>
              <li>CI/CD Integration</li>
              <li>Test Automation Strategy</li>
            </ul>
          </div>
          <div className="track-card">
            <Rocket className="track-icon" />
            <h3>Java Development</h3>
            <p>Master backend development with Java</p>
            <ul className="track-features">
              <li>Core Java & OOP</li>
              <li>Spring Boot Framework</li>
              <li>RESTFul API's</li>
              <li>Database Integration</li>
              <li>Multithreading & Performance Optimization</li>
            </ul>
          </div>
          <div className="track-card">
            <Rocket className="track-icon" />
            <h3>Cloud Computing</h3>
            <p>Build and deploy scalable applications</p>
            <ul className="track-features">
              <li>AWS Services</li>
              <li>DevOps Practices</li>
              <li>Microservices</li>
              <li>Containerization</li>
              <li>Security Best Practices</li>
            </ul>
          </div>
          <div className="track-card">
            <Rocket className="track-icon" />
            <h3>Data Analyst</h3>
            <p>Analyze and visualize data to drive business decisions</p>
            <ul className="track-features">
              <li>SQL & Databases</li>
              <li>Data Visualization</li>
              <li>Python for Data Analysis</li>
              <li>Excel & Power BI</li>
              <li>Statistics & Machine Learning Basics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Learning Experience Section */}
      <div className="experience-section">
        <h2 className="section-title">The Learning Experience</h2>
        <div className="experience-grid">
          <div className="experience-card">
            <Coffee className="experience-icon" />
            <h3>Morning Sessions</h3>
            <p>Start your day with interactive lectures and concept discussions</p>
          </div>
          <div className="experience-card">
            <Zap className="experience-icon" />
            <h3>Hands-on Practice</h3>
            <p>Apply your knowledge through real-world coding challenges</p>
          </div>
          <div className="experience-card">
            <MessageSquare className="experience-icon" />
            <h3>Mentorship</h3>
            <p>Get personalized guidance from industry professionals</p>
          </div>
          <div className="experience-card">
            <Briefcase className="experience-icon" />
            <h3>Career Prep</h3>
            <p>Interview preparation and job placement assistance</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Why Choose Our Program?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Code2 className="feature-icon" />
            <h3 className="feature-title">Industry-Relevant Curriculum</h3>
            <p className="feature-description">
              Our curriculum is designed with input from industry leaders to ensure you learn what matters.
            </p>
          </div>
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3 className="feature-title">Expert Instructors</h3>
            <p className="feature-description">
              Learn from experienced developers who have worked at top tech companies.
            </p>
          </div>
          <div className="feature-card">
            <BookOpen className="feature-icon" />
            <h3 className="feature-title">Hands-on Projects</h3>
            <p className="feature-description">
              Build real-world projects that you can add to your portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div id="success-stories" className="success-section">
        <h2 className="section-title">Success Stories</h2>
        <div className="stories-grid">
          <div className="story-card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Sarah" className="story-image" />
            <div className="story-content">
              <h3>Vanshika Jain</h3>
              <p className="story-company">Now at Attasian</p>
              <div className="story-rating">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"The program transformed my career. I went from zero coding knowledge to a full-stack developer role."</p>
            </div>
          </div>
          <div className="story-card">
            <img src="https://plus.unsplash.com/premium_photo-1682096189627-2dfb5122b2ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Michael" className="story-image" />
            <div className="story-content">
              <h3>Diya</h3>
              <p className="story-company">Now at Rubric</p>
              <div className="story-rating">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"The mentorship and practical projects gave me the confidence to switch careers successfully."</p>
            </div>
          </div>
          <div className="story-card">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Michael" className="story-image" />
            <div className="story-content">
              <h3>Michael Chen</h3>
              <p className="story-company">Now at Tech Mahindra</p>
              <div className="story-rating">
                <Star className="star-icon" /> 
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"I had no prior coding experience, but the step-by-step guidance, real-world projects, and doubt-clearing sessions made learning so smooth. Now, I work as a frontend developer!"</p>
            </div>
          </div>
          <div className="story-card">
            <img src="https://plus.unsplash.com/premium_photo-1693258698597-1b2b1bf943cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D" alt="Michael" className="story-image" />
            <div className="story-content">
              <h3>Michael Chen</h3>
              <p className="story-company">Now at Wipro</p>
              <div className="story-rating">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"The mentorship and practical projects gave me the confidence to switch careers successfully. The hands-on approach made learning so much easier!"</p>
            </div>
          </div>
          <div className="story-card">
            <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Michael" className="story-image" />
            <div className="story-content">
              <h3>Michael Chen</h3>
              <p className="story-company">Now at TCS</p>
              <div className="story-rating">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"The best part about this course was the real-world projects. They prepared me for actual job tasks, and I got multiple interview calls right after completing the program."</p>
            </div>
          </div>
          <div className="story-card">
            <img src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Michael" className="story-image" />
            <div className="story-content">
              <h3>Michael Chen</h3>
              <p className="story-company">Now at Infosys</p>
              <div className="story-rating">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
              <p className="story-text">"The flexibility of this program allowed me to learn at my own pace while managing my job. The career support was invaluable in helping me transition into tech."</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Coding Journey?</h2>
          <div className="cta-card">
            <div className="benefits-grid">
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Flexible learning schedule</p>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Project-Based Learning</p>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Career support</p>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Interview Preparations</p>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Community Support & Networking</p>
              </div>
              <div className="benefit-item">
                <CheckCircle2 className="benefit-icon" />
                <p className="benefit-text">Industry-Ready Curriculum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;