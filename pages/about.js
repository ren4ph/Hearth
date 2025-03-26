export default function About() {
    return (
      <main className="flex flex-col min-h-screen items-center bg-(--jet) text-(--jet)">
        <nav className="navbar min-w-screen height-50 border-b bg-(--antique-white) p-1">
          <h1 className="title text-6xl font-bold font-playfair text-(--jet)">Hearth</h1>
        </nav>
        <section className="bg-(--onyx) text-(--light-text) h-[500px]">
          <div className="container">
            <h1 className="text-4xl font-bold font-playfair">About Hearth</h1>
            <p className="mt-2 text-lg font-poppins pb-4">Hearth is a chat platform inspired by the warmth of a bonfire.</p>
            <a href="/" className="mt-4 bg-(--caramel) text-white py-2 px-4 rounded font-poppins">
              Back to Home
            </a>
          </div>
        </section>
      </main>
    );
  }
  