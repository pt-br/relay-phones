import Relay from 'react-relay';

export default class RemovePhoneMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{removePhone}`;
  }

  getVariables() {
    let { phoneId } = this.props;

    return {
      phoneId,
    };
  }

  getFatQuery() {
    return Relay.QL`
    fragment on RemovePhonePayload {
      viewer
    }
    `;
  }

  getConfigs() {
    const { viewer } = this.props;
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        viewer: viewer.id
      }
    }];
  }
}
