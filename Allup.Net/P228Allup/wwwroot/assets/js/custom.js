$(document).ready(() => {


    $(".productModalBtn").click(function (e) {
        e.preventDefault();

        let url = $(this).attr("href");

        fetch(url)
            .then(res => {
                return res.text();
            })
            .then(data => {
                $(".modal .modal-dialog .modal-content .modal-body").html(data);
                $(".modal").show();
                //===== slick Slider Product Quick View

                $('.quick-view-image').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    fade: true,
                    asNavFor: '.quick-view-thumb',
                    speed: 400,
                });

                $('.quick-view-thumb').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '.quick-view-image',
                    dots: false,
                    arrows: false,
                    focusOnSelect: true,
                    speed: 400,
                });
            })
    })


    $(".addtobasket").click(function (e) {
        e.preventDefault();

        let url = $(this).attr("href");

        fetch(url)
            .then(res => {
                if (res.ok) {
                    alert("Add olundu");
                }
                else if (res.status == 404)
                {
                    alert(res.text());
                }
                else if (res.status==400)
                {
                    alert(res.text());
                }
            })

    })

    $ (".searchBtn").click(() => {
        let searchInput = $(".searchInput").val();
        let searchCategory = $(".searchCategory option:selected").val();

        if (searchInput.length >=1)
        {
            fetch('/shop/search/' + searchCategory + '?search=' + searchInput)
                .then(Response => {
                return Response.text
                })
                .then(data => {
                    $(".searchList").html(data);
                })
            



            //old partial kohne variant 

            //fetch('/shop/search/' + searchCategory + '?search=' + searchInput)
            //    .then(Response => {
            //        return Response.json();
            //    }).then(data => {
            //        //console.log(data);

            //        let liItems = ''

            //        for (var i = 0; i < data.length; i++) {

            //            let liItem = `  <li>
            //                                <img src="~/assets/images/product/${data[i].image} alt="Alternate Text" />
            //                                <a href="#">${data[i].title}</a>
            //                            </li>`

            //            liItems += liItem;

            //            console.log(liItems);

            //            $("#searchList").html(liItems);

            //        }

            //    })
        }
    })



    $(".searchInput").keyup(function() {
        let inputVal = $(this).val();

        if (inputVal.length <= 0)
        {
            $(".searchList").html('');
        }

    })
})