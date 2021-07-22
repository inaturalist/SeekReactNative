// @flow

import * as React from "react";
import HTML from "react-native-render-html";

import { viewStyles, textStyles } from "../../styles/auth/privacy";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const PrivacyPolicyScreen = (): React.Node => {
  const html = `<p><i>Last Modified on April 7, 2020</i></p>

  <p>
    This is the privacy policy ("Privacy Policy") of the California Academy of Sciences' and National Geographic Society's iNaturalist.org website, iOS App, and Android App, the iNaturalist Network Member Websites, and the Seek by iNaturalist App, and describes how iNaturalist.org ("iNaturalist," "We," "Us" or "Our") handles Personal Information (as defined below) that users ("You," "Your” or "User") provide to Us, or that We collect from You through the use of Our Website, which is located at www.inaturalist.org ) and through the iNaturalist Network Member websites (collectively, the "Websites"), and through the iNaturalist iOS App, and the iNaturalist Android App and the Seek by iNaturalist App (the “App(s)”). 
  </p>

  <p>
    This Privacy Policy is subject to our Terms of Service at <a href="https://www.inaturalist.org/pages/terms">https://www.inaturalist.org/pages/terms</a>. We may update this Privacy Policy from time to time, as specified in the “Changes to This Privacy Policy” section below.
  </p>

  <h3>Your Consent</h3>

  <p>
    You should read this entire Privacy Policy before submitting information to us or using our Websites. Whenever You submit personal and non-personal information via our Websites or otherwise to us, whether online or offline, You consent to the collection, use disclosure, transfer, and storage  of that information in accordance with this Privacy Policy.
  </p>

  <h3>Non-Personal Information</h3>

  <p>
    iNaturalist collects non-personal information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. iNaturalist's purpose in collecting non-personal information is to better understand how iNaturalist's visitors use its Websites and Apps. From time to time, iNaturalist may release non-Personal Information in the aggregate, e.g., by publishing a report on trends in the usage of its Websites and Apps.
  </p>

  <h3>Personal Information</h3>

  <p>
    "Personal Information" means information such as Your first/middle initial or name, last name, e-mail address, street address, mailing address if different, town or city, state, zip code, telephone number, profile photograph, Internet Protocol (IP) addresses, credit card information, and any other information that could allow someone to identify You or contact You.
  </p>

  <p>
    iNaturalist does not disclose Personal Information other than as disclosed below.
  </p>

  <h3>The Personal Information We Collect</h3>

  <p>
    iNaturalist may collect Personal Information when You choose to interact with iNaturalist in ways that require iNaturalist to gather such information, such as if You browse on iNaturalist, register as an iNaturalist User, update or add information to Your iNaturalist profile, provide content to iNaturalist through Your computer or phone, make a donation to iNaturalist through the Site, make a purchase from the iNaturalist store (collectively, the iNaturalist "Services"), or otherwise communicate with Us about the iNaturalist Services. When You post an Observation on iNaturalist, We may collect Your User ID, latitude and longitude of the site of the Observation, the place name of the site of the Observation,  the date and time of the Observation, the metadata associated with image or sound files, the app You used to contribute data, and the time zone of the site of the Observation. The amount and type of information that iNaturalist gathers depends on the nature of the interaction. In each case, iNaturalist collects such information only insofar as is necessary or appropriate to fulfill the purpose of Your interaction with iNaturalist. iNaturalist does not disclose Personal Information other than as described below. You can refuse to supply Personal Information, with the caveat that doing so may prevent You from engaging in certain Website and App-related activities, such as registering as an iNaturalist User, maintaining an iNaturalist profile, or posting content to iNaturalist. Without providing personal information (other than the automatic provision of Your IP address), You will still be able to access and use iNaturalist on a read-only basis.
  </p>

  <h3>How We Use Personal Information</h3>

  <p>
    We may use the Personal Information that You provide in order to deliver the iNaturalist Services and to administer and maintain the iNaturalist Websites. If You register as an iNaturalist User, You must give Us current, complete and accurate information and keep the information You provide to Us up to date. We cannot and shall not be responsible for any problems or liability that may arise if You do not give Us current, accurate, truthful, or complete information or if You fail to update the information You give Us. 
  </p>

  <h3>When We Disclose and Share Personal Information</h3>

  <p>
    Personal Information you provide related to the Observations You post (user name, date, time, location) is published in venues on iNaturalist where it is visible to anyone ("Published") as matter of normal usage and therefore is publicly shared with other iNaturalist Users, whether or not they are signed in. We also explicitly and publicly share this information publicly in a machine-readable format  a handful of partners, including the Global Biodiversity Information Facility ("GBIF").
  </p>

  <p>
    Personal Information associated with users’ registration and account (IP address, email address, etc.) is shared with iNaturalist staff and representatives from iNaturalist Network Members (see <a href="https://www.inaturalist.org/pages/network">https://www.inaturalist.org/pages/network</a> for information about the iNaturalist Network). iNaturalist Network Members can request and receive Personal Information from Users who affiliate with their particular Member site as their primary site.
  </p>

  <p>
    iNaturalist discloses Personal Information only to those of its programmers, contractors, and affiliated organizations that (i) need to know that information in order to process it on iNaturalist's behalf or to provide Services available at iNaturalist's Websites and Apps, and (ii) that have agreed not to disclose it to others, with the exception of non-public location data from Observations for non-commercial research, conservation, and species management purposes.
  </p>

  <p>
    Some of those employees, contractors and affiliated organizations may be located outside of Your home country; by using iNaturalist's Websites or Apps, You consent to the transfer of such information to them. iNaturalist will not rent or sell Personal Information to anyone. We share IP addresses, User agent strings (text that describes the software making a network connection), and information relating to software stability (e.g. information about software crashes) and behavior (e.g. the sequence of screens visited) with several analytics services. These processors include the Apple App Store, the Google Play Store, Google Analytics, Google Firebase and New Relic. We do not share Your iNaturalist User ID, User name, email address, or name with any of these services.
  </p>

  <p>
    We may share public and non-public location data from Observations, specifically  precise coordinates, with trusted data partners (including, but not limited to, members of the iNaturalist Network) for non-commercial research, conservation, and species management purposes.
  </p>

  <p>
    Our infrastructure is hosted by Microsoft Azure and  Amazon Web Services. We use Google Maps to display geographic content and We use Sendgrid for sending emails. If You choose to participate in some optional services, We will share personal information with processors that make those services possible, such as Civilized Discourse Construction Kit (for the iNaturalist Forum); Donorbox (for charitable donations); and Shopify, Printify and TaxJar (for the iNaturalist Store).
  </p>

  <p>
    Other than to its employees, contractors, and affiliated organizations, as described above, iNaturalist discloses Personal Information only when required to do so by law, or when iNaturalist believes in good faith that disclosure is reasonably necessary to protect the property or rights of iNaturalist, third parties, or the public at large. Unless authorized by You through Your opt-in, or as provided above, We will make Your Personal Information available to non-affiliated third parties only in the following circumstances:
  </p>

  <ul>
    <li>
      <p>
        If We are compelled to do so by a governmental agency, court, or other entity (e.g., to respond to subpoenas, court orders or legal process);
      </p>
    </li>
    <li>
      <p>
        If We believe Your actions violate a law, regulation, this Privacy Policy, or any applicable website or app's terms of use, or if You threaten the rights, property or safety of Us, Our Websites, Our Apps, any other Users, or third party;
      </p>
    </li>
    <li>
      <p>
        If, in Our sole discretion, We believe disclosure is necessary to investigate or resolve possible problems or inquiries, to protect Our assets, to defend Our interests or comply with Our legal and regulatory obligations; or to protect a User's safety;
      </p>
    </li>
    <li>
      <p>
        If there is a bankruptcy, merger, acquisition, transfer of control, joint venture or other business combination involving iNaturalist, the Academy or National Geographic.
      </p>
    </li>
  </ul>

  <p>
    If You are a registered User of iNaturalist and have supplied Your email address, iNaturalist may occasionally send You an email to tell You about new features, solicit Your feedback, or just keep You up to date with what's going on with iNaturalist and Our products. We primarily use blogs and groups to communicate this type of information, so We expect to keep this type of email to a minimum. If You send Us a request (for example via a support email or via one of Our feedback mechanisms), We reserve the right to publish it in order to help Us clarify or respond to Your request or to help Us support other Users. iNaturalist takes all measures reasonably necessary to protect against the unauthorized access, use, alteration, or destruction of  Personal Information.
  </p>

  <p>
    We do not share Your Personal Information data with any parties for marketing or commercial purposes.
  </p>

  <h3>Legal Basis for Processing Personal Information Under the General Data Protection Regulation (GDPR)</h3>

  <p>
    If You are a resident of the European Economic Area (EEA), iNaturalist's legal basis for collecting and using the Personal Information described in this Privacy Policy depends on the Personal Information We collect and the specific context in which We collect it. In addition, We process Personal Information with the principle of data minimization in mind. This means that We limit ourselves to the minimum amount of personal information which is needed to achieve the particular purpose for which We process the Personal Information. Below are some examples of the purposes for which Personal Information may be processed. 
  </p>

  <p>
    iNaturalist may process Your Personal Information because:
  </p>

  <ul>
    <li>
      <p>
        The processing is necessary to provide the services and features You have requested
      </p>
    </li>
    <li>
      <p>
        The processing is necessary to protect the vital interests of our users or of others
      </p>
    </li>
    <li>
      <p>
        The processing is necessary to perform a contract with You
      </p>
    </li>
    <li>
      <p>
        The processing is necessary for the legitimate interests of our business, such as fraud prevention, information security, or to comply with the law
      </p>
    </li>
    <li>
      <p>
        You have provided consent for Us to do so.
      </p>
    </li>
  </ul>

  <h3>Contact Preferences; Opt-In and Opt-Out</h3>

  <p>
    We would like to keep in touch with You in ways that You find to be beneficial. You can control the kinds of emails You receive after creating an account by clicking on this link <a href="https://www.inaturalist.org/users/edit">https://www.inaturalist.org/users/edit</a> and following the instructions on that page, or by following the instructions in various communications that We may send You. Should You require assistance, You may contact Us directly by emailing <a href="mailto:help@inaturalist.org">help@inaturalist.org</a>. Keep in mind that these preferences regarding promotional contacts do not mean that We might not contact You for other reasons, such as those related to an inquiry You made, a legally required notice and so on. 
  </p>

  <h3>How We Retain Personal Information</h3>

  <p>
    We retain Your Personal Information associated with Your registration for so long as You remain a registered User of iNaturalist. In addition, We may retain Personal Information from closed accounts to comply with national laws, prevent fraud, collect any fees owed, resolve disputes, troubleshoot problems, assist with any investigation, enforce Our User Agreement and take other actions permitted or required by applicable national laws.
  </p>

  <p>
    Personal information associated with Observations (time, date, location, etc.) may remain attached to Observations, even after You have closed Your account unless You request that We delete it.
  </p>

  <h3>Children</h3>

  <p>
    We do not knowingly collect or solicit Personal Information from children or knowingly allow children to purchase goods or memberships through Our Websites and Apps. Visitors 12 years of age and younger must obtain an adult's permission before submitting any Personal Information to our Websites or Apps. In the event that We learn that We have received any Personal Information from a visitor 12 years of age or younger, and We do not receive parental permission within a reasonable period of time of Our request for it, We will delete that information as quickly as possible. If You believe that We might have Personal Information from or about a child 12 years of age or younger, please contact Us at <a href="mailto:help@inaturalist.org">help@inaturalist.org</a>. To register an iNaturalist account for Your child, see <a href="http://www.inaturalist.org/user_parents/new">http://www.inaturalist.org/user_parents/new</a>.
  </p>

  <h3>Cookies</h3>

  <p>
    A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. iNaturalist uses cookies to help iNaturalist identify and track visitors, their usage of the iNaturalist Websites and their Website access preferences. iNaturalist visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using iNaturalist's Websites. Certain features of iNaturalist's Websites, such as the ability to post Observations, may not function properly without the aid of cookies. 
  </p>

  <h3>How We Protect Your Personal Information</h3>

  <p>
    We are committed to protecting the Personal Information You share with Us through the use of iNaturalist and We maintain reasonable physical, electronic and procedural safeguards to protect Your Personal Information. We limit access to Personal Information by Our own employees to individuals who are authorized for the proper handling of such information and any employee found violating Our standards of security and confidentiality is subject to Our disciplinary processes. We request Our service providers to follow the same policy. Unfortunately, We cannot guarantee that data transmitted over the Internet will always be secure. As a result, although We strive to protect Your Personal Information, We cannot ensure or warrant the security of any information You transmit or We may learn as a result of Your use of iNaturalist and You do so at Your own risk. If, for any reason, You do not agree with this Privacy Policy, please do not use or attempt to take advantage of any of the information, services, features or functions of iNaturalist that might require You to provide Your Personal Information. 
  </p>

  <h3>Your Rights with Your Personal Information</h3>

  <p>
    If You are a resident of the European Union, You have certain rights with regard to Your Personal Information. Those include:
  </p>

  <ul>
    <li>
      <p>
        <strong>The right to access, update or delete the information We have about You.</strong> In many instances, You can personally access and update Your Personal Information by accessing Your online account settings when logged in by going to <a href="https://www.inaturalist.org/users/edit">https://www.inaturalist.org/users/edit</a>. If You are unable to perform these actions yourself, please contact Us to assist You.
      </p>
    </li>
    <li>
      <p>
        <strong>The right of rectification.</strong> You have the right to have Your information corrected if that information is inaccurate or incomplete.
      </p>
    </li>
    <li>
      <p>
        <strong>The right to object.</strong> You have the right to object to our processing of Your Personal Information.
      </p>
    </li>
    <li>
      <p>
        <strong>The right of restriction.</strong> You have the right to request that We restrict the processing of Your Personal Information.
      </p>
    </li>
    <li>
      <p>
        <strong>The right to data portability.</strong> You have the right to be provided with a copy of the information that We have about You in a structured, machine-readable and commonly used format.
      </p>
    </li>
    <li>
      <p>
        <strong>The right to withdraw consent.</strong> You have the right to withdraw Your consent at any time where iNaturalist relied on Your consent to process Your personal information.
      </p>
    </li>
  </ul>

  <p>
    Please note that for Your safety and security, We may ask You to verify Your identity before responding to such requests. For any such information or requests, contact the iNaturalist Data Protection Officer at <a href="mailto:privacy@inaturalist.org">privacy@inaturalist.org</a>.
  </p>

  <h4>Posting Observations</h4>

  <p>
    If You do not wish to have the time, date, place , or other identifying information of an Observation included on iNaturalist, You should not post an Observation. Upon Your request, We will close Your account and remove Your Observations. 
  </p>

  <h4>Withdraw Consent</h4>

  <p>
    If You withdraw Your consent for the use or disclosure of Your Personal Information for purposes set out in this Privacy Policy You may not have access to all Our Services and We might not be able to provide You all of the Services and customer support offered to Our users and authorized under this Privacy Notice and Our User Agreement.
  </p>

  <h3>Links and Third Parties</h3>

  <p>
    There may be opportunities through the iNaturalist Websites and Apps from time to time to opt-in to receive information from non-iNaturalist entities. If You opt-in, You may receive correspondence from these organizations on programs, products or services that might interest You. Your communication with these entities should be directly with such entities.
  </p>

  <h3>Privacy Policy Changes</h3>

  <p>
    Although most changes are likely to be minor, iNaturalist may change its Privacy Policy from time to time, and in iNaturalist's sole discretion. We will post an updated and revised version of this Privacy Policy on the iNaturalist Websites when any material changes have been made, and iNaturalist encourages visitors to check this Privacy Policy often so You are aware of the most current terms and conditions that apply to You. The revisions are effective immediately upon posting. Your continued use of this site after any change in this Privacy Policy will constitute Your acceptance of such change.
  </p>

  <h3>Information from Users Outside the US, and Cross Border Data Transfers</h3>

  <p>
    The Services of iNaturalist are operated in the US. By using the Services and posting Observations, You consent to the transfer, processing and storage of Your Personal Information in the U.S., a jurisdiction in which the privacy laws may not be as comprehensive as those in the country in which You reside. We take all steps reasonably necessary to ensure that Your Personal Information is treated securely and in accordance with this Privacy Policy. iNaturalist Network Member sites operate in other jurisdictions. The Personal Information You provide Us may be transferred and stored in other jurisdictions if You select an iNaturalist Network Member as Your primary iNaturalist site.
  </p>

  <h3>California Do Not Track Notice</h3>

  <p>
    Because there are not yet common, industry accepted “do not track” standards and systems, the Websites may not respond to Do Not Track signals. 
  </p>

  <h3>Your California Privacy Rights</h3>

  <p>
    Although We do not disclose to any third parties for their marketing purposes any personally identifiable information, residents of the State of California are entitled to receive the following disclosure information under California law:
  </p>

  <p>
    Residents of the State of California, under the California Civil Code, have the right to request from companies conducting business in California, a list of all third parties to which the company has disclosed Personal Information during the preceding year for direct marketing purposes. Except with respect to the limited exceptions described above, We do not share Your Personal Information with any third parties for direct marketing purposes.
  </p>

  <p>
    If You are a California resident and request information about how to exercise Your third party disclosure choices, You must send a request to the following address with a preference on how Our response to Your request should be sent (email or postal mail). Send an email to the California Academy of Sciences Data Protection Officer at <a href="mailto:privacy@calacademy.org">privacy@calacademy.org</a> or contact Us via postal mail at:
  </p>

  <p>
    California Academy of Sciences – Data Protection Officer<br/>
    55 Music Concourse Drive<br/>
    San Francisco, CA 94118<br/>
    Attn: Your California Privacy Rights<br/>
  </p>

  <p>
    All requests sent via postal mail must be labeled "Your California Privacy Rights" on the envelope or post card and clearly stated on the actual request. For all requests, please include Your name, street address, city, state, and zip code. (Your street address is optional if You wish to receive a response to Your request via email. Please include Your zip code for our own recordkeeping.)  We will not accept requests via the telephone or by facsimile. We are not responsible for notices that are not labeled or sent properly, notices that are illegible or do not have complete information.
  </p>

  <h3>All Users</h3>

  <p>
    If any User of Our Websites, Apps, or any Subscriber has any questions about this Privacy Policy, please contact the California Academy of Sciences Data Protection Officer at <a href="mailto:privacy@calacademy.org">privacy@calacademy.org</a> or:
  </p>

  <p>
    California Academy of Sciences - Data Protection Officer<br/>
    55 Music Concourse Drive<br/>
    San Francisco, CA 94118<br/>
  </p>

  <p>
    <i>This Privacy Policy was last modified on April 7, 2020.</i>
  </p>

  <p>
    © Copyright 2020 California Academy of Sciences. All Rights Reserved.
  </p>`;

  const DEFAULT_PROPS = {
    onLinkPress( evt, href ) {
      return;
    }
  };

  return (
    <ScrollWithHeader header="inat_signup.privacy">
      <HTML
        {...DEFAULT_PROPS}
        containerStyle={viewStyles.textContainer}
        source={{ html }}
        tagsStyles={ { p: textStyles.text, h3: textStyles.headerText, a: textStyles.text, li: textStyles.list } }
      />
    </ScrollWithHeader>
  );
};

export default PrivacyPolicyScreen;
