export default function About() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center text-playfair bg-(--antique-white) text-(--jet)">
        <h1 className="text-4xl font-bold">About Hearth</h1>
        <p className="mt-2 text-lg">Hearth is a chat platform inspired by the warmth of a bonfire.</p>
        <a href="/" className="mt-4 bg-(--caramel) text-white py-2 px-4 rounded">
          Back to Home
        </a>
      </main>
    );
  }
  