import React from 'react';

const ProductCategories = () => {
    const categories = [
        {
            title: 'Vali kéo du lịch',
            image: '../img/vali/keodulich/keodulich_1.jpg',
            link: '../html/validulich.html',
        },
        {
            title: 'Vali nhôm nguyên khối',
            image: '../img/vali/nhomnguyenkhoi/nhomnguyenkhoi_1.jpg',
            link: '../html/valinhomnguyenkhoi.html',
        },
        {
            title: 'Vali kéo vải dù',
            image: '../img/vali/keovaidu/keovaidu_1.jpg',
            link: '../html/valikeovaidu.html',
        },
        {
            title: 'Vali kéo trẻ em',
            image: '../img/vali/keotreem/keotreem_1.jpg',
            link: '../html/valikeotreem.html',
        },
        {
            title: 'Vali kéo nhựa',
            image: '../img/vali/keonhua/keonhua_1.jpg',
            link: '../html/valikeonhua.html',
        },
        {
            title: 'Vali khung nhôm khóa sập',
            image: '../img/vali/khungnhomkhoasap/khungnhommkhoasap_1.jpg',
            link: '../html/valikhungnhomkhoasap.html',
        },
        {
            title: 'Vali kéo siêu nhẹ',
            image: '../img/vali/keosieunhe/keosieunhe_1.jpg',
            link: '../html/valikeosieunhe.html',
        },
    ];

    return (
        <div className="container-fluid my-4" id="list-icon-category">
            <h3 className="display-4">DANH MỤC</h3>
            <div className="row p-2">
                {categories.map((category, index) => (
                    <div className="col col-lg col-md-4 col-sm-4 col-4 my-1 px-1" key={index}>
                        <a href={category.link} className="text-decoration-none">
                            <div className="home-category">
                                <div className="home-category-img">
                                    <img className="img-fluid" src={category.image} alt={category.title} />
                                </div>
                                <div className="home-category-title text-center">
                                    <span>{category.title}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;
