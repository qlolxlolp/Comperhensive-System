function Services() {
  return (
    <div className="services">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">خدمات</h1>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">درخواست انشعاب جدید</h5>
              <p className="card-text">ثبت درخواست برای انشعاب جدید برق</p>
              <button className="btn btn-primary">ثبت درخواست</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">تغییر نام</h5>
              <p className="card-text">درخواست تغییر نام مشترک</p>
              <button className="btn btn-primary">ثبت درخواست</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">اصلاح انشعاب</h5>
              <p className="card-text">درخواست تغییر در مشخصات انشعاب</p>
              <button className="btn btn-primary">ثبت درخواست</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services