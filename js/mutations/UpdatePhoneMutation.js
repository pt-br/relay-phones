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
    return Relay.QL`mutation{updatePhone}`;
  }

  getVariables() {
    let { phoneId, phoneModel, phoneImage } = this.props;

    return {
      phoneId,
      phoneModel,
      phoneImage,
    };
  }

  getFatQuery() {
    return Relay.QL`
    fragment on UpdatePhonePayload {
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
