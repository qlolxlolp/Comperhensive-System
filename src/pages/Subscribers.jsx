function Subscribers() {
  return (
    <div className="subscribers">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">مدیریت مشترکین</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary">
            <i className="fas fa-plus"></i>
            افزودن مشترک جدید
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>شماره اشتراک</th>
              <th>آدرس</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>علی محمدی</td>
              <td>12345678</td>
              <td>تهران، خیابان ولیعصر</td>
              <td><span className="badge bg-success">فعال</span></td>
              <td>
                <button className="btn btn-sm btn-info ms-1">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-sm btn-danger">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Subscribers