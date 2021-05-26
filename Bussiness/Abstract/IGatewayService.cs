using Core.Result;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bussiness.Abstract
{
    public interface IGatewayService
    {
        IDataResult<List<Gateway>> GetAll();
        IDataResult<Gateway> GetById(int gatewayId);
        IResult Add(Gateway gateway);
    }
}
