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
        childRegionIds: [String]
    }
    extend type Query {
        getAllRegions : [Region]
        getRegionById(_id: String!) : Region
    }
    extend type Mutation {
        addRegion(region: RegionInput!, updateParent_Id: String!) : Region
        deleteRegion(_id: String!, updateParent_Id: String!) : Region
        updateRegion(_id: String!, field: String!, value: String!) : String
        updateRegionArray(_id: String!, field: String!, value:[String]) : [String]
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
        childRegionIds: [String]
    }
`;

module.exports = { typeDefs: typeDefs }