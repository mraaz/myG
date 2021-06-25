import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { MyGSelect } from '../common'
import { fetchTeams } from '../../../integration/http/team';

const MyGTeamSelect = ({ intl, team, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchTeams(true).then((options) => setOptions((options || []).map(({ team_id, name }) => ({ team_id, label: name, value: name }))));
  }, [setOptions]);

  return (
    <MyGSelect
      options={options}
      onChange={onChange}
      value={team}
      placeholder={intl.formatMessage({ id: 'myg.team-select.hint', defaultValue: 'Select which team will play this match' })}
    />
  )
}

export default injectIntl(MyGTeamSelect)
