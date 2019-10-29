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

        private string _contentDirectoryPath = "";

        public FundController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
            if (allFunds != null) foreach (var fund in allFunds) fund.FillObjectProperties();
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
            if (fund != null) fund.FillObjectProperties();
            //return Ok(Mapper.Map<FundViewModel>(fund));           
            return fund;
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
            foreach (var fund in fundList) fund.FillStringProperties();
            _unitOfWork.Funds.AddRange(fundList);
            _unitOfWork.SaveChanges();
            return fundList;
        }

        [HttpGet("[action]")]
        public IEnumerable<Fund> UpdateFundList()
        {
            IEnumerable<Fund> fundList = Helper.TeletraderHelper.GetTeletraderFundList(null, _unitOfWork.Funds.GetAll());
            foreach (var fund in fundList) fund.FillStringProperties();
            _unitOfWork.Funds.UpdateRange(fundList);
            _unitOfWork.SaveChanges();
            return fundList;
        }

        [HttpGet("[action]")]
        public IEnumerable<Fund> RemoveAllFund()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();

            _unitOfWork.Funds.RemoveRange(_unitOfWork.Funds.GetAll());
            _unitOfWork.SaveChanges();
            return null;
        }


    }
}
