import React from 'react'
import { FormattedMessage } from 'react-intl';
import { EXPERIENCE_OPTIONS, REGION_OPTIONS, LANGUAGE_OPTIONS } from '../../../static/AddGame';
import {
  MyGInput,
  MyGTextarea,
  MyGSelect,
  MyGCheckbox,
  MyGButton,
  MyGSideLine,
  MyGDropzone,
  MyGGameSelect,
  MyGTagSelect,
  MyGFriendSelect,
} from '../../common';

export const defaultTeamFields = {
  name: '',
  games: [{ id: '1' }, { id: '2' }, { id: '3' }],
  image: '',
  hashtags: [],
  moderators: [],
  type: '',
  region: '',
  language: '',
  description: '',
  autoAcceptGamers: true,
  listOnLFT: true,
  recruiting: true,
  exclusive: false,
  invitationOnly: false,
  invitedFriends: [],
  availability: [],
};

export const Content = ({ children }) => (
  <div className="team-content">
    {children}
  </div>
);

export const Column = ({ children }) => (
  <div className="team-column">
    <MyGSideLine />
    {children}
  </div>
);

export const TopBar = () => (
  <div className="team-top-bar">
    <FormattedMessage id="teams.create.title" defaultMessage="Create Team" />
  </div>
);

export const BottomBar = ({ intl, loading, onCancel, onCreate }) => (
  <div className="team-bottom-bar">
    <MyGButton
      secondary
      onClick={onCancel}
      text={intl.formatMessage({ id: "myg.cancel", defaultMessage: "Cancel" })}
    />
    <MyGButton
      primary
      loading={loading}
      onClick={onCreate}
      text={intl.formatMessage({ id: "myg.create", defaultMessage: "Create" })}
    />
  </div>
);

export const Label = (props) => (
  <div className="team-label">
    <FormattedMessage {...props} />
  </div>
);

export const Name = ({ onChange, intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.name" defaultMessage="Team Name" />
    <MyGInput containerStyles={{ width: '100%' }} inputStyles={{ width: '100%' }} onChange={(event) => onChange(event.target.value)} placeholder={intl.formatMessage({ id: "teams.create.name-hint", defaultMessage: "must be unique" })} />
  </div>
);

export const GameTitle = ({ intl, index, game, onChange }) => (
  <div className="team-game-title">
    <Label id={`teams.create.game-title-${index + 1}`} defaultMessage={`${index + 1}`} />
    <MyGGameSelect
      containerStyles={{ width: '100%' }}
      controlStyles={{ width: '100%' }}
      game={game}
      dynamicFields={false}
      disabled={false}
      placeholder={intl.formatMessage({ id: "teams.create.game-title", defaultMessage: "Enter Game Title" })}
      onChange={onChange}
    />
  </div>
);

export const GameTitles = ({ games, intl, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.games" defaultMessage="Game Titles" />
    {games.map((game, index) => (
      <GameTitle key={index} index={index} intl={intl} game={game} onChange={({ game }) => {
        const newGames = JSON.parse(JSON.stringify(games));
        newGames.splice(index, 1, game);
        onChange(newGames);
      }} />
    ))}
  </div>
);

export const FeaturedImage = ({ image, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.featured-image" defaultMessage="Featured Image" />
    <MyGDropzone image={image} containerStyle={{ width: '100%' }} onChange={onChange} />
  </div>
);

export const Hashtags = ({ intl, hashtags, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.hashtags" defaultMessage="Add Hashtags" />
    <MyGTagSelect endpoint={'/api/team/tags'} tags={hashtags} onChange={onChange} placeholder={intl.formatMessage({ id: "teams.create.hashtags-hint", defaultMessage: "#hello" })} />
  </div>
);

export const Moderators = ({ intl, moderators, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.moderators" defaultMessage="Moderators" />
    <MyGFriendSelect
      containerStyles={{ width: '100%' }}
      controlStyles={{ width: '100%' }}
      friends={moderators}
      disabled={false}
      placeholder={intl.formatMessage({ id: "teams.create.moderators-hint", defaultMessage: "Enter your Friend's name to set them as a moderator" })}
      onChange={onChange}
    />
  </div>
);

export const Type = ({ type, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.type" defaultMessage="Type" />
    <MyGSelect
      value={type}
      options={EXPERIENCE_OPTIONS}
      onChange={onChange}
    />
  </div>
);

export const Language = ({ language, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.language" defaultMessage="Language" />
    <MyGSelect
      value={language}
      options={LANGUAGE_OPTIONS}
      onChange={onChange}
    />
  </div>
);

export const Region = ({ region, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.region" defaultMessage="Region" />
    <MyGSelect
      value={region}
      options={REGION_OPTIONS}
      onChange={onChange}
    />
  </div>
);

export const Description = ({ intl, onChange }) => (
  <div className="team-input-container">
    <Label id="teams.create.description" defaultMessage="Description" />
    <MyGTextarea
      placeholder={intl.formatMessage({ id: "teams.create.description-hint", defaultMessage: "Enter a description for your team" })}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export const CommentsAndPrivacy = ({ children }) => (
  <React.Fragment>
    <div className="team-input-container team-section-header">
      <Label id="teams.create.comments-and-privacy" defaultMessage="Comments and Privacy" />
    </div>
    {children}
  </React.Fragment>
);

export const AutoAcceptGamers = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.auto-accept-gamers", defaultMessage: "Auto Accept Gamers" })}
    />
  </div>
);

export const ListOnLFT = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.list-on-lft", defaultMessage: "Listed on LFT" })}
    />
  </div>
);

export const Recruiting = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.recruiting", defaultMessage: "Actively Recruiting" })}
    />
  </div>
);

export const Exclusive = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.exclusive", defaultMessage: "Exclusivity Team" })}
    />
  </div>
);

export const InvitationOnly = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.invitation-can-join", defaultMessage: "Invitation Only" })}
    />
  </div>
);

export const InviteFriends = ({ invitedFriends, onChange, intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.invite-friends" defaultMessage="Invite Friends" />
    <MyGFriendSelect
      containerStyles={{ width: '100%' }}
      controlStyles={{ width: '100%' }}
      friends={invitedFriends}
      disabled={false}
      placeholder={intl.formatMessage({ id: "teams.create.invite-friends-hint", defaultMessage: "Select up to ten of your friends to invite" })}
      onChange={onChange}
    />
  </div>
);
