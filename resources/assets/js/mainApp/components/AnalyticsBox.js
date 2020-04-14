import React, { Component } from 'react'

export default class AnalyticsBox extends Component {
  render() {
    return (
      <section class='social'>
        <div class='social__content'>
          <div class='level-container'>
            <section class='level-container-img'>
              <div class='circle-wrap'>
                <div class='circle'>
                  <div class='mask full'>
                    <div class='fill'></div>
                  </div>
                  <div class='mask half'>
                    <div class='fill'></div>
                  </div>
                  <div class='inside-circle'>
                    <span class='inside-circle-level'>level</span>
                    <br />
                    <span class='inside-circle-value'>99</span>
                  </div>
                </div>
              </div>
            </section>
            <div class='ratings'>
              <p class='social-box-text'>Avg Rating</p>
              <p class='social-box-count'>4.66/5</p>
              <p class='social-box-text review bottom-border'>556 reviews</p>
              <p class='social-box-text'>Experience Pts.</p>
              <p class='social-box-count'>893.6K</p>
            </div>
          </div>

          <div class='social-box'>
            <img src='./images/connection.png' class='social-box-img' />
            <p class='social-box-count'>251</p>
            <p class='social-box-text'>connections</p>
            <p class='social-box-month'>Last month: 21</p>
          </div>

          <div class='social-box'>
            <img src='./images/follower.png' class='social-box-img' />
            <p class='social-box-count'>300</p>
            <p class='social-box-text'>followers</p>
            <p class='social-box-month'>Last month: 21</p>
          </div>

          <div class='social-box'>
            <img src='./images/games.png' class='social-box-img' />
            <p class='social-box-count'>24</p>
            <p class='social-box-text'>games</p>
            <p class='social-box-month'>Last month: 21</p>
          </div>

          <div class='social-box'>
            <img src='./images/games.png' class='social-box-img' />
            <p class='social-box-count'>5124</p>
            <p class='social-box-text'>likes</p>
            <p class='social-box-month'>Last month: 21</p>
          </div>

          <div class='social-box'>
            <img src='./images/reviews.png' class='social-box-img' />
            <p class='social-box-count'>25</p>
            <p class='social-box-text'>reviews</p>
            <p class='social-box-month'>Last month: 21</p>
          </div>
        </div>

        <div class='suggestion'>
          <div class='suggestion-box'>
            <p class='suggestion-box-text'>connections</p>
            <h2 class='suggestion-box-head'>Suggestions</h2>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playerone' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playeronetool' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playerone' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playeronetool' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestions-box-reset'>
            <a href='#;'>
              <img src='./images/reset.png' class='' />
            </a>
          </div>
        </div>
      </section>
    )
  }
}
