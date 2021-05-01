const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

module.exports = {
    Query: {
        getRootRegions: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if(!_id) { return ([])};
            const regions = await Region.find({owner: _id, rootRegion : true}).sort({updatedAt: 'descending'});
            if(regions) {
                return (regions);
            }
        },

        getRegionById: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const region = await Region.findOne({_id: objectId});
            if (region) return region;
            else return ({});
        },

        getAllChildRegionsById: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id); // I dont think this is needed
            const childRegions = await Region.find({parentId: _id});
            if (childRegions) return childRegions;
            else return ({});
        }   
    },
    Mutation: {

        addRegion: async (_, args) => {
            const { region } = args;
            const objectId = new ObjectId();
            const { id, name, capital, leader, landmarks, parentId, owner, rootRegion } = region;
            const newRegion = new Region({
                _id: objectId,
                name: name,
                capital: capital,
                leader: leader,
                landmarks: landmarks,
                parentId: parentId,
                owner: owner,
                rootRegion: rootRegion
            });
            const updated = await newRegion.save();
            if(updated) return updated;
        },

        deleteRegion: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await Region.deleteOne({_id: objectId});
            if (deleted) return true;
            else return false;
        },

        updateRegion: async (_, args) => {
            const { field, value, _id } = args;
            const objectId = new ObjectId(_id);
            const updated = await Region.updateOne({_id: objectId}, {[field]: value});
            if (updated) return value;
            else return "";
        },

        // need to add here
    }
}