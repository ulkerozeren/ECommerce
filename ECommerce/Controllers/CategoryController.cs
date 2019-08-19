using ECommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using PagedList.Core;

namespace ECommerce.Controllers
{
    public class CategoryController : Controller
    {
        [Route("/kategori/{id}")]
        public IActionResult Index(int id, int page=1, int pageSize=3)
        {
            Category category = new Category();

            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                category = eCommerceContext.Categories.SingleOrDefault(a => a.Id == id);
            }

            List<Product> products = new List<Product>();

            //using (ECommerceContext eCommerceContext = new ECommerceContext())
            //{
            //    products = eCommerceContext.Products.Where(x => x.CategoryId == id).ToList();
            //}
            ECommerceContext eCommerceContext2 = new ECommerceContext();
            //PagedList<Product> model = new PagedList<Product>(eCommerceContext2.Products.Where(x => x.CategoryId == id), page,pageSize);
            X.PagedList.PagedList<Product> model = new X.PagedList.PagedList<Product>(eCommerceContext2.Products.Where(x => x.CategoryId == id), page,pageSize);

            ViewData["Title"] = category.Name;
            ViewData["CategoryId"] = category.Id;
            return View("Index",model);
        }


        public IActionResult AddProduct(int categoryId)
        {

            return View(categoryId);
        }
    }
}