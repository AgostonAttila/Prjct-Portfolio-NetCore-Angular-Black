using AutoMapper;
using Core;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioNetCoreAngularBlack.Controllers
{
    public class ManagementController : Controller
    {
      
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IManagementRepository repository;

        public ManagementController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("[action]")]
        public IEnumerable<Management> GetManagementList()
        {
            var allManagement = _unitOfWork.Managements.GetAll();
            //return Ok(_mapper.Map<IEnumerable<Fund>>(allManagement));
            return allManagement;
        }

        [Route("/api/[controller]/DeleteManagement/{name}")]
        [HttpPost("[action]")]
        public IEnumerable<Management> DeleteManagement(string name)
        {
            //IEnumerable <Management> managementList = repository.GetAll();           
            //Management management = managementList.Where(p => p.Name == name).FirstOrDefault();
            //if (management != null)            
            //    repository.Remove(management);//DeleteManagement(name);


            _unitOfWork.Managements.Remove(_unitOfWork.Managements.Get(name));
            _unitOfWork.SaveChanges();

            return GetManagementList();
        }


    }
}
