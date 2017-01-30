define ([
    "page/Events/EventProtocol",
    "page/Utilities/Utilities",
], function (
    EventProtocol,
    Utilities
){

    var EventBus = function ()
    {
        var self = this;

        var addresses = new Array();
        var subscribers = new Array();
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

        self.findIndex = function (address) 
        {
            return self.findIndexInRange(address);
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
            console.log(address, handler);
            if (typeof(address) !== "string") 
            {
                console.log("EventBus: Aborted subscribe because the provided address is not a string!");
            }
            if (typeof(handler) !== "function") 
            {
                console.log("EventBus: Aborted subscribe because the provided handler is not a function!");
            }

            var index = self.findIndex(address);
            if (index > -1)
            {
                // existing address
                if (subscribers[index].indexOf(handler) < 0) { subscribers[index].splice(index, 0, handler); }
            }
            else
            {
                // new address
                index = self.findInsertIndex(address);
                addresses.splice(index, 0, address);
                subscribers.splice(index, 0, [ handler ]);
            }
        }

        self.unsubscribe = function (address, handler)
        {
            var index = self.findIndex(address);
            if (index < 0) { return; }

            var i = subscribers[index].indexOf(handler);
            if (i < 0) { return; }

            subscribers[index].splice(i, 0);

            if (subscribers[index].length < 1) 
            {
                subscribers.splice(index, 0);
                addresses.splice(index, 0); 
            }
        }

        self.publish = function (eventProtocol, messageReceivedHandler)
        {
            if (!Utilities.isNonNullValue(eventProtocol)) 
            { 
                console.log("EventBus: Aborting publish because null or undefined was provided as eventProtocol!");
                return true; 
            }
            if (eventProtocol.add)

            var index = self.findIndex(eventProtocol.address);
            if (index < 0) { return; }

            var subs = subscribers[index];
            var i;
            if (typeof(messageReceivedHandler) === "function")
            {
                for (i = 0; i < subs.length; i++)
                {
                    try
                    {
                        subs[i](eventProtocol);
                        messageReceivedHandler( new EventProtocol(subs[i], eventProtocol.address, (new Date()).getTime(),
                            { originalProtocol: eventProtocol }) );
                    }
                    catch (ex)
                    {
                        console.log("EventBus: Uncallable subscriber: " + subscribers[i]);
                    }
                }
            }
            else
            {
                for (i = 0; i < subscribers.length; i++)
                {
                    try { subscribers[i](eventProtocol); }
                    catch (ex)
                    {
                        console.log("EventBus: Uncallable subscriber: " + subscribers[i]);
                    }
                }
            }
        }

        return self;
    }

    return EventBus;
    
})