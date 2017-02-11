import Relay from 'react-relay';

export default class AddPhoneMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{addPhone}`;
  }

  getVariables() {
    let { phoneModel, phoneImage } = this.props;

    /**
     * If the fields come empty, force them to be null.
     * This way, it won't be filled on GraphQL.
     */
    phoneModel.length === 0 ? phoneModel = null : false;
    phoneImage.length === 0 ? phoneImage = null : false;

    return {
      model: phoneModel,
      image: phoneImage,
    };
  }

  getFatQuery() {
    return Relay.QL`
    fragment on AddPhonePayload {
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
