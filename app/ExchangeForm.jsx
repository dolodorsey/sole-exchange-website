'use client';

import { useMemo, useState } from 'react';

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

export default function ExchangeForm() {
  const [mode, setMode] = useState('donate_pair');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const title = useMemo(() => mode === 'request_pair' ? 'Request a pair' : mode === 'donate_money' ? 'Fund the exchange' : 'Donate a pair', [mode]);

  async function submit(event) {
    event.preventDefault();
    setSending(true);
    setStatus('Sending your request…');
    try {
      const data = new FormData(event.currentTarget);
      data.set('submission_type', mode);
      const response = await fetch('/api/exchange', { method: 'POST', body: data });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'The request could not be sent.');
      event.currentTarget.reset();
      setStep(1);
      setStatus('Received. A Sole Exchange team member will review and follow up.');
    } catch (error) {
      setStatus(error.message || 'The request could not be sent. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return <section className="exchangeFormSection" id="exchange-form">
    <div className="exchangeFormIntro">
      <span>START WITH A QUICK FORM</span>
      <h2>Give. Request. <em>Move a pair.</em></h2>
      <p>Choose the path, give us the minimum information needed to route it responsibly, and we’ll confirm the next step. No resale. No bidding.</p>
      <div className="formTrust"><b>01</b><span>Human review</span><b>02</b><span>Verified handoff</span><b>03</b><span>Dignity first</span></div>
    </div>
    <form className="exchangeForm" onSubmit={submit} encType="multipart/form-data">
      <div className="formTop"><div><small>STEP {step} OF 3</small><strong>{title}</strong></div><div className="formProgress"><i className={step >= 1 ? 'on' : ''}></i><i className={step >= 2 ? 'on' : ''}></i><i className={step >= 3 ? 'on' : ''}></i></div></div>

      {step === 1 && <div className="formPanel">
        <h3>How would you like to move the exchange?</h3>
        <div className="formChoices">
          <button type="button" className={mode === 'donate_pair' ? 'selected' : ''} onClick={() => setMode('donate_pair')}><span>PAIR</span><b>Donate sneakers</b><small>New or gently worn pairs</small></button>
          <button type="button" className={mode === 'request_pair' ? 'selected' : ''} onClick={() => setMode('request_pair')}><span>NEED</span><b>Request sneakers</b><small>For yourself or a community need</small></button>
          <button type="button" className={mode === 'donate_money' ? 'selected' : ''} onClick={() => setMode('donate_money')}><span>FUND</span><b>Support operations</b><small>Cleaning, logistics and placement</small></button>
        </div>
        {mode === 'donate_money' ? <label>Contribution amount<input name="amount" type="number" min="10" step="1" placeholder="$10 minimum" required /></label> : <div className="formGrid">
          <label>Shoe size<input name="shoe_size" placeholder="Example: Men’s 10 / Women’s 11.5" required /></label>
          <label>Pair count<input name="pair_count" type="number" min="1" max="1000" defaultValue="1" required /></label>
          {mode === 'donate_pair' && <label>Condition<select name="condition" required defaultValue=""><option value="" disabled>Choose condition</option><option>New</option><option>Like New</option><option>Good</option><option>Fair</option></select></label>}
          {mode === 'request_pair' && <label>Primary need<select name="need_type" required defaultValue=""><option value="" disabled>Choose need</option><option>School</option><option>Work</option><option>Sports</option><option>Housing transition</option><option>Community program</option><option>Other</option></select></label>}
        </div>}
        {mode === 'donate_pair' && <label>Pictures of the pair <small>Optional · up to 5 files</small><input name="pair_photos" type="file" accept="image/*" multiple /></label>}
        <button className="formNext" type="button" onClick={() => setStep(2)}>Next ↗</button>
      </div>}

      {step === 2 && <div className="formPanel">
        <h3>Who should we follow up with?</h3>
        <div className="formGrid">
          <label>First name<input name="first_name" required autoComplete="given-name" /></label>
          <label>Last name<input name="last_name" required autoComplete="family-name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
          <label className="wide">Organization <small>Optional</small><input name="organization" autoComplete="organization" /></label>
        </div>
        <div className="formActions"><button type="button" onClick={() => setStep(1)}>← Back</button><button className="formNext" type="button" onClick={() => setStep(3)}>Next ↗</button></div>
      </div>}

      {step === 3 && <div className="formPanel">
        <h3>How should the handoff work?</h3>
        <div className="formGrid">
          <label>Delivery option<select name="delivery_option" defaultValue="dropoff" required><option value="dropoff">Drop-off at confirmed location</option><option value="delivery">Deliver to recipient / organization</option><option value="pickup">Request pickup</option><option value="ship">Ship</option></select></label>
          <label>City<input name="city" required autoComplete="address-level2" /></label>
          <label>State<select name="state" required defaultValue="GA">{states.map(s => <option key={s}>{s}</option>)}</select></label>
          <label>ZIP<input name="zip" inputMode="numeric" autoComplete="postal-code" /></label>
          <label className="wide">Address <small>Only if needed for pickup/delivery</small><input name="address" autoComplete="street-address" /></label>
          <label className="wide">Details<textarea name="details" rows="5" maxLength="4000" required placeholder={mode === 'request_pair' ? 'Tell us who the pair is for, timing, size details, and why it matters.' : 'Anything we should know about the pair, timing, pickup, or handoff.'}></textarea></label>
        </div>
        <label className="consent"><input type="checkbox" name="consent" value="yes" required /><span>I understand submission does not guarantee inventory, pickup, delivery, reimbursement, or approval. Sole Exchange will confirm the next step.</span></label>
        <div className="formActions"><button type="button" onClick={() => setStep(2)}>← Back</button><button className="formSubmit" disabled={sending} type="submit">{sending ? 'Sending…' : 'Submit request ↗'}</button></div>
      </div>}
      {status && <p className="formStatus" role="status">{status}</p>}
    </form>
  </section>;
}
