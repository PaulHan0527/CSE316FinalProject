const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        capital: {
            type: String,
            required: true
        },
        leader: {
            type: String,
            required: true
        },
        landmarks: {
            type: [String],
            required: true
        },
        parentId: {
            type: String,
            required: true
        },
        // maybe childId as [String]
        owner: {
            type: String,
            required: true
        },
        rootRegion: {
            type: Boolean,
            required: true
        }
    }
);

const Region = model('Region', regionSchema);
module.exports = Region;