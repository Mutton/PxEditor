const Utilities = require("../Utilities/Utilities");

var EventProtocol = function (sender, address, timeStamp, data)
{
    var self = this;

    self.sender = sender;
    
    if (typeof(address) === "string") { self.address = address; }
    else 
    {
        console.log("EventProtocol: Aborted constructor because invalid address was provided: " + timeStamp);
    }

    if (EventProtocol.isValidTimeStamp(timeStamp)) { self.timeStamp = timeStamp; }
    else 
    {
        console.log("EventProtocol: Aborted constructor because invalid timeStamp was provided: " + timeStamp);
        return null;
    }

    if (EventProtocol.isValidData(data)) { self.data = data; }
    else
    {
        console.log("EventProtocol: Aborted constructor because invalid data was provided: " + timeStamp);
        return null;
    }

    return self;
}

EventProtocol.isValidData = function (data)
{
    // data is allowed to be null or undefined
    if (!Utilities.isNonNullValue(data)) { return true; }
    // must be object otherwise
    if ((!typeof(data) === "object")) { return false; }
    return true;
}

EventProtocol.isValidTimeStamp = function (timeStamp)
{
    if (!(typeof(timeStamp) === "number")) { return false; }
    return true;
}

module.exports = EventProtocol;