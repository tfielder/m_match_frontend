import React, { Component } from 'react';
import './NewMentorForm.css';
import { postMentor } from '../../utils/api';

export class NewMentorForm extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      pronouns: '',
      email: '',
      slack_username: '',
      city: '',
      state: '',
      country: '',
      current_employer: '',
      current_title: '',
      industries: [],
      background: '',
      ways_to_mentor: [],
      expertise_tech: [],
      expertise_non_tech: [],
      identity_preference: [],
      mentee_capacity: '0',
      meeting_location: [],
      selected1to1: 'No',
      stack_preference: 'No Preference',
      hasErrored: false
    }
  }

  postNewMentor = async () => {
    const { selected1to1 } = this.state;
    const { location } = this.props.history;
    const { history } = this.props;

    if (this.validateForm()) {
      if (selected1to1 === 'No') {
        await this.setState({
          identity_preference: [],
          mentee_capacity: '0',
          meeting_location: [],
          stack_preference: 'No Preference'
        })
      }
      postMentor(this.state)
      history.push('/success', {from: location.pathname});
    } else {
      this.setState({ hasErrored: true })
    }
  }

  validateForm = () => {
    const { name,
    email,
    slack_username,
    city,
    state,
    country,
    background,
    selected1to1 
    } = this.state;

    if (name &&
        email &&
        slack_username &&
        city &&
        state &&
        country &&
        background &&
        selected1to1 ) {
      return true;
    } else {
      return false;
    }
  }

  handleChangeRadio = (event) => {
    const { value, className } = event.target;

    this.setState({ [className]: value })

    if (value === 'Yes') {
      this.setState({ mentee_capacity: '1' })
    } else if (value === 'No') {
      this.setState({ mentee_capacity: '0' })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    const checkedItem = event.target.parentNode.innerText;
    const stateKey = event.target.parentNode.getAttribute('data-name');

    this.checkIndustries(checkedItem, stateKey)
  }

  checkIndustries = (checkedItem, stateKey) => {
    const state = this.state[stateKey];

    if (!state.includes(checkedItem)) {
      state.push(checkedItem)
      this.setState({ [stateKey]: state });

    } else if (state.includes(checkedItem)) {
      const newState = state.filter(item => {
        let correctItem;
        if (item !== checkedItem) {
          correctItem = item;
        }
        return correctItem
      })
      this.setState({ [stateKey]: newState });
    }
  }

  render() {
    const { 
      name,
      pronouns,
      email,
      slack_username,
      city,
      state,
      country,
      current_employer,
      current_title,
      // industries,
      background,
      // ways_to_mentor,
      // expertise_tech,
      // expertise_non_tech,
      // identity_preference,
      mentee_capacity,
      // meeting_location,
      selected1to1,
      stack_preference,
      hasErrored
    } = this.state;
    
    return (
      <div className='nmf-container'>
        <div className='nmf-colors'>
          <div className='nmf-color-yellow nmf-color'></div>
          <div className='nmf-color-red nmf-color'></div>
          <div className='nmf-color-blue nmf-color'></div>
        </div>
        <div className='nmf-title-container'>
          <h1 className='nmf-title'>New</h1>
          <h1 className='nmf-title'>Mentor</h1>
          <h1 className='nmf-title'>Form</h1>
        </div>
      <div className='nmf-questions'>
      <p className='nmf-instructions'>("*" denotes required field)</p>
        <h2 className='nmf-question'>What is your name? <span className='nmf-required-star'> *</span></h2>
          <input 
            name='name' 
            value={name} 
            onChange={this.handleChange} 
            className='nmf-input' 
            placeholder='Full Name'
            maxLength='30'
          />

        <h2 className='nmf-question'>What are your preferred pronouns?</h2>
          <input 
            name='pronouns' 
            value={pronouns} 
            onChange={this.handleChange} 
            className='nmf-input' 
            placeholder='Example: she/her/hers'
            maxLength='20'
          />

        <h2 className='nmf-question'>What is your contact info for students to be able to reach you? <span className='nmf-required-star'> *</span></h2>
            <input 
              name='email' 
              value={email} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Email'
              maxLength='50'
            />
            <input 
              name='slack_username' 
              value={slack_username} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Slack'
              maxLength='30'
            />

        <h2 className='nmf-question'>Where are you located? <span className='nmf-required-star'> *</span></h2>
            <input 
              name='city' 
              value={city} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='City'
              maxLength='30'
            />
            <input 
              name='state' 
              value={state} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='State'
              maxLength='30'
            />
            <input 
              name='country' 
              value={country} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Country'
              maxLength='30'
            />

        <h2 className='nmf-question'>Current Employment:</h2>
          <input 
            name='current_employer' 
            value={current_employer} 
            onChange={this.handleChange}  
            className='nmf-input' 
            placeholder='Current Employer'
            maxLength='30'
          />
          <input 
            name='current_title' 
            value={current_title} 
            onChange={this.handleChange}  
            className='nmf-input' 
            placeholder='Job Title'
            maxLength='40'
          />

        <h2 className='nmf-question'>What industries have you had tech experience in?</h2>
          <div className='nmf-options-container'>
              <label data-name='industries' className="nmf-checkbox-container">AdTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">Green Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">Civic Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">FinTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">EdTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">LegalTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">HealthTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">Marketing Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nmf-checkbox-container">Blockchain Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark'
                >
                </span>
              </label>
          </div>

        <h2 className='nmf-question'>Brief background: What would you like students to know about you? Turing Alum? Job history? Hobbies? <span className='nmf-required-star'> *</span></h2>
          <textarea 
            name='background' 
            value={background} 
            onChange={this.handleChange} 
            className='nmf-textarea'
            maxLength='250'
          />

        <h2 className='nmf-question'>Areas of Technical Expertise:</h2>
          <div className='nmf-options-container'>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Ruby/Rails
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">DevOps
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Go
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Data Science
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Machine Learning
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">CS Fundamentals
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Node.js
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">React.js
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Angular.js
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Ember.js
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Vue.js
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">UX/UI Development
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">CSS/SCSS/Sass
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="nmf-checkbox-container">Functional Programming
              <input type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="nmf-checkmark nmf-tech-expert">
              </span>
            </label>
          </div>

        <h2 className='nmf-question'>Areas of Non-Technical Expertise:</h2>
          <div className='nmf-options-container'>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Public Speaking
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Project Management
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Parenting
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Social Issues in the Tech Industry
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Wellness & Stress Management
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="nmf-checkbox-container">Culture/Behavioral Interview Prep
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>In what ways would you like to support Turing students?</h2>
          <div className='nmf-options-container'>
            <label data-name='ways_to_mentor' className="nmf-checkbox-container">Resume & Cover Letters
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='ways_to_mentor' className="nmf-checkbox-container">Mock Interviews
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
            <label data-name='ways_to_mentor' className="nmf-checkbox-container">Coffee Meetings
              <input type="checkbox" />
              <span onClick={this.handleClick} className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>Would you also like to be a 1-to-1 mentor?</h2>
            <label className="nmf-radio-container-1">No
              <input 
                value='No'
                className='selected1to1' 
                type="radio" 
                name="nmf-1to1"
                checked={selected1to1 === 'No'}
                onChange={this.handleChangeRadio}
              />
              <span className="nmf-radio-checkmark-1"></span>
            </label>
            <label className="nmf-radio-container-1">Yes
              <input 
                value='Yes'
                className='selected1to1' 
                type="radio" 
                name="nmf-1to1"
                checked={selected1to1 === 'Yes'}
                onChange={this.handleChangeRadio}
              />
              <span className="nmf-radio-checkmark-1"></span>
            </label>

        <div className={selected1to1 === 'No' ? 'nmf-hide' : 'nmf-show'}>
          <h2 className='nmf-question'>How many students would you like to mentor?</h2>
            <div>
              <select 
                className='nmf-capacity-dropdown'
                name='mentee_capacity' 
                value={mentee_capacity} 
                onChange={this.handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

          <h2 className='nmf-question'>Are there any identity markers you'd particularly like to work with (only shared with staff)?</h2>
            <div className='nmf-options-container'>
              <label data-name='identity_preference' className="nmf-checkbox-container">Veteran
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='identity_preference' className="nmf-checkbox-container">Parent
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='identity_preference' className="nmf-checkbox-container">LGBTQ+
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='identity_preference' className="nmf-checkbox-container">Female-Identifying
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='identity_preference' className="nmf-checkbox-container">Male-Identifying
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
            </div>

          <h2 className='nmf-question'>Would you prefer Front-End or Back-End students?</h2>
            <label className="nmf-radio-container">No Preference
              <input 
                value='No Preference'
                className='stack_preference'
                type="radio" 
                name="nmf-FE-BE" 
                checked={stack_preference === 'No Preference'}
                onChange={this.handleChangeRadio}
              />
              <span className="nmf-radio-checkmark"></span>
            </label>
            <label className="nmf-radio-container">Front-End
              <input 
                value='Front-End'
                className='stack_preference'
                type="radio" 
                name="nmf-FE-BE" 
                checked={stack_preference === 'Front-End'}
                onChange={this.handleChangeRadio}
              />
              <span className="nmf-radio-checkmark"></span>
            </label>
            <label className="nmf-radio-container">Back-End
              <input 
                value='Back-End'
                className='stack_preference'
                type="radio" 
                name="nmf-FE-BE" 
                checked={stack_preference === 'Back-End'}
                onChange={this.handleChangeRadio}
              />
              <span className="nmf-radio-checkmark"></span>
            </label>

          <h2 className='nmf-question'>Where would you prefer to meet with mentees?</h2>
            <div className='nmf-options-container'>
              <label data-name='meeting_location' className="nmf-checkbox-container">In Person at Turing
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='meeting_location' className="nmf-checkbox-container">In Person Not at Turing
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
              <label data-name='meeting_location' className="nmf-checkbox-container">Remote
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nmf-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
          <p className={ hasErrored ? 'nmf-error' : 'hide' }>Make sure all required fields ("*") have been filled in.</p>
          <button 
            className='nmf-submit-btn'
            onClick={this.postNewMentor}>Submit</button>
        <div className='nmf-colors'>
          <div className='nmf-color-yellow nmf-color'></div>
          <div className='nmf-color-red nmf-color'></div>
          <div className='nmf-color-blue nmf-color'></div>
        </div>
      </div>
    )
  }
}

export default NewMentorForm;