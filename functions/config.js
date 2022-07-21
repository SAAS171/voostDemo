module.exports = {
  twilio: {
    accountSid: "ACe79ea43c816829baf4c37388a71f2454",
    apiKey: "SK399cff707c81ec9179bb2b10ddafbc0e",
    apiSecret: "VBtMJIMamBqj0KeMHG4tzUHOWC9jfm80",  
    chatService: "IS3e59378e02264613a94a40af0b3a1dfa",
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: process.env.TWILIO_ALLOW_INCOMING_CALLS === "true"
  }
};
