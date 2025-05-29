import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
              <i className="fas fa-home"></i>
              داشبورد
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/subscribers' ? 'active' : ''}`} to="/subscribers">
              <i className="fas fa-users"></i>
              مشترکین
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">
              <i className="fas fa-bolt"></i>
              خدمات
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`} to="/reports">
              <i className="fas fa-chart-bar"></i>
              گزارشات
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar