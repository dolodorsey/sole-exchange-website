import Link from 'next/link';
import ExchangeForm from './ExchangeForm';

const impact = [
  ['GIVE','Quality sneakers enter a documented intake.'],
  ['PREPARE','Pairs are inspected, cleaned, sized and photographed.'],
  ['MATCH','Requests are reviewed around fit, timing and need.'],
  ['PLACE','Approved pairs move through a responsible handoff.'],
];

const priorities = ['Students needing school or PE shoes','People re-entering the workforce','Families in temporary housing','Community sports and youth programs','Refugees and recent arrivals'];

const archive = [
  ['1odzGxCBItZXA0LWunNPaSeo7HlNjuKHh','Community campaign'],
  ['1QloyRtB_PbLnpbFMmdcChP3ZZcObt1XK','Sole Exchange archive'],
  ['1e9ZGGJP6-hKgVRADfquM4ceAWpfxWMZF','Partnership activation'],
  ['1t_MVq458fyVq5mrrHgIuZujP1gYAIlK0','Give-back campaign'],
];

function Header(){return <header className="siteHeader"><Link href="/" className="brandMark"><img src="/brand/sole-logo.png" alt="The Sole Exchange"/></Link><nav><Link href="/about">About</Link><a href="#how">How it works</a><Link href="/impact">Impact</Link><Link href="/partners">Partners</Link><Link href="/faq">FAQ</Link></nav><div className="headerActions"><a href="#exchange-form">Make a donation</a><Link href="/request">Submit a request</Link></div></header>}

export default function Home(){return <main className="soleHome"><Header/>
  <section className="liveHero"><div className="heroImage"><img src="/api/media/drive/1lv25dsoUvojYieIFxmd5IZLIndiGenkU" alt="Sole Exchange sneaker donation movement"/><span className="heroShade"></span></div><div className="heroContent"><span>NO-COST SNEAKER DONATION & REQUEST HUB</span><h1>GIVE YOUR SNEAKERS<br/>A SECOND LIFE.</h1><p>Sole Exchange connects people who have quality sneakers with people who genuinely need them. No resale. No bidding. Just community, care, and clean kicks moving to good homes.</p><div><a className="goldButton" href="#exchange-form">Start a donation ↗</a><Link href="/request">Request a pair</Link></div></div><aside><small>THE EXCHANGE</small><b>GIVE</b><i>↔</i><b>RECEIVE</b></aside></section>

  <section className="process" id="how"><header><span>HOW SOLE EXCHANGE WORKS</span><h2>A SIMPLE PATH FROM<br/><em>CLOSET TO NEW OWNER.</em></h2><p>Whether you’re giving or receiving, the process stays clear, safe and human-first.</p></header><div className="processGrid"><article><b>01</b><h3>You reach out</h3><p>Complete the donation or request flow with size, condition, timing and only the information needed to act.</p></article><article><b>02</b><h3>We match & prepare</h3><p>Pairs are inspected, cleaned, photographed, cataloged and matched around fit, need and available capacity.</p></article><article><b>03</b><h3>Pickup or delivery</h3><p>Approved exchanges move through a confirmed local drop, partner organization, shipment or scheduled pickup.</p></article></div></section>

  <ExchangeForm/>

  <section className="impactBand"><div>{impact.map(([a,b],i)=><article key={a}><small>0{i+1}</small><strong>{a}</strong><span>{b}</span></article>)}</div></section>

  <section className="impactStory"><div className="impactCopy"><span>IMPACT YOU’RE PART OF</span><h2>EVERY PAIR MOVES<br/><em>A REAL STORY FORWARD.</em></h2><p>From first-day-of-school confidence to safer work shifts, a usable pair of sneakers can remove one small but real barrier from somebody’s day.</p><ul>{priorities.map(item=><li key={item}>{item}</li>)}</ul><Link href="/impact">Open the impact standard ↗</Link></div><div className="impactVisual"><img src="/api/media/drive/1scBoa6oPh87YboU_gNm9s2exXqzQl50o" alt="Sole Exchange community impact"/></div></section>

  <section className="aboutMovement"><div className="aboutImage"><img src="/brand/drive-archive.png" alt="Air Force One’s Drive archive"/></div><div><span>ABOUT SOLE EXCHANGE</span><h2>FROM A SNEAKER CONVERSATION<br/><em>TO A REPEATABLE MOVEMENT.</em></h2><p>Sole Exchange started with a simple idea: sneakers carry stories, and usable pairs should keep moving. The platform is becoming a repeatable system for drives, volunteers, schools, partner organizations, logistics and dignified placement.</p><div className="quote">“Sneaker culture, put to work.”</div><Link href="/about">Read the mission ↗</Link></div></section>

  <section className="archiveSection"><header><span>THE EXCHANGE IN MOTION</span><h2>REAL CAMPAIGNS.<br/><em>REAL COMMUNITY.</em></h2><p>Campaign and partnership imagery from the Sole Exchange creative archive.</p></header><div className="archiveGrid">{archive.map(([id,label],i)=><figure key={id}><img src={`/api/media/drive/${id}`} alt={label}/><figcaption><b>{String(i+1).padStart(2,'0')}</b><span>{label}</span></figcaption></figure>)}</div></section>

  <section className="availability"><div><span>AVAILABLE PAIRS</span><h2>NO FAKE INVENTORY.</h2><p>Pairs should only appear as claimable after intake, condition review, sizing and availability are verified. Until that inventory feed is live, Sole Exchange will not publish template products or pretend a pair is available.</p></div><div className="availabilityCard"><small>CURRENT STANDARD</small><strong>VERIFY → SIZE → PUBLISH → MATCH</strong><p>Need a pair now? Submit a request and let the team match from verified inventory.</p><Link href="/request">Request sneakers ↗</Link></div></section>

  <section className="why"><header><span>WHY CHOOSE THE EXCHANGE</span><h2>TRUST IS PART<br/><em>OF THE PRODUCT.</em></h2></header><div><article><b>01</b><h3>Human review</h3><p>No automated promise of inventory or placement. A person confirms what can actually happen.</p></article><article><b>02</b><h3>Responsible handoff</h3><p>Collection, storage, transport and placement should have clear owners at every stage.</p></article><article><b>03</b><h3>Dignity over content</h3><p>Recipients are people, not marketing props. Privacy, fit, choice and respect come first.</p></article><article><b>04</b><h3>Documented impact</h3><p>Published impact should come from reconciled intake and distribution data—not decorative counters.</p></article></div></section>

  <section className="testimonials"><div><span>WHY IT MATTERS</span><h2>THE PAIR IS SMALL.<br/><em>THE MOMENT ISN’T.</em></h2></div><blockquote>“A clean pair can change how somebody walks into school, work, practice or the next chapter of their life.”</blockquote></section>

  <section className="finalCta"><img src="/api/media/drive/1-OExVn03YMpvP5dqL8oLWMU5gSqu_dti" alt="Sole Exchange"/><div><span>READY TO GIVE OR RECEIVE A PAIR?</span><h2>ONE SHORT FORM<br/>STARTS THE EXCHANGE.</h2><p>Tell us what you have or what you need. The team confirms the next responsible move.</p><div><a className="goldButton" href="#exchange-form">Start a donation ↗</a><Link href="/request">Submit a request ↗</Link></div></div></section>

  <footer className="soleFooter"><div><img src="/brand/sole-logo.png" alt="The Sole Exchange"/><p>Sneaker culture, put to work.</p></div><nav><Link href="/about">About</Link><Link href="/give">Donate</Link><Link href="/request">Request</Link><Link href="/volunteer">Volunteer</Link><Link href="/partners">Partners</Link><Link href="/faq">FAQ</Link></nav><span>© 2026 The Sole Exchange</span></footer>
</main>}
