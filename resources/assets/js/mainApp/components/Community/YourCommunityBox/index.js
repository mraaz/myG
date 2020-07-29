import React, { Fragment } from "react";

// import styles
import "../../../styles/Community/AddCommunityStyles.scss"

const YourCommunityBox = (props) => {
    return (
        <Fragment>
            <div className="community-card-box">
                <div className="community-title">
                    <p>dota 2 australia</p>
                </div>
                <hr />
                <div className="members">
                    <h2>2.8k</h2>
                    <span>Members</span>
                </div>
                <div className="btn-show">
                    <button>Show</button>
                </div>
            </div>
        </Fragment>
    )
}

export default YourCommunityBox;