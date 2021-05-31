import React, { useState } from 'react'
import { injectIntl } from 'react-intl';
import {
  defaultTeamFields,
  TopBar,
  BottomBar,
  Content,
  Column,
  Name,
  GameTitles,
  FeaturedImage,
  Hashtags,
  Moderators,
  Type,
  Region,
  Language,
  Description,
  CommentsAndPrivacy,
  AutoAcceptGamers,
  ListOnLFT,
  Recruiting,
  Exclusive,
  InvitationCanJoin,
  InviteFriends,
} from './components';

const CreateTeam = ({ loading, intl }) => {
  const [team, setTeam] = useState(defaultTeamFields);
  console.log(team);
  if (loading) return null;
  return (
    <div id="teams">
      <TopBar intl={intl} />
      <Content>
        <Column>
          <Name name={team.name} intl={intl} onChange={(name) => setTeam({ ...team, name })} />
          <GameTitles games={team.games} intl={intl} onChange={(games) => setTeam({ ...team, games })} />
          <FeaturedImage image={team.image} intl={intl} onChange={(image) => setTeam({ ...team, image })} />
          <Hashtags hashtags={team.hashtags} intl={intl} onChange={(hashtags) => setTeam({ ...team, hashtags })} />
          <Moderators moderators={team.moderators} intl={intl} onChange={(moderators) => setTeam({ ...team, moderators })} />
        </Column>
        <Column>
          <Type type={team.type} intl={intl} onChange={(type) => setTeam({ ...team, type })} />
          <Region region={team.region} intl={intl} onChange={(region) => setTeam({ ...team, region })} />
          <Language language={team.language} intl={intl} onChange={(language) => setTeam({ ...team, language })} />
          <Description description={team.description} intl={intl} onChange={(description) => setTeam({ ...team, description })} />
          <CommentsAndPrivacy>
            <AutoAcceptGamers checked={team.autoAcceptGamers} intl={intl} onChange={() => setTeam({ ...team, autoAcceptGamers: !team.autoAcceptGamers })} />
            <InvitationCanJoin checked={team.invitationCanJoin} intl={intl} onChange={() => setTeam({ ...team, invitationCanJoin: !team.invitationCanJoin })} />
            <ListOnLFT checked={team.listOnLFT} intl={intl} onChange={() => setTeam({ ...team, listOnLFT: !team.listOnLFT })} />
            <Recruiting checked={team.recruiting} intl={intl} onChange={() => setTeam({ ...team, recruiting: !team.recruiting })} />
            <Exclusive checked={team.exclusive} intl={intl} onChange={() => setTeam({ ...team, exclusive: !team.exclusive })} />
          </CommentsAndPrivacy>
          <InviteFriends invitedFriends={team.invitedFriends} intl={intl} onChange={(invitedFriends) => setTeam({ ...team, invitedFriends })} />
        </Column>
      </Content>
      <BottomBar intl={intl} onCancel={() => window.router.replace('/')} onCreate={() => window.router.replace('/')} />
    </div>
  );
}

export default injectIntl(CreateTeam);
