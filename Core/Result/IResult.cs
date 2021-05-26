using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Result
{
    public interface IResult
    {
        //sadece okunabilir
        bool Success { get; }
        string Message { get; }
    }
}
