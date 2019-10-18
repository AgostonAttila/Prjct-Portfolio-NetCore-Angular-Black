using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


// https://www.c-sharpcorner.com/article/how-to-file-upload-in-angular-5-with-asp-net-core-in-vs2017/

namespace PortfolioNetCoreAngularBlack.Controllers
{
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        readonly string _contentDirectoryPath = "";

        public FileController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
            _contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
        }

        [HttpPost, DisableRequestSizeLimit] //RequestSizeLimit(500)
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                string newPath = _contentDirectoryPath;
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }

     
        [HttpGet]//("{fileName}")]
        public IActionResult Download()//string fileName)
        {
            string fileName = "Valami.txt";
            var filePath =Path.Combine( _contentDirectoryPath , fileName);

            //if (!System.IO.File.Exists(filePath))
            //{
            //    return HttpNotFound($"File does not exist: {id}");
            //}

            //var adminClaim = User.Claims.FirstOrDefault(x => x.Type == "role" && x.Value == "securedFiles.admin");
            //if (_securedFileProvider.HasUserClaimToAccessFile(id, adminClaim != null))
            //{
                var fileContents = System.IO.File.ReadAllBytes(filePath);
               // return new FileContentResult(fileContents, "application/octet-stream");
            //}
            return Ok(new FileContentResult(fileContents, "application/octet-stream"));
            //return HttpUnauthorized();
        }


    }
}