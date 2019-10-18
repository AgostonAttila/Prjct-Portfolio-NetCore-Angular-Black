namespace Infrastructure
{
    public interface IUnitOfWork
    {
        IFundRepository Funds { get; }
        IManagementRepository Managements { get; }
        int SaveChanges();
    }
}
