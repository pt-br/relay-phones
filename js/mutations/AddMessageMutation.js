import Relay from 'react-relay';

export default class AddMessageMutation extends Relay.Mutation {

  static fragments = {
    bottle: () => Relay.QL`
      fragment on Bottle {
        id
      }
    `,
  };

  getMutation() {
    console.log('2.2 - Inside of getMutation()!');
    console.log('------------------------');
    return Relay.QL`mutation{insertMessage}`;
  }

  getVariables() {
    console.log('2.5 - Inside of getVariables()!');
    return {
      message: this.props.text, // Match the inputFields on the mutation at schema
    };
  }

  getFatQuery() {
    console.log('2.3 - Inside of getFatQuery()!');
    return Relay.QL`
    fragment on InsertMessagePayload {
      bottle
    }
    `;
  }

  getConfigs() {
    console.log('2.1 - Inside of getConfigs()!');
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        bottle: this.props.bottle.id
      }
    }];
  }
}
