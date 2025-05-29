function Reports() {
  return (
    <div className="reports">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">گزارشات</h1>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">گزارش مصرف ماهانه</h5>
              <canvas id="consumptionChart"></canvas>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">وضعیت درخواست‌ها</h5>
              <canvas id="requestsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports