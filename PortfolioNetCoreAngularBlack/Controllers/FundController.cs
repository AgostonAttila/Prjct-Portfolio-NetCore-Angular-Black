using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Core;
using Infrastructure;
using Helper;
using AutoMapper;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PortfolioNetCoreAngularBlack.Controllers
{
    [Route("api/[controller]")]
    public class FundController : Controller
    {

        //private readonly IMapper mapper;    
        private readonly IUnitOfWork _unitOfWork;
        private IHostingEnvironment _hostingEnvironment;

        private string _contentDirectoryPath = "";

        public FundController(IUnitOfWork unitOfWork, IHostingEnvironment environment)
        {
            _unitOfWork = unitOfWork;
            _hostingEnvironment = environment;

            _contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data");
        }


        [HttpGet("[action]")]
        public IEnumerable<Fund> GetFundList()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();


            var allFunds = _unitOfWork.Funds.GetAll();
            //return Ok(Mapper.Map<IEnumerable<Fund>>(allFunds));
            foreach (var fund in allFunds)
                fund.FillObjectProperties();

            return allFunds;

        }

        [Route("/api/[controller]/GetFund/{isinNumber}")]
        [HttpGet("[action]")]
        public Fund GetFund(string isinNumber)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();

            var fund = _unitOfWork.Funds.Get(isinNumber);
            //return Ok(Mapper.Map<FundViewModel>(fund));           
            return fund;
        }

        [HttpGet("[action]")]
        public IEnumerable<Fund> GetUpdatedFundList()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();

            // return _repository.GetUpdatedFundList();
            return null;
        }

        [HttpGet("[action]")]
        public Fund Test()
        {
            Fund result = new Fund();

            result.Name = _hostingEnvironment.ContentRootPath;
            result.Management = _hostingEnvironment.WebRootPath;

            try
            {

                WebClient client = new WebClient();

                client.Headers.Add("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");

                Stream data = client.OpenRead("https://www.teletrader.com/tom-capital-growth-fund-f-chf/funds/details/FU_100047001");
                StreamReader reader = new StreamReader(data);
                result.Focus = reader.ReadToEnd();
                data.Close();
                reader.Close();


            }
            catch (Exception e) { result.Focus = e.InnerException.ToString(); }

            if (Directory.Exists(_hostingEnvironment.ContentRootPath))
            {
                string filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "PFS_Result.txt");
                System.IO.File.WriteAllText(filePath, "ss");
                result.Currency = System.IO.File.ReadAllText(filePath);
            }

            result.ISINNumber = Directory.GetCurrentDirectory();


            return result;
        }




        [HttpGet("[action]")]
        public string GenerateExcelFundList()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();
            string date = DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month + "_" + DateTime.Now.Day.ToString();
            string fileName = "Alapok_" + date + ".xlsx";


            ExcelHelper.CreateNewWorkBook("Alapok_" + date);
            ExcelHelper.FillContent(GetFundList().ToList());
            ExcelHelper.SaveWorkBook(fileName, _contentDirectoryPath);

            return Path.Combine(_contentDirectoryPath, fileName);
        }

        [HttpGet("[action]")]
        public IEnumerable<Fund> SeedFundList(string filePath, IEnumerable<Fund> fundList = null)
        {
            fundList = Helper.TeletraderHelper.GetTeletraderFundList("D:/TestData.txt", fundList);
            _unitOfWork.Funds.AddRange(fundList);
            _unitOfWork.SaveChanges();
            return fundList;
        }

        [HttpGet("[action]")]
        public IEnumerable<Fund> UpdateFundList()
        {
            IEnumerable<Fund> fundList = Helper.TeletraderHelper.GetTeletraderFundList(null, _unitOfWork.Funds.GetAll());
            _unitOfWork.Funds.AddRange(fundList);
            _unitOfWork.SaveChanges();
            return fundList;
        }
    }
}
