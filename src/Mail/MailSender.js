import { acceptEmail } from "./templates/acceptEmail";
import { interviewScheduleEmail } from "./templates/interviewScheduleEmail";
import { JobApplicationEmail } from "./templates/jobApplicationEmail";
import { postJobEmail } from "./templates/postJobEmail";
import { rejectEmail } from "./templates/rejectEmail";
import { welcomeRecruiterEmail } from "./templates/welcomeRecruiterEmail";
import { welcomeSeekerEmail } from "./templates/welcomeSeekerEmail";
import { newMessageEmail } from "./templates/newMessageEmail";
import { scheduleMeetingEmail } from "./templates/scheduleMeetingEmail";
import { receivedJobApplication } from "./templates/receivedJobApplication";
import { interviewAccepted } from "./templates/interviewAccepted";
import { sendVerifyEmail } from "./templates/sendVerificationLink";

export default function mailSender(user, type) {
  var api_key = process.env.REACT_APP_MAILGUN_KEY;
  if (api_key) {
    const { message, subject } = selectTemplate(type, user);

    const domain = "mailer.opopmedia.co.uk";
    const host = "api.eu.mailgun.net";
    const mailgun = require("mailgun-js")({
      apiKey: api_key,
      domain: domain,
      host,
    });
    var data = {
      from: "noreply@voostjobs.com",
      to: [user.email, "info@opopmedia.co.uk"],
      subject: subject,
      html: message,
    };

    mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.log("error");
      } else {
        console.log("send email");
      }
      console.log(JSON.stringify(body) + "test...");
    });
  }
}

function selectTemplate(type, user) {
  let output = {
    message: "",
    subject: "",
  };

  switch (type) {
    case "interviewAccepted":
      output.message = interviewAccepted(user);
      output.subject = "Your scheduled interview was accepted.";
      break;

    case "receivedApplication":
      output.message = receivedJobApplication(user);
      output.subject = "Recieved a new job application.";
      break;
    case "scheduleEmail":
      output.message = scheduleMeetingEmail(user);
      output.subject = "A new meeeting has been scheduled.";
      break;
    case "message":
      output.message = newMessageEmail(user);
      output.subject = "You have received a new message";
      break;
    case "postJob":
      output.message = postJobEmail(user);
      output.subject = "You’ve successfully uploaded a job";
      break;
    case "jobApplication":
      output.message = JobApplicationEmail(user);
      output.subject = "VOOST: Your Application has been submitted";
      break;
    case "interviewSchedule":
      output.message = interviewScheduleEmail(user);
      output.subject = "Congratulations, you’ve got an interview!";
      break;
    case "rejected":
      output.message = rejectEmail(user);
      output.subject = "An update on your recent job interview!";
      break;
    case "accepted":
      output.message = acceptEmail(user);
      output.subject = "Congratulations, your interview was successful!";
      break;
    case "verifyAccount":
      output.message = sendVerifyEmail(user);
      output.subject = "Verify your account";
      break;
    case "welcome":
      output.message = user.recruiter
        ? welcomeRecruiterEmail(user)
        : welcomeSeekerEmail(user);
      output.subject = user.recruiter
        ? "Thank you for registering as a recruiter"
        : "Thank you for registering with Voost Jobs!";
      break;

    default:
      break;
  }

  return output;
}
