import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl';
import notifyToast from '../../../../common/toast';
import { createTeam as createTeamRequest } from '../../../../integration/http/team';
import { FeatureEnabled, TEAMS } from '../../../../common/flags'
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
  InvitationOnly,
  InviteFriends,
} from './components';

const createTeam = (team) => {
  const payload = JSON.parse(JSON.stringify(team));
  payload.games = payload.games.map((option) => option.value);
  payload.hashtags = payload.hashtags.map((option) => option.value);
  payload.moderators = payload.moderators.map((option) => option.id);
  payload.invitedFriends = payload.invitedFriends.map((option) => option.id);
  payload.type = payload.type && payload.type.value;
  payload.region = payload.region && payload.region.value;
  payload.language = payload.language && payload.language.value;
  return createTeamRequest(payload);
};

const CreateTeam = ({ loading, intl }) => {
  const [team, setTeam] = useState(defaultTeamFields);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  useEffect(() => {
    console.log(team);
    if (!creating) return;
    createTeam(team).then(() => setCreated(true)).catch((error) => {
      setCreating(false);
      notifyToast(error.response && error.response.data || error.message);
    });
  }, [team, creating, createTeam, setCreated]);
  if (loading) return null;
  if (created) {
    notifyToast(`Team ${team.name} is now online!`)
    window.router.replace('/');
  }
  return (
    <FeatureEnabled allOf={[TEAMS]}>
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
              <InvitationOnly checked={team.invitationOnly} intl={intl} onChange={() => setTeam({ ...team, invitationOnly: !team.invitationOnly })} />
              <ListOnLFT checked={team.listOnLFT} intl={intl} onChange={() => setTeam({ ...team, listOnLFT: !team.listOnLFT })} />
              <Recruiting checked={team.recruiting} intl={intl} onChange={() => setTeam({ ...team, recruiting: !team.recruiting })} />
              <Exclusive checked={team.exclusive} intl={intl} onChange={() => setTeam({ ...team, exclusive: !team.exclusive })} />
            </CommentsAndPrivacy>
            <InviteFriends invitedFriends={team.invitedFriends} intl={intl} onChange={(invitedFriends) => setTeam({ ...team, invitedFriends })} />
          </Column>
        </Content>
        <BottomBar loading={creating} intl={intl} onCancel={() => window.router.replace('/')} onCreate={() => setCreating(true)} />
      </div>
    </FeatureEnabled>
  );
}

export default injectIntl(CreateTeam);
