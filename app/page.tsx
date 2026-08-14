
import fs from 'fs'
import path from 'path'
import LandingPage from './LandingPage'

export default function Page() {
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'site-body.html'), 'utf8')
  return <LandingPage html={html} />
}
