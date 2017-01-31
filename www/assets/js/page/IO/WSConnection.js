define ([
    "page/Utilities/Utilities"
], function (
    Utilities
){
    var WSConnection = function (uri, initProtocols)
    {
        if (!WSConnection.isValidURI(uri)) 
        {
            console.log("Aborting constructor because invalid uri was provided.");
            return;
        }
        self.getURI = function () { return uri; }
        self.setURI = function (value) 
        {
            if (!WSConnection.isValidURI(uri)) 
            {
                console.log("Preventing setting uri because the provided value is invalid."); 
                return false;
            }
            uri = value;
        }

        if (!WSConnection.isValidInitProtocols(protocols)) 
        {
            console.log("Aborting constructor because invalid protocols-parameter was provided.");
            return;
        }
        self.getInitProtocols = function () { return initProtocols; }
        self.setInitProtocols = function (value)
        {
            if (!WSConnection.isValidInitProtocols(protocols)) 
            {
                console.log("Preventing setting protocols because the provided value is invalid."); 
                return false;
            }
            protocols = value;
        }

        var webSocket;
        self.getWebSocket = function () { return webSocket; }

        self.openRetries = 10;
        self.closeRetrues = 10;



        self.open = function (onFinishHandler = null)
        {
            var retries = self.openRetries;
            var r;
            for (r = 0; r < retries; r++)
            {
                try
                {
                    webSocket = new WebSocket(uri, protocols);
                    if (Utilities.isNonNullValue(webSocket)) 
                    {
                        if (typeof(onFinishHandler) === "function") { onFinishHandler(true); }
                        return true;
                    }
                }
                catch (ex)
                {
                    console.log("Error while trying to open websocket connection with uri: " + uri 
                        + " protocols: " + protocols);
                    if (typeof(onFinishHandler) === "function") { onFinishHandler(false); }
                }

                console.log("Failed to open websocket connection with uri: " + uri 
                        + " protocols: " + protocols);
                    if (typeof(onFinishHandler) === "function") { onFinishHandler(false); }
            }

            return false;
        }

        self.close = function (onFinishHandler)
        {
            var retries = self.closeRetries;
            var r;
            for (r = 0; r < retries; r++)
            {
                try
                {
                    webSocket.close();
                    if (typeof(onFinishHandler) === "function") { onFinishHandler(true); }
                    return true;
                }
                catch (ex)
                {
                    console.log("Error while trying to open websocket connection with uri: " + uri 
                        + " protocols: " + protocols);
                    if (typeof(onFinishHandler) === "function") { onFinishHandler(false); }
                }

                console.log("Failed to open websocket connection with uri: " + uri 
                        + " protocols: " + protocols);
                    if (typeof(onFinishHandler) === "function") { onFinishHandler(false); }
            }

            return false;
        }
    };

    WSConnection.isValidInitProtocols = function (protocols)
    {
        // must be undefined, null, string or Array[string]
        if (!Utilities.isNonNullValue(protocols)) { return true; }
        if (typeof(protocols) === "string") { return true; }
        if (Array.isArray(protocols)) 
        {
            var i;
            for (i = 0; i < protocols.length; i++)
            {
                if (typeof(protocols[i]) !== "string") { return false; }
            }
            return true;
        }
        return false;
    }

    // typical, correct pattern: "ws://localhost:81" but might have any chars before and after the sequence;
    WSConnection.uriPattern = /ws:\/{2}([0-9a-z][0-9a-z\-\.]+[0-9a-z]):[0-9]+$/;
    // typical, correct pattern: "ws://localhost:81" without any chars before or after the sequence;
    WSConnection.uriPattern_Strict = /^(ws:)\/{2}([0-9a-z][0-9a-z\-\.]+[0-9a-z]):[0-9]+$/;

    WSConnection.isValidURI = function (uri)
    {
        // must follow strict pattern
        if (typeof(uri) !== "string") { return false; }
        if (uri.search(WSConnection.uriPattern_Strict) !== 0) { return false; }
        return true;
    }

    return WSConnection;
});