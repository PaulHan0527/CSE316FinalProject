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
            const { region, updateParent_Id, index } = args;
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
                if(index < 0) newArray.push(newRegion._id);
                else newArray.splice(index, 0, newRegion._id)
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

        },

        changeParent: async(_, args) => {
            const { _id , oldParent_id, newParent_id } = args;
            const objectId = new ObjectId(_id);
            const objectId2 = new ObjectId(oldParent_id);
            const objectId3 = new ObjectId(newParent_id);
            // change the id's parentId
            const found = await Region.findOne({_id: objectId});
            
            const update = await Region.updateOne({_id: objectId}, { parentId: newParent_id});

            // remove child from old parent
            const oldParent = await Region.findOne({_id: objectId2})
            let childs = oldParent.childRegionIds;
            let index = childs.indexOf(_id);
            childs.splice(index, 1);
            const updateOld = await Region.updateOne({_id: objectId2}, { childRegionIds: childs});

            // add to new parent
            const newParent = await Region.findOne({_id : objectId3});
            let childs2 = newParent.childRegionIds;
            childs2.push(_id);
            const updateNew = await Region.updateOne({_id: objectId3} , {childRegionIds: childs2});

            if ( update && updateOld && updateNew) {
                return true;
            }
            else return false;
           
        }

        // need to add here
    }
}