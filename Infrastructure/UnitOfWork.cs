
namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly PortfolioDbContext _context;

        IFundRepository _funds;
        IManagementRepository _managements;       


        public UnitOfWork(PortfolioDbContext context)
        {
            _context = context;
        }


        public IFundRepository Funds
        {
            get
            {
                if (_funds == null)
                    _funds = new FundRepository(_context);

                return _funds;
            }
        }

        public IManagementRepository Managements
        {
            get
            {
                if (_managements == null)
                    _managements = new ManagementRepository(_context);

                return _managements;
            }
        }       

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }  
}
