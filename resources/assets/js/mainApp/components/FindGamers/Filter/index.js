import React from "react";
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { Game_name_values, Disable_keys } from '../../Utility_Function'
import { ignoreFunctions } from "../../../../common/render"
import { fetchGameInfo } from "../../../../common/game"
import { LANGUAGE_OPTIONS } from '../../../static/AddGame'

const dropdownIcon = 'https://myG.gg/platform_images/View+Game/Down+Carrot.svg';

const filterOptions = {
  game: 'Game',
  alias: 'Alias',
  country: 'Country',
  relationship: 'Relationship',
  commendation: 'Commendations',
  team: 'Team',
  languages: 'Languages',
  underage: '18+',
  hasMic: 'Mic',
};

const relationshipOptions = [
  { label: 'Waiting for Player 2', value: 'Waiting for Player 2' },
  { label: 'Game in progress', value: 'Game in progress' },
];

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

const commendationOptions = [
  { label: 'Apprentice', value: 'Apprentice' },
  { label: 'Elite', value: 'Elite' },
  { label: 'Expert', value: 'Expert' },
  { label: 'Hero', value: 'Hero' },
  { label: 'Master', value: 'Master' },
  { label: 'Grand Master', value: 'Grand Master' },
  { label: 'Ultimate Master', value: 'Ultimate Master' },
];

const initialFilters = {
  showAddFilter: false,
  selectedFilters: [],
  game: '',
  alias: '',
  country: '',
  relationship: '',
  commendation: '',
  team: '',
  languages: '',
  underage: '',
  hasMic: '',
  extraFields: [],
  extraFieldsValues: [],
};

export default class Filter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    ...initialFilters,
  }

  componentDidUpdate(_, previousState) {
    const previousFilters = this.getFilters(previousState);
    const filters = this.getFilters(this.state);
    const hasFiltersChanged = JSON.stringify(filters) !== JSON.stringify(previousFilters);
    if (!hasFiltersChanged) return;
    const hasFilter = (filter) => filters[filter] !== undefined && filters[filter] !== '';
    const getFilter = (filter) => `${filter.split(' ').join('_')}: ${filters[filter].split(' ').join('_')}`
    const query = Object.keys(filters).filter(hasFilter).map(getFilter).join(' ');
    this.props.onFilter(query);
  }

  getFilters = (state) => {
    const hasFilter = (filter) => state.selectedFilters.includes(filter) && state[filter] !== '';
    return {
      game: hasFilter('game') ? state.game : '',
      alias: hasFilter('alias') ? state.alias : '',
      country: hasFilter('country') ? state.country : '',
      relationship: hasFilter('relationship') ? state.relationship ? state.relationship.value : '' : '',
      commendations: hasFilter('commendation') ? state.commendation ? state.commendation.map(({ value }) => value).join('|') : '' : '',
      team: hasFilter('team') ? state.team : '',
      languages: hasFilter('languages') ? state.languages ? state.languages.map(({ value }) => value).join('|') : '' : '',
      underage: hasFilter('underage') ? state.underage.value === 'No' : '',
      hasMic: hasFilter('hasMic') ? state.hasMic.value === 'Yes' : '',
      ...this.getExtraFilters(state),
    };
  }

  getExtraFilters = (state) => {
    const extraFields = {};
    Object.keys(state.extraFieldsValues).forEach((filter) => {
      if (state.extraFieldsValues[filter]) {
        extraFields[filter] = state.extraFieldsValues[filter].map(({ value }) => !!value && `${value}`.trim()).filter((value => !!value)).join('|');
      }
    });
    return extraFields;
  }

  renderTitle = () => <div className="label">Filter by</div>;

  handleAddFilter = () => this.setState(previous => ({ showAddFilter: !previous.showAddFilter }));
  handleClearFilters = () => this.setState(initialFilters);
  handleAddedFilter = (filter) => this.setState(previous => {
    const selectedFilters = previous.selectedFilters.includes(filter) ?
      JSON.parse(JSON.stringify(previous.selectedFilters.filter((element) => element !== filter))) :
      JSON.parse(JSON.stringify([...previous.selectedFilters, filter]));
    return { selectedFilters, showAddFilter: false };
  })
  renderAddFilter = () => (
    <div className="add-filter">
      <div className='header'>
        <span className="text clickable" onClick={this.handleClearFilters}>Clear</span>
        <span className="text clickable" onClick={this.handleAddFilter}>Add Filter</span>
        <img className="clickable" src={dropdownIcon} onClick={this.handleAddFilter} />
      </div>
      {this.state.showAddFilter && (
        <div className='add-filter-menu'>
          <div className='title'>Add Filters</div>
          <div className='content'>
            {Object.keys(filterOptions).map((filter) => {
              return (
                <div
                  key={filter}
                  className={`option clickable ${this.state.selectedFilters.includes(filter) ? 'selected' : ''}`}
                  style={{ padding: '8px' }}
                  onClick={() => this.handleAddedFilter(filter)}>
                  {filterOptions[filter]}
                </div>
              )
            })}
            {this.state.extraFields.map(({ label: filter }) => {
              return (
                <div
                  key={filter}
                  className={`option clickable ${this.state.selectedFilters.includes(filter) ? 'selected' : ''}`}
                  style={{ padding: '8px' }}
                  onClick={() => this.handleAddedFilter(filter)}>
                  {filter}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );

  renderFilters = () => {
    return this.state.selectedFilters.map(this.selectFilter);
  }

  selectFilter = (filter) => {
    switch(filter) {
      case 'game': return this.renderGameFilter();
      case 'alias': return this.renderTextFilter(filter);
      case 'country': return this.renderTextFilter(filter);
      case 'relationship': return this.renderOptionsFilter(filter, relationshipOptions, false);
      case 'commendation': return this.renderOptionsFilter(filter, commendationOptions, true);
      case 'team': return this.renderTextFilter(filter);
      case 'languages': return this.renderOptionsFilter(filter, LANGUAGE_OPTIONS, true);
      case 'underage': return this.renderOptionsFilter(filter, yesNoOptions, false, 'Must be 18?');
      case 'hasMic': return this.renderOptionsFilter(filter, yesNoOptions, false, 'Must have Mic?');
      default: return null;
    }
  }

  renderTextFilter = (filter) => {
    return(
      <div className='filter-row'>
          <div className='filter-label'>{filterOptions[filter]}</div>
          <input
            type='text'
            className='filter-text'
            onChange={(event) => this.setState({ [filter]: event.target.value })}
            value={this.state[filter]}
            placeholder={`Type the ${filter} you want to search`}
          />
      </div>
    );
  }

  renderOptionsFilter = (filter, options, isMulti, placeholder) => {
    return(
      <div className='filter-row'>
        <div className='filter-label'>{filterOptions[filter]}</div>
        <Select
          className='filter-select'
          placeholder={placeholder || `Select the ${filter} you want to search`}
          name={`${filter}-select`}
          value={this.state[filter]}
          onChange={(value) => this.setState({ [filter]: value || '' })}
          options={options}
          isClearable
          isMulti={isMulti}
          classNamePrefix='filter'
        />
    </div>
    );
  }

  renderGameFilter = () => {
    const value = this.state.game ? { value: this.state.game, label: this.state.game } : null;
    return(
      <div className='filter-row'>
        <div className='filter-label'>Game</div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            isValidNewOption={() => false}
            loadOptions={(value) => Game_name_values(value)}
            onChange={this.onGameSelected}
            isClearable
            value={value}
            className='filter-select'
            placeholder='Search or Select Game Title'
            onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
            onKeyDown={(event) => Disable_keys(event)}
            isSearchable={true}
            classNamePrefix='filter'
            styles='background: red;'
          />
      </div>
    );
  }

  onGameSelected = (data) => {
    this.setState({ game: data ? data.value : '', extraFields: [], extraFieldsValues: [] });
    if (!data || !data.game_names_id) return;
    fetchGameInfo(data.game_names_id).then(this.onGameFetched)
  }

  onGameFetched = (data) => {
    const extraFields = [];
    Object.keys(data).forEach((field) => extraFields.push(data[field]));
    this.setState({ extraFields });
  }

  renderDynamicFilters = () => {
    if (!this.state.game) return null;
    if (!this.state.extraFields || !this.state.extraFields.length) return null
    return this.state.extraFields.filter((filter) => this.state.selectedFilters.includes(filter.label)).map((filter) => {
      return (
        <React.Fragment>
          {filter.type === 'Multi' && this.renderMultiField(filter)}
          {filter.type === 'Single' && this.renderSingleField(filter)}
        </React.Fragment>
      )
    })
  }

  renderMultiField = (filter) => {
    return (
      <div className="filter-row" key={filter.label}>
        <span className='filter-label'>{filter.label}</span>
        <Select
          className='filter-select'
          placeholder={filter.placeholder}
          name={`${filter}-select`}
          value={this.state.extraFieldsValues[filter.label]}
          onChange={(value) => this.setState(previous => ({
            extraFieldsValues: {
              ...previous.extraFieldsValues,
              [filter.label]: value,
            }
          }))}
          options={filter.value.split(',').map((option) => ({ label: option, value: option }))}
          isClearable
          isMulti={true}
          classNamePrefix='filter'
        />
      </div>
    )
  }

  renderSingleField = (filter) => {
    return (
      <div className="filter-row" key={filter.label}>
        <span className='filter-label'>{filter.label}</span>
        <Select
          className='filter-select'
          placeholder={filter.placeholder}
          name={`${filter}-select`}
          value={this.state.extraFieldsValues[filter.label]}
          onChange={(value) => this.setState(previous => ({
            extraFieldsValues: {
              ...previous.extraFieldsValues,
              [filter.label]: value,
            }
          }))}
          options={filter.value.split(',').map((option) => ({ label: option, value: option }))}
          isClearable
          classNamePrefix='filter'
        />
      </div>
    )
  }

  render() {
    return(
      <div id="find-gamers-filter">
        <div className="label">Filter by</div>
        <div className="filter-container">
          {this.renderFilters()}
          {this.renderDynamicFilters()}
        </div>
        {this.renderAddFilter()}
      </div>
    );
  }
}
