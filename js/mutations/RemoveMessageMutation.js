import Relay from 'react-relay';

export default class RemoveMessageMutation extends Relay.Mutation {

  static fragments = {
    bottle: () => Relay.QL`
      fragment on Bottle {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{removeMessage}`;
  }

  getVariables() {
    return {
      messageId: this.props.messageId, // Match the inputFields on the mutation at schema
    };
  }

  getFatQuery() {
    return Relay.QL`
    fragment on RemoveMessagePayload {
      bottle
    }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        bottle: this.props.bottle.id
      }
    }];
  }
}
