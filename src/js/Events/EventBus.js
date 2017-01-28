const PIXI = require("./Utilities/Catalogue");

var EventBus = function ()
{
    var self = this;

    var addressCatalogue = new AddressCatalogue();

    return self;
}

module.exports = EventBus;