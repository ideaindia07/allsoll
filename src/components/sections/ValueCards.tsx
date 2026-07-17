import Link from "next/link";

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

const cards = [
  { id: "trust", title: "Trust", image: "/Text Box_2.png", link: "/trust" },
  { id: "attention", title: "Attention", image: "/Text Box_1.png", link: "/attention" },
  { id: "experience", title: "Experience", image: "/Text Box_4.png", link: "/experience" },
  { id: "culture", title: "Culture", image: "/Text Box_3.png", link: "/culture" },
  { id: "growth", title: "Growth", image: "/Text Box_5.png", link: "/growth" },
];

export default function ValueCards() {
  return (
    <section className="w-full py-24 bg-bg-primary relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Core Values
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover what drives our approach and commitment to digital excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              className="group block relative overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${card.image}`}
                  alt={card.title}
                  className="w-full h-auto"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
