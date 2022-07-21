import { getDomainUrl } from "../../endpoints"; 
import logo from "../../assets/svg/logo.svg";


export const getYear = function () {
  return new Date().getFullYear();
};

export const getFacebook = function () {
  return "https://www.facebook.com/Voost-Jobs-358460721865361";
};
export const getTwitter = function () {
  return "www.twitter.com";
};
export const getLinkedIn = function () {
  return "https://www.linkedin.com/company/voost-jobs";
};

export const getContactEmail = function () {
  return "info@voost-jobs.com";
};

export const getAccountUrl = function () {
  return getDomainUrl() + "/account";
};

export const getConversationsUrl = function () {
  return getDomainUrl() + "/conversations";
};

export const getApplicationsUrl = function () {
  return getDomainUrl() + "/applications";
};



export const getJobsURL = function () {
  return getDomainUrl() + "/jobs";
};

export const getLogoURL = function () {
  return getDomainUrl() + "/" + logo;
};

export const getScheduleMeetingLink = function (id) {
  return getDomainUrl() + "/voost-rooms?id=" + id;
};




