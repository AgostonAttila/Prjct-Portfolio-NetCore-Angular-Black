﻿using Core;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{

    public class FundRepository : Repository<Fund>, IFundRepository
        {
            public FundRepository(DbContext context) : base(context)
            { }

            private PortfolioDbContext _appContext => (PortfolioDbContext)_context;
        }
    
}
