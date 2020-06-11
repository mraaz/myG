import React, { Component } from 'react';
import cronstrue from 'cronstrue';
import Once from './once';
import Minutes from './minutes';
import Daily from './daily';
import Hourly from './hourly';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';
// import './cron-builder.css';
const defaultTabs = ['Once', 'Minutes','Hourly','Daily','Weekly', 'Monthly'] //,'Yearly'
const date = new Date();
const defaultTabsVal = {
    Once: [ //Now
        '0',
        '0',
        (date.getHours() < 23 ? date.getHours() + 1 : 23).toString(),
        date.getDate().toString(),
        (date.getMonth() + 1).toString(),
        '?',
        date.getFullYear().toString()
    ],
    Minutes: ['0','0/1','*','*','*','?','*'],
    Hourly: ['0','0','0/1','*','*','?','*'],
    Daily: ['0','0','00','1/1','*','?','*'],
    Weekly: ['0','0','00','?','*','*','*'],
    Monthly:['0','0','00','1','1/1','?','*']
};
let tabs = [];
export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //    selectedTab: tabs[0],
        occurrence: 26,
        };
        tabs = props.tabs || defaultTabs;
    }
    componentWillMount() {
        if(!this.props.value || this.props.value.split(' ').length !== 7 ) {
            this.state.value = defaultTabsVal[tabs[0]];
            this.state.selectedTab = tabs[0];
            this.parentChange(this.state.value)
        } else  {
            this.state.value = this.props.value.replace(/,/g, '!').split(' ');
        }
        let val = this.state.value;
        if((val[6] !== '*')) {
            this.state.selectedTab = defaultTabs[0];
        } else if((val[1].search('/') !== -1) && (val[2] == '*') && (val[3] == '1/1')) {
            this.state.selectedTab = defaultTabs[1];
        } else if((val[2].search('/') !== -1)) {
            this.state.selectedTab = defaultTabs[2];
        } else if((val[3].search('/') !== -1) || (val[5] == 'MON-FRI')) {
            this.state.selectedTab = defaultTabs[3];
        } else if (val[3] === '?') {
            this.state.selectedTab = defaultTabs[4];
        } else if (val[3].startsWith('L') || val[5] === '1/1') {
            this.state.selectedTab = defaultTabs[5];
        } else {
            this.state.selectedTab = tabs[0];
        }

    }

    defaultValue(tab) {
       return defaultTabsVal[tab];
    }

    tabChanged(tab) {
        this.setState({selectedTab:tab, value:this.defaultValue(tab)});
        this.parentChange(this.defaultValue(tab))
    }
    getHeaders() {
        return tabs.map(d => {
            return <li className={this.state.selectedTab === d ? 'active' : ''} style={{ color: (this.state.selectedTab === d ? '#e5c746' : '#fff') }}><a onClick={this.tabChanged.bind(this,d)}>{d}</a></li>
        })
    }
    onValueChange(val) {
        if(val && val.length) {
            this.setState({value:val})
        } else {
            this.setState({value:['0','0','00','*','*','?','*']})
            val = ['0','0','00','*','*','?','*'];
        }
       this.parentChange(val)
    }

    parentChange(val) {
        let newVal = ''
        newVal = val.toString().replace(/,/g,' ')
        newVal = newVal.replace(/!/g, ',')
        console.log(newVal);
        this.props.onChange(newVal)
    }
    getVal() {
        let val = cronstrue.toString(this.state.value.toString().replace(/,/g,' ').replace(/!/g, ','))
        if(val.search('undefined') === -1) {
            return val.slice(12);
        }
        return '-'

    }

    getComponent(tab) {
        switch(tab) {
            case defaultTabs[0] :
                return <Once value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[1] :
                return <Minutes value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[2] :
                return <Hourly value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[3] :
                return <Daily value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[4] :
                return <Weekly value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[5] :
                return <Monthly value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            case defaultTabs[6] :
                return <Yearly value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
                break;
            default:
                return
        }
    }

    onOccurenceChange = (e) => {
        this.setState({
            occurrence: e.target.value
        });
    };

    render() {
        console.log('this.state: ', this.state);
        return (
            <div>
                {this.props.style && <style>{this.props.style}</style>}
                <div className='cron_builder'>
                    <ul className="nav nav-tabs" >
                        {this.getHeaders()}
                    </ul>
                    <div className="cron_builder_bordering">{this.getComponent(this.state.selectedTab)}</div>
                    {this.props.showResultText && <div className="cron-builder-bg" style={{backgroundColor: '#e7bb30', color: '#0a0a0a'}}>{this.getVal()}</div>}
                    {/* {this.props.showResultCron && <div className="cron-builder-bg">{this.state.value.toString().replace(/,/g,' ').replace(/!/g, ',')}</div>} */}
                    <div>
                    <input
                        type='Number'
                        onChange={this.onOccurenceChange}
                        value={this.state.occurrence}
                        style={{ margin: 0, display: 'inline' }}
                        min={1}
                        max={26}
                    />
                    <span> occurences</span>
                    </div>

                </div>
            </div>
        )
    }
}

