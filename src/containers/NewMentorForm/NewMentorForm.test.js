import React from 'react';
import { shallow } from 'enzyme';
import { NewMentorForm } from './';

describe('NewMentorForm', () => {
  let wrapper;
  let mockState = {
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
    preferences: [],
    mentee_capacity: '0',
    meeting_location: [],
    selected1to1: 'No',
    selectedFEBE: 'No Preference'
  }
  
  beforeEach(() => {
    wrapper = shallow(<NewMentorForm />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('handleChangeRadio function', () => {
    it('should update the selected1to1 state', () => {
      let mockRadioEvent = { target: { value: 'Yes', className: 'selected1to1' } }
      
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().selected1to1).toEqual("Yes")
    });
    
    it('should update the selectedFEBE state', () => {
      let mockRadioEvent = { target: { value: 'Front-End', className: 'selectedFEBE' } }
      
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().selectedFEBE).toEqual("Front-End")
    });
  });

  describe('handleChange function', () => {
    it('should update the name state', () => {
      let mockChangeEvent = { target: { name: 'name', value: 'Sathington' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().name).toEqual('Sathington')
    });

    it('should update the pronouns state', () => {
      let mockChangeEvent = { target: { name: 'pronouns', value: 'they/theirs' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().pronouns).toEqual('they/theirs')
    });

    it('should update the email state', () => {
      let mockChangeEvent = { target: { name: 'email', value: 'booyah@booyah.com' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().email).toEqual('booyah@booyah.com')
    });

    it('should update the slack_username state', () => {
      let mockChangeEvent = { target: { name: 'slack_username', value: '@mcCringleberry' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().slack_username).toEqual('@mcCringleberry')
    });

    it('should update the city state', () => {
      let mockChangeEvent = { target: { name: 'city', value: 'Denver' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().city).toEqual('Denver')
    });

    it('should update the state state', () => {
      let mockChangeEvent = { target: { name: 'state', value: 'CO' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().state).toEqual('CO')
    });

    it('should update the country state', () => {
      let mockChangeEvent = { target: { name: 'country', value: 'USA' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().country).toEqual('USA')
    });

    it('should update the cuurent_employer state', () => {
      let mockChangeEvent = { target: { name: 'cuurent_employer', value: 'Awesome Farms' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().cuurent_employer).toEqual('Awesome Farms')
    });

    it('should update the current_title state', () => {
      let mockChangeEvent = { target: { name: 'current_title', value: 'Head Farmer of Awesomeness' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().current_title).toEqual('Head Farmer of Awesomeness')
    });

    it('should update the background state', () => {
      let mockChangeEvent = { target: { name: 'background', value: 'Once upond a time I got a job, and it was cool.' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().background).toEqual('Once upond a time I got a job, and it was cool.')
    });

    it('should update the mentee_capacity state', () => {
      let mockChangeEvent = { target: { name: 'mentee_capacity', value: '4' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().mentee_capacity).toEqual('4')
    });
  });

  describe('handleClick function', () => {
    it('should add multiple items to the industries array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Coding',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Running',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Coding'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().industries).toEqual(['Coding', 'Running'])
    });

    it('should remove an existing element from industries array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Coding',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Running',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Coding'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().industries).toEqual(['Coding', 'Running'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Running'])
    });

    it('should add multiple items to the ways_to_mentor array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Mock Interviews',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Pairing',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews', 'Pairing'])
    });

    it('should remove an existing element from ways_to_mentor array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Mock Interviews',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Pairing',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews', 'Pairing'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Pairing'])
    });

    it('should add multiple items to the expertise_tech array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Ruby',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'JavaScript',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby', 'JavaScript'])
    });

    it('should remove an existing element from expertise_tech array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Ruby',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'JavaScript',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby', 'JavaScript'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['JavaScript'])
    });

    it('should add multiple items to the expertise_non_tech array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'parenting',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'veteraning',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting', 'veteraning'])
    });

    it('should remove an existing element from expertise_non_tech array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'parenting',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'veteraning',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting', 'veteraning'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['veteraning'])
    });

    it('should add multiple items to the preferences array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'cool',
            getAttribute: jest.fn(() => { return 'preferences' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'chill',
            getAttribute: jest.fn(() => { return 'preferences' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().preferences).toEqual(['cool'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().preferences).toEqual(['cool', 'chill'])
    });

    it('should remove an existing element from preferences array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'cool',
            getAttribute: jest.fn(() => { return 'preferences' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'chill',
            getAttribute: jest.fn(() => { return 'preferences' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().preferences).toEqual(['cool'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().preferences).toEqual(['cool', 'chill'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().preferences).toEqual(['chill'])
    });

    it('should add multiple items to the meeting_location array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'not Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['Turing'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().meeting_location).toEqual(['Turing', 'not Turing'])
    });

    it('should remove an existing element from meeting_location array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'not Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['Turing'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().meeting_location).toEqual(['Turing', 'not Turing'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['not Turing'])
    });
  });
});