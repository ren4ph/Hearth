export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-(--antique-white) text-(--jet)">
            <nav className="height-100 width-100% border-b pd-20 bg-(--caramel) text-(--jet)">
                <h1 className="title text-6xl font-playfair font-bold">Hearth</h1>
            </nav>
            <h1 className="text-4xl font-playfair font-bold">Welcome to Hearth</h1>
            <p className="mt-2 text-lg font-poppins">A warm place for conversation.</p>
            <a href="/about" className="mt-4 bg-(--caramel) text-white py-2 px-4 rounded">
                Learn More
            </a>
        </main>
    );
}