// @flow

import * as React from "react";
import HTML from "react-native-render-html";

import { viewStyles, textStyles } from "../../styles/auth/privacy";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const TermsOfServiceScreen = ( ): React.Node => {
  const html = `<p><strong><em>Revised November 26, 2019</em></strong></p>

  <p>
    Welcome to the iNaturalist website ("iNaturalist" or the "Website"). The following Terms of Service, in conjunction with the Terms of Use of the California Academy of Sciences website, available at <a href="https://www.calacademy.org/terms-of-use">https://www.calacademy.org/terms-of-use</a> and the National Geographic Society website at <a href="https://www.nationalgeographic.org/terms-of-service/">https://www.nationalgeographic.org/terms-of-service/</a>, govern all use of the iNaturalist website, all related applications, and all content, services and products available at or through the website (collectively, the "Website"). The Website is owned and operated by the California Academy of Sciences (the "Academy") and National Geographic Society ("National Geographic"). iNaturalist country portals (iNaturalist Network "Members" are operated by independent entities. The Website is offered subject to Your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, the iNaturalist Privacy Policy at <a href="https://www.inaturalist.org/pages/privacy">https://www.inaturalist.org/pages/privacy</a> and procedures that may be published from time to time on this Site by iNaturalist, the Academy and National Geographic (collectively, the “Agreement”). 
  </p>
  
  <p>
    Please read this Agreement carefully before accessing or using the Website. By accessing or using any part of the Website, each user ("You", "Your" or "User") agrees to the terms and conditions of this Agreement. If You do not agree to all the terms and conditions of this Agreement, You should not access the Website or use any services made available via the Website. The Website is available only to individuals who are at least 13 years old, unless parental permission has been obtained.
  </p>
  
  <ol>
    <li>
      <p>
        <strong>Your iNaturalist.org Account and Site.</strong> If You create an account on the Website, You are responsible for maintaining the security of Your account, and You are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You must not post content to Your account in a misleading or unlawful manner, including in a manner intended to trade on the name or reputation of others. iNaturalist may, at its discretion, change or remove any content  that it considers inappropriate or unlawful. You must immediately notify iNaturalist of any unauthorized uses of Your account or any other breaches of security. iNaturalist will not be liable for any acts or omissions by You, including any damages of any kind incurred as a result of such acts or omissions.
      </p>
    </li>
    <li>
      <p>
        <strong>Responsibility of Contributors.</strong> If You post material to the Website, or otherwise make (or allow any third party to make) material available by means of the Website (any such material, “Content”), You are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio file, or computer software. By making Content available, You represent and warrant that:
      </p>
      <ul>
        <li>
          <p>
            the Content does not contain or install any viruses, worms, malware, Trojan horses or other harmful or destructive content;
          </p>
        </li>
        <li>
          <p>
            the Content is not spam and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing);
          </p>
        </li>
        <li>
          <p>
            You will post only Content that is relevant to iNaturalist and at a rate and volume that does not hinder other Users' ability to use iNaturalist;
          </p>
        </li>
        <li>
          <p>
            the Content is not libelous or defamatory, does not contain threats or incite violence towards individuals or entities, and does not violate the privacy or publicity rights of any third party;
          </p>
        </li>
        <li>
          <p>
            Your login is not named in a manner that misleads Your readers into thinking that You are another person or company. For example, Your login name is not the name of a person other than Yourself or company other than Your own;
          </p>
        </li>
        <li>
          <p>
            Your content is not getting advertised via unwanted electronic messages such as spam links on newsgroups, email lists, journals and web sites, and similar unsolicited promotional methods
          </p>
        </li>
      </ul>
      <p>
        By submitting Content to iNaturalist for inclusion on the Website, You grant iNaturalist a world-wide, royalty-free, and non-exclusive license to reproduce, modify, adapt, and publish the Content solely for the purpose of displaying, distributing, and promoting Your observations and journal via iNaturalist. We might also use the Content for other purposes not subject to known legal restrictions, such as training machine learning models. You represent and warrant that (a) You own and control all of the rights to the Content that You post or You otherwise have the right to post such Content to the Site; (b) the Content is accurate and not misleading; and (c) use and posting of the Content You supply does not violate these Terms of Service and will not violate any rights of or cause injury to any person or entity. If You delete Content, iNaturalist will use reasonable efforts to remove it from the Website, but You acknowledge that caching or references to the Content may not be made unavailable immediately.
      </p>
      <p>
        Without limiting any of those representations or warranties, iNaturalist has the right (though not the obligation), in iNaturalist’s sole discretion, to terminate or deny access to and use of the Website to any individual or entity for any reason.
      </p>
    </li>
    <li>
      <p>
        <strong>Responsibility of Website Visitors.</strong> iNaturalist has not reviewed, and cannot review, all of the material, including computer software, posted to the Website, and cannot therefore be responsible for that material’s content, use or effects. By operating the Website, iNaturalist does not represent or imply that it endorses the material posted to the Website, or that it believes such material to be accurate, useful, non-infringing or non-harmful. You are responsible for taking precautions as necessary to protect Yourself and Your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. The Website may contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Website may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated. iNaturalist disclaims any responsibility for any harm resulting from the use by visitors of the Website, or from any downloading by those visitors of content posted to the Website.
      </p>
    </li>
    <li>
      <p>
        <strong>Non-Commercial Use.</strong> You agree not to use the Website, the iNaturalist Service, or any iNaturalist Content for commercial purpose or for any illegal, unlawful, inappropriate, or unauthorized purpose or activity. You further agree not to threaten, abuse, solicit, spam, harass, stalk, impersonate or intimidate other iNaturalist Users and not to collect or store any location or other personal information about any iNaturalist Users that You obtain from the Website. 
      </p>
    </li>
    <li>
      <p>
        <strong>Copyright Infringement and DMCA Policy.</strong> iNaturalist respects the intellectual property rights of others, and requests that Users of the iNaturalist Website and Service do the same.
      </p>
  
      <p>
        If You believe that Your work has been copied on the Website in a way that constitutes copyright infringement, please provide iNaturalist’s Copyright Agent with the information specified below in the form of a “Notification of Alleged Infringement.” It is iNaturalist’s policy to respond to clear Notifications of Alleged Infringement, and our policy is designed to make submitting Notifications of Alleged Infringement as straightforward as possible while reducing the number of Notifications that we receive that are fraudulent or difficult to understand or verify. If You are concerned about the removal of or blocked access to Your content, please provide iNaturalist’s Copyright Agent with a “Counter-Notification.”  The process specified below is consistent with that provided under the Digital Millennium Copyright Act (the text of which can be found at the U.S. Copyright Office Website at <a href="http://www.copyright.gov">http://www.copyright.gov</a>).
      </p>
  
      <h3>DMCA NOTIFICATION OF ALLEGED COPYRIGHT INFRINGEMENT</h3>
  
      <p>
        If You would like to submit a claim of copyright infringement, please substantiate each claim by sending iNaturalist’s registered Copyright Agent a Notification of Claimed Infringement at the email or mailing address below:
      </p>
  
      <p style="margin-left: 2em;">
        <strong>Copyright Agent</strong><br/>
        <br/>
        Copyright Agent, Legal Department<br/>
        California Academy of Sciences , iNaturalist<br/>
        55 Music Concourse Drive<br/>
        San Francisco, California  94118<br/>
        legal@calacademy.org<br/>
      </p>
  
      <p>
        Detail of what an effective Notification of Alleged Infringement must include is available at the U.S. Copyright Office Website at <a href="http://www.copyright.gov">http://www.copyright.gov</a>. 
      </p>
  
      <h3>DMCA COUNTER-NOTIFICATION</h3>
  
      <p>
        If You elect to submit a Counter-Notification, please send the iNaturalist registered Copyright Agent a Counter Notification at the email or mailing address above.
      </p>
  
      <p>
        Detail of what an effective Counter-Notification must include is available at the U.S. Copyright Office Website at <a href="http://www.copyright.gov">http://www.copyright.gov</a>.
      </p>
  
      <p>
        iNaturalist will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. In the case of a visitor who may infringe or repeatedly infringes the copyrights or other intellectual property rights of iNaturalist or others, iNaturalist may, in its discretion, terminate or deny access to and use of the Website.
      </p>
    </li>
    <li>
      <p>
        <strong>Intellectual Property.</strong> All trademarks, service marks, graphics and logos used in connection with iNaturalist or the Website are trademarks or registered trademarks of iNaturalist, the Academy, National Geographic or iNaturalist’s Users or other third parties. Your use of the Website grants You no right or license to reproduce or otherwise use any iNaturalist or third-party trademarks. This Agreement does not transfer to You any iNaturalist or third party intellectual property, and all right, title and interest in and to such property will remain solely with iNaturalist or such owners.
      </p>
    </li>
    <li>
      <p>
        <strong>Changes.</strong> iNaturalist reserves the right, at its sole discretion, to modify or replace any part of this Agreement. It is Your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Website following the posting of any changes to this Agreement constitutes acceptance of those changes. iNaturalist may also, in the future, offer new services and/or features through the Website (including, the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement.
      </p>
    </li>
    <li>
      <p>
        <strong>Termination.</strong> iNaturalist may terminate Your access to all or any part of the Website at any time, with or without cause, with or without notice, effective immediately. If You wish to terminate this Agreement or Your iNaturalist account, You may simply discontinue using the Website and delete Your account. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
      </p>
    </li>
    <li>
      <p>
        <strong>Disclaimer of Warranties.</strong> The Website is provided “as is.”  iNaturalist and its suppliers and Members hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither iNaturalist nor its suppliers or Members makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that You download from, or otherwise obtain content or services through, the Website at Your own discretion and risk.
      </p>
    </li>
    <li>
      <p>
        <strong>Limitation of Liability.</strong> In no event will iNaturalist be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement or substitute products or services; or (iii) for interruption of use or loss or corruption of data. iNaturalist shall have no liability for any failure or delay due to matters beyond its reasonable control. The foregoing shall not apply to the extent prohibited by applicable law.
      </p>
    </li>
    <li>
      <p>
        <strong>General Representation and Warranty.</strong> You represent and warrant that (i) Your use of the Website will be in strict accordance with the iNaturalist Privacy Policy located at <a href="https://www.inaturalist.org/pages/privacy">https://www.inaturalist.org/pages/privacy</a>, with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in Your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which You reside) and (ii) Your use of the Website will not infringe or misappropriate the intellectual property rights of any third party.
      </p>
    </li>
    <li>
      <p>
        <strong>Indemnification.</strong> You agree to indemnify and hold harmless iNaturalist, the Academy, National Geographic,  their contractors, licensors and Members, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of Your use of the Website, including but not limited to Your violation this Agreement.
      </p>
    </li>
    <li>
      <p>
        <strong>Open Source.</strong> You agree to indemnify and hold harmless iNaturalist, its code contributors, its contractors, and its licensors and Members, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of the publishing of iNaturalist’s source code or the acceptance of code contributions from outside parties.
      </p>
    </li>
    <li>
      <p>
        <strong>Miscellaneous.</strong> This Agreement constitutes the entire agreement between iNaturalist and You concerning the subject matter hereof, and may be modified only by a written amendment signed by an authorized executive of iNaturalist, Academy or National Geographic, or by the posting by iNaturalist of a revised version of these Terms of Service. Except to the extent applicable law, if any, provides otherwise, any access to or use of the Website will be governed by the laws of the state of California, U.S.A., excluding its conflict of law provisions, and the proper venue for any disputes arising out of or relating to any of the same will be the state and federal courts located within 60 miles of San Francisco, California. The prevailing party in any action or proceeding to enforce this Agreement shall be entitled to costs and attorneys’ fees. If any part of this Agreement is held invalid or unenforceable, that part will be construed to reflect the parties’ original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may not assign Your rights under this Agreement; iNaturalist may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.
      </p>
    </li>
   </ol>
  
  <p>
    &copy; Copyright 2019 California Academy of Sciences. All rights reserved.
  </p>`;

  const DEFAULT_PROPS = {
    onLinkPress( evt, href ) {
      return;
    }
  };

  return (
    <ScrollWithHeader header="inat_signup.terms">
      <HTML
        {...DEFAULT_PROPS}
        containerStyle={viewStyles.textContainer}
        source={{ html }}
        tagsStyles={ {
          p: textStyles.text,
          a: textStyles.text,
          h3: textStyles.headerText,
          strong: textStyles.headerText,
          ul: textStyles.list,
          ol: textStyles.list
        } }
      />
    </ScrollWithHeader>
  );
};

export default TermsOfServiceScreen;
