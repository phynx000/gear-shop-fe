import React from 'react';

const CompanyServices = () => {
    return (
        <div className="container-fluid my-4" id="dichvucongty">
            <h3 className="display-4">Chào mừng đến với TopBag</h3>
            <div className="row">
                {/* Dịch vụ 1 - Miễn phí vận chuyển */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 my-2 px-2">
                    <div className="card">
                        <div className="card-body">
                            <i className="fa-solid fa-truck-fast"></i>
                            <h5>Miễn phí vận chuyển</h5>
                            <p>Chúng tôi cung cấp dịch vụ vận chuyển miễn phí trong nội thành để mang đến sự tiện lợi và tiết kiệm cho quý khách hàng.</p>
                        </div>
                    </div>
                </div>

                {/* Dịch vụ 2 - Tư vấn 24/7 */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 my-2 px-2">
                    <div className="card">
                        <div className="card-body">
                            <i className="fa-solid fa-headset"></i>
                            <h5>Tư vấn 24/7</h5>
                            <p>Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn 24/7, bất kể thời điểm nào trong ngày.</p>
                        </div>
                    </div>
                </div>

                {/* Dịch vụ 3 - Sản phẩm chất lượng */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 my-2 px-2">
                    <div className="card">
                        <div className="card-body">
                            <i className="fa-solid fa-medal"></i>
                            <h5>Sản phẩm chất lượng</h5>
                            <p>Chúng tôi cam kết cung cấp các sản phẩm chất lượng cao, đảm bảo sự an toàn và đáp ứng được các tiêu chuẩn về chất lượng và hiệu suất.</p>
                        </div>
                    </div>
                </div>

                {/* Dịch vụ 4 - Nhiều ưu đãi khuyến mãi */}
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 my-2 px-2">
                    <div className="card">
                        <div className="card-body">
                            <i className="fa-solid fa-ticket"></i>
                            <h5>Nhiều ưu đãi khuyến mãi</h5>
                            <p>Chúng tôi thường xuyên có nhiều chương trình ưu đãi và khuyến mãi hấp dẫn, giúp bạn tiết kiệm chi phí mua sắm và có được những sản phẩm tốt nhất.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyServices;
