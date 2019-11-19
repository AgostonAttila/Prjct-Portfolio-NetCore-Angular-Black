using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Core;
using Infrastructure;
using Helper;


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

        [Route("/api/[controller]/GetFundList")]
        [HttpGet("[action]")]
        public IEnumerable<Fund> GetFundList()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();


            var allFunds = _unitOfWork.Funds.GetAll();



            if (allFunds == null)
            {
                allFunds.Append(new Fund
                {
                    ISINNumber = "LU0029873410",
                    Currency = "EUR",
                    Name = "Templeton Global Climate Change Fd.A EUR",
                    Management = "Franklin Templeton	Részvény",
                    MonthlyPerformanceAsString = "[{'Year':'1991','PerformanceListByMonth':[null,null,null,null,3.14,-0.38,0.19,1.14,-3.2,0.0,-6.23,-1.67],'Performance':null},{'Year':'1992','PerformanceListByMonth':[9.53,4.26,-2.41,3.61,0.18,-6.96,-5.71,-7.31,-1.8,6.65,2.37,3.78],'Performance':null},{'Year':'1993','PerformanceListByMonth':[2.02,5.75,1.31,-0.19,4.08,3.74,4.81,2.95,-3.03,7.72,1.22,8.92],'Performance':null},{'Year':'1994','PerformanceListByMonth':[5.26,-2.37,-4.04,1.12,0.28,-4.43,3.76,3.77,-3.36,-1.25,-0.56,-2.78],'Performance':null},{'Year':'1995','PerformanceListByMonth':[-2.52,-1.06,-3.45,2.07,4.36,-0.6,4.81,3.22,-0.69,-3.91,2.76,1.64],'Performance':null},{'Year':'1996','PerformanceListByMonth':[4.62,-0.61,3.69,4.88,0.44,-0.06,-5.89,3.66,3.08,1.06,3.27,2.6],'Performance':null},{'Year':'1997','PerformanceListByMonth':[6.47,3.7,-1.17,2.37,2.69,4.72,8.03,-3.26,2.81,-6.38,2.19,2.3],'Performance':26.31},{'Year':'1998','PerformanceListByMonth':[1.56,2.55,6.33,-2.81,-1.75,0.09,-2.76,-9.06,-2.97,3.73,3.76,-0.44],'Performance':-2.68},{'Year':'1999','PerformanceListByMonth':[1.5,0.76,5.65,11.32,-1.36,4.46,-3.03,1.84,-3.23,-0.41,3.92,2.04],'Performance':25.09},{'Year':'2000','PerformanceListByMonth':[-0.78,-2.67,6.54,4.62,-0.8,-1.39,1.33,5.55,-1.52,4.01,-1.01,-4.76],'Performance':8.75},{'Year':'2001','PerformanceListByMonth':[1.52,-0.43,-1.29,2.98,5.16,-1.81,-3.35,-5.52,-9.44,3.31,5.84,1.73],'Performance':-2.4},{'Year':'2002','PerformanceListByMonth':[0.6,-0.6,4.8,-3.79,-1.71,-10.97,-8.92,-0.19,-12.9,4.4,6.47,-10.11],'Performance':-30.19},{'Year':'2003','PerformanceListByMonth':[-5.17,-4.32,-2.49,8.77,1.79,3.96,5.19,4.83,-4.89,6.56,-0.47,1.43],'Performance':14.87},{'Year':'2004','PerformanceListByMonth':[4.52,2.43,-1.58,2.05,-1.75,2.85,-2.68,-0.36,1.16,0.0,3.0,1.42],'Performance':11.35},{'Year':'2005','PerformanceListByMonth':[1.7,3.0,0.57,-1.85,4.84,2.5,3.05,-0.97,2.86,-2.19,3.59,3.47],'Performance':22.27},{'Year':'2006','PerformanceListByMonth':[1.61,2.47,-0.27,-0.13,-3.7,0.21,0.98,2.58,3.26,3.36,-1.59,3.23],'Performance':12.39},{'Year':'2007','PerformanceListByMonth':[2.69,-3.29,1.14,3.06,3.81,-1.4,-4.41,-0.25,-0.87,2.14,-4.75,-1.1],'Performance':-3.64},{'Year':'2008','PerformanceListByMonth':[-9.42,-4.19,-5.81,5.76,0.3,-10.79,-1.21,4.7,-7.98,-11.74,-6.86,-3.19],'Performance':-41.4},{'Year':'2009','PerformanceListByMonth':[-3.41,-8.11,3.71,11.1,1.0,0.33,6.36,3.74,2.91,-4.09,1.12,7.33],'Performance':22.49},{'Year':'2010','PerformanceListByMonth':[-0.94,1.23,6.44,1.05,-3.38,-3.68,1.72,-2.76,1.51,0.65,1.76,5.1],'Performance':8.49},{'Year':'2011','PerformanceListByMonth':[2.42,2.62,-3.79,1.03,1.1,-3.02,-1.88,-9.27,-4.09,7.51,-0.94,1.81],'Performance':-7.26},{'Year':'2012','PerformanceListByMonth':[5.33,3.46,0.34,-2.65,-5.45,4.46,4.82,1.8,1.18,0.17,1.0,2.46],'Performance':17.67},{'Year':'2013','PerformanceListByMonth':[2.72,2.81,3.34,0.81,5.24,-3.6,4.48,-1.04,3.07,4.81,3.17,0.06],'Performance':28.72},{'Year':'2014','PerformanceListByMonth':[-1.57,3.82,-0.25,-0.49,3.09,0.24,-0.62,3.62,0.47,-0.99,2.46,0.29],'Performance':10.35},{'Year':'2015','PerformanceListByMonth':[4.96,7.01,3.35,0.88,1.17,-4.43,1.36,-9.12,-5.98,10.04,2.7,-6.3],'Performance':3.84},{'Year':'2016','PerformanceListByMonth':[-7.71,-2.39,2.69,1.31,2.12,-4.32,3.87,2.39,0.06,1.43,5.17,3.1],'Performance':7.17},{'Year':'2017','PerformanceListByMonth':[0.57,2.84,1.2,-0.15,-1.54,-0.3,-0.69,-1.23,3.98,2.09,-1.75,0.45],'Performance':5.42},{'Year':'2018','PerformanceListByMonth':[1.78,-2.67,-3.64,1.6,1.58,-1.85,3.04,0.2,-1.64,-5.37,1.82,-8.51],'Performance':-13.44},{'Year':'2019','PerformanceListByMonth':[8.1,2.6,1.04,4.31,-7.72,4.53,0.83,-3.21,5.9,1.0,null,null],'Performance':null}]",
                    SharpRateArrayAsString = "1,98;0,22;1,02;0,46;0,38",
                    VolatilityArrayAsString = "11,39;12,16;12,29;10,86;14,55",
                    Performance1Year = "1",
                    PerformanceActualMinus1 = "1",
                    PerformanceActualMinus2 = "1",
                    PerformanceActualMinus3 = "1",
                    PerformanceActualMinus4 = "1",
                    PerformanceActualMinus5 = "1",
                    PerformanceActualMinus6 = "1",
                    PerformanceActualMinus7 = "1",
                    PerformanceActualMinus8 = "1",
                    PerformanceActualMinus9 = "1"
                });
            }
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
            //fundList = Helper.TeletraderHelper.GetTeletraderFundList("D:/TestData.txt", fundList);
            //foreach (var fund in fundList) fund.FillStringProperties();


            //System.IO.File.AppendAllText("D:/test.json", JsonConvert.SerializeObject(fundList));

            string text = System.IO.File.ReadAllText("D:/test.json");
            fundList = JsonConvert.DeserializeObject<IEnumerable<Fund>>(text);


            List<string> cucc = new List<string>();

            foreach (var item in fundList)
            {
                if (!cucc.Contains(item.ISINNumber))
                {
                    cucc.Add(item.ISINNumber);
                    _unitOfWork.Funds.Add(item);
                }
            }
           
           // _unitOfWork.Funds.AddRange(fundList);
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

        [Route("/api/[controller]/RemoveAllFund")]
        [HttpGet("[action]")]
        public IEnumerable<Fund> RemoveAllFund()
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);         

            //if (fundList == null)
            //    return NotFound();

            _unitOfWork.Funds.RemoveRange(_unitOfWork.Funds.GetAll());
            _unitOfWork.SaveChanges();
            return _unitOfWork.Funds.GetAll();
        }


    }
}
