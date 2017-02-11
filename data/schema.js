import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import Database from './Database';
const database = new Database;

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    var { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return database.getUser;
    } else if (type === 'Phone') {
      return database.getPhoneById(id);
    } else {
      return null;
    }
  },

  (obj) => {
    if (obj instanceof User)  {
      return UserType;
    } else if (obj instanceof Phone) {
      return PhoneType;
    } else {
      return null;
    }
  }
);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    phones: {
      type: phoneConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(database.getPhones(), args),
    },
  }),
  interfaces: [nodeInterface],
});

const PhoneType = new GraphQLObjectType({
  name: 'Phone',
  fields: () => ({
    id: globalIdField('Phone'),
    model: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.model,
    },
    image: {
      type: GraphQLString,
      resolve: (obj) => obj.image,
    },
  }),
});

/**
 * Define a connection type to connect Phones with Users
 */
const { connectionType: phoneConnection } =
  connectionDefinitions({ name: 'Phone', nodeType: PhoneType });

const AddPhoneMutation = mutationWithClientMutationId({
  name: 'AddPhone',
  inputFields: {
    model: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    viewer: {
      type: UserType,
      resolve: () => database.getUser(),
    },
  },
  mutateAndGetPayload: ({ model, image }) => {
    const newPhone = database.insertPhone(model, image);
    return newPhone;
  },
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const Root = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: UserType,
      resolve: () => database.getUser(),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addPhone: AddPhoneMutation,

    // removeMessage: RemoveMessageMutation,
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});
