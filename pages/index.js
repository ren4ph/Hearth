export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-(--antique-white) text-(--jet)">
           {/* Navbar */}
            <nav class="navbar min-w-screen flex justify-center">
                <div class="container grid grid-cols-2 place-content-between">
                    <div class="logo">
                        <a href="index.html">
                            <img src="images/logo-title1.png" alt="LOGO" />
                        </a>
                    </div>
                        <ul class="flex flex-row place-content-end pr-8 *:p-4">
                            <li>
                                <a id="nav-button" href="index.html">Home</a>
                            </li>
                            <li>
                                <a id="nav-button" href="projects.html">Projects</a>
                            </li>
                            <li>
                                <a id="nav-button" href="#">About</a>
                            </li>
                            <li>
                                <a id="nav-button" href="#">Contact</a>
                            </li>
                            <li>
                                <a id="nav-button" class="btn btn-dark login-button" href="login.html"><i class="fas fa-user"></i>Log In</a>
                            </li>
                        </ul>
                </div>
            </nav>

            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1 class="hero-heading text-xxl">
                            We're a collective of artists from Connecticut
                        </h1>
                        <p class="hero-text">
                            Hi, I'm J.P. Kendricks. This is Timeout Castle; we're a small collective (in members and popularity, though hopefully not for long.) We make films, music, and art, hope you enjoy!
                        </p>
                        <div class="hero-buttons">
                            <a href="projects.html" class="btn btn-dark">View what we've done
                            </a>
                            <a href="https://narcissisticbehavior.net/" class="btn btn-midtone">Send us hate mail
                            </a>
                        </div>
                    </div>
                </div>
            </section>

           {/* Video Section */}
            <section class="video bg-black">
                <div class="container-sm">
                    <h2 class="video-heading text-xl text-center">
                        The film that started it all
                    </h2>
                    <div class="video-content">
                        <a href="#">
                            <img src="images/projects/Off-Switch/video-preview.png" alt="video" class="video-preview" />
                        </a>
                        <a href="#" class="btn btn-primary">Off Switch</a>
                    </div>
                </div>
            </section>

           {/* Quick Projects */}
            <section class="testimonials bg-dark">
                <div class="container">
                    <h3 class="testimonials-heading text-xl">
                        Take a look at what we've done!
                    </h3>
                    <div class="testimonials-grid">
                        <div class="card">
                            <p>
                               {/* Image Soon*/}
                                replace with image
                            </p>

                            <p>Off Switch</p>
                            <p>J.P. Kendricks</p>
                        </div>
                        <div class="card">
                            <p>
                               {/* Image Soon*/}
                                replace with image
                            </p>

                            <p>LWEA</p>
                            <p>J.P. Kendricks</p>
                        </div>
                        <div class="card">
                            <p>
                               {/* Image Soon*/}
                                replace with image
                            </p>

                            <p>Standard Tint</p>
                            <p>J.P. Kendricks</p>
                        </div>
                    </div>
                </div>
            </section>

           {/* Pricing */}
            <section class="pricing">
                <div class="container-sm">
                    <h3 class="pricing-big-heading text-xl text-center">
                        Support Us!
                    </h3>
                <p class="pricing-subheading text-md text-center">
                    We're all indie creators; Running this business is done in our free time, extra support is very appreciated.
                </p>
                <div class="pricing-grid">
                    <div class="card bg-midtone">
                        <div class="pricing-card-header">
                            <h4 class="pricing-heading text-lg mx-[10px]">
                                Kickstarter<span className="text-right"><i class="fab fa-kickstarter-k"></i></span>
                            </h4>
                            <p class="pricing-card-subheading">
                                Support our individual projects on Kickstarter!
                            </p>
                            <p class="pricing-card-price">
                                <span class="text-xl">$0+</span>
                            </p>
                        </div>
                        <div class="pricing-card-body">
                            <ul>
                                <li>
                                    <i class="fa-solid fa-check"></i> Directly fund our projects!
                                </li>
                                <li>
                                    <i class="fa-solid fa-check"></i> Get an exclusive Kickstarter-only t-shirt with our logo!
                                </li>
                                <li>
                                    <i class="fa-solid fa-check"></i> Help us advertise and grow our brand and following!
                                </li>
                            </ul>
                            <a href="#" class="btn btn-primary btn-block">Check it out</a>
                        </div>
                    </div>
                    <div class="card bg-black">
                        <div class="pricing-card-header">
                            <h4 class="pricing-heading text-lg mx-[10px]">
                                Patreon<span className="text-right"><i class="fab fa-patreon"></i></span>
                            </h4>
                            
                            <p class="pricing-card-subheading">
                                You can help support us continuously on Patreon!
                            </p>
                            <p class="pricing-card-price">
                                <span class="text-xl">$5-20</span>
                                /month
                            </p>
                        </div>
                        <div class="pricing-card-body">
                            <ul>
                                <li>
                                    <i class="fas fa-check"></i> Fund our continous projects!
                                </li>
                                <li>
                                    <i class="fas fa-check"></i> Get access to behind the scenes content!
                                </li>
                                <li>
                                    <i class="fas fa-check"></i> See all projects up to a week in advance!
                                </li>
                            </ul>
                            <a href="#" class="btn btn-primary btn-block">Check it out</a>
                        </div>
                    </div>
                </div>
                <p class="pricing-footer text-center text-md">
                    All prices are in USD and charges subject to applicable taxes added at checkout.
                </p>
                </div>
            </section>

           {/* Footer */}
            <footer class="footer bg-black">
                <div class="container">
                    <div class="footer-grid">
                        <div>
                            <img src="images/logo.png" alt="LOGO" class="footer-icon" />
                            <div class="card footer-card">
                                <h4>Subscribe to our Newsletter!</h4>
                                <p class="text-sm">
                                    Subscribe now to get updates on new projects or project progress.
                                </p>
                                <form>
                                    <input type="email" id="email" placeholder="Enter your email" />
                                    <button type="submit" class="btn btn-primary">Subscribe</button>
                                </form>
                            </div>
                            <div class="sitelinks">
                                <a href="#" class="sitelink">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/timeout_castle/" class="sitelink">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.tumblr.com/timeout-castle" class="sitelink">
                                    <i class="fab fa-tumblr"></i>
                                </a>
                                <a href="https://www.youtube.com/@TimeoutCastle" class="sitelink">
                                    <i class="fab fa-youtube"></i>
                                </a>
                                <a href='#' class="sitelink">
                                    <i class="fab fa-bluesky"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 class="footer-section-header text-md text-bold">Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Join our team!</a></li>
                                <li><a onclick="logout()" class="text-primary hover-text-light">Log Out</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="footer-section-header text-md text-bold">Resources</h4>
                            <ul>
                                <li><a href="#">News</a></li>
                                <li><a href="#">Research</a></li>
                                <li><a href="projects.html">Recent Projects</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="footer-section-header text-md text-bold">Contact</h4>
                            <ul>
                                <li>
                                    <a href='mailto:timeoutcastlecollective@gmail.com' class="text-sm"><i>timeoutcastlecollective@gmail.com</i></a>
                                </li>
                                <li>
                                    <a href='#'><i>(203)-427-1165</i></a>
                                </li>
                                <li>
                                    <a href='secret.html' id="hidden-dark"><i>Secret secret secret</i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </footer>

            <div class="backdrop"></div>
            <script src="js/main.js"></script>
        </main>
    );
}