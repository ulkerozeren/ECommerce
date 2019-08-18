var ECommerce = {
    Helper: {
        Ajax: function (method, jDto, callback) {
            var json = JSON.stringify(jDto);

            var data = new Object();
            data.Method = method;
            data.Json = json;

            $.ajax({
                    method: "POST",
                    url: "/api",
                    data: "JSON=" + JSON.stringify(data)
            })
                .done(function (msg) {
                    
                    if (callback) {
                        callback(msg);
                    }

                    //document.getElementById("ProductName").value = "";
                    //document.getElementById("ProductDescription").value = "";
 
                });
        }
    },
    Page: {
        Home: {

        },
        Category: {
            Save: function () {
                var categoryId = $("#CategoryId").val();
                var productName = $("#ProductName").val();
                var productDescription = $("#ProductDescription").val();
                var jDto = new Object();
                jDto.CategoryId = categoryId;
                jDto.ProductName = productName;
                jDto.ProductDescription = productDescription;            

                ECommerce.Helper.Ajax("SaveProduct", jDto, ECommerce.Page.Category.Callback_Save);
            },
            Remove: function (productId) {
                var jDto = new Object();
                jDto.ProductId = productId;
                ECommerce.Helper.Ajax("RemoveProduct", jDto, ECommerce.Page.Category.Callback_Remove);
            },
            Callback_Remove: function(data) {
                ECommerce.Page.Category.List();
            },
            Callback_Save: function(data) {
                ECommerce.Page.Category.List();
                alert("Ürün başarılı şekilde kaydedildi.");
            },
            List: function() {
                var jDto = new Object();
                jDto.CategoryId = $("#CategoryId").val();
              
                ECommerce.Helper.Ajax("ProductsByCategoryId", jDto, ECommerce.Page.Category.Callback_List);
            },
            Callback_List: function(data) {
                console.log(data);
                //var html = "<div class='table-responsive'><table class='table table-striped'><tbody>";
                var html = "";
                for (var i = 0; i < data.dynamic.length; i++) {
                    var product = data.dynamic[i];
                    var productName = product.name;
                    var productDescription = product.description;
                   
                    //html += "<div class='col-xs-6 col-sm-3 placeholder'><img src='/product.png' class='img-responsive' width='200' height='200'>"
                    //    + "<a href='/urun/" + product.id + "'>" + productName
                    //    + "</div>"

                    html += "- <a href='/urun/" + product.id + "'>" + productName + "</a> <input type='button' class='btn btn-primary' value='Sil' onclick='ECommerce.Page.Category.Remove(" + product.id + ")' /><br />";
                   // html += "<tr><a href='/urun/" + product.id + "'>" + productName + "</a> <input type='button' class='btn btn-primary' value='Sil' onclick='ECommerce.Page.Category.Remove(" + product.id + ")' /></tr>";
                }

                html += "</table></div>";
                $("#Holder-Products").html(html);
            }
        },
        Product: {
            Update: function () {
                var Id = $("#Id").val();
                var productName = $("#ProductName").val();
                var productDescription = $("#ProductDescription").val();
                var jDto = new Object();
                jDto.Id = Id;
                jDto.ProductName = productName;
                jDto.ProductDescription = productDescription;

                ECommerce.Helper.Ajax("UpdateProduct", jDto, ECommerce.Page.Product.Callback_Update);
            },
            Callback_Update: function (data) {
              
                alert("Ürün başarılı şekilde güncellendi.");
            },
        },
        Contact: {
            Send: function() {
                var name = $("#Name").val();
                var surname = $("#Surname").val();
                var message = $("#Message").val();
                var jDto = new Object;
                jDto.Name = name;
                jDto.Surname = surname;
                jDto.Message = message;

                ECommerce.Helper.Ajax("SaveContact", jDto, ECommerce.Page.Contact.Callback_Save);
            },
            Callback_Save: function (data) {
               
                alert("Mesajınız başarıyla iletildi.");
            }
        },
        Help: {

        }
    }
}