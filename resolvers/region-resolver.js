const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

module.exports = {
    Query: {
        getAllRegions: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if (!_id) { return ([]) };

            const regions = await Region.find({ owner: _id }).sort({ updatedAt: 'descending' });
            if (regions) {
                return (regions);
            }
        },

        getRegionById: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const region = await Region.findOne({ _id: objectId });
            if (region) return region;
            else return ({});
        }
    },
    Mutation: {

        addRegion: async (_, args) => {
            const { region, updateParent_Id } = args;
            let objectId;
            if (region._id) {
                objectId = new ObjectId(region._id);
            }
            else {
                objectId = new ObjectId();
            }

            const { id, name, capital, leader, landmarks, parentId, owner, rootRegion, childRegionIds } = region;

            const newRegion = new Region({
                _id: objectId,
                name: name,
                capital: capital,
                leader: leader,
                landmarks: landmarks,
                parentId: parentId,
                owner: owner,
                rootRegion: rootRegion,
                childRegionIds: childRegionIds
            });
            const updated = await newRegion.save();
            if (updateParent_Id === "root") {
                if (updated) return updated;
            }
            else {
                const checkId = new ObjectId(updateParent_Id);
                const parent = await Region.findOne({ _id: checkId });
                let newArray = parent.childRegionIds;
                newArray.push(newRegion._id);
                const parentUpdate = await Region.updateOne({ _id: checkId }, { childRegionIds: newArray });
                if (updated && parentUpdate) return updated;

            }


        },

        deleteRegion: async (_, args) => {
            const { _id, updateParent_Id } = args;
            const objectId = new ObjectId(_id);
            const found = await Region.findOne({ _id: objectId });

            if (updateParent_Id === 'root') {
                const deleted = await Region.deleteOne({ _id: objectId });
                return found;

            }
            else {
                const deletedSub = await Region.deleteOne({ _id: objectId });

                const parent = await Region.findOne({ _id: updateParent_Id });
                if (parent) {
                    let childRegionArray = parent.childRegionIds;
                    for (let i = 0; i < childRegionArray.length; i++) {
                        if (childRegionArray[i] === _id) {
                            childRegionArray.splice(i, 1);
                            i--;
                        }
                    }
                    const updateParent = await Region.updateOne({ _id: updateParent_Id }, { childRegionIds: childRegionArray });

                    // here is where recursively delete everything
                }
                return found;

            }









        },

        updateRegion: async (_, args) => {
            const { field, value, _id } = args;
            const objectId = new ObjectId(_id);

            
            const updated = await Region.updateOne({ _id: objectId }, { [field]: value });
            if (updated) return value;
            else return "";


        },

        updateRegionArray: async (_, args) => {
            const { field, value, _id } = args;
            const objectId = new ObjectId(_id);
            const updated = await Region.updateOne({ _id: objectId }, { [field]: value });
            if (updated) return value;
            else return [""];

        }

        // need to add here
    }
}