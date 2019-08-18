using ECommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ECommerce.Controllers
{
    public class CategoryController : Controller
    {
        [Route("/kategori/{id}")]
        public IActionResult Index(int id)
        {
            Category category = new Category();

            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                category = eCommerceContext.Categories.SingleOrDefault(a => a.Id == id);
            }

            List<Product> products = new List<Product>();

            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                products = eCommerceContext.Products.Where(x => x.CategoryId == id).ToList();
            }

            ViewData["Title"] = category.Name;
            ViewData["CategoryId"] = category.Id;
            return View(products);
        }


        public IActionResult AddProduct(int categoryId)
        {

            return View(categoryId);
        }
    }
}