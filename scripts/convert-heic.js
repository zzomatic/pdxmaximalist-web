const fs = require('fs')
const path = require('path')
const convert = require('heic-convert')

const FLYERS_DIR = path.join(__dirname, '../public/flyers')

async function main() {
  const files = fs.readdirSync(FLYERS_DIR)
  const heicFiles = files.filter(f => /\.heic$/i.test(f))

  if (heicFiles.length === 0) {
    console.log('No HEIC files found.')
    return
  }

  console.log(`Found ${heicFiles.length} HEIC files to convert...`)

  for (const file of heicFiles) {
    const base = path.basename(file, path.extname(file))
    const jpgName = base + '.jpg'
    const heicPath = path.join(FLYERS_DIR, file)
    const jpgPath = path.join(FLYERS_DIR, jpgName)

    if (fs.existsSync(jpgPath)) {
      console.log(`Skipping ${file} (${jpgName} already exists)`)
      continue
    }

    console.log(`Converting ${file} -> ${jpgName}`)
    const inputBuffer = new Uint8Array(fs.readFileSync(heicPath))
    const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.9 })
    fs.writeFileSync(jpgPath, Buffer.from(outputBuffer))
    fs.unlinkSync(heicPath)
  }

  console.log('Done.')
}

main().catch(err => { console.error(err); process.exit(1) })
