import { Empty } from "antd";
import classNames from "classnames";
import React, { useEffect } from "react";

const ProductImageZoom = ({ image }) => {
  useEffect(() => {
    if ($.fn.elevateZoom && image?.length > 0) {
      $("#product-zoom").elevateZoom({
        gallery: "product-zoom-gallery",
        galleryActiveClass: "active",
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 400,
        zoomWindowFadeOut: 400,
        responsive: true,
      });

      // On click change thumbs active item
      $(".product-gallery-item").on("click", function (e) {
        $("#product-zoom-gallery").find("a").removeClass("active");
        $(this).addClass("active");

        e.preventDefault();
      });

      var ez = $("#product-zoom").data("elevateZoom");

      // Open popup - product images
      $("#btn-product-gallery").on("click", function (e) {
        if ($.fn.magnificPopup) {
          $.magnificPopup.open(
            {
              items: ez.getGalleryList(),
              type: "image",
              gallery: {
                enabled: true,
              },
              fixedContentPos: false,
              removalDelay: 600,
              closeBtnInside: false,
            },
            0
          );

          e.preventDefault();
        }
      });
    }
    return () => {
      $(".zoomContainer").remove();
    };
  }, [image]);

  // console.log('imageZoom🚀---->',image );
  return (
    <div className="product-gallery product-gallery-vertical">
      <div className="row">
        <figure className="product-main-image">
          {!!image?.length ? (
            <img
              id="product-zoom"
              src={image?.[0]}
              data-zoom-image={image?.[0]}
              alt="product image"
            />
          ) : (
            <Empty />
          )}

          <div id="btn-product-gallery" className="btn-product-gallery">
            <i className="icon-arrows" />
          </div>
        </figure>
        <div id="product-zoom-gallery" className="product-image-gallery">
          {/* <a
            className="product-gallery-item active"
            href="#"
            data-image="assets/images/products/single/1.jpg"
            data-zoom-image="assets/images/products/single/1-big.jpg"
          >
            <img
              src="assets/images/products/single/1-small.jpg"
              alt="Dark yellow lace"
            />
          </a>
          <a
            className="product-gallery-item"
            href="#"
            data-image="assets/images/products/single/2-big.jpg"
            data-zoom-image="assets/images/products/single/2-big.jpg"
          >
            <img
              src="assets/images/products/single/2-small.jpg"
              alt="Dark yellow lace"
            />
          </a>
          <a
            className="product-gallery-item"
            href="#"
            data-image="assets/images/products/single/3-big.jpg"
            data-zoom-image="assets/images/products/single/3-big.jpg"
          >
            <img
              src="assets/images/products/single/3-small.jpg"
              alt="Dark yellow lace"
            />
          </a>
          <a
            className="product-gallery-item"
            href="#"
            data-image="assets/images/products/single/4-big.jpg"
            data-zoom-image="assets/images/products/single/4-big.jpg"
          >
            <img
              src="assets/images/products/single/4-small.jpg"
              alt="Dark yellow lace"
            />
          </a> */}
          {!!image?.length  &&
            image?.map((img, index) => {
              return (
                <a
                //   className="product-gallery-item"
                  className={classNames("product-gallery-item",{active: index == 0})}
                  data-image={img }
                  data-zoom-image={img}
                  key={index}
                >
                  <img src={img || ""} alt="Dark yellow lace" />
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductImageZoom;
