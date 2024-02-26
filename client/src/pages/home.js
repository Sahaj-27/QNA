import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/home.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "font-awesome/css/font-awesome.min.css";
import Aos from "aos";

function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      offset: 50, // Set the desired offset value
    });

    // Destroy Locomotive Scroll on component unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="main-container" data-scroll-container ref={scrollRef}>
      <div className="container">
        <div className="navbar">
          <div className="logo">QnA.AI</div>
          <div className="links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
        <div className="hero">
          <div className="hero-card">
            <div className="hero-text">
              <h1>Ask Questions, Get Answers</h1>
              <p>Ask questions and get answers from our community of users</p>
              <button>
                <Link to="/login">BUILD</Link>
              </button>
            </div>
            <div className="hero-image">
              <img src="https://i.gifer.com/SImn.gif" />
            </div>
          </div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="container-2" data-scroll data-scroll-speed="1">
        <div className="features-heading">
          <h1>
            Why <br />
            Us?
          </h1>
        </div>
        <div className="features">
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Card one</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Card two</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Card Three</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" data-scroll data-scroll-speed="1">
        <div className="timeline">
          <div className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
            <div className="timeline__event__icon ">
              <i className="lni-cake"></i>
              <div className="timeline__event__date">20-08-2019</div>
            </div>
            <div className="timeline__event__content ">
              <div className="timeline__event__title">Birthday</div>
              <div className="timeline__event__description">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
                  nam! Nam eveniet ut aliquam ab asperiores, accusamus iure
                  veniam corporis incidunt reprehenderit accusantium id aut
                  architecto harum quidem dolorem in!
                </p>
              </div>
            </div>
          </div>
          <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
            <div className="timeline__event__icon">
              <i className="lni-burger"></i>
              <div className="timeline__event__date">20-08-2019</div>
            </div>
            <div className="timeline__event__content">
              <div className="timeline__event__title">Lunch</div>
              <div className="timeline__event__description">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
                  nam! Nam eveniet ut aliquam ab asperiores, accusamus iure
                  veniam corporis incidunt reprehenderit accusantium id aut
                  architecto harum quidem dolorem in!
                </p>
              </div>
            </div>
          </div>
          <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
            <div className="timeline__event__icon">
              <i className="lni-slim"></i>
              <div className="timeline__event__date">20-08-2019</div>
            </div>
            <div className="timeline__event__content">
              <div className="timeline__event__title">Exercise</div>
              <div className="timeline__event__description">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
                  nam! Nam eveniet ut aliquam ab asperiores, accusamus iure
                  veniam corporis incidunt reprehenderit accusantium id aut
                  architecto harum quidem dolorem in!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-2" data-scroll data-scroll-speed="1">
        <div className="features-heading">
          <h1>
            Meet the <br />
            Team :)
          </h1>
        </div>
        <div className="about-container">
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://unsplash.it/200/200" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  Mayur Behere <br />
                  <span>Frontend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="#">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://unsplash.it/200/200" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  sahaj mishra <br />
                  <span>ML Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="#">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://unsplash.it/200/200" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  Prathamesh Patil <br />
                  <span>Backend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="#">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://unsplash.it/200/200" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  Gaurav Chowdhary <br />
                  <span>Backend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="#">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container" data-scroll data-scroll-speed="1">
        <div className="contact-form">
          <h1 className="form-title">Contact Us</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <div className="blob"></div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-border">
          <p>@2024 QnA.AI</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
