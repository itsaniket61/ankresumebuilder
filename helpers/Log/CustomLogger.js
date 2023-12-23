class CustomLogger {
    constructor() {
      this.levels = ["debug", "info", "warn", "error"];
      this.activeProfile = process.env.ACTIVE_PROFILE || "prod";
    }
  
    debug(message) {
      if(this.activeProfile==='dev'){
        this.log(message, "debug");
      }
    }
  
    info(message) {
      this.log(message, "info");
    }
  
    warn(message) {
        if(this.activeProfile==='dev'){
            this.log(message, "warn");
        }
    }
  
    error(message) {
      this.log(message, "error");
    }
  
    log(message, level) {
        console.log(this.formatMessage(message, level));
    }
  
    formatMessage(message, level) {
      const timestamp = new Date().toISOString();
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }
}

export default CustomLogger;