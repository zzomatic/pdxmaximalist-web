const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const FLYERS_DIR = path.join(__dirname, '../public/flyers')
const MAX_DIM = 1200
const JPEG_QUALITY = 80
const SKIP_BELOW_BYTES = 100 * 1024 // skip files already under 100KB

async function compressFile(filePath, outPath, label) {
  const before = fs.statSync(filePath).size
  if (before < SKIP_BELOW_BYTES && filePath === outPath) {
    console.log(`Skipping ${label} (${(before / 1024).toFixed(0)}KB — already small)`)
    return
  }
  await sharp(filePath)
    .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY })
    .toFile(outPath + '.tmp')
  fs.renameSync(outPath + '.tmp', outPath)
  if (filePath !== outPath) fs.unlinkSync(filePath)
  const after = fs.statSync(outPath).size
  console.log(`${label}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`)
}

async function main() {
  const files = fs.readdirSync(FLYERS_DIR)
  const jpgs = files.filter(f => /\.(jpg|jpeg)$/i.test(f))
  const pngs = files.filter(f => /\.png$/i.test(f))

  console.log(`Found ${jpgs.length} JPGs, ${pngs.length} PNGs`)

  for (const file of jpgs) {
    const filePath = path.join(FLYERS_DIR, file)
    await compressFile(filePath, filePath, file)
  }

  for (const file of pngs) {
    const pngPath = path.join(FLYERS_DIR, file)
    const base = path.basename(file, path.extname(file))
    const jpgPath = path.join(FLYERS_DIR, base + '.jpg')
    if (fs.existsSync(jpgPath)) {
      console.log(`Skipping ${file} (${base}.jpg already exists)`)
      fs.unlinkSync(pngPath)
      continue
    }
    await compressFile(pngPath, jpgPath, `${file} -> ${base}.jpg`)
  }

  console.log('Done.')
}

main().catch(err => { console.error(err); process.exit(1) })
