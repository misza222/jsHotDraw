/*
 * Simple class for logging stuff
 */

function Logger() {
    this.logger = document.createElement("textarea");
    this.logger.id = 'logger';
    this.logger.style.width = '400px';
    this.logger.style.height= '100px';
    document.body.appendChild(this.logger);

    // initialize log levels
    var i = 0
    Logger.DEBUG = i++;
    Logger.ERROR = i++;
}

Logger.prototype.log = function(msg, log_level) {
    var now = new Date();
    if (! log_level) {
        log_level = Logger.DEBUG;
    }
    this.logger.value = this.formatDate(now) +  ":" + msg + "\n" + this.logger.value;
};

Logger.prototype.formatDate = function(date)
{
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};





