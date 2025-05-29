import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
        سیستم جامع خدمات مشترکین
      </Link>
      <button className="navbar-toggler d-md-none collapsed" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="w-100"></div>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a className="nav-link px-3" href="#">خروج</a>
        </div>
      </div>
    </header>
  )
}

export default Header