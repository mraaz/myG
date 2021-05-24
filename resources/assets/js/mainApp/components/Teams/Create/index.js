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
  Description,
  CommentsAndPrivacy,
  AllowChat,
  AutoAcceptGamers,
  ListOnLFT,
  Recruiting,
  Exclusive,
  WhoCanJoin,
  AllCanJoin,
  FriendsCanJoin,
  LinkCanJoin,
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
          <Type type={team.type} intl={intl} />
          <Description description={team.description} intl={intl} onChange={(description) => setTeam({ ...team, description })} />
          <CommentsAndPrivacy>
            <AllowChat checked={team.allowChat} intl={intl} onChange={() => setTeam({ ...team, allowChat: !team.allowChat })} />
            <AutoAcceptGamers checked={team.autoAcceptGamers} intl={intl} onChange={() => setTeam({ ...team, autoAcceptGamers: !team.autoAcceptGamers })} />
            <ListOnLFT checked={team.listOnLFT} intl={intl} onChange={() => setTeam({ ...team, listOnLFT: !team.listOnLFT })} />
            <Recruiting checked={team.recruiting} intl={intl} onChange={() => setTeam({ ...team, recruiting: !team.recruiting })} />
            <Exclusive checked={team.exclusive} intl={intl} onChange={() => setTeam({ ...team, exclusive: !team.exclusive })} />
          </CommentsAndPrivacy>
          <WhoCanJoin>
            <AllCanJoin checked={team.allCanJoin} intl={intl} onChange={() => setTeam({ ...team, allCanJoin: !team.allCanJoin })} />
            <FriendsCanJoin checked={team.friendsCanJoin} intl={intl} onChange={() => setTeam({ ...team, friendsCanJoin: !team.friendsCanJoin })} />
            <LinkCanJoin checked={team.linkCanJoin} intl={intl} onChange={() => setTeam({ ...team, linkCanJoin: !team.linkCanJoin })} />
            <InvitationCanJoin checked={team.invitationCanJoin} intl={intl} onChange={() => setTeam({ ...team, invitationCanJoin: !team.invitationCanJoin })} />
          </WhoCanJoin>
          <InviteFriends invitedFriends={team.invitedFriends} intl={intl} onChange={(invitedFriends) => setTeam({ ...team, invitedFriends })} />
        </Column>
      </Content>
      <BottomBar intl={intl} onCancel={() => window.router.replace('/')} onCreate={() => window.router.replace('/')} />
    </div>
  );
}

export default injectIntl(CreateTeam);
