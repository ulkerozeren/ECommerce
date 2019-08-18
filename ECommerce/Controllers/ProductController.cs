using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    public class ProductController : Controller
    {
        [Route("/urun/{id}")]
        public IActionResult Index(int id)
        {
            Models.Product product;

            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                product = eCommerceContext.Products.SingleOrDefault(a => a.Id == id);
            }

            return View(product);
        }

        [Route("/urun/Update/{id}")]
        public IActionResult Update(int id)
        {
            Models.Product product;

            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                product = eCommerceContext.Products.SingleOrDefault(a => a.Id == id);
            }

            return View(product);
        }


        public IActionResult Delete(int id)
        {
            int categoryId = 1;
            using (ECommerceContext eCommerceContext = new ECommerceContext())
            {
                Models.Product product = eCommerceContext.Products.SingleOrDefault(a => a.Id == id);
                categoryId = product.CategoryId;

                if (product != null)
                {
                    eCommerceContext.Products.Remove(product);
                    eCommerceContext.SaveChanges();
                  
                }
            }

            return RedirectToAction("Index", "Category", new { @id = categoryId });
        }

    }
}