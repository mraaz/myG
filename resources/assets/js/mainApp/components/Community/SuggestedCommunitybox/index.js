import React, { Fragment } from "react";

// import styles
import "../../../styles/Community/AddCommunityStyles.scss"

const SuggestedCommunityBox = (props) => {
    return (
        <Fragment>
            <div className="community-card-box">
                <div className="suggested-community-title">
                    <p>dota 2 australia</p>
                </div>
                <div className="community-img">
                    <img
                        src='https://mygame-media.s3.amazonaws.com/user_files/100_1596028790483_7JlctF_-3H2D_iVButtUsgcApiZeFPSsz_WeURrwHjbW6-1KT0.png'
                        className='img-fluid'
                    />
                </div>
                <div className="suggested-community-text">

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam sodales nunc, et laoreet nulla. Orci varius natoque penatibus et ma</p>
                    <hr />
                </div>
                <div className="members">
                    <h2>2.8k</h2>
                    <span>Members</span>
                </div>
                <div className="btn-show">
                    <button>Join</button>
                </div>
            </div>
        </Fragment>
    )
}

export default SuggestedCommunityBox;