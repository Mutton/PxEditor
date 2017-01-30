define ([ ], function ()
{

    var Catalogue = function ()
    {
        var self = this;

        var keys = new Array();
        self.getKeys = function () { return keys; }

        var values = new Array();
        self.getValues = function () { return values; }

        // add value under related key
        // set duplicate to true to allow multiple identical values for the same key
        self.addKeyValue = function (key, value, duplicate = false)
        {
            var index = keys.indexOf(key);
            if (index < 0) 
            {
                keys.push(key);
                values.push(new Array());
            }

            if ((!duplicate) && (values[index].indexOf(value) > -1)) { return index; }
            values[index].push(value);
            return index;
        }

        // remove the provided value and possible duplicates but only for the specified key
        self.removeKeyValue = function (key, value)
        {
            var index = keys.indexOf(key);
            if (index < 0) { return; }

            var i;
            for (i = 0; i < values[index].length; i++)
            {
                if (values[index][i] === value)
                {
                    values[index].splice(i, 1);
                    if (values[index].length < 1) 
                    {
                        // break out of the loop (quasi return) when their aren't any possible values left
                        values.splice(index);
                        keys.splice(index);
                        break;
                    }
                    // reset i to catach possible value duplicates under the same key
                    i -= 1;
                }
            }
        }

        // remove a key and all its related values
        self.removeKey = function (key)
        {
            var index = keys.indexOf(key);
            if (index > -1) 
            { 
                keys.splice(index, 1);
                values.splice(index, 1);
            }
        }

        // remove the given value under all keys of the catalogue
        self.removeValue = function (value)
        {
            var v;
            var i;
            var index;
            for (v = 0; v < values.length; v++)
            {
                for (i = 0; i <  values[v].length; i++)
                {
                    index = values[v].indexOf(value);
                    if (index > -1) 
                    {
                        values[v].splice(index, 1);
                        if (values[v].length < 1) 
                        {
                            // remove key and value-array if empty
                            keys.splice(v, 1);
                            values.splice(v, 1);
                        }
                        // reset i to catach possible value duplicates under the same key
                        // or to compensate for possible previous key-value-removal
                        i -= 1;
                    }
                }
            }
        }

        self.indexOfKey = function (key) { return keys.indexOf(key); }

        self.indexOfValue = function (value) { return values.indexOf(value);  }

        return self;
    }

    return Catalogue;

});