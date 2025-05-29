function Dashboard() {
  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">داشبورد</h1>
      </div>
      
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">تعداد کل مشترکین</h5>
              <p className="card-text h2">12,450</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">درخواست‌های جاری</h5>
              <p className="card-text h2">45</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">قطعی‌های اخیر</h5>
              <p className="card-text h2">3</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">مصرف امروز</h5>
              <p className="card-text h2">2.4 MW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard