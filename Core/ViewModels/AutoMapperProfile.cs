using AutoMapper;

namespace Core
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Fund, FundViewModel>()
                .ReverseMap();

            CreateMap<Management, ManagementViewModel>()
                .ReverseMap();          
        }
    }
}
