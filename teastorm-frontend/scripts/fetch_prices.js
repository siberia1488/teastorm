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
  // Zhang Xiang Green Mark (2006) - 375g
  'price_1SoeN1KopMGyjtmADIaXgMVX',
  // Bulangshan Peacock - 375g
  'price_1SoeRkKopMGyjtmAJCljI00j',
  // GABA Oolong
  'price_1SoeCsKopMGyjtmA5kgMogWP',
  'price_1SoeFmKopMGyjtmADJHWLERq',
  'price_1SoeFPKopMGyjtmAtXFuhwVJ',
  // Dragon Pearls (2012)
  'price_1SoeTVKopMGyjtmAuLvHt88Z',
  'price_1SoeUJKopMGyjtmAuYJEZrVy',
  'price_1SoeU7KopMGyjtmAnCzEN6a0',
  // Shi Xiang Dan Cong
  'price_1SoeWPKopMGyjtmAEOJr5b2O',
  'price_1SoeWrKopMGyjtmALDI6aeQu',
  'price_1SoeX8KopMGyjtmAJ0icEbYm',
  // Da Hong Pao
  'price_1SoeZxKopMGyjtmAbTpyVTgP',
  'price_1SoeaNKopMGyjtmAftvXkjvb',
  'price_1SoeaiKopMGyjtmA9Ra2u7Ww',
  // Milk Oolong (Jin Xuan)
  'price_1Soed7KopMGyjtmAXOljHrBH',
  'price_1SoedNKopMGyjtmAt5dn1XR9',
  'price_1SoedlKopMGyjtmACDYl1YTz',
  // Dian Hong Mao Feng
  'price_1SoeftKopMGyjtmA6KXiAJxy',
  'price_1SoegIKopMGyjtmAhOp4ymVL',
  'price_1SoegSKopMGyjtmAt6bWkdrF',
  // Lincang Gongting Shu (2018)
  'price_1Soek8KopMGyjtmAJ6KbApUF',
  'price_1SoekVKopMGyjtmAHjV67H0u',
  'price_1SoekqKopMGyjtmAlvvTb80H',
  // Mao Jian Wild
  'price_1SoemOKopMGyjtmAnc72NFEh',
  'price_1SoemgKopMGyjtmAL1Yfb4VI',
  'price_1SoemqKopMGyjtmAyVT17cYY',
  // Lao Shou Mei (2018)
  'price_1SoeoQKopMGyjtmAIDzePidX',
  'price_1SoeohKopMGyjtmArta2bTed',
  'price_1SoeouKopMGyjtmACRLokIY9',
  // Yue Guang Bai
  'price_1SoeqQKopMGyjtmAjvIunfy4',
  'price_1SoeqgKopMGyjtmApw9qioVa',
  'price_1SoeqtKopMGyjtmAE0W3t8XC',
  // Zhengshan Xiaozhong
  'price_1SoesZKopMGyjtmA1lH0hCq7',
  'price_1SoesnKopMGyjtmAKcApH21F',
  'price_1SoesxKopMGyjtmAfjITBOKM',
  // Longjing
  'price_1SoeuQKopMGyjtmAHDkBLvn9',
  'price_1SoeugKopMGyjtmAX57l3e1g',
  'price_1SoeupKopMGyjtmAMYxxNhvg',
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
