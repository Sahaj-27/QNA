import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
    // const history = useHistory();

    return (
        <div>
            <header>
                <nav>
                    {/* Navigation bar */}
                </nav>
            </header>
            <main>
                <section>
                    <Link to="/login"><button>BUILD</button> </Link>
                </section>
                <section>
                    {/* Features section */}
                </section>
                <section>
                    {/* Testimonials section */}
                </section>
                <section>
                    {/* Call to action section */}
                </section>
                <section>
                    {/* Footer section */}
                </section>
            </main>
        </div>
    );
};

export default Home;
