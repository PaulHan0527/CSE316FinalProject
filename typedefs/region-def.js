const { gql } = require('apollo-server');

const typeDefs = gql`
    type Region {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        landmarks: [String]
        parentId: String!
        owner: String!
        rootRegion: Boolean!
    }
    extend type Query {
        getRootRegions : [Region]
        getRegionById(_id: String!) : Region
        getAllChildRegionsById(_id: String!) : [Region] 
    }
    extend type Mutation {
        addRegion(region: RegionInput!) : Region
        deleteRegion(_id: String!) : Boolean
        updateRegion(_id: String!, field: String!, value: String!) : String
    }
    input FieldInput {
        _id: String
        field: String
        value: String
    }
    input RegionInput {
        _id: String
        name: String
        capital: String
        leader: String
        landmarks: [String]
        parentId: String
        owner: String
        rootRegion: Boolean
    }
`;

module.exports = { typeDefs: typeDefs }