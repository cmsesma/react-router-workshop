import React from 'react';
import { formatIdea } from '../utils';
/*
  Idea Schema:
  {
    id,
    author: "",
    title: "",
    likes: ""
  }
*/

export default class API extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      authedUser: null
    };
  }

  setAuthUser = authedUser => this.setState({ authedUser });

  unsetAuthUser = () => this.setState({ authedUser: null });

  getAuthUser = () => this.state.authedUser;

  getIdeas = () => {
    const _ideas = this.state.ideas;
    return _ideas.sort((a, b) => b.likes - a.likes);
  }

  getIdea = id => this.state.ideas.find(idea => idea.id === id);

  handleAddIdea = (title, author = '') => {
    const idea = formatIdea(title, author);
    this.setState(({ ideas }) => ({ ideas: ideas.concat([idea]) }));
    return idea;
  };

  handleVote = id => sign => () =>
    this.setState(({ ideas }) => ({
      ideas: ideas.map(
        idea =>
          idea.id === id
            ? {
                ...idea,
                likes: sign === '+' ? idea.likes + 1 : idea.likes - 1
              }
            : idea
      )
    }));

  getProps() {
    return {
      getIdeas: this.getIdeas,
      handleAddIdea: this.handleAddIdea,
      handleVote: this.handleVote,
      getIdea: this.getIdea,
      auth: {
        setAuthUser: this.setAuthUser,
        unsetAuthUser: this.unsetAuthUser,
        getAuthUser: this.getAuthUser
      }
    };
  }

  render() {
    return this.props.children(this.getProps());
  }
}
