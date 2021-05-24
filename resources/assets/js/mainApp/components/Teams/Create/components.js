import React from 'react'
import { FormattedMessage } from 'react-intl';
import { EXPERIENCE_OPTIONS } from '../../../static/AddGame';
import {
  MyGInput,
  MyGTextarea,
  MyGDropzone,
  MyGSideLine,
  MyGSelect,
  MyGCheckbox,
  MyGButton,
} from '../../common';

export const defaultTeamFields = {
  name: '',
  games: [{ id: '1' }, { id: '2' }, { id: '3' }],
  image: '',
  hashtags: [],
  moderators: [],
  type: '',
  description: '',
  allowChat: true,
  autoAcceptGamers: true,
  listOnLFT: true,
  recruiting: true,
  exclusive: false,
  allCanJoin: true,
  friendsCanJoin: false,
  linkCanJoin: false,
  invitationCanJoin: false,
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

export const BottomBar = ({ intl, onCancel, onCreate }) => (
  <div className="team-bottom-bar">
    <MyGButton
      secondary
      onClick={onCancel}
      text={intl.formatMessage({ id: "myg.cancel", defaultMessage: "Cancel" })}
    />
    <MyGButton
      primary
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

export const GameTitle = ({ intl, index }) => (
  <div className="team-game-title">
    <Label id={`teams.create.game-title-${index + 1}`} defaultMessage={`${index + 1}`} />
    <MyGInput containerStyles={{ width: '100%' }} inputStyles={{ width: '100%' }} placeholder={intl.formatMessage({ id: "teams.create.game-title", defaultMessage: "Enter Game Title" })} />
  </div>
);

export const GameTitles = ({ games, intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.games" defaultMessage="Game Titles" />
    {games.map((game, index) => <GameTitle key={game.id} index={index} intl={intl} />)}
  </div>
);

export const FeaturedImage = () => (
  <div className="team-input-container">
    <Label id="teams.create.featured-image" defaultMessage="Featured Image" />
    <MyGDropzone containerStyle={{ width: '100%' }} />
  </div>
);

export const Hashtags = ({ intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.hashtags" defaultMessage="Add Hashtags" />
    <MyGTextarea placeholder={intl.formatMessage({ id: "teams.create.hashtags-hint", defaultMessage: "#hello" })} />
  </div>
);

export const Moderators = ({ intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.moderators" defaultMessage="Moderators" />
    <MyGTextarea placeholder={intl.formatMessage({ id: "teams.create.moderators-hint", defaultMessage: "Enter your Friend's name to set them as a moderator" })} />
  </div>
);

export const Type = () => (
  <div className="team-input-container">
    <Label id="teams.create.type" defaultMessage="Type" />
    <MyGSelect
      options={EXPERIENCE_OPTIONS}
      onChange={() => { }}
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

export const InvitationCanJoin = ({ checked, intl, onChange }) => (
  <div className="team-input-container team-checkbox">
    <MyGCheckbox
      checked={checked}
      onClick={onChange}
      labelText={intl.formatMessage({ id: "teams.create.invitation-can-join", defaultMessage: "Invitation Only" })}
    />
  </div>
);

export const InviteFriends = ({ intl }) => (
  <div className="team-input-container">
    <Label id="teams.create.invite-friends" defaultMessage="Invite Friends" />
    <MyGTextarea placeholder={intl.formatMessage({ id: "teams.create.invite-friends-hint", defaultMessage: "Select up to ten of your friends to invite" })} />
  </div>
);
