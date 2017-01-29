const Catalogue = require("./Utilities/Catalogue");

var EventBus = function ()
{
    var self = this;

    var rootCatalogue = new Catalogue();

    var addresses = new Array();
    self.linearSearchThreshold = 10;


    self.findLinearInRange = function (address, start, end)
    {
        var index = -1;
        if (start < 0) { start = 0; }
        if (end > (addresses.length - 1)) { end = addresses.length - 1; }
        if (start > end) { start = end; }

        for (i = end; i >= start; i--)
        {
            if (addresses[i] === address) { index = i; break; }
        }

        return index;
    }
    
    self.findInsertLinearInRange = function (address, start, end)
    {
        if (start < 0) { start = 0; }
        if (end > (addresses.length - 1)) { end = addresses.length - 1; }
        if (start > end) { start = end; }
        if (start == end) { return start; }

        for (i = end; i >= start; i--)
        {
            if (addresses[i] < address) { return i; }
        }

        return end;
    }

    self.findInsertIndex = function (address)
    {
        var linearStart = 0;
        var linearEnd = addresses.length;
        var midIndex;

        while ((linearEnd - linearStart) > self.linearSearchThreshold)
        {
            midIndex = linearStart + Math.floor((linearEnd - linearStart) / 2);
            if (address < addresses[midIndex]) { linearEnd = midIndex; }
            else { linearStart = midIndex; }
        }

        return self.findInsertLinearInRange(address, linearStart, linearEnd);
    }

    self.findIndexInRange = function (address, start, end)
    {
        var linearStart, linearEnd,  midIndex;

        if (start < 0) { start = 0; }
        if (end > (addresses.length - 1)) { end = addresses.length - 1; }
        if (start > end) { start = end; }
        linearStart = start;
        linearEnd = end;
        
        while ((linearEnd - linearStart) > self.linearSearchThreshold)
        {
            midIndex = linearStart + Math.floor((linearEnd - linearStart) / 2);
            if (address < addresses[midIndex]) { linearEnd = midIndex; }
            else { linearStart = midIndex; }
        }

        return self.findLinearInRange(address, linearStart, linearEnd);
    }

    self.subscribe = function (address, handler)
    {
        var index = self.findInsertIndex(address);
        addresses.splice(index, 0, address);
    }

    self.unsubscribe = function (address, handler)
    {

    }

    self.publish = function ()
    {

    }

    return self;
}

module.exports = EventBus;