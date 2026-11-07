import { Link } from '@tanstack/react-router'
import { CallBtn, WaBtn, AreaChips } from './ui'

export default function NotFound() {
  return (
    <div className="wrap narrow">
      <h1>Page not found</h1>
      <p>The page you are looking for has moved. Our old online store kvmcmart.in is now KVM Agencies. Call or WhatsApp us for any construction material in Chengalpattu.</p>
      <div className="cta-row">
        <CallBtn lang="en" big />
        <WaBtn lang="en" big msg="Hi KVM Agencies, I need construction materials." />
      </div>
      <p>
        <Link to="/">Home</Link> · <Link to="/products">All products</Link> · <Link to="/areas">Areas we serve</Link> · <Link to="/contact">Contact</Link>
      </p>
      <AreaChips lang="en" />
    </div>
  )
}
