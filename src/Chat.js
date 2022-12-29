import ChatBot from 'react-simple-chatbot';
import React, { Component } from 'react';
import { openai } from './openai.js';

class OpenAiTate extends Component {
  constructor(props) {
    super(props);
    this.props.triggerNextStep();
    this.state = { tateResponse: '' };
  }

  async componentDidMount() {
    const input = this.props.steps.validator.value + ' ->';
    const response = await openai.createCompletion({
      model: "curie:ft-personal-2022-09-03-12-04-28",
      prompt: input,
      temperature: 0.7,
      max_tokens: 30,
      best_of: 2,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: [" \n"]
    });
    console.log('OpenAiTate -> response', response);
    let tateResponse = response.data.choices[0].text.replace(/\\n/g, '\n');
    tateResponse = tateResponse.split(/https|cobratate|\//)[0];
    this.setState({ tateResponse });
  }

  render() {
    return (
      <span>{this.state.tateResponse}</span>
    );
  }
}

const steps = [
  {
    id: 'intro',
    message: 'This is Top G!',
    trigger: 'validator',
  },
  {
    id: 'validator',
    user: true,
    validator: val => {
      if (val.length === 0) {
        return "You must say something. Don't be a loser!";
      }
      return true;
    },
    trigger: 'input',
  },
  {
    id: 'input',
    component: <OpenAiTate />,
    waitAction: true,
    asMessage: true,
    trigger: 'validator',
  },
];

const Chat = () => {
  console.log('hi')
  return <ChatBot steps={steps} botAvatar="https://i.ibb.co/pvFDsDL/tate-avatar.jpg" alt="tate-avatar" />
}

export default Chat;