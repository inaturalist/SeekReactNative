// @flow

import * as React from "react";
import HTML from "react-native-render-html";

import { viewStyles, textStyles } from "../../styles/auth/privacy";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const CommunityGuidelines = ( ): React.Node => {
  const html = `<div class="last column span-18">

  <p>
    Welcome to iNaturalist! iNaturalist is a global community of people who record observations of other organisms and share them with each other so all of us can learn more about the natural world. We all want iNat to be a fun, helpful, and relaxed place to be, so we (Ken-ichi and the other site staff) have written these guidelines with <a href="https://www.inaturalist.org/blog/12037-inaturalist-community-guidelines">extensive input from the community</a> to describe what we consider good and bad behavior. These are not a replacement for our <a href="https://www.inaturalist.org/pages/terms">Terms of Service</a>, and with the exception of a few items marked with a <strong>(!)</strong>, these are not hard and fast rules. They are guidelines and heuristics for how we should conduct ourselves on iNaturalist. These guidelines do not address our behavior beyond iNaturalist.
  </p>

  <h3>Suspendable Offenses</h3>

  <p>
    Let’s just get these out of the way at the start. Any of these behaviors are grounds for immediate suspension without warning.
  </p>

  <ul>
    <li>
      <p>
        <strong>(!) Hate speech.</strong> Hate speech is content consciously designed to attack people based on age, race, gender, sexual orientation, income, physical ability, country of origin, religion, educational background, or any other attribute that people are unable to control.
      </p>
    </li>
    <li>
      <p>
        <strong>(!) Insults or threats.</strong> Insults are attacks meant purely to belittle or offend people. A threat is any content that indicates an intent to harm another person. Note that warnings about suspension or other regulatory actions on the part of site staff or site curators on iNaturalist are not threats.
      </p>
    </li>
    <li>
      <p>
        <strong>(!) Sexually explicit content.</strong> Observations of mating non-human species are fine, but common sense should still be used.
      </p>
    </li>
    <li>
      <p>
        <strong>(!) Sockpuppet accounts.</strong> A sockpuppet account is an additional account set up to evade suspension or to engage in other forms of bad behavior, like confirming your own identifications. This does not include multiple accounts set up for multiple roles, e.g. a personal account and a professional account.
      </p>
    </li>
  </ul>

  <h3>Things That Are OK</h3>

  <p>
    Occasionally contentious behaviors that are actually encouraged or, at worst, forgivable.
  </p>

  <ul>
    <li>
      <p>
        <strong>Civil disagreement.</strong> If you see a problem, use our curation tools or politely engage the person who caused the problem. However, don't be personally offended if someone disagrees with you, no matter who they are. iNat is all about these kinds of discussions.
      </p>
    </li>
    <li>
      <p>
        <strong>Occasional mistakes.</strong> If someone has 100 legitimate observations and posts one photo of a garden gnome, just flag it as not presenting evidence of an organism and move on. If the gnomes become habitual, then it’s time to talk to the person and ask them to stop posting gnomes because they aren’t living organisms.
      </p>
    </li>
    <li>
      <p>
        <strong>Duplicate observations.</strong> They're not ideal, but they're usually due to oversight or bugs. Politely ask people to remove them but if they don't, it's not a big deal unless it becomes a habit. Keep in mind that observations of the same individual by different people are <em>not</em> duplicates. Those are two unique observations and don't merit any kind of curatorial action.
      </p>
    </li>
    <li>
      <p>
        <strong>Captive / cultivated organisms.</strong> We'd prefer they get marked correctly in the Data Quality Assessment, but they're not intrinsically bad.
      </p>
    </li>
    <li>
      <p>
        <strong>A lot of identifications.</strong> If someone adds a lot of identifications to your observations, don’t just assume it represents undue attention to you personally. They’re probably adding lots of identifications to everyone’s observations. One of the main purposes of iNaturalist is to help other people with identifications, so adding a lot of identifications is both accepted and encouraged.
      </p>
    </li>
    <li>
      <p>
        <strong>Requests for clarification.</strong> Requests to justify an identification in words are strongly encouraged. You don’t have to reply to such requests, but you also should not complain about them. Everyone has the right to ask, "Why?"
      </p>
    </li>
    <li>
      <p>
        <strong>Images of dead or dismembered animals.</strong> While we do not endorse killing or fatally injuring animals just for the sake of contributing to iNaturalist, as naturalists we all encounter such scenes in our explorations, for example in the form of road kill and recent predation events (including predation by humans). While these kinds of images can be disturbing for some people, they can also be interesting, and provide the same kind of scientifically relevant occurrence data as an image of a living creature. Very often they demonstrate some aspect of the life history of the organisms involved, or may even provide information relevant to the conservation of the organism in question.
      </p>
    </li>
  </ul>

  <h3>Tone &amp; Attitude</h3>

  <ul>
    <li>
      <p>
        <strong>Assume people mean well.</strong> Most problematic content on iNat (e.g. copyright violations, plagiarism, etc.) happens because new users don't understand what iNat is all about. Usually they think observation photos should just show something <em>like</em> what they saw, as opposed to presenting direct evidence of what they saw. If you think a photo represents a copyright violation, please <a href="https://www.inaturalist.org/pages/help#inappropriate">flag it as such</a>, but please assume people have made an honest mistake unless you have evidence to the contrary.
      </p>
    </li>
    <li>
      <p>
        <strong>Be polite and respectful.</strong> Treat everyone like you would treat a stranger in person. Don’t forget that there are real people behind the usernames and profile pictures people use on iNaturalist.
      </p>
    </li>
    <li>
      <p>
        <strong>Understand that the people who use iNat may not be like you.</strong> iNat is an international community including people from all backgrounds from age 13 and up. We all share an interest in nature, but that might be where our similarities end. Don’t assume everyone shares your politics or your sense of humor, or even speaks your language, so try to keep things polite and neutral until you get to know someone.
      </p>
    </li>
    <li>
      <p>
        <strong>(!) Don't discriminate against people based on age, race, gender, income, physical ability, country of origin, educational background, or any other trait that they can't control.</strong> This includes telling people not to bother identifying observations because they're "just a kid" or "clearly don't know what they're talking about." If you disagree with an identification, the appropriate response is to add an identification of your own, preferably with a calm, rational response based on the evidence. This may differ from the use of hate speech described above in that it is not necessarily a direct, self-consciously-inflicted attack. Just because this kind of discrimination is implied or done unknowingly doesn’t make it ok, but neither is it necessarily grounds for immediate suspension. 
      </p>
    </li>
  </ul>

  <h3>Good Form</h3>

  <p>
    Suggested practices for civil engagement.
  </p>

  <ul>
    <li>
      <p>
        <strong>Respect requests to be left alone.</strong> If someone asks you to stop mentioning or messaging them, please respect their wishes.
      </p>
    </li>
    <li>
      <p>
        <strong>Don't write in ALL CAPS.</strong> On the Internet, ALL CAPS is the equivalent of screaming at someone a hand's breadth away from their face. You might think you are being emphatic, but most people think you're screaming. A more polite way to add emphasis is to add an asterisk on either end of the word (or words) you would like to emphasize, *like this.*
      </p>
    </li>
    <li>
      <p>
        <strong>Avoid sarcasm with people you don't know.</strong> Don’t assume everyone shares your sense of humor, or even knows whether or not you're joking.
      </p>
    </li>
    <li>
      <p>
        <strong>You don't have to have the last word.</strong> Sometimes differences cannot be resolved. Learn to recognize when this has happened and resist the urge to reply if you have nothing constructive to add to a conversation.
      </p>
    </li>
    <li>
      <p>
        <strong>Don't justify identifications with your credentials or dismissive comments</strong> like "I am the world's foremost expert in magical aquatic plants, so if I say it's gillyweed, it's gillyweed" or even worse, the dreaded "It's obvious." These kinds of comments dissuade people from learning about nature by belittling and insulting them, and they make you look petty and/or cantankerous. Instead, justify your identifications based on a description of the evidence, e.g. "It's a gillyweed because it has rounded lobes instead of pointed lobes, and as far as I know it's the only aquatic plant with rounded lobes at this location. Here's a link to a website that shows these differences: [link]"
      </p>
    </li>
    <li>
      <p>
        <strong>Try to use accessible language.</strong> Sometimes technical jargon is necessary, but whenever possible, try to use language most people will understand, especially with people you don’t know or people who seem to be getting started. For example, sometimes "hair" is a perfectly adequate and more accessible synonym for "pile." If you feel that a technical term is required to be specific and the reader may not know that term, it often helps to define it, e.g. "Gray pile on the pronotum (pile means hair on a fly, the pronotum is the middle segment of the insect)." Obviously this is not always possible and can get tedious if you add a lot of identifications, just something to keep in mind.
      </p>
    </li>
  </ul>


  <h3>Tools for Dealing With Problems</h3>

  <ul>
    <li>
      <p>
        <strong>Your words.</strong> Talk to people and address problems politely but firmly. Cite these Guidelines or our Terms of Service to inform them how we all expect people to behave on iNaturalist.
      </p>
    </li>
     <li>
      <p>
        <strong>Take time away from the issue.</strong> If your emotions are running high, step away from your computer and let yourself calm down for an hour or even a day rather than inflame an issue or write something you might regret. 
      </p>
    </li>
    <li>
      <p>
        <strong>Curation tools like the Data Quality Assessment (DQA).</strong> Most issues with completeness or accuracy can be addressed through identifications and the DQA.
      </p>
    </li>
    <li>
      <p>
        <strong>Muting.</strong> If someone is annoying you, you can mute them by editing your account settings. This will prevent you from getting notified about their activities, including comments, @ mentions, and messages.
      </p>
    </li>
    <li>
      <p>
        <strong>Blocking.</strong> Blocking is an extreme measure for situations where efforts to resolve differences through discussion have failed and the offending party refuses to stop contacting you. Blocking someone will prevent them from interacting with you on iNat, including through identifications and use of the DQA. You can block someone by editing your account settings and using the "Blocked Users" feature. Blocking is <em>not</em> a way to stop identifications from people you don't like or trust. You can address problems like that by opting out of the Community IDs. Each person only gets to block three people. If you feel you need to block more than three people, please contact <a href="mailto:help@inaturalist.org">help@inaturalist.org</a> and we will consider raising this limit. If we (the site staff) find that you are using blocking to silence identifiers you don’t trust, we will investigate and we may suspend you.
      </p>
    </li>
    <li>
      <p>
        <strong><a href="mailto:help@inaturalist.org">help@inaturalist.org</a>.</strong> If there is a serious problem that you can't resolve or there are people on the site who cannot abide by these guidelines despite numerous requests to change their behavior, please email us and we will investigate and possibly suspend such people.
      </p>
    </li>
  </ul>
</div>`;

  return (
    <ScrollWithHeader header="inat_signup.guidelines">
      <HTML
        containerStyle={viewStyles.textContainer}
        source={{ html }}
        tagsStyles={ { p: textStyles.text, strong: textStyles.headerText, h3: textStyles.headerText, a: textStyles.text } }
      />
    </ScrollWithHeader>
  );
};

export default CommunityGuidelines;
