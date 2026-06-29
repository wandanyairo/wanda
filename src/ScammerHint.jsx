import { useState } from 'react'

const SCAMMERS = [
  { name: 'Anna Delvey', desc: 'No explanation needed', url: 'https://en.wikipedia.org/wiki/Anna_Delvey' },
  { name: 'Doris Payne', desc: 'Jewelry Heist Queen', url: 'https://en.wikipedia.org/wiki/Doris_Payne' },
  { name: 'Imelda Marcos', desc: 'Politics', url: 'https://en.wikipedia.org/wiki/Imelda_Marcos' },
  { name: 'Jho Low', desc: 'Sovereign Funds', url: 'https://en.wikipedia.org/wiki/Jho_Low' },
  { name: 'Nirav Modi', desc: 'Jewelry Innovator', url: 'https://en.wikipedia.org/wiki/Nirav_Modi' },
  { name: 'Razzlekhan', desc: 'Crypto', url: 'https://en.wikipedia.org/wiki/Heather_Morgan' },
  { name: 'Richard Vallières', desc: 'Maple Syrup', url: 'https://en.wikipedia.org/wiki/2012_Quebec_maple_syrup_heist' },
  { name: 'Rita Crundwell', desc: 'Comptroller Horse Lady', url: 'https://en.wikipedia.org/wiki/Rita_Crundwell' },
  { name: 'Rudy Kurniawan', desc: 'Wine!', url: 'https://en.wikipedia.org/wiki/Rudy_Kurniawan' },
  { name: 'Shaman Durek Verrett', desc: 'Romance etc.', url: 'https://en.wikipedia.org/wiki/Durek_Verrett' },
]

export default function ScammerHint() {
  const [open, setOpen] = useState(false)
  return (
    <div className="scammer-hint">
      <div className="scammer-header">
        <span className="scammer-label">Some of my favourite scammers</span>
        <button className="scammer-toggle" onClick={() => setOpen(o => !o)}>
          {open ? 'Hide' : 'Show'} <span className={`scammer-caret${open ? ' scammer-caret--open' : ''}`} />
        </button>
      </div>
      {open && (
        <ul className="scammer-list">
          {SCAMMERS.map(s => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="scammer-link">
                {s.name}
              </a>{' '}
              — {s.desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
