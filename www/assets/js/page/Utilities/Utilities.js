define ([ ], function ()
{
    
    var isNonNullValue = function (v)
    {
        if (typeof(v) === "undefined") { return false; }
        if (typeof(v) === "null") { return false; }
        return true;
    }

    return { isNonNullValue  };

});