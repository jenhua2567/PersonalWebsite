const stats = [
  { num: '8',   desc: 'product launches',       fill: '80%' },
  { num: '3',   desc: 'categories shaped',       fill: '55%' },
  { num: '2×',  desc: 'avg. pipeline influenced', fill: '65%' },
  { num: '40+', desc: 'sales assets built',       fill: '70%' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="hero-eyebrow">Product marketing · GTM · Narrative</div>
        <h1 className="hero-headline">
          I turn product <em>complexity</em>
          <br />into market clarity
        </h1>
        <p className="hero-sub">
          PMM with a track record across SaaS launches, category plays, and sales
          enablement. I find the story that makes the right customers say &ldquo;that&rsquo;s
          exactly what I need.&rdquo;
        </p>
      </div>
      <div className="snapshot-card">
        <div className="snapshot-label">snapshot · impact by the numbers</div>
        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.desc}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-desc">{s.desc}</div>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: s.fill }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
