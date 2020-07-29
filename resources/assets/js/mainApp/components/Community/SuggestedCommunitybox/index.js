import React, { Fragment } from "react";

// import styles
import "../../../styles/Community/AddCommunityStyles.scss"

import img from "../../../img/suggested-community-icon.png"

const SuggestedCommunityBox = (props) => {
    return (
        <Fragment>
            <div className="community-card-box">
                <div className="suggested-community-title">
                    <p>dota 2 australia</p>
                </div>
                <div className="community-img">
                    <img src={img} className="img-fluid" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam sodales nunc, et laoreet nulla. Orci varius natoque penatibus et ma</p>
                </div>
                <div className="btn-show">
                    <button>Show</button>
                </div>
            </div>
        </Fragment>
    )
}

export default SuggestedCommunityBox;