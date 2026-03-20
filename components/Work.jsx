const workItems = [
  {
    type: 'featured · launch strategy',
    title: 'Zero-to-one GTM for an AI workflow tool',
    desc: 'Owned positioning, ICP definition, and launch sequencing for a greenfield product. Took it from internal beta to first 200 paying customers in 90 days.',
    chips: [
      { label: 'positioning doc', v: 'a' },
      { label: 'ICP framework', v: 'b' },
      { label: 'launch playbook', v: 'c' },
    ],
    featured: true,
    frameworkRows: [
      { label: 'For who',     value: 'ops teams 50–500' },
      { label: 'Problem',     value: 'tool sprawl + lost context' },
      { label: 'Alternative', value: 'Notion + Slack + Jira' },
      { label: 'Key claim',   value: 'one source of work truth' },
      { label: 'Proof',       value: '4.2hr/wk saved, avg' },
    ],
  },
  {
    type: 'competitive · enablement',
    title: 'Battle card system for a 60-rep sales org',
    desc: 'Built a living competitive intel framework covering 5 rivals. Reduced deal cycle by 12 days on competitive opps.',
    chips: [
      { label: 'battle cards', v: 'a' },
      { label: 'objection handling', v: 'b' },
    ],
  },
  {
    type: 'narrative · category',
    title: 'Category narrative: "The Great IT Consolidation"',
    desc: 'Defined a new market category to shift buying criteria in our favor. Used in keynotes, analyst briefings, and press.',
    chips: [
      { label: 'thought leadership', v: 'c' },
      { label: 'analyst deck', v: 'a' },
    ],
  },
  {
    type: 'messaging · web',
    title: 'Homepage messaging overhaul — 34% lift in demo requests',
    desc: 'Led customer research, rewrote the messaging hierarchy, and partnered with design on a full homepage rebuild.',
    chips: [
      { label: 'A/B results', v: 'a' },
      { label: 'research synthesis', v: 'b' },
    ],
  },
  {
    type: 'enablement · persona',
    title: 'Persona-based sales deck for enterprise motion',
    desc: 'Three buyer personas, three narrative paths. Gave reps a modular pitch system instead of a 60-slide monolith.',
    chips: [
      { label: 'sales deck', v: 'c' },
      { label: 'persona docs', v: 'b' },
    ],
  },
  {
    type: 'pricing · packaging',
    title: 'Packaging architecture for a 3-tier SaaS model',
    desc: 'Collaborated with product and pricing to restructure tiers around jobs-to-be-done instead of feature counts.',
    chips: [
      { label: 'packaging strategy', v: 'a' },
      { label: 'research', v: 'b' },
    ],
  },
]

function Chip({ label, v }) {
  return <span className={`chip chip-${v}`}>{label}</span>
}

function FeaturedCard({ item }) {
  return (
    <div className="work-card work-card-featured">
      <div className="work-type">{item.type}</div>
      <div className="feat-inner">
        <div>
          <div className="work-title">{item.title}</div>
          <div className="work-desc">{item.desc}</div>
          {item.chips.map((c) => <Chip key={c.label} {...c} />)}
        </div>
        <div className="feat-preview">
          <div className="preview-head">Positioning framework excerpt</div>
          {item.frameworkRows.map((row) => (
            <div className="preview-row" key={row.label}>
              <span>{row.label}</span>
              <span className="preview-val">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkCard({ item }) {
  return (
    <div className="work-card">
      <div className="work-type">{item.type}</div>
      <div className="work-title">{item.title}</div>
      <div className="work-desc">{item.desc}</div>
      {item.chips.map((c) => <Chip key={c.label} {...c} />)}
    </div>
  )
}

export default function Work() {
  return (
    <section id="work">
      <div className="section-header">
        <h2 className="section-title">Selected <em>work</em></h2>
        <span className="section-meta">6 projects · 2022–2025</span>
      </div>
      <div className="work-grid">
        {workItems.map((item) =>
          item.featured
            ? <FeaturedCard key={item.title} item={item} />
            : <WorkCard key={item.title} item={item} />
        )}
      </div>
    </section>
  )
}
