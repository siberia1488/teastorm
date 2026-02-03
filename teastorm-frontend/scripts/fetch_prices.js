const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

function loadEnv(file) {
  const p = path.resolve(process.cwd(), file)
  if (!fs.existsSync(p)) return {}
  return fs
    .readFileSync(p, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .reduce((acc, line) => {
      const idx = line.indexOf('=')
      if (idx === -1) return acc
      const k = line.slice(0, idx)
      const v = line.slice(idx + 1)
      acc[k] = v
      return acc
    }, {})
}

const env = Object.assign({}, loadEnv('.env.local'), loadEnv('.env'))
const key = env.STRIPE_SECRET_KEY
if (!key) {
  console.error('STRIPE_SECRET_KEY not found in .env.local or .env')
  process.exit(2)
}

const stripe = new Stripe(key, { apiVersion: '2025-12-15.clover' })

const ids = [
  'price_1SoeN1KopMGyjtmADIaXgMVX',
  'price_1SoeRkKopMGyjtmAJCljI00j',
  'price_1SoeCsKopMGyjtmA5kgMogWP',
]

;(async () => {
  const out = {}
  for (const id of ids) {
    try {
      const p = await stripe.prices.retrieve(id)
      console.log(id, '=>', p.unit_amount, p.currency, p.active)
      out[id] = {
        unit_amount: typeof p.unit_amount === 'number' ? p.unit_amount : null,
        currency: p.currency || null,
        active: Boolean(p.active),
      }
    } catch (e) {
      console.error('ERR', id, e && e.message ? e.message : e)
      out[id] = { unit_amount: null, currency: null, active: false }
    }
  }

  const outPath = path.resolve(process.cwd(), 'data', 'prices.json')
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8')
  console.log('Wrote', outPath)
})()
