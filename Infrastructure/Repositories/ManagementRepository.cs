using Core;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{


    public class ManagementRepository : Repository<Management>, IManagementRepository
    {
        public ManagementRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
