const items = [
  {
    num: '01',
    title: 'Customer first, always',
    desc: 'Every positioning decision starts with what the buyer already believes before we show up.',
  },
  {
    num: '02',
    title: 'Narrative over features',
    desc: 'I look for the story that makes the market move — then build the messaging architecture around it.',
  },
  {
    num: '03',
    title: 'Sales as an input',
    desc: "I treat reps as the best research channel. If they can't tell the story, the story isn't ready.",
  },
]

export default function Approach() {
  return (
    <section className="approach-section" id="thinking">
      <h2 className="approach-title">
        How I <em>think</em>
      </h2>
      <div className="approach-grid">
        {items.map((item) => (
          <div key={item.num}>
            <div className="approach-num">{item.num}</div>
            <div className="approach-item-title">{item.title}</div>
            <div className="approach-item-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
