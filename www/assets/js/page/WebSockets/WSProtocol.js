define ([], function ()
{

    // protocol for incoming and outgoing websocket network messages
    // sender: optional sender of the message
    // protocolType: optional type that indicates the type of protocol (might be used to send it to the right subroutines)
    // dataType: optional indicator what type of data is transferred (see WSProtocol.dataTypes for all official values)
    // data: optional data object of any type (should be corresponding to dataType to avoid errors during processing)
    var WSProtocol = function (sender = undefined, protocolType = undefined, 
        dataType = WSProtocol.dataTypes.undefined, data = undefined)
    {
        var self = this;

        self.sender = sender;
        self.protocolType = protocolType;

        if (WSProtocol.isValidDataType(dataType)) 
        {
            cosole.log("Aborting constructor because invalid dataType was provided: " + dataType);
            return null;
        }
        self.dataType = dataType;

        self.data = data;

        return self;
    };

    // officially supported types of data, stored in WSProtocol
    WSProtocol.dataTypes = 
    {
        undefined: "undefined",
        json: "json",
        bin: "bin",
        blob: "blob"
    }

    // simple check whether the dataType is in WSProtocol.dataTypes
    WSProtocol.isValidDataType = function (protocolType)
    {
        return t[ String(protocolType) ];
    }

    return WSProtocol;

})