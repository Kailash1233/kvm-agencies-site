import { useState } from 'react'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema, webPageSchema } from '~/lib/schema'
import { waLink } from '~/data/site'
import { Breadcrumbs, CallBtn, WaBtn, WaIcon } from '~/components/ui'

const FAQS = [
  { q: 'How many cement bags are needed per sq ft for a house?', a: 'About 0.4 to 0.45 bags per sq ft of built-up area for a typical RCC framed house, covering all stages.' },
  { q: 'How many cement bags are needed for a 1000 sq ft slab of 5 inch thickness?', a: 'About 95 bags for M20 (1:1.5:3) nominal mix, plus about 1.75 units of M Sand and 3.5 units of 20 mm jally (add ~5% wastage).' },
  { q: 'What is the dry volume factor 1.54?', a: 'Wet concrete volume is multiplied by about 1.54 to get the dry volume of materials, because dry materials contain voids and bulk up.' },
]

export function calculatorHead() {
  const title = 'Construction Material Calculator – Cement, Sand, Jally, Steel per Sq Ft & Slab'
  const description =
    'Free calculator: estimate cement bags, M Sand, jally, TMT steel and bricks for your house (per sq ft) or roof slab concrete (M15/M20). By KVM Agencies, Chengalpattu.'
  return seo({
    title,
    description,
    path: '/material-calculator',
    lang: 'en',
    jsonLd: [
      { ...webPageSchema({ path: '/material-calculator', name: title, description, lang: 'en' }), '@type': ['WebPage', 'WebApplication'], applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Material Calculator', path: '/material-calculator' },
      ]),
      faqSchema(FAQS),
    ],
  })
}

const r = (n: number, d = 0) => (Number.isFinite(n) ? n.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d }) : '–')

const MIXES: Record<string, [number, number, number]> = {
  'M10 (1:3:6)': [1, 3, 6],
  'M15 (1:2:4)': [1, 2, 4],
  'M20 (1:1.5:3)': [1, 1.5, 3],
}

export function CalculatorPage() {
  const [area, setArea] = useState(1000)
  const [slabArea, setSlabArea] = useState(1000)
  const [thick, setThick] = useState(5)
  const [mix, setMix] = useState('M20 (1:1.5:3)')
  const [wallArea, setWallArea] = useState(100)

  // House thumb rules (per sq ft built-up)
  const house = {
    cement: [area * 0.4, area * 0.45],
    sand: [(area * 1.8) / 100, (area * 2) / 100],
    jally: [(area * 1.3) / 100, (area * 1.4) / 100],
    steel: [(area * 3.5) / 1000, (area * 4.5) / 1000],
    bricks: [area * 8, area * 10],
  }

  // Slab
  const wetM3 = slabArea * (thick / 12) * 0.0283168
  const dry = wetM3 * 1.54
  const [c, s, a] = MIXES[mix]
  const sum = c + s + a
  const cementBags = ((dry * c) / sum) * 1440 / 50
  const sandUnits = ((dry * s) / sum) * 35.3147 / 100
  const jallyUnits = ((dry * a) / sum) * 35.3147 / 100

  const msg =
    `Hi KVM Agencies, I used your calculator.\n` +
    `House ${area} sq ft: cement ~${r(house.cement[1])} bags, sand ~${r(house.sand[1], 1)} units, jally ~${r(house.jally[1], 1)} units, steel ~${r(house.steel[1], 1)} T.\n` +
    `Slab ${slabArea} sq ft x ${thick}" (${mix}): cement ~${r(cementBags * 1.05)} bags, M Sand ~${r(sandUnits * 1.05, 1)} units, 20mm jally ~${r(jallyUnits * 1.05, 1)} units.\n` +
    `Please share today's rate with delivery.`

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Material Calculator', path: '/material-calculator' },
        ]}
      />
      <div className="wrap narrow">
        <h1>Construction Material Calculator</h1>
        <p className="answer">
          <strong>Quick answer</strong>
          For a typical RCC house: cement 0.4–0.45 bags, sand 1.8–2 cft, jally 1.3–1.4 cft, steel 3.5–4.5 kg and 8–10 bricks per sq ft of built-up
          area. Enter your numbers below for an instant estimate, then WhatsApp it to us for today's price.
        </p>

        <h2>1. Whole house estimate (thumb rule)</h2>
        <form className="enquiry" onSubmit={(e) => e.preventDefault()}>
          <label>
            Built-up area (sq ft)
            <input type="number" min={100} step={50} value={area} onChange={(e) => setArea(Number(e.target.value))} />
          </label>
        </form>
        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Estimated quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/products/cement">Cement</a></td>
              <td>{r(house.cement[0])} – {r(house.cement[1])} bags</td>
            </tr>
            <tr>
              <td><a href="/products/m-sand">Sand (M Sand + P Sand)</a></td>
              <td>{r(house.sand[0], 1)} – {r(house.sand[1], 1)} units (100 cft)</td>
            </tr>
            <tr>
              <td><a href="/products/jally-blue-metal">Jally</a></td>
              <td>{r(house.jally[0], 1)} – {r(house.jally[1], 1)} units</td>
            </tr>
            <tr>
              <td><a href="/products/tmt-steel">TMT steel</a></td>
              <td>{r(house.steel[0], 2)} – {r(house.steel[1], 2)} tonnes</td>
            </tr>
            <tr>
              <td><a href="/products/chamber-bricks">Bricks</a> (if brick walls)</td>
              <td>{r(house.bricks[0])} – {r(house.bricks[1])} nos</td>
            </tr>
            <tr>
              <td><a href="/products/binding-wire">Binding wire</a></td>
              <td>{r(house.steel[0] * 10)} – {r(house.steel[1] * 10)} kg</td>
            </tr>
          </tbody>
        </table>

        <h2>2. Roof slab concrete</h2>
        <form className="enquiry" onSubmit={(e) => e.preventDefault()}>
          <label>
            Slab area (sq ft)
            <input type="number" min={10} step={10} value={slabArea} onChange={(e) => setSlabArea(Number(e.target.value))} />
          </label>
          <label>
            Thickness (inches)
            <input type="number" min={3} max={12} step={0.5} value={thick} onChange={(e) => setThick(Number(e.target.value))} />
          </label>
          <label>
            Mix
            <select value={mix} onChange={(e) => setMix(e.target.value)}>
              {Object.keys(MIXES).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </form>
        <table>
          <tbody>
            <tr>
              <th>Wet concrete volume</th>
              <td>{r(wetM3, 2)} m³ ({r(wetM3 * 35.3147)} cft)</td>
            </tr>
            <tr>
              <th>Cement (incl. 5% wastage)</th>
              <td>{r(cementBags * 1.05)} bags</td>
            </tr>
            <tr>
              <th>M Sand (incl. 5%)</th>
              <td>{r(sandUnits * 1.05, 2)} units</td>
            </tr>
            <tr>
              <th>20 mm jally (incl. 5%)</th>
              <td>{r(jallyUnits * 1.05, 2)} units</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Walling – blocks or bricks needed</h2>
        <form className="enquiry" onSubmit={(e) => e.preventDefault()}>
          <label>
            Wall area (sq ft, length × height, minus openings)
            <input type="number" min={10} step={10} value={wallArea} onChange={(e) => setWallArea(Number(e.target.value))} />
          </label>
        </form>
        <table>
          <tbody>
            <tr>
              <th><a href="/products/chamber-bricks">Bricks – 9" wall</a></th>
              <td>{r(wallArea * 9)} – {r(wallArea * 11)} nos</td>
            </tr>
            <tr>
              <th>Bricks – 4.5" wall</th>
              <td>{r(wallArea * 4.5)} – {r(wallArea * 5.5)} nos</td>
            </tr>
            <tr>
              <th><a href="/products/hollow-blocks">Hollow blocks (16"×8")</a></th>
              <td>{r(wallArea * 1.125 * 1.03)} nos (incl. 3%)</td>
            </tr>
            <tr>
              <th><a href="/products/aac-blocks">AAC blocks (600×200 mm)</a></th>
              <td>{r((wallArea / 1.2917) * 1.03)} nos (incl. 3%)</td>
            </tr>
          </tbody>
        </table>

        <div className="cta-box">
          <h2>Get today's price for this list</h2>
          <p>Send these quantities to us on WhatsApp — we reply with today's rates including delivery to your site.</p>
          <div className="cta-row">
            <a className="btn btn-wa btn-lg" href={waLink(msg)} target="_blank" rel="noopener" data-track="whatsapp">
              <WaIcon /> Send estimate on WhatsApp
            </a>
            <CallBtn lang="en" big label="Call 91507 51905" />
          </div>
        </div>

        <h2>How this calculator works</h2>
        <ul>
          <li>House estimates use common Indian thumb rules for RCC framed residential buildings. Actual quantities depend on design, soil and number of floors.</li>
          <li>Slab: wet volume × 1.54 = dry volume; cement density 1440 kg/m³; 1 bag = 50 kg; 1 unit = 100 cft.</li>
          <li>Always confirm final quantities with your engineer's drawings and bar bending schedule.</li>
        </ul>
        <p>
          Learn more: <a href="/blog/construction-material-calculator-per-sq-ft">How much cement, sand, jally & steel per sq ft</a>
        </p>
        <section>
          <h2>Frequently asked questions</h2>
          {FAQS.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <div>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </section>
        <div className="cta-row">
          <WaBtn lang="en" msg="Hi KVM Agencies, I need help estimating materials." label="Ask our Technical Advisor" />
        </div>
      </div>
    </>
  )
}
