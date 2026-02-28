export default function PodcastPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ fontSize: "2rem" }}>🎙️</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            The Big Bark Podcast
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>Listen to the latest episodes</p>
      </div>

      {/* Spotify embed */}
      <div className="mb-4">
        <iframe
          src="https://open.spotify.com/embed/show/1q1moteO1FTB0B6pzSQnG7?utm_source=generator"
          width="100%"
          height="352"
          style={{ borderRadius: "12px", border: "none" }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>
        Can&apos;t see the player?{" "}
        <a
          href="https://open.spotify.com/show/1q1moteO1FTB0B6pzSQnG7"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--navy)", fontWeight: 600 }}
        >
          Listen directly on Spotify
        </a>
      </p>

      {/* About section */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: "#fff", borderColor: "var(--border)" }}
      >
        <div className="section-header mb-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>
            About the Podcast
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          <p>
            <span className="font-semibold" style={{ color: "var(--navy)" }}>The Big Bark Podcast</span>{" "}
            is the canine industry&apos;s go-to audio destination — bringing together charity leaders,
            business owners, trainers, vets and advocates to discuss the topics that matter most to
            dogs and the people who care for them.
          </p>
          <p>
            Each episode we dive deep into news from across the sector: from animal welfare campaigns
            and rescue operations, to breed standards, agility competitions, nutrition science and
            the growing world of canine-focused businesses. Whether you&apos;re a professional in the
            industry or simply passionate about dogs, there&apos;s something for every listener.
          </p>
          <p>
            New episodes drop every two weeks. Subscribe on Spotify to never miss an instalment, and
            follow <span className="font-semibold" style={{ color: "var(--navy)" }}>Big Bark News & Media</span>{" "}
            for show notes and related stories.
          </p>
        </div>
      </div>
    </div>
  );
}
