// @flow

import React, { useContext } from "react";
import HTML from "react-native-render-html";

import { viewStyles, textStyles } from "../../styles/auth/privacy";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { UserContext } from "../UserContext";

const PrivacyPolicyScreen = (): React.Node => {
  const { login } = useContext( UserContext );

  const iNatHtml = `<p><i>Last Modified on August 18, 2022</i></p>

<p>
  This is the privacy policy ("Privacy Policy") of the California Academy of Sciences' and National Geographic Society's iNaturalist.org website, iOS App, and Android App, the iNaturalist Network Member websites, and describes how iNaturalist.org ("iNaturalist," "We," "Us" or "Our") handles Personal Information (as defined below) that users ("You," "Your” or "User") provide to Us, or that We collect from You through the use of Our Website, which is located at <a href="https://www.inaturalist.org">www.inaturalist.org</a> ) and through the iNaturalist Network Member websites (collectively, the "Websites"), and through the iNaturalist iOS App, and the iNaturalist Android App and the Seek by iNaturalist App (the “App(s)”) (the “Websites” and “App(s)” are collectively, the “Platform”).
</p>

<p>
  Each country has different laws and rights relating to Personal Information of their residents. If You are a resident located outside the United States, in addition to this Privacy Policy, please also see Your country specific disclosures including those for: <a href="https://www.argentina.gob.ar/aaip">Argentina</a>; <a href="https://www.oaic.gov.au/privacy/your-privacy-rights">Australia</a>; <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada">Canada</a>; <a href="https://www.bcn.cl/leychile/navegar?idNorma=141599">Chile</a>; <a href="https://www.sic.gov.co/tema/proteccion-de-datos-personales">Colombia</a>; <a href="http://www.prodhab.go.cr/reformas/">Costa Rica</a>; <a href="https://www.fundacionmicrofinanzasbbva.org/revistaprogreso/en/new-bill-to-ensure-personal-data-protection/">Ecuador</a>; <a href="https://www.finlex.fi/fi/laki/ajantasa/2018/20181050">Finland</a>; <a href="https://www.kodiko.gr/nomothesia/document/552084/nomos-4624-2019">Greece</a>; <a href="https://www.dataguidance.com/jurisdiction/guatemala">Guatemala</a>; <a href="https://www.gov.il/he/Departments/the_privacy_protection_authority">Israel</a>; <a href="https://www.dof.gob.mx/nota_detalle.php?codigo=5469949&amp;fecha=26/01/2017">Mexico</a>; <a href="https://www.legislation.govt.nz/act/public/1993/0028/latest/DLM296639.html">New Zealand</a>; <a href="https://www.antai.gob.pa/proteccion-de-datos-personales-facebooklive/">Panama</a>; <a href="https://edpb.europa.eu/our-work-tools/general-guidance">Portugal</a>; <a href="https://www.saica.org.za/resources/legislation-and-governance/promotion-of-access-to-information-act">South Africa</a>; <a href="https://www.aepd.es/en/prensa-y-comunicacion/blog/data-governance-and-data-protection-policy">Spain</a>; <a href="https://www.datainspektionen.se/other-lang/in-english/the-general-data-protection-regulation-gdpr/">Sweden</a>; <a href="https://www.ndc.gov.tw/en/Content_List.aspx?n=F01BA39CDAD39B01">Taiwan</a>; <a href="https://www.itechlaw.org/latinamericadataprotection/uruguay">Uruguay</a>; and the <a href="https://www.gov.uk/data-protection">United Kingdom</a>;
</p>

<p>
  This Privacy Policy is subject to Our Terms of Use at <a href="https://www.inaturalist.org/pages/terms">https://www.inaturalist.org/pages/terms</a>. We may update this Privacy Policy from time to time, as specified in the “Privacy Policy Changes” section below.
</p>

<h3>
  <a name="consent" href="#consent" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Your Consent
</h3>

<p>
  You should read this entire Privacy Policy before submitting information to Us or using Our Platform. Whenever You submit personal and non-personal information via Our Platform or otherwise to Us, whether online or offline, You consent to the collection, use disclosure, transfer, and storage of that information in accordance with this Privacy Policy.
</p>

<h3>
  <a name="types" href="#types" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Types of Information We Collect
</h3>

<p>
  "Personal Information" means information such as Your first/middle initial or name, last name, e-mail address, street address, mailing address if different, town or city, state, zip code, telephone number, profile photograph, Internet Protocol (IP) addresses, credit card information and any other information that could allow someone to identify You or contact You, including information collected through cookies and other technology.
</p>

<p>
  iNaturalist collects Personal Information of the sort that web browsers, hardware, software and servers typically make available, such as the IP address, device ID, browser type, language preference, referring site, pages viewed, one or more cookies that may uniquely identify your browser, and the date and time of each visitor request. iNaturalist's purpose in collecting this information is to better understand how iNaturalist's visitors use its Platform. From time to time, iNaturalist may release such information in the aggregate, e.g., by publishing a report on trends in the usage of its Platform.
</p>

<h3>
  <a name="collect" href="#collect" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  How We Collect Personal Information
</h3>

<p>
  iNaturalist may collect Personal Information when You choose to interact with iNaturalist in ways that require iNaturalist to gather such information, such as if You browse on iNaturalist, register as an iNaturalist User, update or add information to Your iNaturalist profile, provide content to iNaturalist through Your computer or phone, make a donation to iNaturalist through the Platform, make a purchase from the iNaturalist Store (collectively, the iNaturalist "Services"), or otherwise communicate or engage with Us about the iNaturalist Services. When You record an encounter with an individual organism at a particular time and location and post it on iNaturalist (an “Observation”), We may collect Your User ID, latitude and longitude of the site of the Observation, the place name of the site of the Observation, the date and time of the Observation, the metadata associated with image or sound files, the app You used to contribute data, and the time zone of the site of the Observation. The amount and type of information that iNaturalist gathers depends on the nature of the interaction. In each case, iNaturalist collects such information only insofar as is necessary or appropriate to fulfill the purpose of Your interaction with iNaturalist. iNaturalist does not disclose Personal Information other than as described herein. You can refuse to supply Personal Information, with the caveat that doing so may prevent You from engaging in certain Website and App-related activities, such as registering as an iNaturalist User, maintaining an iNaturalist profile, posting content to iNaturalist, making a donation, or purchasing an item from the iNaturalist Store. Without providing personal information (other than the automatic provision of Your IP address), You will still be able to access and use iNaturalist on a read-only basis.
</p>

<h3>
  <a name="use" href="#use" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  How We Use Personal Information
</h3>

<p>
  We may use the Personal Information that You provide in order to deliver the iNaturalist Services and to administer and maintain the iNaturalist Websites, respond to Your inquiries, improve our services, business, and Platform, manage our business including spam detection and fraud prevention purposes, for marketing, legal and research purposes, and to understand how You use Our Platform and Services. If You register as an iNaturalist User, You must give Us current, complete and accurate information and keep the information You provide to Us up to date. We cannot and shall not be responsible for any problems or liability that may arise if You do not give Us current, accurate, truthful, or complete information or if You fail to update the information You give Us.
</p>

<h3>
  <a name="disclose" href="#disclose" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  When We Disclose and Share Personal Information
</h3>

<p>
  Personal Information You provide related to the Observations You post (user name, date, time, location) is published in venues on iNaturalist where it is visible to anyone ("Published") as matter of normal usage and therefore is publicly shared with other iNaturalist Users, whether or not they are signed in. We also explicitly and publicly share this information in a machine-readable format with a handful of partners, including the Global Biodiversity Information Facility ("<a href="https://www.gbif.org/">GBIF</a>"), the <a href="https://aws.amazon.com/opendata/open-data-sponsorship-program/">Amazon Web Services ("AWS") Open Data Sponsorship Program</a>, and others.
</p>

<p>
  We share Personal Information associated with Users’ registration and account (non-public location data from Observations You post, IP address, email address, etc.) with representatives from iNaturalist Network Members (see <a href="https://www.inaturalist.org/pages/network">https://www.inaturalist.org/pages/network</a> for information about the iNaturalist Network) only for Users who have chosen to affiliate with that specific Network Member as their primary site. iNaturalist Network Members are responsible for the secure storage and responsible use of the data, and develop their own criteria on how data may or may not be reshared for non-commercial research, conservation, and species management purposes. You can prevent this sharing by affiliating with iNaturalist.org in your account settings.
</p>

<p>
  Unless you have specifically chosen to hide it, iNaturalist, in its sole discretion, may disclose non-public location data of threatened or sensitive species to researchers and affiliated organizations for research, conservation, and species management purposes.
</p>

<p>
  iNaturalist discloses Personal Information to contractors, service providers, consultants and affiliated organizations that (i) need to know that information in order to process it on iNaturalist's behalf or to provide Services available at iNaturalist's Platform, and (ii) that have agreed not to disclose it to others.
</p>

<p>
  Some of iNaturalist’s contractors, service providers and affiliated organizations may be located outside of Your home country; by using iNaturalist's Platform, You consent to the transfer of such information to them. iNaturalist will not rent or sell Personal Information to anyone. We share your Personal information with entities that support Our Websites and data, communicating with You, fraud and spam detection, data analytics, and other legitimate business purposes including communicating with the Apple App Store, the Google Play Store, Google Analytics, Google Firebase and New Relic.
</p>

<p>
  We use Microsoft Azure and Amazon Web Services, Google Maps Platform (to display geographic content), and SendGrid. If You choose to participate in some optional services, We will share Personal Information with entities that make those services possible, such as Civilized Discourse Construction Kit (for the iNaturalist Forum); Donorbox and Stripe (for charitable donations); and Threadless (for the iNaturalist Store). You can withdraw from participation in these services by contacting Us at <a href="mailto:privacy@inaturalist.org">privacy@inaturalist.org</a>.
</p>

<p>
  Other than as described above, iNaturalist discloses Personal Information only when required to do so by law, or when iNaturalist believes in good faith that disclosure is reasonably necessary to protect the property or rights of iNaturalist, third parties, or the public at large. Unless authorized by You through Your opt-in, or as provided above, We will make Your Personal Information available to non-affiliated third parties only in the following circumstances:
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
  If You are a registered User of iNaturalist and have supplied Your email address, iNaturalist may occasionally send You an email to tell You about new features, solicit Your feedback, or just keep You up to date with what's going on with iNaturalist and Our services. We primarily use blogs and groups to communicate this type of information, so We expect to keep this type of email to a minimum. If You send Us a request (for example via a support email or via one of Our feedback mechanisms), We reserve the right to publish it in order to help Us clarify or respond to Your request or to help Us support other Users. iNaturalist takes all measures reasonably necessary to protect against the unauthorized access, use, alteration, or destruction of Personal Information. You can unsubscribe from email communications by changing your account settings, deleting your account, or contacting Us at <a href="mailto:privacy@inaturalist.org">privacy@inaturalist.org</a>.
</p>

<h3>
  <a name="gdpr" href="#gdpr" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Legal Basis for Processing Personal Information Under the General Data Protection Regulation (GDPR)
</h3>

<p>
  If You are a resident of the European Economic Area (EEA), or otherwise subject to the GDPR, iNaturalist's legal basis for collecting and using the Personal Information described in this Privacy Policy depends on the Personal Information We collect and the specific context in which We collect it. In addition, We process Personal Information with the principle of data minimization in mind. This means that We limit ourselves to the minimum amount of personal information which is needed to achieve the particular purpose for which We process the Personal Information. Below are some examples of the purposes for which Personal Information may be processed.
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
      The processing is necessary to perform a contract with You
    </p>
  </li>
  <li>
    <p>
      The processing is necessary for the legitimate interests of Our business, such as fraud prevention, information security, or to comply with the law
    </p>
  </li>
  <li>
    <p>
      You have provided consent for Us to do so.
    </p>
  </li>
</ul>

<h3>
  <a name="contact" href="#contact" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Contact Preferences
</h3>

<p>
  We would like to keep in touch with You in ways that You find to be beneficial. You can control the kinds of emails You receive after creating an account by clicking on this link <a href="https://www.inaturalist.org/users/edit">https://www.inaturalist.org/users/edit</a> and following the instructions on that page, or by clicking unsubscribe links in emails that We may send You. Should You require assistance, You may contact Us directly by emailing <a href="mailto:help@inaturalist.org">help@inaturalist.org</a>. Keep in mind that these preferences regarding promotional contacts do not mean that We might not contact You for other reasons, such as those related to an inquiry You made, a legally required notice and so on.
</p>

<h3>
  <a name="retain" href="#retain" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  How We Retain Personal Information
</h3>

<p>
  We retain Your Personal Information associated with Your registration for so long as You remain a registered User of iNaturalist. In addition, We may retain Personal Information from closed accounts to comply with national laws, prevent fraud, collect any fees owed, resolve disputes, troubleshoot problems, assist with any investigation, enforce Our User Agreement and take other actions permitted or required by applicable national laws.
</p>

<p>
  Personal information associated with Observations (time, date, location, etc.) may remain attached to Observations, even after You have closed Your account unless You request that We delete it.
</p>

<h3>
  <a name="children" href="#children" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Children
</h3>

<p>
  We do not knowingly collect or solicit Personal Information from children or knowingly allow children to make purchases through Our Platform. Visitors 12 years of age and younger must obtain an adult's permission before submitting any Personal Information to our Platform. In the event that We learn that We have received any Personal Information from a visitor 12 years of age or younger, and We do not receive parental permission within a reasonable period of time of Our request for it, We will delete that information as quickly as possible. If You believe that We might have Personal Information from or about a child 12 years of age or younger, please contact Us at <a href="mailto:help@inaturalist.org">help@inaturalist.org</a>. To register an iNaturalist account for Your child, see <a href="https://www.inaturalist.org/user_parents/new">https://www.inaturalist.org/user_parents/new</a>.
</p>

<h3>
  <a name="cookies" href="#cookies" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Cookies
</h3>

<p>
  Automated technology collects information from Your computer or mobile device and includes cookies, web beacons, local shared objects, or other similar technology. A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. A "web beacon" is a small object or image that is embedded into a web page, application, or email and is used to track activity. They are also sometimes referred to as pixels and tags.
</p>

<p>
  As You access or use Our Website, We and/or third parties may collect information using cookies, web beacons, pixels, navigational and location data collection (clickstream, log files, server logs) and other similar technologies for the purposes described in this Policy. iNaturalist uses cookies to help iNaturalist identify and track visitors, their usage of the iNaturalist Websites and their Website access preferences. iNaturalist visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using iNaturalist's Websites. Certain features of iNaturalist's Websites, such as the ability to post Observations, may not function properly without the aid of cookies.
</p>

<p>
  To find more information about cookies please visit <a href="www.allaboutcookies.org">www.allaboutcookies.org</a>. Most browsers are initially set to allow cookies, but also offer the option to restrict cookies or warn You of their use.
</p>

<h3>
  <a name="analytics" href="#analytics" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Third Party Analytics Disclaimer
</h3>

<p>
  We and/or third-parties and service providers on Our behalf, use cookies, web beacons and other similar technology, to collect information for the purposes described in this Policy including analytics, monitoring performance and improvement of Our online services (traffic, errors, page load time, popular pages, etc.).
</p>

<p>
  You may opt out of analytics as follows. Residents of the European Economic Area (EEA) that have the right to opt-out of decisions based solely on automatic decision-making may also opt-out of analytics as follows.
</p>

<p>
 All iNat users may opt-out of all third party tracking by visiting <a href="https://www.inaturalist.org/users/edit#account">https://www.inaturalist.org/users/edit#account</a>.
</p>

<h4>Analytics</h4>

<p>
  <a href="https://www.google.com/analytics">Google Analytics</a>. We use Google Analytics to understand how Our website, services, and products perform, how You use them, and to serve You with ads on third-party websites. To learn more about how Google processes Your data, please visit: <a href="https://www.google.com/policies/privacy/">https://www.google.com/policies/privacy/</a>.  To opt out of Google Analytics, please install the Google Analytics Opt-out Browser Add-on by visiting: <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>.
</p>

<h3>
  <a name="protect" href="#protect" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  How We Protect Your Personal Information
</h3>

<p>
  We are committed to protecting the Personal Information You share with Us through the use of iNaturalist and We maintain reasonable physical, electronic and procedural safeguards to protect Your Personal Information. We limit access to Personal Information by Our own employees to individuals who are authorized for the proper handling of such information and any employee found violating Our standards of security and confidentiality is subject to Our disciplinary processes. We request Our service providers to follow the same policy. Unfortunately, We cannot guarantee that data transmitted over the Internet will always be secure. As a result, although We strive to protect Your Personal Information, We cannot ensure or warrant the security of any information You transmit or We may learn as a result of Your use of iNaturalist and You do so at Your own risk. If, for any reason, You do not agree with this Privacy Policy, please do not use or attempt to take advantage of any of the information, services, features or functions of iNaturalist that might require You to provide Your Personal Information.
</p>

<h3>
  <a name="european-rights" href="#european-rights" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Your Rights with Your Personal Information
</h3>

<p>
  If You are a resident of the European Economic Area (“EEA”), You have certain rights with regard to Your Personal Information. Those include:
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
  If You do not wish to have the time, date, place, or other identifying information of an Observation included on iNaturalist, You should not post an Observation. Upon Your request, We will close Your account and remove Your Observations.
</p>

<h4>Withdraw Consent</h4>

<p>
  If You withdraw Your consent for the use or disclosure of Your Personal Information for purposes set out in this Privacy Policy You may not have access to all Our Services and We might not be able to provide You all of the Services and customer support offered to Our users and authorized under this Privacy Notice and Our User Agreement.
</p>

<h4>The Data Controller</h4>

<p>
  The Data Controller who collects and processes your Personal Information is: California Academy of Sciences at <a href="mailto:privacy@calacademy.org">privacy@calacademy.org</a>.
</p>

<h3>
  <a name="third-parties" href="#third-parties" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Links and Third Parties
</h3>

<p>
  There may be opportunities through the iNaturalist Platform from time to time to opt-in to receive information from non-iNaturalist entities. If You opt-in, You may receive correspondence from these organizations on programs, products or services that might interest You. Your communication with these entities should be directly with such entities.
</p>

<h3>
  <a name="changes" href="#changes" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Privacy Policy Changes
</h3>

<p>
  Although most changes are likely to be minor, iNaturalist may change its Privacy Policy from time to time, and at iNaturalist's sole discretion. We will post an updated and revised version of this Privacy Policy on the iNaturalist Platform when any material changes have been made, and iNaturalist encourages visitors to check this Privacy Policy often so You are aware of the most current terms and conditions that apply to You. The revisions are effective immediately upon posting. Your continued use of this site after any change in this Privacy Policy will constitute Your acceptance of such change.
</p>

<h3>
  <a name="outside-us" href="#outside-us" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Information from Users Outside the US, and Cross Border Data Transfers
</h3>

<p>
  The Services of iNaturalist are operated from and in the U.S. By using the Services and posting Observations, You consent to the transfer, processing and storage of Your Personal Information in the U.S., a jurisdiction in which the privacy laws may not be as comprehensive as those in the country in which You reside. We take all steps reasonably necessary to ensure that Your Personal Information is treated securely and in accordance with this Privacy Policy. iNaturalist Network Member sites operate in other jurisdictions. The Personal Information You provide Us may be transferred and stored in other jurisdictions if You select an iNaturalist Network Member as Your primary iNaturalist site.
</p>

<h3>
  <a name="california-do-not-track" href="#california-do-not-track" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  California Do Not Track Notice
</h3>

<p>
  Because there are not yet common, industry accepted “do not track” standards and systems, the Websites may not respond to Do Not Track signals. In addition, we may allow third parties to collect Personal Information from your activity on our Website, as described in this Privacy Policy.
</p>

<h3>
  <a name="ccpa" href="#ccpa" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  Your California Privacy Rights
</h3>

<p>
  Although We do not disclose to any third parties for their marketing purposes any Personal Information, residents of the State of California are entitled to receive the following disclosure information under California law:
</p>

<p>
  Residents of the State of California, under the California Civil Code, have the right to request from companies conducting business in California, a list of all third parties to which the company has disclosed Personal Information during the preceding year for direct marketing purposes. Except with respect to the limited exceptions described above, We do not share Your Personal Information with any third parties for direct marketing purposes.
</p>

<p>
  If You are a California resident and request information about how to exercise Your third party disclosure choices, You must send a request to the following address with a preference on how Our response to Your request should be sent (email or postal mail). Send an email to the California Academy of Sciences Data Protection Officer at <a href="mailto:privacy@calacademy.org">privacy@calacademy.org</a> or contact Us via postal mail at:
</p>

<p>
  California Academy of Sciences – Data Protection Officer<br>
  55 Music Concourse Drive<br>
  San Francisco, CA 94118<br>
  Attn: Your California Privacy Rights<br>
</p>

<p>
  All requests sent via postal mail must be labeled "Your California Privacy Rights" on the envelope or postcard and clearly stated on the actual request. For all requests, please include Your name, street address, city, state, and zip code. (Your street address is optional if You wish to receive a response to Your request via email. Please include Your zip code for our own recordkeeping.) We will not accept requests via the telephone or by facsimile. We are not responsible for notices that are not labeled or sent properly, notices that are illegible or do not have complete information.
</p>

<h3>
  <a name="all-users" href="#all-users" class="anchor" aria-hidden="true"><i class="icon-link"></i></a>
  All Users
</h3>

<p>
  If any User of Our Platform, or any Subscriber has any questions about this Privacy Policy, please contact the California Academy of Sciences Data Protection Officer <a href="mailto:privacy@calacademy.org">privacy@calacademy.org</a> or:
</p>

<p>
  California Academy of Sciences - Data Protection Officer<br>
  55 Music Concourse Drive<br>
  San Francisco, CA 94118<br>
</p>

<p>
  <i>This Privacy Policy was last modified on August 18, 2022.</i>
</p>

<p>
  © Copyright 2022 California Academy of Sciences. All Rights Reserved.
</p>`;

  const seekHtml = `<p><i>Last Modified on April 7, 2020</i></p>

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
      {login ? (
        <HTML
          {...DEFAULT_PROPS}
          containerStyle={viewStyles.textContainer}
          source={{ html: iNatHtml }}
          tagsStyles={{
            p: textStyles.text,
            h3: textStyles.headerText,
            a: textStyles.text,
            li: textStyles.list
          }}
        />
      ) : (
        <HTML
          {...DEFAULT_PROPS}
          containerStyle={viewStyles.textContainer}
          source={{ html: seekHtml }}
          tagsStyles={{
            p: textStyles.text,
            h3: textStyles.headerText,
            a: textStyles.text,
            li: textStyles.list
          }}
        />
      )}
    </ScrollWithHeader>
  );
};

export default PrivacyPolicyScreen;
