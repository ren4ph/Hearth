export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-(--onyx) text-(--light-text) font-poppins">
           {/* Navbar */}
            <nav class="navbar min-w-screen flex justify-center border-b bg-(--antique-white) text-(--jet) py-[10px]">
                <div class="container grid grid-cols-2 place-content-between">
                    <div class="logo">
                        <a href="index.html">
                            <img src="images/logo-title1.png" alt="LOGO" />
                        </a>
                    </div>
                        <ul class="flex flex-row place-content-end *:p-4 *:mr-4 *:w-[15%] *:text-center">
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
                            <li class="p-4">
                                <a id="nav-button" class="login-button btn btn-dark" href="login.html"><i class="fas fa-user"></i>Log In</a>
                            </li>
                        </ul>
                </div>
            </nav>

            <section class="hero min-h-[300px] min-h-screen">
                <div class="container">
                    <div class="hero-content flex flex-col *:m-8">
                        <h1 class="hero-heading text-6xl font-playfair">
                            Welcome to the Hearth
                        </h1>
                        <p class="hero-text">
                            A chat application for all people.
                        </p>
                        <div class="hero-buttons">
                            <a href="login.html" class="btn btn-dark !mr-4">Sign up and begin!
                            </a>
                            <a href="login.html" class="btn btn-midtone">Log in!
                            </a>
                        </div>
                    </div>
                </div>
            </section>

           {/* Footer */}
            <footer class="footer min-h-[400px] bg-dark min-w-screen flex items-center justify-center border-b">
                <div class="container min-h-[400px]">
                    <div class="footer-grid min-h-[400px] grid grid-cols-[2fr_1fr_1fr_1fr] justify-center items-center gap-[20px] *:min-h-[60%]">
                        <div>
                            <div class="card footer-card grid grid-rows-[1.5fr_1.5fr_1fr_1.5fr] bg-orange min-h-[100%] items-center border rounded-[15px] p-4">
                                <h4 class="text-3xl">Subscribe to our Newsletter!</h4>
                                <p class="text-md">
                                    Subscribe now to get updates on new projects or project progress.
                                </p>
                                <div className=""></div>
                                <form class="*:m-2">
                                    <input type="email" id="email" class="bg-light border p-2 rounded-[5px] !ml-0" placeholder="Enter your email" />
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
                        <div class="footer-section">
                            <h4 class="footer-section-header text-2xl text-bold">Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Join our team!</a></li>
                                <li><a onclick="logout()" class="text-primary hover-text-light">Log Out</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4 class="footer-section-header text-2xl text-bold">Resources</h4>
                            <ul>
                                <li><a href="#">News</a></li>
                                <li><a href="#">Research</a></li>
                                <li><a href="projects.html">Recent Projects</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4 class="footer-section-header text-2xl text-bold">Contact</h4>
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